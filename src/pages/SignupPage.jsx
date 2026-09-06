import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth, googleProvider, db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import PolicyModal from '../components/PolicyModal';
import './AuthPages.css';

export default function SignupPage({ setPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [policyType, setPolicyType] = useState(null); // 'terms' | 'privacy' | null

  const saveUserToFirestore = async (user, displayName, phoneNumber = '') => {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        name: displayName,
        phone: phoneNumber,
        provider: user.providerData[0]?.providerId || 'email',
        createdAt: new Date().toISOString()
      });
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!agreeTerms || !agreePrivacy) {
      alert('필수 약관에 모두 동의해 주세요.');
      return;
    }
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
      try {
        await saveUserToFirestore(user, name, phone);
      } catch (fsError) {
        console.warn('Firestore 저장 실패 (권한 문제일 수 있습니다):', fsError);
      }
      alert('회원가입이 완료되었습니다!');
      setPage('home');
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/email-already-in-use') alert('이미 가입된 이메일입니다.');
      else if (error.code === 'auth/weak-password') alert('비밀번호는 6자리 이상이어야 합니다.');
      else if (error.code === 'auth/operation-not-allowed') alert('이메일 회원가입 기능이 비활성화되어 있습니다. 파이어베이스 콘솔(Authentication > Sign-in method)에서 이메일/비밀번호 로그인을 사용 설정해주세요.');
      else alert(`회원가입에 실패했습니다. (사유: ${error.message})`);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = async (platform) => {
    if (platform === '구글') {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        try {
          await saveUserToFirestore(user, user.displayName || user.email);
        } catch (fsError) {
          console.warn('Firestore 저장 실패 (권한 문제일 수 있습니다):', fsError);
        }
        alert('구글 계정으로 가입/로그인 되었습니다!');
        setPage('home');
      } catch (error) {
        console.error(error);
        alert('구글 로그인에 실패했습니다.');
      }
    } else if (platform === '네이버') {
      const clientId = import.meta.env.VITE_NAVER_CLIENT_ID;
      if (!clientId) {
        alert('네이버 로그인이 설정되지 않았습니다.');
        return;
      }
      const redirectUri = encodeURIComponent(window.location.origin);
      const state = encodeURIComponent('naver_login');
      const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;
      window.location.href = naverAuthUrl;
    } else if (platform === '카카오') {
      const clientId = import.meta.env.VITE_KAKAO_REST_API_KEY;
      if (!clientId) {
        alert('카카오 로그인이 설정되지 않았습니다.');
        return;
      }
      const redirectUri = encodeURIComponent(window.location.origin);
      const state = encodeURIComponent('kakao_login');
      const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&state=${state}`;
      window.location.href = kakaoAuthUrl;
    } else {
      alert(`현재 ${platform} 연동 준비 중입니다. 구글, 네이버, 카카오 로그인을 이용해 주세요.`);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">환자 회원가입</h2>
        <p className="auth-subtitle">가입하셔서, 치료후기를 확인하시고, 질문을 남겨보세요.</p>
        
        <form onSubmit={handleSignup} className="auth-form">
          <div className="form-group">
            <label>이름</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="이름을 입력하세요" />
          </div>
          <div className="form-group">
            <label>전화번호</label>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required placeholder="010-0000-0000" />
          </div>
          <div className="form-group">
            <label>이메일 (아이디)</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="아이디로 쓰일 이메일을 입력하세요" />
          </div>
          <div className="form-group">
            <label>비밀번호</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="6자리 이상 비밀번호" minLength="6" />
          </div>
          <div className="form-group">
            <label>비밀번호 확인</label>
            <input type="password" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} required placeholder="비밀번호를 다시 입력하세요" minLength="6" />
          </div>

          <div className="policy-checkboxes" style={{ margin: '20px 0', fontSize: '0.9rem', color: '#555' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', margin: 0 }}>
                <input type="checkbox" checked={agreeTerms} onChange={e => setAgreeTerms(e.target.checked)} style={{ marginRight: '8px', width: '16px', height: '16px', cursor: 'pointer' }} />
                [필수] 이용약관 동의
              </label>
              <button type="button" className="text-btn" onClick={() => setPolicyType('terms')} style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>내용보기</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', margin: 0 }}>
                <input type="checkbox" checked={agreePrivacy} onChange={e => setAgreePrivacy(e.target.checked)} style={{ marginRight: '8px', width: '16px', height: '16px', cursor: 'pointer' }} />
                [필수] 개인정보 수집 및 이용 동의
              </label>
              <button type="button" className="text-btn" onClick={() => setPolicyType('privacy')} style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>내용보기</button>
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary auth-btn" disabled={loading || !agreeTerms || !agreePrivacy} style={{ opacity: (!agreeTerms || !agreePrivacy) ? 0.5 : 1 }}>
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

      {policyType && (
        <PolicyModal type={policyType} onClose={() => setPolicyType(null)} />
      )}
    </div>
  );
}
