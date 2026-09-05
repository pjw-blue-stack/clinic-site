import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import './MyPage.css';

export default function MyPage({ user, qnaList, reviews, setPage }) {
  if (!user) {
    return (
      <div className="mypage-container" style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h2>로그인이 필요합니다.</h2>
        <button className="btn btn-primary" onClick={() => setPage('login')}>로그인 하러가기</button>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('로그아웃 되었습니다.');
      setPage('home');
    } catch (error) {
      console.error(error);
    }
  };

  const myQnas = qnaList?.filter(q => q.authorEmail === user.email) || [];
  const myReviews = reviews?.filter(r => r.authorEmail === user.email) || [];

  return (
    <div className="mypage-container">
      <div className="mypage-header">
        <div className="container">
          <h2>마이페이지</h2>
          <p>내 정보와 작성한 글을 관리하세요.</p>
        </div>
      </div>

      <div className="container mypage-content">
        <div className="mypage-sidebar">
          <div className="profile-card">
            <div className="profile-avatar">
              {user.displayName ? user.displayName.charAt(0) : user.email.charAt(0)}
            </div>
            <h3 className="profile-name">{user.displayName || '회원'}님</h3>
            <p className="profile-email">{user.email}</p>
            <button className="btn btn-outline logout-btn" onClick={handleLogout}>로그아웃</button>
          </div>
        </div>

        <div className="mypage-main">
          <section className="mypage-section">
            <h3 className="section-title">내가 쓴 Q&A 질문 ({myQnas.length})</h3>
            {myQnas.length > 0 ? (
              <div className="mypage-list">
                {myQnas.map(q => (
                  <div key={q.id} className="mypage-card">
                    <div className="card-header">
                      <span className="card-date">{new Date(q.createdAt).toLocaleDateString()}</span>
                      <span className={`status-badge ${q.isAnswered ? 'answered' : 'waiting'}`}>
                        {q.isAnswered ? '답변완료' : '답변대기'}
                      </span>
                    </div>
                    <h4 className="card-title">Q. {q.question}</h4>
                    {q.isAnswered && (
                      <div className="card-answer" dangerouslySetInnerHTML={{ __html: q.answer }} />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">작성한 질문이 없습니다.</div>
            )}
          </section>

          <section className="mypage-section" style={{ marginTop: '40px' }}>
            <h3 className="section-title">내가 쓴 치료후기 ({myReviews.length})</h3>
            {myReviews.length > 0 ? (
              <div className="mypage-list">
                {myReviews.map(r => (
                  <div key={r.id} className="mypage-card">
                    <div className="card-header">
                      <span className="card-date">{new Date(r.createdAt || r.date).toLocaleDateString()}</span>
                    </div>
                    <h4 className="card-title">{r.title}</h4>
                    <div className="card-preview">{r.content.replace(/<[^>]+>/g, '').substring(0, 100)}...</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">작성한 후기가 없습니다.</div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
