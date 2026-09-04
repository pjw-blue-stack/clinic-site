import React, { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import './AdminPage.css';

export default function AdminPage({ onBack, qnaList }) {
  const [activeTab, setActiveTab] = useState('notices');

  // Modes: 'list', 'write', 'edit'
  const [noticeMode, setNoticeMode] = useState('list');
  const [columnMode, setColumnMode] = useState('list');
  const [qnaMode, setQnaMode] = useState('list');
  
  const [editTargetId, setEditTargetId] = useState(null);

  // Notices state
  const noticesRef = collection(db, 'notices');
  const noticesQuery = query(noticesRef, orderBy('createdAt', 'desc'));
  const [notices] = useCollectionData(noticesQuery, { idField: 'id' });

  // Columns state
  const columnsRef = collection(db, 'columns');
  const columnsQuery = query(columnsRef, orderBy('id', 'asc'));
  const [columns] = useCollectionData(columnsQuery, { idField: 'firestoreId' });

  // Notice Form State
  const initialNotice = { tag: '[공지]', title: '', content: '' };
  const [noticeForm, setNoticeForm] = useState(initialNotice);

  const openNoticeWrite = () => {
    setNoticeForm(initialNotice);
    setEditTargetId(null);
    setNoticeMode('write');
  };

  const openNoticeEdit = (notice) => {
    setNoticeForm({ tag: notice.tag, title: notice.title, content: notice.content });
    setEditTargetId(notice.id);
    setNoticeMode('edit');
  };

  const handleNoticeSubmit = async (e) => {
    e.preventDefault();
    if (!noticeForm.title || !noticeForm.content) return;
    try {
      if (noticeMode === 'edit' && editTargetId) {
        await updateDoc(doc(db, 'notices', editTargetId), noticeForm);
        alert('공지사항이 수정되었습니다.');
      } else {
        await addDoc(collection(db, 'notices'), {
          ...noticeForm,
          date: new Date().toISOString().split('T')[0],
          createdAt: Date.now()
        });
        alert('공지사항이 등록되었습니다.');
      }
      setNoticeMode('list');
    } catch (err) {
      console.error(err);
      alert('처리 실패');
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

  // Column Form State
  const initialColumn = { title: '', category: '전신다한증', summary: '', content: '', icon: '🔬', readTime: '3분' };
  const [columnForm, setColumnForm] = useState(initialColumn);

  const openColumnWrite = () => {
    setColumnForm(initialColumn);
    setEditTargetId(null);
    setColumnMode('write');
  };

  const openColumnEdit = (column) => {
    setColumnForm({ 
      title: column.title, 
      category: column.category, 
      summary: column.summary, 
      content: column.content, 
      icon: column.icon || '🔬', 
      readTime: column.readTime || '3분' 
    });
    setEditTargetId(column.firestoreId);
    setColumnMode('edit');
  };

  const handleColumnSubmit = async (e) => {
    e.preventDefault();
    if (!columnForm.title || !columnForm.summary || !columnForm.content) {
      alert('모든 필드를 채워주세요.');
      return;
    }
    try {
      if (columnMode === 'edit' && editTargetId) {
        await updateDoc(doc(db, 'columns', editTargetId), columnForm);
        alert('의학 칼럼이 수정되었습니다.');
      } else {
        const columnData = {
          ...columnForm,
          date: new Date().toISOString().split('T')[0],
          createdAt: Date.now(),
          author: '대표원장 박제욱'
        };
        await addDoc(collection(db, 'columns'), columnData);
        alert('의학 칼럼이 등록되었습니다.');
      }
      setColumnMode('list');
    } catch (err) {
      console.error(err);
      alert('처리 실패');
    }
  };

  const handleDeleteColumn = async (firestoreId) => {
    if (window.confirm('이 칼럼을 정말 삭제하시겠습니까?')) {
      try {
        await deleteDoc(doc(db, 'columns', firestoreId));
      } catch (err) {
        console.error(err);
      }
    }
  };

  // QnA states
  const [answerText, setAnswerText] = useState('');

  const openQnaAnswer = (q) => {
    setAnswerText(q.answer || '');
    setEditTargetId(q.id);
    setQnaMode('answer');
  };

  const submitAnswer = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, 'qna', editTargetId), {
        answer: answerText,
        isAnswered: true
      });
      setQnaMode('list');
      setAnswerText('');
      alert('답변이 등록되었습니다.');
    } catch (err) {
      console.error(err);
      alert('답변 등록 실패');
    }
  };

  // Switch tabs reset modes
  useEffect(() => {
    setNoticeMode('list');
    setColumnMode('list');
    setQnaMode('list');
  }, [activeTab]);

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
              className={activeTab === 'columns' ? 'active' : ''} 
              onClick={() => setActiveTab('columns')}
              style={{ padding: '15px', cursor: 'pointer', borderRadius: '8px', marginBottom: '5px', backgroundColor: activeTab === 'columns' ? 'var(--primary-light)' : 'transparent', fontWeight: activeTab === 'columns' ? 'bold' : 'normal', color: activeTab === 'columns' ? 'var(--primary-dark)' : '#555' }}
            >
              의학 칼럼 관리
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
          
          {/* ======================= NOTICES ======================= */}
          {activeTab === 'notices' && (
            <section className="admin-section" style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              
              {noticeMode === 'list' && (
                <>
                  <div className="admin-tab-header">
                    <h3 style={{ fontSize: '1.5rem', margin: 0 }}>등록된 공지사항 목록</h3>
                    <button className="btn btn-primary" onClick={openNoticeWrite}>글쓰기</button>
                  </div>
                  <div className="admin-table-container">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th width="15%">태그</th>
                          <th width="50%">제목</th>
                          <th width="15%">작성일</th>
                          <th width="20%">관리</th>
                        </tr>
                      </thead>
                      <tbody>
                        {notices && notices.length > 0 ? notices.map(notice => (
                          <tr key={notice.id}>
                            <td><strong style={{ color: 'var(--primary-color)' }}>{notice.tag}</strong></td>
                            <td className="title-cell">{notice.title}</td>
                            <td>{notice.date}</td>
                            <td className="actions-cell">
                              <button className="admin-action-btn edit" onClick={() => openNoticeEdit(notice)}>수정</button>
                              <button className="admin-action-btn delete" onClick={() => handleDeleteNotice(notice.id)}>삭제</button>
                            </td>
                          </tr>
                        )) : (
                          <tr><td colSpan="4" style={{ textAlign: 'center', padding: '30px', color: '#888' }}>등록된 공지사항이 없습니다.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {(noticeMode === 'write' || noticeMode === 'edit') && (
                <>
                  <div className="admin-tab-header">
                    <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{noticeMode === 'edit' ? '공지사항 수정' : '새 공지사항 작성'}</h3>
                    <button className="btn btn-outline" onClick={() => setNoticeMode('list')}>← 목록으로</button>
                  </div>
                  <form onSubmit={handleNoticeSubmit} className="admin-form">
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                      <select className="form-select" value={noticeForm.tag} onChange={e => setNoticeForm({...noticeForm, tag: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}>
                        <option value="[공지]">[공지]</option>
                        <option value="[이벤트]">[이벤트]</option>
                        <option value="[안내]">[안내]</option>
                        <option value="[휴진]">[휴진]</option>
                      </select>
                    </div>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                      <input type="text" className="form-input" placeholder="제목을 입력하세요" value={noticeForm.title} onChange={e => setNoticeForm({...noticeForm, title: e.target.value})} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }} />
                    </div>
                    <div className="form-group" style={{ marginBottom: '20px' }}>
                      <textarea className="form-input" rows="5" placeholder="내용을 입력하세요" value={noticeForm.content} onChange={e => setNoticeForm({...noticeForm, content: e.target.value})} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px' }}>
                      {noticeMode === 'edit' ? '공지사항 수정' : '공지사항 등록'}
                    </button>
                  </form>
                </>
              )}
            </section>
          )}

          {/* ======================= COLUMNS ======================= */}
          {activeTab === 'columns' && (
            <section className="admin-section" style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              
              {columnMode === 'list' && (
                <>
                  <div className="admin-tab-header">
                    <h3 style={{ fontSize: '1.5rem', margin: 0 }}>등록된 의학 칼럼 목록</h3>
                    <button className="btn btn-primary" onClick={openColumnWrite}>글쓰기</button>
                  </div>
                  <div className="admin-table-container">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th width="15%">카테고리</th>
                          <th width="45%">제목</th>
                          <th width="20%">작성일</th>
                          <th width="20%">관리</th>
                        </tr>
                      </thead>
                      <tbody>
                        {columns && columns.length > 0 ? columns.map(column => (
                          <tr key={column.firestoreId}>
                            <td><strong style={{ color: 'var(--primary-color)' }}>{column.category}</strong></td>
                            <td className="title-cell">{column.title}</td>
                            <td>{column.date || '-'}</td>
                            <td className="actions-cell">
                              <button className="admin-action-btn edit" onClick={() => openColumnEdit(column)}>수정</button>
                              <button className="admin-action-btn delete" onClick={() => handleDeleteColumn(column.firestoreId)}>삭제</button>
                            </td>
                          </tr>
                        )) : (
                          <tr><td colSpan="4" style={{ textAlign: 'center', padding: '30px', color: '#888' }}>등록된 의학 칼럼이 없습니다.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {(columnMode === 'write' || columnMode === 'edit') && (
                <>
                  <div className="admin-tab-header">
                    <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{columnMode === 'edit' ? '의학 칼럼 수정' : '새 의학 칼럼 작성'}</h3>
                    <button className="btn btn-outline" onClick={() => setColumnMode('list')}>← 목록으로</button>
                  </div>
                  <form onSubmit={handleColumnSubmit} className="admin-form">
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                      <input type="text" className="form-input" placeholder="칼럼 제목을 입력하세요" value={columnForm.title} onChange={e => setColumnForm({...columnForm, title: e.target.value})} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }} />
                    </div>
                    <div className="form-group" style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
                      <select className="form-select" value={columnForm.category} onChange={e => setColumnForm({...columnForm, category: e.target.value})} style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}>
                        <option value="전신다한증">전신다한증</option>
                        <option value="수족다한증">수족다한증</option>
                        <option value="두안면다한증">두안면다한증</option>
                        <option value="보상성다한증">보상성다한증</option>
                      </select>
                      <input type="text" className="form-input" placeholder="이모지 (예: 🔬)" value={columnForm.icon} onChange={e => setColumnForm({...columnForm, icon: e.target.value})} style={{ width: '100px', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }} />
                      <input type="text" className="form-input" placeholder="읽는 시간 (예: 3분)" value={columnForm.readTime} onChange={e => setColumnForm({...columnForm, readTime: e.target.value})} style={{ width: '120px', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }} />
                    </div>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                      <input type="text" className="form-input" placeholder="요약 내용을 1~2줄로 입력하세요" value={columnForm.summary} onChange={e => setColumnForm({...columnForm, summary: e.target.value})} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }} />
                    </div>
                    <div className="form-group" style={{ marginBottom: '20px' }}>
                      <textarea className="form-input" rows="8" placeholder="칼럼 본문을 입력하세요 (줄바꿈이 그대로 적용됩니다)" value={columnForm.content} onChange={e => setColumnForm({...columnForm, content: e.target.value})} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px' }}>
                      {columnMode === 'edit' ? '의학 칼럼 수정' : '의학 칼럼 등록'}
                    </button>
                  </form>
                </>
              )}
            </section>
          )}

          {/* ======================= QNA ======================= */}
          {activeTab === 'qna' && (
            <section className="admin-section" style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              
              {qnaMode === 'list' && (
                <>
                  <div className="admin-tab-header">
                    <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Q&A 게시판 관리</h3>
                  </div>
                  <div className="admin-table-container">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th width="15%">상태</th>
                          <th width="45%">질문 내용</th>
                          <th width="15%">작성자</th>
                          <th width="10%">작성일</th>
                          <th width="15%">관리</th>
                        </tr>
                      </thead>
                      <tbody>
                        {qnaList && qnaList.length > 0 ? qnaList.map(q => (
                          <tr key={q.id}>
                            <td>
                              {q.isAnswered ? 
                                <span style={{ display: 'inline-block', padding: '3px 8px', borderRadius: '12px', backgroundColor: '#e6f4ff', color: '#1677ff', fontSize: '0.8rem', fontWeight: 'bold' }}>답변완료</span> :
                                <span style={{ display: 'inline-block', padding: '3px 8px', borderRadius: '12px', backgroundColor: '#fff2f0', color: '#ff4d4f', fontSize: '0.8rem', fontWeight: 'bold' }}>답변대기</span>
                              }
                            </td>
                            <td className="title-cell">
                              {q.question.substring(0, 30)}{q.question.length > 30 ? '...' : ''}
                              {q.isSecret && <span style={{ marginLeft: '5px' }}>🔒</span>}
                            </td>
                            <td>{q.author}</td>
                            <td>{new Date(q.createdAt).toLocaleDateString()}</td>
                            <td className="actions-cell">
                              <button className="admin-action-btn edit" onClick={() => openQnaAnswer(q)}>
                                {q.isAnswered ? '수정' : '답변하기'}
                              </button>
                            </td>
                          </tr>
                        )) : (
                          <tr><td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: '#888' }}>질문이 없습니다.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {qnaMode === 'answer' && (
                <>
                  <div className="admin-tab-header">
                    <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Q&A 답변 작성 및 수정</h3>
                    <button className="btn btn-outline" onClick={() => setQnaMode('list')}>← 목록으로</button>
                  </div>
                  
                  {(() => {
                    const q = qnaList.find(item => item.id === editTargetId);
                    if (!q) return null;
                    return (
                      <div style={{ marginBottom: '25px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid var(--accent-color)' }}>
                        <div style={{ marginBottom: '10px' }}>
                          <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Q. {q.question}</span>
                        </div>
                        <div style={{ fontSize: '0.9rem', color: '#666' }}>
                          작성자: {q.author} ({q.authorEmail}) | 작성일: {new Date(q.createdAt).toLocaleDateString()} | {q.isSecret ? '🔒 비밀글' : '일반글'}
                        </div>
                      </div>
                    );
                  })()}

                  <form onSubmit={submitAnswer} className="admin-form">
                    <div className="form-group" style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>원장님 답변 내용</label>
                      <textarea className="form-input" rows="6" value={answerText} onChange={e => setAnswerText(e.target.value)} placeholder="원장님 답변을 입력하세요" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px' }}>답변 저장</button>
                  </form>
                </>
              )}
            </section>
          )}

          {/* ======================= SETTINGS ======================= */}
          {activeTab === 'settings' && (
            <section className="admin-section" style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>관리자 권한 설정</h3>
              <div style={{ backgroundColor: '#f9fbfd', padding: '20px', borderRadius: '8px', borderLeft: '4px solid var(--primary-color)' }}>
                <h4 style={{ marginBottom: '10px' }}>현재 최고 관리자 모드 접속 중</h4>
                <p style={{ lineHeight: '1.6', color: '#555' }}>
                  현재 <strong>원장님의 구글 계정(pjw-blue@hanmail.net)</strong>으로 연동되어 최고 관리자 권한을 부여받으셨습니다.<br/><br/>
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
