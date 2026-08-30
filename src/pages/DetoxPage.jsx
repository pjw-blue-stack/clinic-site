import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { textContent } from '../textContent';
import './DetoxPage.css';

function DetoxPage({ setShowBookingModal }) {
  const [showCostModal, setShowCostModal] = useState(false);
  const [openQaIndex, setOpenQaIndex] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [selectedLimitation, setSelectedLimitation] = useState(null);

  useEffect(() => {
    // Scroll effects if needed in the future
  }, []);

  const toggleQa = (index) => {
    setOpenQaIndex(openQaIndex === index ? null : index);
  };

  return (
    <div className="detox-page" style={{ paddingTop: '40px' }}>
      {/* 1. DETOX HERO SECTION */}
      <section className="hero detox-hero-section">
        <div className="container hero-grid" style={{ minHeight: 'auto', alignItems: 'center' }}>
          <div className="hero-content text-center">
            <div className="hero-badge detox-badge">
              <span>🌿</span> {textContent.detoxHero.badge}
            </div>
            <h1 className="hero-title detox-title">
              {textContent.detoxHero.title}
            </h1>
            <p className="hero-desc detox-desc">
              {textContent.detoxHero.desc}
            </p>
            <div className="cta-action-box" style={{ marginTop: '2rem' }}>
              <button className="btn btn-primary btn-large" onClick={() => setShowBookingModal(true)}>
                정원 해독 진료 예약
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DOCTOR STORYTELLING SECTION */}
      <section className="section-doctor bg-light">
        <div className="container">
          <div className="doctor-grid">
            <div className="doctor-image-wrapper">
              <div className="doctor-placeholder">
                <span className="section-badge">{textContent.detoxDoctor.badge}</span>
                <h2>{textContent.detoxDoctor.title}</h2>
              </div>
            </div>
            <div className="doctor-content">
              <p className="doctor-intro-desc">
                {textContent.detoxDoctor.desc}
              </p>
              <div className="doctor-stats">
                {textContent.detoxDoctor.stats.map((stat, idx) => (
                  <div key={idx} className="stat-item">
                    <div className="stat-num">{stat.num}<span>{stat.unit}</span></div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="doctor-story">
                {textContent.detoxDoctor.story.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 LIMITATIONS OF WESTERN MEDICINE */}
      <section className="section-limitations-western" style={{ padding: '80px 0', backgroundColor: '#fdfdfd' }}>
        <div className="container">
          <div className="text-center mb-4">
            <span className="section-badge">{textContent.detoxWesternLimitations.badge}</span>
            <h2>{textContent.detoxWesternLimitations.title}</h2>
            <p className="section-subtitle">{textContent.detoxWesternLimitations.desc}</p>
          </div>
          
          <div className="limitations-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginTop: '40px' }}>
            {textContent.detoxWesternLimitations.methods.map((method, idx) => (
              <div 
                key={idx} 
                className="limitation-card glass-card hover-lift" 
                style={{ padding: '30px 20px', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 5px 20px rgba(0,0,0,0.03)', border: '1px solid #f0f0f0', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s ease' }}
                onClick={() => setSelectedLimitation(method)}
              >
                <div className="limitation-icon" style={{ fontSize: '3rem', marginBottom: '15px' }}>{method.icon}</div>
                <h3 style={{ fontSize: '1.2rem', color: '#333', marginBottom: '10px' }}>{method.title}</h3>
                <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.5', wordBreak: 'keep-all' }}>{method.desc}</p>
                <div style={{ marginTop: '15px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--primary-color)', fontWeight: '600', borderBottom: '1px solid var(--primary-color)' }}>자세히 보기 &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2.6 LIMITATIONS OF EASTERN MEDICINE */}
      <section className="section-limitations-eastern bg-light" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="doctor-grid" style={{ alignItems: 'center' }}>
            <div className="doctor-image-wrapper">
              <div className="doctor-placeholder" style={{ padding: '40px', backgroundColor: '#fff', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                <span className="section-badge">{textContent.detoxEasternLimitations.badge}</span>
                <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>{textContent.detoxEasternLimitations.title}</h2>
                <div style={{ fontSize: '4rem', opacity: '0.1', color: 'var(--primary-color)' }}>🍂</div>
              </div>
            </div>
            <div className="doctor-content">
              <p className="doctor-intro-desc" style={{ fontSize: '1.3rem', color: '#333', fontWeight: '600', marginBottom: '20px' }}>
                {textContent.detoxEasternLimitations.desc}
              </p>
              <div className="doctor-story">
                <p style={{ lineHeight: '1.8', fontSize: '1.05rem', color: '#555' }}>
                  {textContent.detoxEasternLimitations.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TREATMENT METHODS */}
      <section className="section-methods">
        <div className="container text-center">
          <span className="section-badge">{textContent.detoxMethods.badge}</span>
          <h2>{textContent.detoxMethods.title}</h2>
          <p className="section-subtitle">{textContent.detoxMethods.desc}</p>
          
          <div className="methods-grid">
            {textContent.detoxMethods.methods.map((method, idx) => (
              <div 
                key={idx} 
                className="method-card"
                style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
                onClick={() => setSelectedMethod(method)}
              >
                <div className="method-icon">{method.icon}</div>
                <h3>{method.title}</h3>
                <p>{method.desc}</p>
                <div style={{ marginTop: '20px' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--primary-color)', fontWeight: '600', borderBottom: '1px solid var(--primary-color)' }}>자세히 보기 &rarr;</span>
                </div>
              </div>
            ))}
          </div>

          <div className="cost-btn-wrapper">
            <button className="btn btn-outline btn-large" onClick={() => setShowCostModal(true)}>
              {textContent.detoxMethods.btnCost}
            </button>
          </div>
        </div>
      </section>

      {/* 4. TOXINS CORRELATION GRAPHS */}
      <section className="section-compare bg-white" style={{ padding: '80px 0 20px', height: 'auto' }}>
        <div className="container text-center">
          <div className="compare-text" style={{ marginBottom: '40px' }}>
            <span className="section-badge">{textContent.detoxGraphs.badge}</span>
            <h2>{textContent.detoxGraphs.title}</h2>
            <p className="section-desc" style={{ maxWidth: '800px', margin: '20px auto 0', lineHeight: '1.7', fontSize: '1.05rem', color: '#555' }}>
              {textContent.detoxGraphs.desc}
            </p>
          </div>
          <div className="graphs-container" style={{ display: 'flex', flexDirection: 'column', gap: '40px', alignItems: 'center' }}>
            <div className="graph-card" style={{ width: '100%', maxWidth: '900px', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', backgroundColor: '#f9fbfd', border: '1px solid #eef2f6' }}>
              <img 
                src="/detox_graph1.png" 
                alt={textContent.detoxGraphs.graph1Alt}
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px' }}
              />
            </div>
            <div className="graph-card" style={{ width: '100%', maxWidth: '900px', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', backgroundColor: '#f9fbfd', border: '1px solid #eef2f6' }}>
              <img 
                src="/detox_graph2.png" 
                alt={textContent.detoxGraphs.graph2Alt}
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. DURATION SECTION */}
      <section className="section-duration bg-light" style={{ paddingTop: '40px' }}>
        <div className="container">
          <div className="text-center mb-4">
            <span className="section-badge">{textContent.detoxDuration.badge}</span>
            <h2>{textContent.detoxDuration.title}</h2>
            <p className="section-subtitle">{textContent.detoxDuration.desc}</p>
          </div>
          
          <div className="duration-timeline">
            {textContent.detoxDuration.list.map((item, idx) => (
              <div key={idx} className="duration-card">
                <div className="duration-icon">{item.icon}</div>
                <div className="duration-content">
                  <h4>{item.area}</h4>
                  <div className="duration-time">{item.duration}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. MAINTENANCE SECTION */}
      <section className="section-maintenance">
        <div className="container">
          <div className="text-center mb-4">
            <span className="section-badge">{textContent.detoxMaintenance.badge}</span>
            <h2>{textContent.detoxMaintenance.title}</h2>
            <p className="section-subtitle">{textContent.detoxMaintenance.desc}</p>
          </div>

          <div className="maintenance-grid">
            {textContent.detoxMaintenance.list.map((item, idx) => (
              <div key={idx} className="maintenance-card">
                <div className="maintenance-icon">{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Q&A SECTION */}
      <section className="section-qa bg-light">
        <div className="container">
          <div className="text-center mb-4">
            <span className="section-badge">{textContent.faq.badge}</span>
            <h2>{textContent.faq.title}</h2>
            <p className="section-subtitle">{textContent.faq.desc}</p>
          </div>

          <div className="qa-list">
            {textContent.faq.list.map((qa, idx) => (
              <div 
                key={idx} 
                className={`qa-item ${openQaIndex === idx ? 'open' : ''}`}
                onClick={() => toggleQa(idx)}
              >
                <div className="qa-question">
                  <h4>{qa.question}</h4>
                  <span className="qa-toggle">{openQaIndex === idx ? '−' : '+'}</span>
                </div>
                {openQaIndex === idx && (
                  <div className="qa-answer">
                    <p style={{ whiteSpace: 'pre-line' }}>{qa.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COST MODAL */}
      {showCostModal && createPortal(
        <div className="modal-overlay" onClick={() => setShowCostModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowCostModal(false)}>✕</button>
            <div className="modal-header">
              <span className="modal-badge">Cost Guide</span>
              <h2 className="modal-title">정원 해독 치료 비용 안내</h2>
            </div>
            <div className="modal-body" style={{ textAlign: 'center', padding: '30px 20px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📋</div>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--text-main)', marginBottom: '20px' }}>
                해독지한탕 및 약침, 화주뜸 치료 비용은<br/>
                환자분의 체질, 땀이 나는 부위, 다한증의 중증도에 따라<br/>
                <strong>1:1 맞춤 처방</strong>으로 구성되므로 상이할 수 있습니다.
              </p>
              <div style={{ background: 'var(--bg-color)', padding: '20px', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>
                  정확한 비용 안내와 치료 계획 수립을 위해<br/>
                  부담 없이 원내로 문의해 주시거나 예약 후 내원해 주시면<br/>
                  친절하고 상세하게 안내해 드리겠습니다.
                </p>
              </div>
              <button 
                className="btn btn-primary" 
                style={{ width: '100%', marginTop: '30px', padding: '15px' }}
                onClick={() => {
                  setShowCostModal(false);
                  setShowBookingModal(true);
                }}
              >
                예약 및 문의하기
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* METHOD DETAIL MODAL */}
      {selectedMethod && createPortal(
        <div className="modal-overlay" onClick={() => setSelectedMethod(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <button className="modal-close" onClick={() => setSelectedMethod(null)}>×</button>
            <div className="modal-header" style={{ marginBottom: '20px' }}>
              <div className="modal-icon" style={{ fontSize: '3rem', marginBottom: '10px' }}>{selectedMethod.icon}</div>
              <h2 className="modal-title" style={{ fontSize: '1.8rem' }}>{selectedMethod.title}</h2>
            </div>
            <div className="modal-body" style={{ textAlign: 'center', padding: '10px 0' }}>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: 'var(--text-main)', wordBreak: 'keep-all' }}>
                {selectedMethod.modalContent}
              </p>
            </div>
            <div className="form-submit" style={{ marginTop: '30px' }}>
              <button type="button" className="btn btn-primary" style={{ width: '100%' }} onClick={() => setSelectedMethod(null)}>
                확인
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
      {/* LIMITATION DETAIL MODAL */}
      {selectedLimitation && createPortal(
        <div className="modal-overlay" onClick={() => setSelectedLimitation(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <button className="modal-close" onClick={() => setSelectedLimitation(null)}>×</button>
            <div className="modal-header" style={{ marginBottom: '20px' }}>
              <div className="modal-icon" style={{ fontSize: '3rem', marginBottom: '10px' }}>{selectedLimitation.icon}</div>
              <h2 className="modal-title" style={{ fontSize: '1.8rem' }}>{selectedLimitation.title}</h2>
            </div>
            <div className="modal-body" style={{ textAlign: 'center', padding: '10px 0' }}>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: 'var(--text-main)', wordBreak: 'keep-all' }}>
                {selectedLimitation.modalContent}
              </p>
            </div>
            <div className="form-submit" style={{ marginTop: '30px' }}>
              <button type="button" className="btn btn-primary" style={{ width: '100%' }} onClick={() => setSelectedLimitation(null)}>
                확인
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

export default DetoxPage;
