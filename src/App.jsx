import { useState, useEffect } from 'react';
import './App.css';
import { specialties, reviewsData } from './specialtyData';
import { defaultColumns } from './columnData';
import { textContent } from './textContent';

// 구글폼 사전 설문지 URL (노쇼 방지용)
const PRE_CONSULTATION_FORM_URL = "https://forms.gle/zFfy9MMUtm9tCZ9Z7";

function App() {
  // Navigation & Scroll
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll effect for interactive before/after compare (cross-browser robust)
  useEffect(() => {
    const element = document.getElementById("interactive-compare");
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const elementHeight = rect.height;
      const elementTop = rect.top;
      
      const windowHeight = window.innerHeight;
      const totalScrollRange = elementHeight - windowHeight;
      if (totalScrollRange <= 0) return;
      
      // Calculate scroll progress (0 to 1)
      const scrolled = -elementTop;
      let progress = scrolled / totalScrollRange;
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;
      
      // Round progress to 3 decimal places for smoother transitions and performance
      const roundedProgress = Math.round(progress * 1000) / 1000;
      
      element.style.setProperty('--scroll-progress', roundedProgress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // URL Parameter Detection for micro-landing page support (Naver Ads)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let specId = params.get('specialty');
    
    // Backward compatibility mapping for merged head/face/taste sweat categories
    if (specId === 'anmyeon' || specId === 'duhan' || specId === 'migak') {
      specId = 'du-myeon';
    }
    
    if (specId) {
      const specialty = specialties.find(s => s.id === specId);
      if (specialty) {
        setSelectedSpecialty(specialty);
        window.scrollTo(0, 0);
      }
    }
  }, []);

  // Modals state
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [columns, setColumns] = useState(defaultColumns);
  const [isColumnPage, setIsColumnPage] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [showWriteForm, setShowWriteForm] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Reviews state
  const [reviews, setReviews] = useState(reviewsData);
  const [filterSpecialty, setFilterSpecialty] = useState('all');
  const [newReview, setNewReview] = useState({
    name: '',
    specialtyId: 'detox',
    title: '',
    content: '',
    rating: 5
  });
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Booking Form state
  const [bookingForm, setBookingForm] = useState({
    name: '',
    tel: '',
    date: '',
    time: '09:30',
    specialtyId: 'detox',
    memo: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // FAQ state for Objection Removal
  const [openFaq, setOpenFaq] = useState(null);

  // Helper for scroll
  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    setSelectedSpecialty(null); // Reset sub-page to show home page first
    setIsColumnPage(false);
    setSelectedColumn(null);
    
    setTimeout(() => {
      setActiveSection(id);
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 50);
  };

  // Nav click to open specialty detail page directly
  const handleNavClick = (id) => {
    setIsMobileMenuOpen(false);
    setIsColumnPage(false);
    setSelectedColumn(null);
    const specialty = specialties.find(s => s.id === id);
    if (specialty) {
      setSelectedSpecialty(specialty);
      window.scrollTo(0, 0); // Immediately scroll to the top of the detail page
    }
  };

  // Nav click to open column board page directly
  const handleColumnPageClick = () => {
    setIsMobileMenuOpen(false);
    setSelectedSpecialty(null);
    setSelectedColumn(null);
    setIsColumnPage(true);
    window.scrollTo(0, 0);
  };

  // Login handler
  const handleSocialLogin = (platform) => {
    setLoggedInUser(`정원 이웃 (${platform} 로그인)`);
    setShowLoginModal(false);
    alert(`${platform} 계정으로 로그인이 완료되었습니다.`);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    alert('로그아웃 되었습니다.');
  };

  // Review Form Submit
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.title || !newReview.content) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    
    const submittedReview = {
      id: reviews.length + 1,
      name: newReview.name.substring(0, 1) + '*' + newReview.name.substring(Math.max(1, newReview.name.length - 1)),
      specialtyId: newReview.specialtyId,
      title: newReview.title,
      content: newReview.content,
      rating: newReview.rating,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews([submittedReview, ...reviews]);
    setNewReview({
      name: '',
      specialtyId: 'detox',
      title: '',
      content: '',
      rating: 5
    });
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 3000);
  };

  // Booking Form Submit
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.tel || !bookingForm.date) {
      alert('이름, 연락처, 예약일을 입력해 주세요.');
      return;
    }
    setBookingSuccess(true);
  };

  // Consultation Form Submit
  const handleConsultationSubmit = (e) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.tel) {
      alert('이름과 연락처를 입력해 주세요.');
      return;
    }
    setBookingSuccess(true);
  };

  const resetBookingForm = () => {
    setBookingForm({
      name: '',
      tel: '',
      date: '',
      time: '09:30',
      specialtyId: 'detox',
      memo: ''
    });
    setBookingSuccess(false);
    setShowBookingModal(false);
  };

  const getSpecialtyName = (id) => {
    const spec = specialties.find(s => s.id === id);
    return spec ? spec.title : '기타 진료';
  };

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="container header-container">
          <a href="#home" className="logo" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
            <img src="/Hyperhydrosis.svg" alt="경희정원한의원 로고" style={{ height: '38px', width: '38px', objectFit: 'contain' }} />
          </a>

          <nav className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            <a 
              href="#specialties" 
              className={`nav-link ${activeSection === 'specialties' && !selectedSpecialty ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); scrollToSection('specialties'); }}
            >
              정원해독
            </a>
            <a 
              href="#sujok" 
              className="nav-link"
              onClick={(e) => { e.preventDefault(); handleNavClick('sujok'); }}
            >
              손발땀
            </a>
            <a 
              href="#du-myeon" 
              className="nav-link"
              onClick={(e) => { e.preventDefault(); handleNavClick('du-myeon'); }}
            >
              머리 얼굴땀
            </a>
            <a 
              href="#sangche" 
              className="nav-link"
              onClick={(e) => { e.preventDefault(); handleNavClick('sangche'); }}
            >
              상체땀
            </a>
            <a 
              href="#hache" 
              className="nav-link"
              onClick={(e) => { e.preventDefault(); handleNavClick('hache'); }}
            >
              하체땀
            </a>
            <a 
              href="#jeonsin" 
              className="nav-link"
              onClick={(e) => { e.preventDefault(); handleNavClick('jeonsin'); }}
            >
              전신땀
            </a>
            <a 
              href="#bosangseong" 
              className="nav-link"
              onClick={(e) => { e.preventDefault(); handleNavClick('bosangseong'); }}
            >
              보상성 다한증
            </a>
            <a 
              href="#dohan" 
              className="nav-link"
              onClick={(e) => { e.preventDefault(); handleNavClick('dohan'); }}
            >
              도한증(밤)
            </a>
            <a 
              href="#reviews" 
              className={`nav-link ${activeSection === 'reviews' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); scrollToSection('reviews'); }}
            >
              치료후기
            </a>
            <a 
              href="#booking" 
              className={`nav-link ${activeSection === 'booking' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); scrollToSection('booking'); }}
            >
              한의원
            </a>
          </nav>

          <div className="header-actions">
            {loggedInUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{loggedInUser}</span>
                <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={handleLogout}>
                  로그아웃
                </button>
              </div>
            ) : (
              <button className="btn btn-outline" onClick={() => setShowLoginModal(true)}>
                로그인
              </button>
            )}
            <button className="btn btn-accent" onClick={() => setShowBookingModal(true)}>
              실시간 예약
            </button>
            <button className={`mobile-toggle ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        {selectedSpecialty ? (
          <SpecialtyDetailPage 
            specialty={selectedSpecialty} 
            onBack={() => {
              setSelectedSpecialty(null);
              setTimeout(() => {
                const element = document.getElementById('specialties');
                if (element) {
                  const headerOffset = 80;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
              }, 50);
            }}
            reviews={reviews}
            getSpecialtyName={getSpecialtyName}
            setShowBookingModal={setShowBookingModal}
            setBookingForm={setBookingForm}
            bookingForm={bookingForm}
          />
        ) : isColumnPage ? (
          <ColumnPage 
            columns={columns}
            setColumns={setColumns}
            selectedColumn={selectedColumn}
            setSelectedColumn={setSelectedColumn}
            onBack={() => {
              setIsColumnPage(false);
              setSelectedColumn(null);
            }}
            showWriteForm={showWriteForm}
            setShowWriteForm={setShowWriteForm}
            setShowBookingModal={setShowBookingModal}
            setBookingForm={setBookingForm}
            bookingForm={bookingForm}
          />
        ) : (
          <>
            {/* HERO SECTION */}
        <section id="home" className="hero">
          <div className="container hero-grid">
            <div className="hero-content">
              <div className="hero-badge">
                <span>✦</span> {textContent.hero.badge}
              </div>
              <h1 className="hero-title" style={{ whiteSpace: 'pre-wrap' }}>
                {textContent.hero.title}
              </h1>
              <p className="hero-desc">
                {textContent.hero.desc}
              </p>
              <div className="hero-btns">
                <button className="btn btn-primary" onClick={() => setShowBookingModal(true)}>
                  {textContent.hero.btnBooking}
                </button>
                <button className="btn btn-outline" onClick={() => scrollToSection('reviews')}>
                  {textContent.hero.btnReviews}
                </button>
              </div>
            </div>
            
            <div className="hero-visual">
              <div className="hero-circle-bg"></div>
              <div className="hero-card hero-card-1">
                <div className="hero-card-icon">💧</div>
                <h4 className="hero-card-title">{textContent.hero.card1Title}</h4>
                <p className="hero-card-desc">{textContent.hero.card1Desc}</p>
              </div>
              <div className="hero-card hero-card-2">
                <div className="hero-card-icon">🔥</div>
                <h4 className="hero-card-title">{textContent.hero.card2Title}</h4>
                <p className="hero-card-desc">{textContent.hero.card2Desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* VALUE PROOF SECTION */}
        <section className="section-value-proof">
          <div className="container">
            <div className="value-proof-grid">
              <div className="value-proof-item">
                <div className="value-proof-num">{textContent.valueProof.item1Num}<span>{textContent.valueProof.item1Unit}</span></div>
                <h4 className="value-proof-title">{textContent.valueProof.item1Title}</h4>
                <p className="value-proof-desc">{textContent.valueProof.item1Desc}</p>
              </div>
              <div className="value-proof-item">
                <div className="value-proof-num">{textContent.valueProof.item2Num}<span>{textContent.valueProof.item2Unit}</span></div>
                <h4 className="value-proof-title">{textContent.valueProof.item2Title}</h4>
                <p className="value-proof-desc">{textContent.valueProof.item2Desc}</p>
              </div>
              <div className="value-proof-item">
                <div className="value-proof-num">{textContent.valueProof.item3Num}<span>{textContent.valueProof.item3Unit}</span></div>
                <h4 className="value-proof-title">{textContent.valueProof.item3Title}</h4>
                <p className="value-proof-desc">{textContent.valueProof.item3Desc}</p>
              </div>
              <div className="value-proof-item">
                <div className="value-proof-num">{textContent.valueProof.item4Num}<span>{textContent.valueProof.item4Unit}</span></div>
                <h4 className="value-proof-title">{textContent.valueProof.item4Title}</h4>
                <p className="value-proof-desc">{textContent.valueProof.item4Desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE COMPARISON SECTION */}
        <section id="interactive-compare" className="section-compare">
          <div className="compare-sticky-wrapper">
            <div className="compare-container container">
              <div className="compare-text">
                <span className="section-badge">{textContent.compare.badge}</span>
                <h2>{textContent.compare.title}</h2>
                <div className="compare-label-wrapper">
                  <p className="compare-label-before">
                    {textContent.compare.beforeLabel}
                  </p>
                  <p className="compare-label-after">
                    {textContent.compare.afterLabel}
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
                  <span className="compare-indicator-text">
                    {textContent.compare.indicatorText}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DETOX THERAPY SECTION */}
        <section id="detox" className="section section-alt">
          <div className="container">
            
            {/* 1단계: 고객의 목소리 (자가진단 질문 카드) */}
            <div className="target-question-container">
              <div className="section-header">
                <span className="section-badge" style={{ color: 'var(--accent-color)', backgroundColor: 'var(--accent-light)' }}>Self Check</span>
                <h2>혹시 내 몸도 독소 경고음을 보내고 있나요?</h2>
                <p className="section-desc">
                  아래 증상 중 하나라도 해당된다면, 이미 오장육부의 정화 시스템에 과부하가 걸린 신호입니다.
                </p>
              </div>
              <div className="target-question-grid">
                {textContent.detox.targets.map((t, idx) => (
                  <div key={idx} className="target-question-card">
                    <span className="question-badge-q">Q</span>
                    <p className="target-question-text">“{t}”</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2~5단계: 공감, 인사, 권위 제시, 해결책 예고 */}
            <div className="detail-letter-grid" style={{ marginBottom: '60px' }}>
              <div className="letter-box">
                <div className="letter-header">
                  {textContent.detox.letterTitle}
                </div>
                <div className="letter-body">
                  {textContent.detox.letterBody.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
                <div className="letter-signature">
                  경희정원한의원 대표원장 <strong>박제욱 드림</strong>
                </div>
              </div>

              {/* 권위 제시 카드 */}
              <div className="director-profile-card">
                <div className="director-avatar-box">👨‍⚕️</div>
                <div className="director-title-box">
                  <h3>박제욱 대표원장</h3>
                  <p>경희대 한의과대학 졸 / 경희의료원 수련의</p>
                </div>
                <div className="authority-badge-grid">
                  <div className="authority-badge-grid">
                    <div className="authority-badge-card">
                      <span className="badge-stat">19년</span>
                      <span className="badge-label">임상 진료 경력</span>
                    </div>
                    <div className="authority-badge-card">
                      <span className="badge-stat">900+</span>
                      <span className="badge-label">다한증 직접 진료</span>
                    </div>
                    <div className="authority-badge-card">
                      <span className="badge-stat">13,200제</span>
                      <span className="badge-label">맞춤 해독 처방</span>
                    </div>
                    <div className="authority-badge-card">
                      <span className="badge-stat">공식</span>
                      <span className="badge-label">'땀쟁이들' 제휴의원</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 본문: 3대 핵심 치료 Q&A 개편 */}
            <div className="section-header">
              <span className="section-badge">{textContent.detox.badge}</span>
              <h2>{textContent.detox.title} 3대 치료 원칙</h2>
              <p className="section-desc">
                {textContent.detox.desc}
              </p>
            </div>

            <div className="qa-treatment-list" style={{ marginBottom: '60px' }}>
              {textContent.detox.qaList.map((qa, idx) => (
                <div key={idx} className="qa-treatment-card">
                  <div className="qa-question-row">
                    <span className="qa-badge-q">Q</span>
                    <h3 className="qa-question-text">{qa.question}</h3>
                  </div>
                  <div className="qa-answer-row">
                    <span className="qa-badge-a">A</span>
                    <p className="qa-answer-text">{qa.answer}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 결론 & CTA */}
            <div className="cta-cool-box" style={{ maxWidth: '900px', margin: '0 auto' }}>
              <p className="cta-cool-attitude">
                <strong>{textContent.detox.coolAttitude}</strong>
              </p>
              <div className="cta-scarcity-box">
                📢 {textContent.detox.scarcity}
              </div>
            </div>

          </div>
        </section>

        {/* CLINIC SPECIALTIES SECTION */}
        <section id="specialties" className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-badge">{textContent.specialtiesHeader.badge}</span>
              <h2>{textContent.specialtiesHeader.title}</h2>
              <p className="section-desc">
                {textContent.specialtiesHeader.desc}
              </p>
            </div>

            <div className="specialties-grid">
              {specialties.map((specialty) => (
                <div 
                  key={specialty.id} 
                  className="specialty-card"
                  onClick={() => {
                    setSelectedSpecialty(specialty);
                    window.scrollTo(0, 0);
                  }}
                >
                  <div className="specialty-icon">{specialty.icon}</div>
                  <h3 className="specialty-title">{specialty.title}</h3>
                  <p className="specialty-desc">{specialty.summary}</p>
                  <span className="specialty-more">자세히 보기 →</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* OBJECTION REMOVAL SECTION */}
        <section className="section section-objection-removal">
          <div className="container">
            <div className="section-header">
              <span className="section-badge">{textContent.faq.badge}</span>
              <h2>{textContent.faq.title}</h2>
              <p className="section-desc">
                {textContent.faq.desc}
              </p>
            </div>

            <div className="faq-container">
              {textContent.faq.list.map((item, idx) => (
                <div key={idx} className={`faq-item ${openFaq === idx ? 'active' : ''}`}>
                  <div className="faq-question" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                    <span>{item.question}</span>
                    <span className="faq-icon">{openFaq === idx ? '−' : '+'}</span>
                  </div>
                  <div className="faq-answer">
                    <p style={{ whiteSpace: 'pre-wrap' }}>
                      {item.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TREATMENT REVIEWS SECTION */}
        <section id="reviews" className="section section-alt">
          <div className="container">
            <div className="section-header">
              <span className="section-badge">Community</span>
              <h2 className="section-title">이웃들의 진짜 치료 후기</h2>
              <p className="section-desc">
                정원 한의원에서 회복과 활력을 찾으신 소중한 환자분들의 생생한 체험 이야기입니다.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="reviews-filters">
              <button 
                className={`filter-btn ${filterSpecialty === 'all' ? 'active' : ''}`}
                onClick={() => setFilterSpecialty('all')}
              >
                전체
              </button>
              {specialties.map(spec => (
                <button
                  key={spec.id}
                  className={`filter-btn ${filterSpecialty === spec.id ? 'active' : ''}`}
                  onClick={() => setFilterSpecialty(spec.id)}
                >
                  {spec.title}
                </button>
              ))}
            </div>

            {/* Review Cards Grid */}
            <div className="reviews-grid">
              {reviews
                .filter(review => filterSpecialty === 'all' || review.specialtyId === filterSpecialty)
                .map(review => (
                  <div key={review.id} className="review-card">
                    <div className="review-meta">
                      <div className="review-rating">
                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                      </div>
                      <span className="review-tag">{getSpecialtyName(review.specialtyId)}</span>
                    </div>
                    <h4 className="review-title">{review.title}</h4>
                    <p className="review-content">{review.content}</p>
                    <div className="review-footer">
                      <span className="review-writer">{review.name} 환자님</span>
                      <span>{review.date}</span>
                    </div>
                  </div>
                ))}
            </div>

            {/* Review Write Form */}
            <div className="review-form-container">
              <h3 className="review-form-title">만족스러우셨나요? 치료 후기 작성하기</h3>
              {reviewSuccess ? (
                <div className="booking-success">
                  <div className="booking-success-icon">🎉</div>
                  <h4>후기가 정상적으로 등록되었습니다!</h4>
                  <p style={{ marginTop: '10px' }}>귀중한 후기를 남겨주셔서 대단히 감사드립니다.</p>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit}>
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">성함</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="이름을 입력해 주세요" 
                        value={newReview.name}
                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">받으신 치료 과목</label>
                      <select 
                        className="form-select"
                        value={newReview.specialtyId}
                        onChange={(e) => setNewReview({ ...newReview, specialtyId: e.target.value })}
                      >
                        {specialties.map(spec => (
                          <option key={spec.id} value={spec.id}>{spec.title}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">만족도 평점</label>
                      <div className="rating-select">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span 
                            key={star} 
                            className={`star-option ${star <= newReview.rating ? 'filled' : ''}`}
                            onClick={() => setNewReview({ ...newReview, rating: star })}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">후기 제목</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="한 줄 요약을 작성해 주세요" 
                        value={newReview.title}
                        onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group full-width">
                      <label className="form-label">치료 상세 후기 내용</label>
                      <textarea 
                        rows="4" 
                        className="form-textarea" 
                        placeholder="치료 과정 중 느낀 변화나 한의원의 친절함 등을 공유해 주세요."
                        value={newReview.content}
                        onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    후기 등록 완료
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* BOOKING & MAP SECTION */}
        <section id="booking" className="section">
          <div className="container booking-grid">
            <div className="booking-info">
              <span className="booking-subtitle">{textContent.booking.badge}</span>
              <h2 className="booking-title">{textContent.booking.title}</h2>
              <p className="booking-desc">
                {textContent.booking.desc}
              </p>

              <div className="booking-contact-list">
                <div className="booking-contact-item">
                  <div className="booking-contact-icon">📍</div>
                  <div>
                    <h4 className="booking-contact-title">{textContent.booking.addressTitle}</h4>
                    <p className="booking-contact-value">{textContent.booking.addressValue}</p>
                  </div>
                </div>
                <div className="booking-contact-item">
                  <div className="booking-contact-icon">📞</div>
                  <div>
                    <h4 className="booking-contact-title">{textContent.booking.phoneTitle}</h4>
                    <p className="booking-contact-value">{textContent.booking.phoneValue}</p>
                  </div>
                </div>
                <div className="booking-contact-item">
                  <div className="booking-contact-icon">💬</div>
                  <div>
                    <h4 className="booking-contact-title">{textContent.booking.kakaoTitle}</h4>
                    <p className="booking-contact-value">{textContent.booking.kakaoValue}</p>
                  </div>
                </div>
                <div className="booking-contact-item">
                  <div className="booking-contact-icon">💚</div>
                  <div>
                    <h4 className="booking-contact-title">{textContent.booking.naverTitle}</h4>
                    <p className="booking-contact-value">{textContent.booking.naverValue}</p>
                  </div>
                </div>
                <div className="booking-contact-item">
                  <div className="booking-contact-icon">🕒</div>
                  <div>
                    <h4 className="booking-contact-title">{textContent.booking.hoursTitle}</h4>
                    <p className="booking-contact-value" style={{ whiteSpace: 'pre-wrap' }}>
                      {textContent.booking.hoursValue}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Virtual Map & Quick Form */}
            <div className="booking-card">
              <h3 style={{ marginBottom: '8px', textAlign: 'center' }}>1:1 간편 상담 및 예약 신청</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '24px' }}>
                19년 해독 임상 노하우의 박제욱 원장님이 직접 확인 후 연락드립니다.
              </p>
              <form onSubmit={handleConsultationSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="form-group" style={{ textAlign: 'left' }}>
                    <label className="form-label">이름</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="성함을 입력해주세요" 
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="form-group" style={{ textAlign: 'left' }}>
                    <label className="form-label">연락처</label>
                    <input 
                      type="tel" 
                      className="form-input" 
                      placeholder="010-0000-0000" 
                      value={bookingForm.tel}
                      onChange={(e) => setBookingForm({ ...bookingForm, tel: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="form-group" style={{ textAlign: 'left' }}>
                    <label className="form-label">문의 종류</label>
                    <select 
                      className="form-select"
                      value={bookingForm.specialtyId}
                      onChange={(e) => setBookingForm({ ...bookingForm, specialtyId: e.target.value })}
                    >
                      {specialties.map(spec => (
                        <option key={spec.id} value={spec.id}>{spec.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group" style={{ textAlign: 'left' }}>
                    <label className="form-label">문의 사항 (선택)</label>
                    <textarea 
                      rows="3" 
                      className="form-textarea" 
                      placeholder="증상이나 궁금한 점을 간단히 남겨주세요."
                      value={bookingForm.memo}
                      onChange={(e) => setBookingForm({ ...bookingForm, memo: e.target.value })}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                    상담 신청 보내기
                  </button>
                </div>
              </form>
              
              {bookingSuccess && (
                <div className="modal-overlay" onClick={resetBookingForm}>
                  <div className="modal-content text-center" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
                    <div className="booking-success-icon" style={{ fontSize: '4rem' }}>🍃</div>
                    <h2 className="modal-title" style={{ marginBottom: '16px', fontSize: '1.6rem' }}>상담 신청 접수 완료</h2>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.6' }}>
                      <strong>{bookingForm.name}</strong> 환자님의 소중한 상담 신청이 전달되었습니다.<br />
                      기재해 주신 연락처(<strong>{bookingForm.tel}</strong>)로 신속히 연락해 드리겠습니다.
                    </p>

                    {/* 사전 설문지 링크 유도 (노쇼 방지) */}
                    <div style={{
                      backgroundColor: 'rgba(200, 162, 97, 0.08)',
                      border: '1px dashed var(--accent-color)',
                      borderRadius: 'var(--radius-md)',
                      padding: '20px',
                      marginBottom: '24px',
                      textAlign: 'center'
                    }}>
                      <h4 style={{ fontSize: '1rem', color: '#ffffff', margin: '0 0 8px 0', fontWeight: '600' }}>⭐ 다한증 진료 사전 설문지 작성</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 16px 0', lineHeight: '1.5' }}>
                        19년 명의의 정교한 1:1 맞춤 치료 설계를 위해<br />내원 전 사전 설문지를 꼭 작성해 주시기 바랍니다.
                      </p>
                      <a 
                        href={PRE_CONSULTATION_FORM_URL} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-accent"
                        style={{ display: 'inline-block', textDecoration: 'none', padding: '10px 20px', fontSize: '0.9rem' }}
                      >
                        사전 설문지 작성하기 (구글폼)
                      </a>
                    </div>

                    <button className="btn btn-outline" onClick={resetBookingForm} style={{ width: '100%' }}>
                      확인
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
          </>
        )}
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-info-col" style={{ textAlign: 'left' }}>
              <div className="footer-logo" style={{ marginBottom: '16px' }}>
                <img src="/Hyperhydrosis.svg" alt="경희정원한의원 로고" style={{ height: '28px', width: '28px', objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
              </div>
              <p style={{ marginTop: '16px', lineHeight: '1.8' }}>
                {textContent.footer.intro}
              </p>
              <div className="footer-socials">
                <a href="#naver" className="social-circle" title="네이버 예약 / 네이버 톡톡">N</a>
                <a href="#talk" className="social-circle" title="카카오톡 채널 '경희정원'">K</a>
                <a href="#insta" className="social-circle" title="공식 인스타그램">I</a>
                <a href="#blog" className="social-circle" title="공식 블로그">B</a>
              </div>
            </div>

            <div className="footer-col" style={{ textAlign: 'left' }}>
              <h4>진료 안내</h4>
              <ul className="footer-hours-list">
                <li><span>월·화·목·금</span> <span>09:30 - 19:00</span></li>
                <li><span>수요일 (야간)</span> <span>09:30 - 20:00</span></li>
                <li><span>토요일</span> <span>09:30 - 16:00</span></li>
                <li><span>점심 시간</span> <span>13:00 - 14:00</span></li>
                <li><span>일요일 · 공휴일</span> <span style={{ color: 'var(--accent-color)', fontWeight: '600' }}>휴진</span></li>
              </ul>
            </div>

            <div className="footer-col" style={{ textAlign: 'left' }}>
              <h4>한의원 정보</h4>
              <p className="footer-address" style={{ whiteSpace: 'pre-wrap' }}>
                {textContent.footer.bizInfo}
              </p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 Jeongwon Korean Medicine Clinic. All Rights Reserved.</p>
            <p>본 사이트는 환자분들의 편의를 위해 제작된 데모 페이지입니다.</p>
          </div>
        </div>
      </footer>

      {/* Specialty details modal is replaced by SpecialtyDetailPage component */}

      {/* REAL-TIME NAVER BOOKING MODAL */}
      {showBookingModal && (
        <div className="modal-overlay" onClick={() => setShowBookingModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '550px' }}>
            <button className="modal-close" onClick={() => setShowBookingModal(false)}>×</button>
            <div className="modal-header">
              <div className="modal-icon" style={{ fontSize: '2.5rem', color: '#03C75A' }}>N</div>
              <div className="modal-subtitle" style={{ color: '#03C75A' }}>Naver Booking Integration</div>
              <h2 className="modal-title" style={{ fontSize: '1.8rem', marginBottom: '4px' }}>네이버 실시간 예약</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', marginTop: '4px' }}>
                19년 임상 노하우의 박제욱 대표원장이 직접 1:1 맞춤 진료를 약속합니다.
              </p>
            </div>
            
            {bookingSuccess ? (
              <div className="booking-success text-center">
                <div className="booking-success-icon" style={{ fontSize: '4rem' }}>🍀</div>
                <h3 className="modal-title" style={{ fontSize: '1.5rem', marginBottom: '8px' }}>네이버 예약 신청 완료</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
                  <strong>{bookingForm.name}</strong> 환자님의 예약 신청서가 접수되었습니다.<br />
                  예약 일시: <strong>{bookingForm.date} {bookingForm.time}</strong><br />
                  진료 과목: <strong>{getSpecialtyName(bookingForm.specialtyId)}</strong><br />
                  <span style={{ display: 'block', marginTop: '12px', fontSize: '0.85rem', color: '#03C75A' }}>
                    * 네이버 알림/알림톡을 통해 확정 메시지가 5분 이내에 발송됩니다.
                  </span>
                </p>

                {/* 사전 설문지 링크 유도 (노쇼 방지) */}
                <div style={{
                  backgroundColor: 'rgba(200, 162, 97, 0.08)',
                  border: '1px dashed var(--accent-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '20px',
                  marginBottom: '24px',
                  textAlign: 'center'
                }}>
                  <h4 style={{ fontSize: '1rem', color: '#ffffff', margin: '0 0 8px 0', fontWeight: '600' }}>⭐ 다한증 진료 사전 설문지 작성</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 16px 0', lineHeight: '1.5' }}>
                    19년 명의의 정교한 1:1 맞춤 치료 설계를 위해<br />내원 전 사전 설문지를 꼭 작성해 주시기 바랍니다.
                  </p>
                  <a 
                    href={PRE_CONSULTATION_FORM_URL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-accent"
                    style={{ display: 'inline-block', textDecoration: 'none', padding: '10px 20px', fontSize: '0.9rem' }}
                  >
                    사전 설문지 작성하기 (구글폼)
                  </a>
                </div>

                <button className="btn btn-outline" onClick={resetBookingForm} style={{ width: '100%' }}>
                  확인
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="form-group" style={{ textAlign: 'left' }}>
                    <label className="form-label">예약자 성함</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="성함을 입력해주세요" 
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="form-group" style={{ textAlign: 'left' }}>
                    <label className="form-label">연락처</label>
                    <input 
                      type="tel" 
                      className="form-input" 
                      placeholder="010-0000-0000" 
                      value={bookingForm.tel}
                      onChange={(e) => setBookingForm({ ...bookingForm, tel: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="form-grid" style={{ marginBottom: 0, gap: '16px' }}>
                    <div className="form-group" style={{ textAlign: 'left' }}>
                      <label className="form-label">예약 날짜</label>
                      <input 
                        type="date" 
                        className="form-input" 
                        value={bookingForm.date}
                        onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                        required 
                      />
                    </div>
                    <div className="form-group" style={{ textAlign: 'left' }}>
                      <label className="form-label">예약 시간</label>
                      <select 
                        className="form-select"
                        value={bookingForm.time}
                        onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                      >
                        <option value="09:30">09:30</option>
                        <option value="10:00">10:00</option>
                        <option value="10:30">10:30</option>
                        <option value="11:00">11:00</option>
                        <option value="11:30">11:30</option>
                        <option value="12:00">12:00</option>
                        <option value="12:30">12:30</option>
                        <option value="14:00">14:00</option>
                        <option value="14:30">14:30</option>
                        <option value="15:00">15:00</option>
                        <option value="15:30">15:30</option>
                        <option value="16:00">16:00</option>
                        <option value="16:30">16:30</option>
                        <option value="17:00">17:00</option>
                        <option value="17:30">17:30</option>
                        <option value="18:00">18:00</option>
                        <option value="18:30">18:30</option>
                        <option value="19:00">19:00</option>
                        <option value="19:30">19:30</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group" style={{ textAlign: 'left' }}>
                    <label className="form-label">진료 과목</label>
                    <select 
                      className="form-select"
                      value={bookingForm.specialtyId}
                      onChange={(e) => setBookingForm({ ...bookingForm, specialtyId: e.target.value })}
                    >
                      {specialties.map(spec => (
                        <option key={spec.id} value={spec.id}>{spec.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group" style={{ textAlign: 'left' }}>
                    <label className="form-label">원장님께 드리는 말씀 (선택)</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="증상 또는 특이사항을 적어주세요."
                      value={bookingForm.memo}
                      onChange={(e) => setBookingForm({ ...bookingForm, memo: e.target.value })}
                    />
                  </div>
                  
                  <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                    <button type="submit" className="btn btn-accent" style={{ flex: 1, backgroundColor: '#03C75A', color: '#FFFFFF' }}>
                      네이버 페이 간편 예약 신청
                    </button>
                    <button type="button" className="btn btn-outline" onClick={() => setShowBookingModal(false)}>
                      취소
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* SOCIAL LOGIN MODAL */}
      {showLoginModal && (
        <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="modal-content login-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowLoginModal(false)}>×</button>
            <div className="modal-header" style={{ marginBottom: '15px' }}>
              <div className="modal-icon">🌿</div>
              <h2 className="modal-title" style={{ fontSize: '1.6rem' }}>정원 한의원 로그인</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                치료 후기 작성 및 예약을 위해 간편 로그인을 진행하세요.
              </p>
            </div>
            
            <div className="login-options">
              <button className="login-btn login-btn-kakao" onClick={() => handleSocialLogin('카카오톡')}>
                <span>💬</span> 카카오로 로그인
              </button>
              <button className="login-btn login-btn-naver" onClick={() => handleSocialLogin('네이버')}>
                <span>N</span> 네이버로 로그인
              </button>
              <button className="login-btn login-btn-google" onClick={() => handleSocialLogin('구글')}>
                <span>G</span> Google로 로그인
              </button>
              <button className="login-btn login-btn-apple" onClick={() => handleSocialLogin('Apple')}>
                <span></span> Apple로 로그인
              </button>
            </div>
            
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '24px' }}>
              로그인 시 정원 한의원의 <a href="#privacy" style={{ textDecoration: 'underline' }}>개인정보처리방침</a> 및 <a href="#terms" style={{ textDecoration: 'underline' }}>이용약관</a>에 동의하게 됩니다.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

// ==========================================================================
// SpecialtyDetailPage Component (Detailed landing page for condition subtypes)
// ==========================================================================
function SpecialtyDetailPage({ specialty, onBack, reviews, getSpecialtyName, setShowBookingModal, setBookingForm, bookingForm }) {
  // Filter reviews for this specialty
  const conditionReviews = reviews.filter(r => r.specialtyId === specialty.id);

  // Tab State for Head/Face/Both sweat condition (du-myeon)
  const [activeTab, setActiveTab] = useState('both');

  // Multi-select State for Upper Body Sweat (sangche)
  const [selectedParts, setSelectedParts] = useState(['chest']);

  // Toggle helper for multi-select parts
  const togglePart = (partKey) => {
    if (selectedParts.includes(partKey)) {
      if (selectedParts.length > 1) {
        setSelectedParts(selectedParts.filter(p => p !== partKey));
      }
    } else {
      setSelectedParts([...selectedParts, partKey]);
    }
  };

  // Multi-select State for Lower Body Sweat (hache)
  const [selectedHacheParts, setSelectedHacheParts] = useState(['buttocks']);

  // Toggle helper for lower body parts
  const toggleHachePart = (partKey) => {
    if (selectedHacheParts.includes(partKey)) {
      if (selectedHacheParts.length > 1) {
        setSelectedHacheParts(selectedHacheParts.filter(p => p !== partKey));
      }
    } else {
      setSelectedHacheParts([...selectedHacheParts, partKey]);
    }
  };

  // Determine current active content (tabs & multi-select parts support)
  let currentSummary = specialty.summary;
  let currentDetails = specialty.details;

  if ((specialty.id === 'du-myeon' || specialty.id === 'sujok') && specialty.tabs) {
    currentSummary = specialty.tabs[activeTab].summary;
    currentDetails = specialty.tabs[activeTab].details;
  } else if (specialty.id === 'sangche' && specialty.parts) {
    const partNames = selectedParts.map(p => specialty.parts[p]?.name).join(', ');
    currentSummary = `[선택하신 불편 부위: ${partNames}]\n\n` + selectedParts.map(p => specialty.parts[p]?.summary).join('\n\n');
    currentDetails = selectedParts.map(p => specialty.parts[p]?.details);
  } else if (specialty.id === 'hache' && specialty.parts) {
    const partNames = selectedHacheParts.map(p => specialty.parts[p]?.name).join(', ');
    currentSummary = `[선택하신 불편 부위: ${partNames}]\n\n` + selectedHacheParts.map(p => specialty.parts[p]?.summary).join('\n\n');
    currentDetails = selectedHacheParts.map(p => specialty.parts[p]?.details);
  }

  return (
    <div className="specialty-detail-page">
      {/* Detail Page Hero */}
      <section className="detail-hero">
        <div className="container">
          <button className="btn-back" onClick={onBack}>
            ← 전체 프로그램 목록
          </button>
          
          <div className="detail-hero-grid">
            <div className="detail-hero-content">
              <div className="detail-icon-badge">{specialty.icon}</div>
              <span className="detail-subtitle">{specialty.subtitle}</span>
              <h1 className="detail-title">{specialty.title}</h1>
              
              {/* Tab UI for Head/Face Sweat or Hand/Foot Sweat */}
              {(specialty.id === 'du-myeon' || specialty.id === 'sujok') && (
                <div className="detail-tabs">
                  <button 
                    className={`tab-btn ${activeTab === 'both' ? 'active' : ''}`}
                    onClick={() => setActiveTab('both')}
                  >
                    {specialty.id === 'du-myeon' ? '얼굴·머리 땀 둘 다' : '손·발 땀 둘 다'}
                  </button>
                  <button 
                    className={`tab-btn ${activeTab === 'head' ? 'active' : ''}`}
                    onClick={() => setActiveTab('head')}
                  >
                    {specialty.id === 'du-myeon' ? '머리 땀만 (두한증)' : '손 땀만 (수한증)'}
                  </button>
                  <button 
                    className={`tab-btn ${activeTab === 'face' ? 'active' : ''}`}
                    onClick={() => setActiveTab('face')}
                  >
                    {specialty.id === 'du-myeon' ? '얼굴 땀만 (안면다한증)' : '발 땀만 (족한증)'}
                  </button>
                </div>
              )}

              {/* Multi-select UI for Upper Body Sweat (sangche) */}
              {specialty.id === 'sangche' && specialty.parts && (
                <div className="detail-parts-selector">
                  {['chest', 'back', 'armpit', 'belly', 'waist'].map((key) => {
                    const part = specialty.parts[key];
                    if (!part) return null;
                    const isSelected = selectedParts.includes(key);
                    return (
                      <button
                        key={key}
                        onClick={() => togglePart(key)}
                        className={`part-btn ${isSelected ? 'active' : ''}`}
                      >
                        <span className="btn-icon">{isSelected ? '✓' : '+'}</span>
                        {part.name}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Multi-select UI for Lower Body Sweat (hache) */}
              {specialty.id === 'hache' && specialty.parts && (
                <div className="detail-parts-selector">
                  {['buttocks', 'groin', 'thigh', 'calf'].map((key) => {
                    const part = specialty.parts[key];
                    if (!part) return null;
                    const isSelected = selectedHacheParts.includes(key);
                    return (
                      <button
                        key={key}
                        onClick={() => toggleHachePart(key)}
                        className={`part-btn ${isSelected ? 'active' : ''}`}
                      >
                        <span className="btn-icon">{isSelected ? '✓' : '+'}</span>
                        {part.name}
                      </button>
                    );
                  })}
                </div>
              )}

              <p className="detail-desc">{currentSummary}</p>
              <div className="detail-hero-btns">
                <button 
                  className="btn btn-accent" 
                  onClick={() => {
                    setBookingForm({ ...bookingForm, specialtyId: specialty.id });
                    setShowBookingModal(true);
                  }}
                >
                  네이버 실시간 예약
                </button>
                <button 
                  className="btn btn-outline-white"
                  onClick={() => {
                    const element = document.getElementById('booking');
                    if (element) {
                      const headerOffset = 80;
                      const elementPosition = element.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    }
                  }}
                >
                  1:1 간편 상담 신청
                </button>
              </div>
            </div>
            
            <div className="detail-hero-visual">
              <div className="detail-visual-circle">
                <span className="detail-visual-icon">{specialty.icon}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jacheong's Strange Marketing Layout 도입부 (대표원장의 편지 & 고객의 소리) */}
      <section className="detail-letter-section">
        <div className="container">
          
          {/* 1단계: 고객의 목소리 (자가 질문 카드) */}
          <div className="target-question-container">
            <div className="section-header">
              <span className="section-badge" style={{ color: 'var(--accent-color)', backgroundColor: 'var(--accent-light)' }}>Self Check</span>
              <h2 className="section-title">혹시 지금 이런 아픔을 겪고 계신가요?</h2>
              <p className="section-desc">
                다한증 이웃들이 매일같이 내원하며 원장실 문을 두드리고 털어놓는 고민들입니다.
              </p>
            </div>
            <div className="target-question-grid">
              {specialty.target.map((t, idx) => (
                <div key={idx} className="target-question-card">
                  <span className="question-badge-q">Q</span>
                  <p className="target-question-text">“{t}”</p>
                </div>
              ))}
            </div>
          </div>

          {/* 2~5단계: 공감, 인사, 권위 제시, 해결책 예고 */}
          <div className="detail-letter-grid">
            <div className="letter-box">
              <div className="letter-header">
                ✉️ 19년 다한증 해독 명의 박제욱 원장이 드리는 편지
              </div>
              <div className="letter-body">
                <p>
                  안녕하십니까. 목동에서 14년째 한 자리를 지키며, 다한증 이웃들의 눅눅하고 시린 일상을 함께 고민해 온 <strong>경희정원한의원 대표원장 박제욱</strong>입니다.
                </p>
                <p>
                  누군가와 손을 잡거나 악수하는 평범한 일상이 두려움으로 변하고, 계절에 맞지 않게 옷이 축축하게 젖어버리는 절망감... 
                  그 고통이 매일의 삶을 얽매는 감옥과 같다는 사실을 19년 동안 마주하며 누구보다 잘 알고 있습니다.
                </p>
                <p>
                  땀을 강제로 차단하고 신경을 마비시키는 치료는 단기간의 임시방편일 뿐, 결국 내성이 생기거나 엉뚱한 부위로 땀이 터지는 보상성 부작용을 유발하기 쉽습니다. <strong>땀은 죄가 없습니다. 진짜 주범은 우리 몸 안에 축적된 노폐물 독소</strong>입니다.
                </p>
                <p>
                  오늘 이 글을 통해, 겉의 땀구멍만 물리적으로 막아두는 방법이 아닌 <strong>몸속에 누적된 열독과 순환 장애의 근본 독소를 비워내어</strong> 자율신경계가 자연스러운 조절력을 되찾게 돕는 해독의 본질을 밝혀드리고자 합니다.
                </p>
              </div>
              <div className="letter-signature">
                경희정원한의원 대표원장 <strong>박제욱 드림</strong>
              </div>
            </div>

            {/* 권위 제시 카드 */}
            <div className="director-profile-card">
              <div className="director-avatar-box">👨‍⚕️</div>
              <div className="director-title-box">
                <h3>박제욱 대표원장</h3>
                <p>경희대 한의과대학 졸 / 경희의료원 수련의</p>
              </div>
              <div className="authority-badge-grid">
                <div className="authority-badge-card">
                  <span className="badge-stat">19년</span>
                  <span className="badge-label">임상 진료 경력</span>
                </div>
                <div className="authority-badge-card">
                  <span className="badge-stat">900+</span>
                  <span className="badge-label">다한증 직접 진료</span>
                </div>
                <div className="authority-badge-card">
                  <span className="badge-stat">13,200제</span>
                  <span className="badge-label">맞춤 해독 처방</span>
                </div>
                <div className="authority-badge-card">
                  <span className="badge-stat">공식</span>
                  <span className="badge-label">'땀쟁이들' 제휴의원</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Blog Images Section */}
      {specialty.images && specialty.images.length > 0 && (
        <section className="section detail-images-section">
          <div className="container">
            <div className="section-header">
              <span className="section-badge">Gallery</span>
              <h2 className="section-title">치료 과정 및 원리</h2>
            </div>
            <div className="images-grid" style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
              {specialty.images.map((imgSrc, idx) => (
                <img key={idx} src={imgSrc} alt={`${specialty.title} ${idx + 1}`} style={{ maxWidth: '100%', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Cause & Treatment Process -> 본문 3대 소주제 Q&A 개편 */}
      <section className="section detail-treatment-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Solution</span>
            <h2 className="section-title">정원 {specialty.title} 3대 핵심 치료 Q&A</h2>
            <p className="section-desc">
              환자분들이 치료 전에 가장 많이 묻고 궁금해하시는 대표적인 의문점들을 명확하게 풀어드립니다.
            </p>
          </div>

          <div className="qa-treatment-list">
            {currentDetails.map((detail, idx) => (
              <div key={idx} className="qa-treatment-card">
                <div className="qa-question-row">
                  <span className="qa-badge-q">Q</span>
                  <h3 className="qa-question-text">{detail.title}</h3>
                </div>
                <div className="qa-answer-row">
                  <span className="qa-badge-a">A</span>
                  <p className="qa-answer-text">{detail.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 Core Principles of Detox Treatment */}
      <section className="section section-alt detail-principles-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Principles</span>
            <h2 className="section-title">정원 해독 다한증 치료의 8대 핵심 원리</h2>
            <p className="section-desc">
              무작정 땀구멍만 막아두는 대증요법과 달리, 몸속 독소를 해소하여 자율신경계 스스로 땀 조절력을 복구하도록 하는 8가지 대원칙입니다.
            </p>
          </div>

          <div className="principles-grid">
            <div className="principle-card">
              <div className="principle-header">
                <span className="principle-step-num">1</span>
                <h4 className="principle-card-title">독소의 침투와 축적</h4>
              </div>
              <p className="principle-card-desc">
                지속적인 스트레스와 피로, 그리고 잘못된 생활습관이 신체 순환 장애를 유발하고 <strong>체내 열독과 노폐물</strong> 등의 유해 물질을 누적시켜 자연 정화 기능을 상실하게 만듭니다.
              </p>
            </div>

            <div className="principle-card">
              <div className="principle-header">
                <span className="principle-step-num">2</span>
                <h4 className="principle-card-title">자율신경계 과흥분</h4>
              </div>
              <p className="principle-card-desc">
                배출되지 못하고 고인 노폐물 독소들이 혈액을 타고 돌며 자율신경계 중 <strong>교감신경을 만성 과흥분 상태</strong>로 만들고, 땀샘에 과도한 발한 신호를 오작동으로 송신합니다.
              </p>
            </div>

            <div className="principle-card">
              <div className="principle-header">
                <span className="principle-step-num">3</span>
                <h4 className="principle-card-title">독소와 땀 분비의 비례</h4>
              </div>
              <p className="principle-card-desc">
                체내에 쌓인 잔류 독소량이 증가할수록 땀이 분비되는 면적이 전신으로 확장되고, 땀이 마르지 않는 지속 시간 및 발한 강도가 정비례하여 악화됩니다.
              </p>
            </div>

            <div className="principle-card">
              <div className="principle-header">
                <span className="principle-step-num">4</span>
                <h4 className="principle-card-title">삼위일체 배독치료</h4>
              </div>
              <p className="principle-card-desc">
                체질 맞춤 <strong>해독지한탕</strong>으로 속의 독소를 배출하고, 자율신경절 전도를 안정시키는 <strong>배독약침</strong>과 기혈 순환을 돕는 <strong>화주뜸</strong> 요법으로 독소를 청소합니다.
              </p>
            </div>

            <div className="principle-card">
              <div className="principle-header">
                <span className="principle-step-num">5</span>
                <h4 className="principle-card-title">치료와 예방의 역할 분담</h4>
              </div>
              <p className="principle-card-desc">
                한약과 약침, 화주뜸으로 몸속 독소의 80~90%를 제거해 땀샘을 복구하는 것은 <strong>한의사의 역할</strong>이며, 치료 후 바른 생활습관을 유지하는 것은 <strong>환자의 노력</strong>입니다.
              </p>
            </div>

            <div className="principle-card">
              <div className="principle-header">
                <span className="principle-step-num">6</span>
                <h4 className="principle-card-title">80/90 법칙 (치료 목표)</h4>
              </div>
              <p className="principle-card-desc">
                독소를 8~90% 정화해 내면 땀 분비 빈도가 60~90% 감소합니다. (예: 하루 10시간 흐르던 비정상적인 땀이 2시간 이내의 건강한 수준으로 축소됨을 직접 경험합니다).
              </p>
            </div>

            <div className="principle-card">
              <div className="principle-header">
                <span className="principle-step-num">7</span>
                <h4 className="principle-card-title">장기 뽀송함의 유지</h4>
              </div>
              <p className="principle-card-desc">
                체질 개선이 끝난 뒤에는 독소 자극 요인이 사라져 요요가 없습니다. 일상 중 <strong>연 5~8회 가벼운 배독 약침 관리</strong>를 병행하는 것으로 10년 이상 뽀송함 유지가 가능합니다.
              </p>
            </div>

            <div className="principle-card">
              <div className="principle-header">
                <span className="principle-step-num">8</span>
                <h4 className="principle-card-title">스트레스와 일시적 변동</h4>
              </div>
              <p className="principle-card-desc">
                치료 중 큰 일시적 스트레스(독감, 투자 실패, 이별, 법적 송사 등)를 만나면 땀이 잠시 늘 수 있으나, 독소 기저치가 낮아져 있으므로 스트레스가 진정되면 원래의 보송함으로 빠르게 복원됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Specialty-Specific Reviews Redirect */}
      <section className="section detail-reviews-section" style={{ textAlign: 'center', padding: '40px 0' }}>
        <div className="container">
          <h2 className="section-title">{specialty.title} 치료 이웃들의 생생한 후기</h2>
          <p style={{ marginBottom: '20px', color: 'var(--gray-600)' }}>더 많은 완치 사례와 친필 후기는 메인 화면의 '치료후기' 메뉴에서 확인하실 수 있습니다.</p>
          <button className="btn btn-primary" onClick={() => { onBack(); setTimeout(() => scrollToSection('reviews'), 100); }}>치료후기 게시판 바로가기</button>
        </div>
      </section>

      {/* High-Converting CTA Banner (결론: 여유로운 태도, 희소성) */}
      <section className="section-detail-cta">
        <div className="container">
          <div className="detail-cta-content">
            <div className="cta-cool-box">
              <p className="cta-cool-attitude">
                <strong>꼭 저희 경희정원한의원이 아니어도 좋습니다.</strong> 다만, 겉만 억지로 막아 다른 부위에 땀이 터지는 보상성 부작용이나 내성으로 평생 후회하지 마시고, 원인을 다스리는 치료를 제공하는 곳인지 꼼꼼히 비교해 보시길 진심으로 바랍니다.
              </p>
              <div className="cta-scarcity-box">
                📢 경희정원한의원은 의료진의 집중적인 치료와 깊이 있는 개별 심층 진료를 위해 <strong>하루 예약/상담 인원을 제한</strong>하고 있습니다. 예약이 조기 마감될 수 있는 점 양해 부탁드립니다.
              </div>
            </div>

            <h2>평생 땀샘을 억제하며 불편하게 사시겠습니까?<br />경희정원의 비움 요법으로 근본 원인을 해소하세요.</h2>
            <p>19년 임상 노하우와 900+ 다한증 치료 빅데이터로 증명된 비움과 채움의 자연 치유</p>
            <div className="detail-cta-btns">
              <button 
                className="btn btn-accent" 
                onClick={() => {
                  setBookingForm({ ...bookingForm, specialtyId: specialty.id });
                  setShowBookingModal(true);
                }}
              >
                네이버 실시간 예약
              </button>
              <button className="btn btn-outline-white" onClick={onBack}>
                전체 진료 목록 보기
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ==========================================================================
// ColumnPage Component (Medical Column Board and Detail view)
// ==========================================================================
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
  const [writeFormInput, setWriteFormInput] = useState({
    title: '',
    category: '의학 칼럼',
    summary: '',
    content: '',
    icon: '🔬',
    readTime: '3분'
  });

  const filteredColumns = columns.filter(col => 
    col.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    col.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      author: '대표원장 홍길동',
      readTime: writeFormInput.readTime,
      icon: writeFormInput.icon
    };

    setColumns([newColumn, ...columns]);
    setWriteFormInput({
      title: '',
      category: '의학 칼럼',
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

        {/* High-Converting CTA Banner */}
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
            <button className="btn btn-outline-white" onClick={onBack}>
              ← 메인 홈페이지
            </button>
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: 'var(--secondary-color)' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
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
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
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
                      <option value="의학 칼럼">의학 칼럼</option>
                      <option value="치료 정보">치료 정보</option>
                      <option value="한방 요법">한방 요법</option>
                      <option value="생활 가이드">생활 가이드</option>
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
                      <option value="🔥">🔥 화주뜸</option>
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
                      value="대표원장 홍길동"
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
                    placeholder="칼럼 본문 내용을 상세히 입력해 주세요."
                    value={writeFormInput.content}
                    onChange={(e) => setWriteFormInput({ ...writeFormInput, content: e.target.value })}
                    required
                  ></textarea>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                    칼럼 등록 완료
                  </button>
                  <button type="button" className="btn btn-outline" onClick={() => setShowWriteForm(false)}>
                    취소
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
