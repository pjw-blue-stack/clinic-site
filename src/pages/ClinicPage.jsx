import React from 'react';
import './ClinicPage.css';
import ColumnPage from './ColumnPage';
import { textContent } from '../textContent';
import DirectorProfile from '../components/DirectorProfile';

function ClinicPage({
  columns, 
  setColumns, 
  selectedColumn, 
  setSelectedColumn, 
  showWriteForm, 
  setShowWriteForm, 
  setShowBookingModal, 
  setBookingForm, 
  bookingForm 
}) {
  const { clinicNotice, clinicGreeting, clinicHerb, clinicLocation } = textContent;

  return (
    <div className="clinic-page-wrapper">
      
      {/* 0. 공지사항 */}
      <section className="clinic-section clinic-notice-section" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="container">
          <div className="notice-box glass-card">
            <div className="notice-header">
              <span className="notice-icon">📢</span>
              <h2>{clinicNotice.title}</h2>
            </div>
            <ul className="notice-list">
              {clinicNotice.list.map((notice, idx) => (
                <li key={idx} className="notice-item">
                  <span className="notice-title">{notice.title}</span>
                  <span className="notice-date">{notice.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 1. 원장 인사말 */}
      <section className="clinic-section clinic-greeting-section">
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

      {/* 2. 의학 칼럼 */}
      <section className="clinic-section clinic-column-section" style={{ padding: 0 }}>
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
      <section className="clinic-section clinic-herb-section">
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

      {/* 4. 오시는 길 */}
      <section className="clinic-section clinic-location-section bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-badge">{clinicLocation.badge}</span>
            <h2>{clinicLocation.title}</h2>
            <p className="section-subtitle">{clinicLocation.address}</p>
          </div>

          <div className="location-content">
            <div className="map-container">
              {/* Naver Map iframe or placeholder */}
              <div className="map-placeholder">
                <p>📍 지도 영역 (네이버/카카오 지도 연동)</p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
                  <a href="https://map.naver.com/" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ borderColor: '#03c75a', color: '#03c75a' }}>네이버 지도로 보기</a>
                  <a href="https://map.kakao.com/" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ borderColor: '#fee500', color: '#3c1e1e' }}>카카오맵으로 보기</a>
                </div>
              </div>
            </div>
            <div className="transport-info">
              {clinicLocation.transport.map((item, idx) => (
                <div key={idx} className="transport-item">
                  <h4>{item.mode}</h4>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. 상담 및 예약 */}
      <section className="clinic-section clinic-cta-section">
        <div className="container">
          <div className="cta-banner glass-card text-center">
            <h2>다한증 치료, 더 이상 미루지 마세요.</h2>
            <p>비대면 상담부터 예약까지 빠르고 편리하게 도와드립니다.</p>
            
            <div className="cta-links-grid">
              <a href="http://pf.kakao.com/" target="_blank" rel="noreferrer" className="cta-card kakao-link">
                <div className="cta-icon">💬</div>
                <h3>카카오톡 상담</h3>
                <p>비즈 카카오톡 실시간 상담</p>
              </a>
              <a href="https://talk.naver.com/" target="_blank" rel="noreferrer" className="cta-card naver-talk-link">
                <div className="cta-icon">N</div>
                <h3>네이버 톡톡</h3>
                <p>네이버 간편 채팅 상담</p>
              </a>
              <div 
                className="cta-card naver-booking-link" 
                onClick={() => {
                  setBookingForm({ ...bookingForm, specialtyId: 'detox' });
                  setShowBookingModal(true);
                }}
              >
                <div className="cta-icon">📅</div>
                <h3>네이버 예약</h3>
                <p>원하는 시간에 진료 예약</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ClinicPage;
