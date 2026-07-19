import { useState, useEffect } from 'react';
import './App.css';
import { specialties, reviewsData } from './specialtyData';
import { defaultColumns } from './columnData';
import { textContent } from './textContent';

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
            <img src="/logo.png" alt="경희정원한의원 로고" style={{ height: '55px', width: 'auto', objectFit: 'contain' }} />
          </a>

          <nav className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            <a 
              href="#specialties" 
              className={`nav-link ${activeSection === 'specialties' && !selectedSpecialty ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); scrollToSection('specialties'); }}
            >
              다한증
            </a>
            <a 
              href="#sujok" 
              className="nav-link"
              onClick={(e) => { e.preventDefault(); handleNavClick('sujok'); }}
            >
              수족다한증
            </a>
            <a 
              href="#duhan" 
              className="nav-link"
              onClick={(e) => { e.preventDefault(); handleNavClick('duhan'); }}
            >
              두한증
            </a>
            <a 
              href="#anmyeon" 
              className="nav-link"
              onClick={(e) => { e.preventDefault(); handleNavClick('anmyeon'); }}
            >
              안면다한증
            </a>
            <a 
              href="#sangche" 
              className="nav-link"
              onClick={(e) => { e.preventDefault(); handleNavClick('sangche'); }}
            >
              상체다한증
            </a>
            <a 
              href="#hache" 
              className="nav-link"
              onClick={(e) => { e.preventDefault(); handleNavClick('hache'); }}
            >
              하체다한증
            </a>
            <a 
              href="#jeonsin" 
              className="nav-link"
              onClick={(e) => { e.preventDefault(); handleNavClick('jeonsin'); }}
            >
              전신다한증
            </a>
            <a 
              href="#bosangseong" 
              className="nav-link"
              onClick={(e) => { e.preventDefault(); handleNavClick('bosangseong'); }}
            >
              보상성 다한증
            </a>
            <a 
              href="#columns" 
              className={`nav-link ${isColumnPage ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleColumnPageClick(); }}
            >
              다한증 칼럼
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
              오시는길
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
            <div className="section-header">
              <span className="section-badge">{textContent.detox.badge}</span>
              <h2>{textContent.detox.title}</h2>
              <p className="section-desc">
                {textContent.detox.desc}
              </p>
            </div>

            <div className="detox-grid">
              <div className="detox-card">
                <div className="detox-num">{textContent.detox.card1Num}</div>
                <h3 className="detox-card-title">{textContent.detox.card1Title}</h3>
                <p className="detox-card-desc">
                  {textContent.detox.card1Desc}
                </p>
              </div>
              <div className="detox-card">
                <div className="detox-num">{textContent.detox.card2Num}</div>
                <h3 className="detox-card-title">{textContent.detox.card2Title}</h3>
                <p className="detox-card-desc">
                  {textContent.detox.card2Desc}
                </p>
              </div>
              <div className="detox-card">
                <div className="detox-num">{textContent.detox.card3Num}</div>
                <h3 className="detox-card-title">{textContent.detox.card3Title}</h3>
                <p className="detox-card-desc">
                  {textContent.detox.card3Desc}
                </p>
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
              <h3 style={{ marginBottom: '24px', textAlign: 'center' }}>간편 상담 및 진료 상담 신청</h3>
              <form onSubmit={handleBookingSubmit}>
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
                  <div className="modal-content text-center" onClick={(e) => e.stopPropagation()}>
                    <div className="booking-success-icon" style={{ fontSize: '4.5rem' }}>🍃</div>
                    <h2 className="modal-title" style={{ marginBottom: '16px' }}>상담 신청 접수 완료</h2>
                    <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '32px', lineHeight: '1.6' }}>
                      <strong>{bookingForm.name}</strong> 환자님의 소중한 상담 신청이 전달되었습니다.<br />
                      기재해 주신 연락처(<strong>{bookingForm.tel}</strong>)로 신속히 연락해 드리겠습니다.
                    </p>
                    <button className="btn btn-primary" onClick={resetBookingForm}>
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
                <img src="/logo.png" alt="경희정원한의원 로고" style={{ height: '45px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
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
              <h2 className="modal-title" style={{ fontSize: '1.8rem' }}>네이버 실시간 예약</h2>
            </div>
            
            {bookingSuccess ? (
              <div className="booking-success">
                <div className="booking-success-icon">🍀</div>
                <h3 className="modal-title" style={{ fontSize: '1.5rem', marginBottom: '8px' }}>네이버 예약 신청 완료</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
                  <strong>{bookingForm.name}</strong> 환자님의 예약 신청서가 접수되었습니다.<br />
                  예약 일시: <strong>{bookingForm.date} {bookingForm.time}</strong><br />
                  진료 과목: <strong>{getSpecialtyName(bookingForm.specialtyId)}</strong><br />
                  <span style={{ display: 'block', marginTop: '12px', fontSize: '0.85rem', color: '#03C75A' }}>
                    * 네이버 알림/알림톡을 통해 확정 메시지가 5분 이내에 발송됩니다.
                  </span>
                </p>
                <button className="btn btn-primary" onClick={resetBookingForm}>
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
              <p className="detail-desc">{specialty.summary}</p>
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

      {/* Cause & Treatment Process */}
      <section className="section detail-treatment-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Treatment Program</span>
            <h2 className="section-title">정원 {specialty.title} 해독 치료법</h2>
            <p className="section-desc">
              단순히 땀을 억제하는 임시조치가 아닌, 내부 열독을 다스리고 자율신경 균형을 회복하는 근본 솔루션입니다.
            </p>
          </div>

          <div className="treatment-process-list">
            {specialty.details.map((detail, idx) => (
              <div key={idx} className="treatment-process-card">
                <div className="process-number">0{idx + 1}</div>
                <div className="process-content">
                  <h3 className="process-card-title">{detail.title}</h3>
                  <p className="process-card-desc">{detail.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Symptoms */}
      <section className="section section-alt detail-target-section">
        <div className="container">
          <div className="detail-target-grid">
            <div className="detail-target-text">
              <span className="section-badge">Diagnosis</span>
              <h2 className="section-title" style={{ textAlign: 'left' }}>이런 증상으로 고통받고 계시다면 치료 대상입니다</h2>
              <p className="section-desc" style={{ textAlign: 'left', marginLeft: 0 }}>
                다한증은 방치할수록 만성 피로와 피부염, 대인 기피증으로 이어지기 쉽습니다. 아래 항목 중 해당되는 부분이 있다면 신속한 해독 치료가 필요합니다.
              </p>
            </div>
            <div className="detail-target-cards">
              {specialty.target.map((t, idx) => (
                <div key={idx} className="target-item-card">
                  <span className="target-check">✓</span>
                  <p>{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Specialty-Specific Reviews */}
      <section className="section detail-reviews-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Success Stories</span>
            <h2 className="section-title">{specialty.title} 치료 이웃들의 후기</h2>
            <p className="section-desc">
              동일한 증상으로 고민하다 보송한 일상을 되찾으신 분들의 생생한 친필 치료 사례입니다.
            </p>
          </div>

          {conditionReviews.length > 0 ? (
            <div className="reviews-grid">
              {conditionReviews.map(review => (
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
          ) : (
            <div className="no-reviews-card">
              <p>아직 해당 부위 집중 후기가 등록되지 않았습니다.<br />전체 후기 게시판을 확인하시거나 내원 시 더 많은 친필 사례집을 열람하실 수 있습니다.</p>
              <button className="btn btn-outline" onClick={onBack}>전체 치료후기 보러가기</button>
            </div>
          )}
        </div>
      </section>

      {/* High-Converting CTA Banner */}
      <section className="section-detail-cta">
        <div className="container">
          <div className="detail-cta-content">
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
