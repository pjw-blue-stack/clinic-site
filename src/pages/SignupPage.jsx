import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth, googleProvider, db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import './AuthPages.css';

export default function SignupPage({ setPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
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

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
      await saveUserToFirestore(user, name);
      alert('회원가입이 완료되었습니다!');
      setPage('home');
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/email-already-in-use') alert('이미 가입된 이메일입니다.');
      else if (error.code === 'auth/weak-password') alert('비밀번호는 6자리 이상이어야 합니다.');
      else alert('회원가입에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = async (platform) => {
    if (platform === '구글') {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        await saveUserToFirestore(user, user.displayName || user.email);
        alert('구글 계정으로 가입/로그인 되었습니다!');
        setPage('home');
      } catch (error) {
        console.error(error);
        alert('구글 로그인에 실패했습니다.');
      }
    } else {
      alert(`현재 ${platform} 연동 준비 중입니다. 구글 로그인을 이용해 주세요.`);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">환자 회원가입</h2>
        <p className="auth-subtitle">가입하시고 질문과 후기를 남겨보세요.</p>
        
        <form onSubmit={handleSignup} className="auth-form">
          <div className="form-group">
            <label>이름</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="이름을 입력하세요" />
          </div>
          <div className="form-group">
            <label>이메일</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="이메일을 입력하세요" />
          </div>
          <div className="form-group">
            <label>비밀번호</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="6자리 이상 비밀번호" minLength="6" />
          </div>
          <div className="form-group">
            <label>비밀번호 확인</label>
            <input type="password" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} required placeholder="비밀번호를 다시 입력하세요" minLength="6" />
          </div>
          
          <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
            {loading ? '가입 중...' : '회원가입 완료'}
          </button>
        </form>

        <div className="auth-divider" style={{ margin: '20px 0' }}>
          <span>또는 소셜 계정으로 로그인</span>
        </div>

        <div className="social-login-buttons">
          <button className="social-btn naver" onClick={() => handleSocialSignup('네이버')}>
            <span className="naver-icon">N</span>
            <span>네이버 로그인</span>
          </button>
          <button className="social-btn kakao" onClick={() => handleSocialSignup('카카오')}>
            <span className="kakao-icon">K</span>
            <span>카카오 로그인</span>
          </button>
          <button className="social-btn google" onClick={() => handleSocialSignup('구글')}>
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
            <span>구글 로그인</span>
          </button>
        </div>
        
        <div className="auth-footer">
          이미 계정이 있으신가요? <button className="text-btn" onClick={() => setPage('login')}>로그인하기</button>
        </div>
      </div>
    </div>
  );
}
