import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { auth, googleProvider, db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import './AuthPages.css';

export default function LoginPage({ setPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const saveUserToFirestore = async (user, displayName) => {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        name: displayName,
        provider: user.providerData[0]?.providerId || 'email',
        createdAt: new Date().toISOString()
      });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await saveUserToFirestore(user, user.displayName || user.email);
      alert('로그인되었습니다!');
      setPage('home');
    } catch (error) {
      console.error(error);
      alert('이메일 또는 비밀번호가 올바르지 않습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await saveUserToFirestore(user, user.displayName || user.email);
      alert('구글 계정으로 로그인 되었습니다!');
      setPage('home');
    } catch (error) {
      console.error(error);
      alert('구글 로그인에 실패했습니다.');
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      alert('비밀번호를 찾을 이메일을 입력해주세요.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert('입력하신 이메일로 비밀번호 재설정 링크가 전송되었습니다.');
    } catch (error) {
      console.error(error);
      alert('비밀번호 재설정 이메일 전송에 실패했습니다. (가입되지 않은 이메일일 수 있습니다)');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">로그인</h2>
        <p className="auth-subtitle">정원한의원 홈페이지에 오신 것을 환영합니다.</p>
        
        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label>이메일 (아이디)</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="가입하신 이메일(아이디)을 입력하세요" />
          </div>
          <div className="form-group">
            <label>비밀번호</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="비밀번호를 입력하세요" />
          </div>
          
          <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>
        
        <div className="auth-options">
          <button className="text-btn" onClick={handlePasswordReset}>비밀번호 찾기</button>
        </div>

        <div className="auth-divider">
          <span>또는</span>
        </div>

        <button className="btn btn-outline auth-btn google-btn" onClick={handleGoogleLogin}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="social-icon" />
          구글 계정으로 시작하기
        </button>
        
        <div className="auth-footer">
          아직 계정이 없으신가요? <button className="text-btn" onClick={() => setPage('signup')}>회원가입하기</button>
        </div>
      </div>
    </div>
  );
}
