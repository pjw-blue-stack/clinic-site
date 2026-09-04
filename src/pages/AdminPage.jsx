import React, { useState } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import './AdminPage.css';

export default function AdminPage({ onBack, qnaList }) {
  const [activeTab, setActiveTab] = useState('notices');

  // Notices state
  const noticesRef = collection(db, 'notices');
  const noticesQuery = query(noticesRef, orderBy('createdAt', 'desc'));
  const [notices] = useCollectionData(noticesQuery, { idField: 'id' });

  const [newNotice, setNewNotice] = useState({ tag: '[공지]', title: '', content: '' });

  const handleNoticeSubmit = async (e) => {
    e.preventDefault();
    if (!newNotice.title || !newNotice.content) return;
    try {
      await addDoc(collection(db, 'notices'), {
        ...newNotice,
        date: new Date().toISOString().split('T')[0],
        createdAt: Date.now()
      });
      setNewNotice({ tag: '[공지]', title: '', content: '' });
      alert('공지사항이 등록되었습니다.');
    } catch (err) {
      console.error(err);
      alert('등록 실패');
    }
  };

  const handleDeleteNotice = async (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await deleteDoc(doc(db, 'notices', id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  // QnA states for answering inside Admin
  const [answeringId, setAnsweringId] = useState(null);
  const [answerText, setAnswerText] = useState('');

  const submitAnswer = async (qnaId) => {
    try {
      await updateDoc(doc(db, 'qna', qnaId), {
        answer: answerText,
        isAnswered: true
      });
      setAnsweringId(null);
      setAnswerText('');
      alert('답변이 등록되었습니다.');
    } catch (err) {
      console.error(err);
      alert('답변 등록 실패');
    }
  };

  return (
    <div className="admin-page" style={{ padding: '60px 20px', minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      <header className="admin-header" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <button className="btn btn-outline" onClick={onBack} style={{ marginBottom: '15px' }}>← 메인으로 돌아가기</button>
          <h2 style={{ fontSize: '2rem', color: '#333' }}>통합 관리자 대시보드</h2>
        </div>
      </header>

      <div className="admin-container" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '30px' }}>
        <aside className="admin-sidebar" style={{ width: '250px', backgroundColor: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', alignSelf: 'flex-start' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li 
              className={activeTab === 'notices' ? 'active' : ''} 
              onClick={() => setActiveTab('notices')}
              style={{ padding: '15px', cursor: 'pointer', borderRadius: '8px', marginBottom: '5px', backgroundColor: activeTab === 'notices' ? 'var(--primary-light)' : 'transparent', fontWeight: activeTab === 'notices' ? 'bold' : 'normal', color: activeTab === 'notices' ? 'var(--primary-dark)' : '#555' }}
            >
              공지사항 관리
            </li>
            <li 
              className={activeTab === 'qna' ? 'active' : ''} 
              onClick={() => setActiveTab('qna')}
              style={{ padding: '15px', cursor: 'pointer', borderRadius: '8px', marginBottom: '5px', backgroundColor: activeTab === 'qna' ? 'var(--primary-light)' : 'transparent', fontWeight: activeTab === 'qna' ? 'bold' : 'normal', color: activeTab === 'qna' ? 'var(--primary-dark)' : '#555' }}
            >
              Q&A 게시판 관리
            </li>
            <li 
              className={activeTab === 'settings' ? 'active' : ''} 
              onClick={() => setActiveTab('settings')}
              style={{ padding: '15px', cursor: 'pointer', borderRadius: '8px', backgroundColor: activeTab === 'settings' ? 'var(--primary-light)' : 'transparent', fontWeight: activeTab === 'settings' ? 'bold' : 'normal', color: activeTab === 'settings' ? 'var(--primary-dark)' : '#555' }}
            >
              관리자 설정
            </li>
          </ul>
        </aside>

        <main className="admin-content" style={{ flex: 1 }}>
          {activeTab === 'notices' && (
            <section className="admin-section" style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>새 공지사항 작성</h3>
              <form onSubmit={handleNoticeSubmit} className="admin-form">
                <div className="form-group" style={{ marginBottom: '15px' }}>
                  <select className="form-select" value={newNotice.tag} onChange={e => setNewNotice({...newNotice, tag: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}>
                    <option value="[공지]">[공지]</option>
                    <option value="[이벤트]">[이벤트]</option>
                    <option value="[안내]">[안내]</option>
                    <option value="[휴진]">[휴진]</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                  <input type="text" className="form-input" placeholder="제목을 입력하세요" value={newNotice.title} onChange={e => setNewNotice({...newNotice, title: e.target.value})} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }} />
                </div>
                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <textarea className="form-input" rows="5" placeholder="내용을 입력하세요" value={newNotice.content} onChange={e => setNewNotice({...newNotice, content: e.target.value})} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px' }}>공지사항 등록</button>
              </form>

              <h3 style={{ fontSize: '1.5rem', marginTop: '40px', marginBottom: '20px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>등록된 공지사항 목록</h3>
              <div className="admin-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {notices && notices.length > 0 ? notices.map(notice => (
                  <div key={notice.id} className="admin-list-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #eee' }}>
                    <div>
                      <strong style={{ color: 'var(--primary-color)', marginRight: '8px' }}>{notice.tag}</strong>
                      <strong>{notice.title}</strong>
                      <span style={{ fontSize: '0.85rem', color: '#888', marginLeft: '10px' }}>{notice.date}</span>
                    </div>
                    <button className="btn btn-sm btn-outline" onClick={() => handleDeleteNotice(notice.id)} style={{ padding: '5px 10px', borderColor: '#ff4d4f', color: '#ff4d4f' }}>삭제</button>
                  </div>
                )) : <p style={{ color: '#888' }}>등록된 공지사항이 없습니다.</p>}
              </div>
            </section>
          )}

          {activeTab === 'qna' && (
            <section className="admin-section" style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
                답변 대기중인 질문 <span style={{ color: 'var(--accent-color)' }}>({qnaList ? qnaList.filter(q => !q.isAnswered).length : 0}건)</span>
              </h3>
              <div className="qna-list" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {qnaList && qnaList.filter(q => !q.isAnswered).map(q => (
                  <div key={q.id} className="qna-card" style={{ backgroundColor: '#f9fbfd', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ marginBottom: '15px' }}>
                      <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Q. {q.question}</span>
                      <div style={{ fontSize: '0.85rem', color: '#888', marginTop: '8px' }}>
                        작성자: {q.author} ({q.authorEmail}) | {new Date(q.createdAt).toLocaleDateString()} | {q.isSecret ? '🔒 비밀글' : '일반글'}
                      </div>
                    </div>
                    {answeringId === q.id ? (
                      <div style={{ marginTop: '15px', borderTop: '1px dashed #ccc', paddingTop: '15px' }}>
                        <textarea className="form-input" rows="4" value={answerText} onChange={e => setAnswerText(e.target.value)} placeholder="원장님 답변을 입력하세요" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}></textarea>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                          <button className="btn btn-sm btn-accent" onClick={() => submitAnswer(q.id)}>답변 최종 등록</button>
                          <button className="btn btn-sm btn-outline" onClick={() => setAnsweringId(null)}>작성 취소</button>
                        </div>
                      </div>
                    ) : (
                      <button className="btn btn-sm btn-primary" onClick={() => { setAnsweringId(q.id); setAnswerText(q.answer || ''); }}>답변 작성하기</button>
                    )}
                  </div>
                ))}
                {qnaList && qnaList.filter(q => !q.isAnswered).length === 0 && (
                  <p style={{ color: '#888' }}>대기중인 질문이 없습니다.</p>
                )}
              </div>

              <h3 style={{ fontSize: '1.5rem', marginTop: '50px', marginBottom: '20px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>답변 완료된 질문</h3>
              <div className="qna-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {qnaList && qnaList.filter(q => q.isAnswered).map(q => (
                  <div key={q.id} className="qna-card" style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #eee' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 'bold', color: '#555' }}>Q. {q.question.substring(0, 30)}...</span>
                      <span style={{ fontSize: '0.85rem', color: '#888' }}>{new Date(q.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'settings' && (
            <section className="admin-section" style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>관리자 권한 설정</h3>
              <div style={{ backgroundColor: '#f9fbfd', padding: '20px', borderRadius: '8px', borderLeft: '4px solid var(--primary-color)' }}>
                <h4 style={{ marginBottom: '10px' }}>현재 최고 관리자 모드 접속 중</h4>
                <p style={{ lineHeight: '1.6', color: '#555' }}>
                  현재 <strong>원장님의 구글 계정(parkjeuk@gmail.com)</strong>으로 연동되어 최고 관리자 권한을 부여받으셨습니다.<br/><br/>
                  추후 데스크 실장님이나 직원분들을 위한 전용 관리자 아이디/비밀번호 로그인 시스템은 별도의 <strong>'직원 전용 로그인'</strong> 페이지를 통해 업데이트될 예정입니다.
                </p>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
