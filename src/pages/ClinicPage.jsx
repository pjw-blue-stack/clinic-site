import React, { useState } from 'react';
import './ClinicPage.css';
import ColumnPage from './ColumnPage';
import { textContent } from '../textContent';
import DirectorProfile from '../components/DirectorProfile';

function ClinicPage({
  notices,
  qnaList,
  columns, 
  setColumns, 
  selectedColumn, 
  setSelectedColumn, 
  showWriteForm, 
  setShowWriteForm, 
  setShowBookingModal, 
  setBookingForm, 
  bookingForm,
  setShowQnaModal,
  setNewQna,
  loggedInUser,
  setShowLoginModal
}) {
  const { clinicNotice, clinicGreeting, clinicHerb, clinicSchedule, clinicLocation } = textContent;
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (e) => {
    if (e.target.tagName === 'IMG') {
      setSelectedImage(e.target.src);
    }
  };

  return (
    <div className="clinic-page-wrapper">

      {/* 1. 원장 인사말 */}
      <section id="greeting" className="clinic-section clinic-greeting-section">
        <div className="container">
          <div className="clinic-greeting-content glass-card">
            <span className="section-badge">{clinicGreeting.badge}</span>
            <h2 className="greeting-title" style={{ whiteSpace: 'pre-line' }}>{clinicGreeting.title}</h2>
            <h3 className="greeting-desc">{clinicGreeting.desc}</h3>
            
            <div className="greeting-body">
              <div className="greeting-story">
                {clinicGreeting.story.map((text, idx) => (
                  <p key={idx}>{text}</p>
                ))}
              </div>
              <div className="greeting-profile-wrapper">
                <DirectorProfile />
                <div className="greeting-history">
                  <ul>
                    {clinicGreeting.history.map((item, idx) => (
                      <li key={idx}>✓ {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 1-1. 공지사항 */}
      <section id="notice" className="clinic-section clinic-notice-section" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="container">
          <div className="notice-box glass-card">
            <div className="notice-header">
              <span className="notice-icon">📢</span>
              <h2>{clinicNotice.title}</h2>
            </div>
            <ul className="notice-list">
              {notices && notices.length > 0 ? (
                notices.slice(0, 5).map((notice, idx) => (
                  <li key={idx} className="notice-item" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    {notice.thumbnailUrl && <img src={notice.thumbnailUrl} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} alt="thumbnail" />}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <span className="notice-title">{notice.tag} {notice.title}</span>
                      <div className="notice-content-preview" dangerouslySetInnerHTML={{ __html: notice.content }} style={{ fontSize: '0.85rem', color: '#666', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }} />
                    </div>
                    <span className="notice-date">{notice.date}</span>
                  </li>
                ))
              ) : (
                <li className="notice-item">
                  <span className="notice-title">등록된 공지사항이 없습니다.</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* 2. 의학 칼럼 */}
      <section id="column" className="clinic-section clinic-column-section" style={{ padding: 0 }}>
        <ColumnPage 
          columns={columns}
          setColumns={setColumns}
          selectedColumn={selectedColumn}
          setSelectedColumn={setSelectedColumn}
          onBack={() => {
            setSelectedColumn(null);
          }}
          showWriteForm={showWriteForm}
          setShowWriteForm={setShowWriteForm}
          setShowBookingModal={setShowBookingModal}
          setBookingForm={setBookingForm}
          bookingForm={bookingForm}
        />
      </section>

      {/* 3. 청정 GMP 한약재 */}
      <section id="herb" className="clinic-section clinic-herb-section">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-badge">{clinicHerb.badge}</span>
            <h2>{clinicHerb.title}</h2>
            <p className="section-subtitle">{clinicHerb.desc}</p>
          </div>
          
          <div className="herb-features-grid">
            {clinicHerb.features.map((feat, idx) => (
              <div key={idx} className="herb-feature-card">
                <div className="herb-icon">{feat.icon}</div>
                <h3>{feat.title}</h3>
                <p>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      {/* 3.5 진료시간 안내 */}
      <section id="hours" className="clinic-section clinic-schedule-section">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-badge">{clinicSchedule.badge}</span>
            <h2>{clinicSchedule.title}</h2>
            <p className="section-subtitle">{clinicSchedule.desc}</p>
          </div>
          
          <div className="schedule-card glass-card">
            <div className="schedule-header">
              <h3>진료 안내</h3>
            </div>
            <ul className="schedule-list">
              {clinicSchedule.items.map((item, idx) => (
                <li key={idx} className={`schedule-item ${item.highlight ? 'highlight' : ''} ${item.isHoliday ? 'holiday' : ''}`}>
                  <span className="schedule-day">{item.day}</span>
                  <span className="schedule-time">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. 오시는 길 */}
      <section id="location" className="clinic-section clinic-location-section bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-badge">{clinicLocation.badge}</span>
            <h2>{clinicLocation.title}</h2>
            <p className="section-subtitle">{clinicLocation.address}</p>
          </div>

          <div className="location-content">
            <div className="map-container" style={{ display: 'block' }}>
              <iframe 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                loading="lazy" 
                allowFullScreen 
                src="https://maps.google.com/maps?q=%EC%84%9C%EC%9A%B8%20%EC%96%91%EC%B2%9C%EA%B5%AC%20%EB%AA%A9%EB%8F%99%EB%A1%9C%20218%20%EA%B2%BD%ED%9D%AC%EC%A0%95%EC%9B%90%ED%95%9C%EC%9D%98%EC%9B%90&t=&z=16&ie=UTF8&iwloc=&output=embed"
                title="경희정원한의원 오시는 길"
              ></iframe>
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', padding: '15px 0', backgroundColor: '#fff', borderBottom: '1px solid var(--glass-border)' }}>
              <a href="https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%20%EC%96%91%EC%B2%9C%EA%B5%AC%20%EB%AA%A9%EB%8F%99%EB%A1%9C%20218%20%EA%B2%BD%ED%9D%AC%EC%A0%95%EC%9B%90%ED%95%9C%EC%9D%98%EC%9B%90" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ borderColor: '#03c75a', color: '#03c75a', padding: '8px 16px', fontSize: '0.9rem' }}>네이버 지도로 열기</a>
              <a href="https://map.kakao.com/?q=%EC%84%9C%EC%9A%B8%20%EC%96%91%EC%B2%9C%EA%B5%AC%20%EB%AA%A9%EB%8F%99%EB%A1%9C%20218%20%EA%B2%BD%ED%9D%AC%EC%A0%95%EC%9B%90%ED%95%9C%EC%9D%98%EC%9B%90" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ borderColor: '#fee500', color: '#3c1e1e', padding: '8px 16px', fontSize: '0.9rem' }}>카카오맵으로 열기</a>
            </div>
            <div className="transport-info" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', textAlign: 'left', padding: '20px 10px' }}>
              {clinicLocation.transport.map((item, idx) => (
                <div key={idx} className="transport-item" style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', border: '1px solid #eaeaea', width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--primary-light)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '12px', fontSize: '1.2rem' }}>
                      {item.mode.includes('지하철') ? '🚇' : item.mode.includes('버스') ? '🚌' : '🚗'}
                    </div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary-dark)', margin: 0 }}>{item.mode}</h4>
                  </div>
                  <div style={{ paddingLeft: '4px' }} onClick={handleImageClick}>
                    {Array.isArray(item.detail) ? (
                      item.detail.map((line, lIdx) => (
                        <p key={lIdx} dangerouslySetInnerHTML={{ __html: line }} style={{ margin: '8px 0', fontSize: '0.95rem', color: '#555', lineHeight: '1.6' }} />
                      ))
                    ) : (
                      <p style={{ margin: '8px 0', fontSize: '0.95rem', color: '#555', lineHeight: '1.6' }}>{item.detail}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. 상담 및 예약 */}
      <section id="cta" className="clinic-section clinic-cta-section">
        <div className="container">
          <div className="cta-banner glass-card text-center">
            <h2>다한증 치료, 더 이상 미루지 마세요.</h2>
            <p>비대면 상담부터 예약까지 빠르고 편리하게 도와드립니다.</p>
            
            <div className="cta-links-grid">
              <a href="tel:02-732-1117" className="cta-card phone-link">
                <div className="cta-icon" style={{ fontSize: '2.5rem', marginBottom: '15px' }}>📞</div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>전화 상담</h3>
                <p style={{ fontSize: '0.95rem' }}>02-732-1117</p>
              </a>
              <a href="http://pf.kakao.com/_hjWxaE/chat" target="_blank" rel="noreferrer" className="cta-card kakao-link">
                <div className="cta-icon">💬</div>
                <h3>카카오톡 상담</h3>
                <p>비즈 카카오톡 실시간 상담</p>
              </a>
              <a href="https://talk.naver.com/ct/w4xpjd?frm=mnmb&frm=nmb_detail#nafullscreen" target="_blank" rel="noreferrer" className="cta-card naver-talk-link">
                <div className="cta-icon">N</div>
                <h3>네이버 톡톡</h3>
                <p>네이버 간편 채팅 상담</p>
              </a>
              <a 
                href="https://m.booking.naver.com/booking/13/bizes/1044022?theme=place&service-target=map-pc&lang=ko&area=bmp&map-search=1" 
                target="_blank" 
                rel="noreferrer" 
                className="cta-card naver-booking-link" 
              >
                <div className="cta-icon">📅</div>
                <h3>네이버 예약</h3>
                <p>원하는 시간에 진료 예약</p>
              </a>
            </div>

            {/* 상담 및 문의 게시판 */}
            <div className="inquiry-board-wrapper" style={{ marginTop: '50px', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 className="inquiry-board-title">상담 및 문의 게시판</h3>
                <button className="btn btn-outline" style={{ fontSize: '0.9rem', padding: '6px 16px' }} onClick={() => {
                  if (!loggedInUser) {
                    alert('로그인이 필요한 서비스입니다. 먼저 로그인 또는 회원가입을 진행해주세요.');
                    setShowLoginModal(true);
                    return;
                  }
                  setNewQna({ category: 'all', title: '', question: '', isSecret: false });
                  setShowQnaModal(true);
                }}>글쓰기</button>
              </div>
              <div className="inquiry-table-container">
                <table className="inquiry-table">
                  <thead>
                    <tr>
                      <th width="10%">번호</th>
                      <th width="15%">답변상태</th>
                      <th width="45%">제목</th>
                      <th width="15%">작성자</th>
                      <th width="15%">작성일</th>
                    </tr>
                  </thead>
                  <tbody>
                    {qnaList && qnaList.length > 0 ? (
                      qnaList.map((q, idx) => (
                        <tr key={idx}>
                          <td>{qnaList.length - idx}</td>
                          <td>
                            <span className={`status-badge ${q.isAnswered ? 'status-done' : 'status-waiting'}`}>
                              {q.isAnswered ? '답변완료' : '답변대기'}
                            </span>
                          </td>
                          <td className="inquiry-title">{q.title || q.question.substring(0, 30) + (q.question.length > 30 ? '...' : '')} {q.isSecret && '🔒'}</td>
                          <td>{q.author ? q.author[0] + '**' : ''}</td>
                          <td>{new Date(q.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>등록된 문의가 없습니다.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            cursor: 'zoom-out'
          }}
          onClick={() => setSelectedImage(null)}
        >
          <img 
            src={selectedImage} 
            alt="확대된 이미지" 
            style={{ 
              maxWidth: '100%', 
              maxHeight: '100%', 
              borderRadius: '8px',
              objectFit: 'contain',
              boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
            }} 
          />
          <button 
            style={{ 
              position: 'absolute', 
              top: '20px', 
              right: '30px', 
              background: 'transparent', 
              border: 'none', 
              color: '#fff', 
              fontSize: '3rem', 
              cursor: 'pointer',
              lineHeight: 1
            }}
            onClick={() => setSelectedImage(null)}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
}

export default ClinicPage;
