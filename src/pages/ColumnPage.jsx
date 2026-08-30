import React, { useState, useMemo } from 'react';
import './ColumnPage.css';

function ColumnPage({ 
  columns, 
  setColumns, 
  selectedColumn, 
  setSelectedColumn, 
  onBack, 
  showWriteForm, 
  setShowWriteForm, 
  setShowBookingModal, 
  setBookingForm, 
  bookingForm 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('전체');
  
  const [writeFormInput, setWriteFormInput] = useState({
    title: '',
    category: '전신다한증',
    summary: '',
    content: '',
    icon: '🔬',
    readTime: '3분'
  });

  const categories = ['전체', '수족다한증', '전신다한증', '두안면다한증', '보상성다한증'];

  const filteredColumns = useMemo(() => {
    let result = columns;
    if (activeTab !== '전체') {
      result = result.filter(col => col.category === activeTab);
    }
    if (searchTerm) {
      result = result.filter(col => 
        col.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        col.summary.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return result;
  }, [columns, activeTab, searchTerm]);

  const handleWriteSubmit = (e) => {
    e.preventDefault();
    if (!writeFormInput.title || !writeFormInput.summary || !writeFormInput.content) {
      alert('모든 필드를 채워주세요.');
      return;
    }

    const newColumn = {
      id: columns.length + 1,
      title: writeFormInput.title,
      category: writeFormInput.category,
      summary: writeFormInput.summary,
      content: writeFormInput.content,
      date: new Date().toISOString().split('T')[0],
      author: '대표원장 박제욱',
      readTime: writeFormInput.readTime,
      icon: writeFormInput.icon
    };

    setColumns([newColumn, ...columns]);
    setWriteFormInput({
      title: '',
      category: '전신다한증',
      summary: '',
      content: '',
      icon: '🔬',
      readTime: '3분'
    });
    setShowWriteForm(false);
    alert('새 칼럼이 등록되었습니다!');
  };

  // Render Column Detail View
  if (selectedColumn) {
    return (
      <div className="column-detail-view specialty-detail-page">
        <section className="detail-hero">
          <div className="container">
            <button className="btn-back" onClick={() => { setSelectedColumn(null); window.scrollTo(0, 0); }}>
              ← 칼럼 목록으로
            </button>
            <div className="detail-hero-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div className="detail-icon-badge" style={{ margin: '0 auto 20px auto' }}>{selectedColumn.icon}</div>
              <span className="detail-subtitle" style={{ textAlign: 'center' }}>{selectedColumn.category}</span>
              <h1 className="detail-title" style={{ textAlign: 'center', fontSize: '2.6rem' }}>{selectedColumn.title}</h1>
              <div className="column-meta-detail" style={{ display: 'flex', justifyContent: 'center', gap: '20px', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginTop: '15px' }}>
                <span>작성자: {selectedColumn.author}</span>
                <span>•</span>
                <span>작성일: {selectedColumn.date}</span>
                <span>•</span>
                <span>읽는 시간: {selectedColumn.readTime}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section column-body-section" style={{ backgroundColor: 'var(--bg-color)' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <div className="column-full-content" style={{ fontSize: '1.1rem', lineHeight: '2.0', color: 'var(--text-main)', textAlign: 'left', whiteSpace: 'pre-wrap' }}>
              {selectedColumn.content}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
              <button className="btn btn-outline" onClick={() => { setSelectedColumn(null); window.scrollTo(0, 0); }}>
                칼럼 목록으로 돌아가기
              </button>
            </div>
          </div>
        </section>

        <section className="section-detail-cta">
          <div className="container">
            <div className="detail-cta-content">
              <h2>경희정원 해독요법에 대해 자세히 상담받고 싶으신가요?<br />대표원장이 직접 1:1 진료 및 예약을 안내해 드립니다.</h2>
              <p>원인을 비우면 땀은 더 이상 불편하지 않습니다.</p>
              <div className="detail-cta-btns">
                <button 
                  className="btn btn-accent" 
                  onClick={() => {
                    setBookingForm({ ...bookingForm, specialtyId: 'detox' });
                    setShowBookingModal(true);
                  }}
                >
                  네이버 실시간 예약
                </button>
                <button className="btn btn-outline-white" onClick={onBack}>
                  메인 홈으로 가기
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Render Column List Board
  return (
    <div className="column-board-page">
      <section className="detail-hero" style={{ padding: '60px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="detail-subtitle">Medical Column</span>
          <h1 className="detail-title" style={{ fontSize: '3rem' }}>다한증 의학 칼럼</h1>
          <p className="detail-desc" style={{ margin: '0 auto', maxWidth: '700px', fontSize: '1.1rem' }}>
            19년 임상 해독 노하우와 자율신경계 연구를 바탕으로 다한증 완치의 근본 해법과 의학 정보를 투명하게 전달해 드립니다.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '30px' }}>
            <button className="btn btn-accent" onClick={() => setShowWriteForm(true)}>
              ✍ 칼럼 작성하기 (원장님 전용)
            </button>
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: 'var(--secondary-color)' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          
          <div className="column-tabs-wrapper" style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`btn ${activeTab === cat ? 'btn-primary' : 'btn-outline'}`}
                style={{ padding: '8px 20px', borderRadius: '30px' }}
                onClick={() => setActiveTab(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="column-search-wrapper" style={{ display: 'flex', gap: '12px', marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px auto' }}>
            <input 
              type="text" 
              className="form-input" 
              style={{ flex: 1 }} 
              placeholder="궁금한 증상이나 칼럼 제목을 검색해 보세요..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="btn btn-outline" style={{ padding: '10px' }} onClick={() => setSearchTerm('')}>
                초기화
              </button>
            )}
          </div>

          {filteredColumns.length > 0 ? (
            <div className="columns-list-grid">
              {filteredColumns.map(col => (
                <div key={col.id} className="column-card" onClick={() => { setSelectedColumn(col); window.scrollTo(0,0); }}>
                  <div className="column-card-icon">{col.icon}</div>
                  <div className="column-card-badge">{col.category}</div>
                  <h3 className="column-card-title">{col.title}</h3>
                  <p className="column-card-desc">{col.summary}</p>
                  <div className="column-card-footer">
                    <span>{col.author}</span>
                    <span>{col.date} • 읽기 {col.readTime}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-reviews-card">
              <p>검색 결과와 일치하는 칼럼이 없습니다.<br />다른 키워드로 검색해 주시기 바랍니다.</p>
            </div>
          )}
        </div>
      </section>

      {/* COLUMN WRITER MODAL */}
      {showWriteForm && (
        <div className="modal-overlay" onClick={() => setShowWriteForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <button className="modal-close" onClick={() => setShowWriteForm(false)}>×</button>
            <div className="modal-header">
              <div className="modal-icon" style={{ fontSize: '2.5rem' }}>✍</div>
              <h2 className="modal-title">새 의학 칼럼 작성</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                경희정원의 의료 정보 및 노하우를 기재해 주세요.
              </p>
            </div>
            
            <form onSubmit={handleWriteSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
                <div className="form-group">
                  <label className="form-label">칼럼 제목</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="칼럼의 제목을 입력하세요"
                    value={writeFormInput.title}
                    onChange={(e) => setWriteFormInput({ ...writeFormInput, title: e.target.value })}
                    required
                  />
                </div>

                <div className="form-grid" style={{ marginBottom: 0, gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">카테고리</label>
                    <select 
                      className="form-select"
                      value={writeFormInput.category}
                      onChange={(e) => setWriteFormInput({ ...writeFormInput, category: e.target.value })}
                    >
                      <option value="수족다한증">수족다한증</option>
                      <option value="전신다한증">전신다한증</option>
                      <option value="두안면다한증">두안면다한증</option>
                      <option value="보상성다한증">보상성다한증</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">아이콘 (이모지)</label>
                    <select 
                      className="form-select"
                      value={writeFormInput.icon}
                      onChange={(e) => setWriteFormInput({ ...writeFormInput, icon: e.target.value })}
                    >
                      <option value="🔬">🔬 실험실</option>
                      <option value="🧠">🧠 두뇌</option>
                      <option value="💧">💧 물방울</option>
                      <option value="🔥">🔥 불꽃</option>
                      <option value="🌿">🌿 약재</option>
                      <option value="📈">📈 데이터</option>
                    </select>
                  </div>
                </div>

                <div className="form-grid" style={{ marginBottom: 0, gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">읽기 시간</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="예: 3분"
                      value={writeFormInput.readTime}
                      onChange={(e) => setWriteFormInput({ ...writeFormInput, readTime: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">작성자</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value="대표원장 박제욱"
                      disabled
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">한 줄 요약</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="칼럼 목록에 노출될 짧은 요약글을 적어주세요."
                    value={writeFormInput.summary}
                    onChange={(e) => setWriteFormInput({ ...writeFormInput, summary: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">본문 내용</label>
                  <textarea 
                    rows="8" 
                    className="form-textarea" 
                    placeholder="칼럼의 본문을 작성해 주세요. (줄바꿈 지원)"
                    value={writeFormInput.content}
                    onChange={(e) => setWriteFormInput({ ...writeFormInput, content: e.target.value })}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
                  칼럼 등록하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ColumnPage;
