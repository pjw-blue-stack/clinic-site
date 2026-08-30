import React, { useState, useEffect } from 'react';
import { textContent } from '../textContent';
import './DetoxPage.css';

function DetoxPage({ setShowBookingModal }) {
  const [showCostModal, setShowCostModal] = useState(false);
  const [openQaIndex, setOpenQaIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const compareEl = document.getElementById('interactive-compare');
      if (compareEl) {
        const rect = compareEl.getBoundingClientRect();
        const progress = document.querySelector('.compare-indicator-progress');
        const viewHeight = window.innerHeight;
        
        if (rect.top <= viewHeight && rect.bottom >= 0) {
          let scrollPercent = ((viewHeight - rect.top) / (viewHeight + rect.height)) * 100;
          if (scrollPercent < 0) scrollPercent = 0;
          if (scrollPercent > 100) scrollPercent = 100;
          
          if (progress) {
            progress.style.width = `${scrollPercent}%`;
          }
          
          const images = document.querySelectorAll('.compare-img');
          images.forEach((img, index) => {
            const threshold = (index / (images.length - 1)) * 100;
            if (scrollPercent >= threshold - 15) {
              img.classList.add('visible');
            } else {
              img.classList.remove('visible');
            }
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

      {/* 3. INTERACTIVE COMPARISON SECTION */}
      <section id="interactive-compare" className="section-compare">
        <div className="compare-sticky-wrapper">
          <div className="compare-container container">
            <div className="compare-text">
              <span className="section-badge">{textContent.detoxGraphs.badge}</span>
              <h2>{textContent.detoxGraphs.title}</h2>
              <div className="compare-label-wrapper">
                <p className="compare-label-before">
                  {textContent.detoxGraphs.desc}
                </p>
              </div>
            </div>
            <div className="compare-visual-box">
              <div className="compare-image-wrapper">
                <img src="/treatment_step1.jpg" alt="치료 전 상태 (단계 1)" className="compare-img step1" />
                <img src="/treatment_step2.jpg" alt="치료 진행 상태 (단계 2)" className="compare-img step2" />
                <img src="/treatment_step3.jpg" alt="치료 진행 상태 (단계 3)" className="compare-img step3" />
                <img src="/treatment_step4.jpg" alt="치료 후 상태 (단계 4)" className="compare-img step4" />
              </div>
              <div className="compare-indicator-bar">
                <div className="compare-indicator-progress"></div>
              </div>
              <p className="compare-scroll-hint">
                {textContent.compare.indicatorText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TREATMENT METHODS */}
      <section className="section-methods">
        <div className="container text-center">
          <span className="section-badge">{textContent.detoxMethods.badge}</span>
          <h2>{textContent.detoxMethods.title}</h2>
          <p className="section-subtitle">{textContent.detoxMethods.desc}</p>
          
          <div className="methods-grid">
            {textContent.detoxMethods.methods.map((method, idx) => (
              <div key={idx} className="method-card">
                <div className="method-icon">{method.icon}</div>
                <h3>{method.title}</h3>
                <p>{method.desc}</p>
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

      {/* 5. DURATION SECTION */}
      <section className="section-duration bg-light">
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
      {showCostModal && (
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
        </div>
      )}
    </div>
  );
}

export default DetoxPage;
