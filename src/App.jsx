import { useState, useEffect } from 'react';
import './App.css';
import { specialties, reviewsData } from './specialtyData';

function App() {
  // Navigation & Scroll
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fallback Scroll effect for interactive before/after compare (unsupported browsers)
  useEffect(() => {
    if (window.CSS && CSS.supports('animation-timeline', 'view()')) {
      return; // Use native CSS scroll-driven animations
    }

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
      
      element.style.setProperty('--scroll-progress', progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Modals state
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
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
  };

  // Nav click to open specialty details modal automatically
  const handleNavClick = (id) => {
    setIsMobileMenuOpen(false);
    scrollToSection('specialties');
    const specialty = specialties.find(s => s.id === id);
    if (specialty) {
      setTimeout(() => {
        setSelectedSpecialty(specialty);
      }, 500);
    }
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
        {/* HERO SECTION */}
        <section id="home" className="hero">
          <div className="container hero-grid">
            <div className="hero-content">
              <div className="hero-badge">
                <span>✦</span> 19년 해독 노하우와 900+ 다한증 치료 데이터의 가치
              </div>
              <h1 className="hero-title">
                평생 땀구멍만 막으실 겁니까?<br />
                원인을 비워내는 <span>경희정원 해독요법</span>
              </h1>
              <p className="hero-desc">
                일시적으로 땀을 억제하는 주사와 시술은 왜 결국 재발할까요? 교감신경을 만성적으로 자극하여 땀샘을 흔드는 진짜 원인인 '체내 독소'를 19년 임상 해독 노하우로 깨끗이 비워내어 평생 뽀송뽀송한 일상을 돌려드립니다.
              </p>
              <div className="hero-btns">
                <button className="btn btn-primary" onClick={() => setShowBookingModal(true)}>
                  네이버 간편예약
                </button>
                <button className="btn btn-outline" onClick={() => scrollToSection('reviews')}>
                  치료 후기 및 증명 보기
                </button>
              </div>
            </div>
            
            <div className="hero-visual">
              <div className="hero-circle-bg"></div>
              <div className="hero-card hero-card-1">
                <div className="hero-card-icon">💧</div>
                <h4 className="hero-card-title">교감신경 안정</h4>
                <p className="hero-card-desc">체내 독소 배출과 자율신경 안정을 유도해 땀샘 과자극을 근본적으로 해소합니다.</p>
              </div>
              <div className="hero-card hero-card-2">
                <div className="hero-card-icon">🔥</div>
                <h4 className="hero-card-title">독창적 화주뜸</h4>
                <p className="hero-card-desc">경희정원만의 특별한 수승화강 온열요법으로 머리와 상체에 쏠린 열독을 제어합니다.</p>
              </div>
            </div>
          </div>
        </section>

        {/* VALUE PROOF SECTION */}
        <section className="section-value-proof">
          <div className="container">
            <div className="value-proof-grid">
              <div className="value-proof-item">
                <div className="value-proof-num">19<span>년</span></div>
                <h4 className="value-proof-title">해독 임상 노하우</h4>
                <p className="value-proof-desc">3,800명 이상의 만성 난치병 환자를 치료하며 축적된 고유한 해독 기술력</p>
              </div>
              <div className="value-proof-item">
                <div className="value-proof-num">900<span>명+</span></div>
                <h4 className="value-proof-title">다한증 직접 치료 데이터</h4>
                <p className="value-proof-desc">전국 각지와 미국, 일본, 홍콩 등 해외에서 내원한 풍부한 임상 치료 사례</p>
              </div>
              <div className="value-proof-item">
                <div className="value-proof-num">공식<span>제휴</span></div>
                <h4 className="value-proof-title">땀쟁이들 카페 제휴의원</h4>
                <p className="value-proof-desc">대한민국 최대 다한증 환우 커뮤니티가 신뢰와 실력으로 인정한 의료기관</p>
              </div>
              <div className="value-proof-item">
                <div className="value-proof-num">10<span>년 이상</span></div>
                <h4 className="value-proof-title">장기 호전 유지 증명</h4>
                <p className="value-proof-desc">원인 제거 후 가벼운 예방 관리(연 5~8회)로 평생 재발 없이 뽀송함 유지</p>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE COMPARISON SECTION */}
        <section id="interactive-compare" className="section-compare">
          <div className="compare-sticky-wrapper">
            <div className="compare-container container">
              <div className="compare-text">
                <span className="section-badge">Before & After</span>
                <h2>경희정원 해독요법의 시각적 변화</h2>
                <div className="compare-label-wrapper">
                  <p className="compare-label-before">
                    <strong>[치료 전]</strong> 스트레스와 독소 누적으로 인해 교감신경이 비정상적으로 흥분된 상태입니다. 얼굴에는 열독이 쏠려 늘 상열감과 땀이 비 오듯 흐르며, 손과 발은 항상 축축하게 젖어 일상생활에 극심한 불편과 스트레스를 겪게 됩니다.
                  </p>
                  <p className="compare-label-after">
                    <strong>[치료 후]</strong> 체내의 근본 열독을 빼내는 맞춤형 해독 치료를 통해 자율신경계 균형이 복구됩니다. 얼굴의 열독이 내려가 맑고 건강한 표정을 되찾고, 손과 발의 비정상적인 땀샘 조절력이 복구되어 보송보송하고 쾌적한 일상으로 복귀합니다.
                  </p>
                </div>
              </div>
              <div className="compare-visual-box">
                <div className="compare-image-wrapper">
                  <img src="/before_treatment.jpg" alt="치료 전 상태" className="compare-img before" />
                  <img src="/after_treatment.jpg" alt="치료 후 상태" className="compare-img after" />
                </div>
                <div className="compare-indicator-bar">
                  <div className="compare-indicator-progress"></div>
                  <span className="compare-indicator-text">
                    스크롤을 천천히 내려서 치료 후 뽀송해지는 변화를 확인해 보세요 👇
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
              <span className="section-badge">Signature</span>
              <h2 className="section-title">정원 해독 요법</h2>
              <p className="section-desc">
                질병의 원인이 되는 노폐물을 비워 세포 재생력을 복원하고, 건강한 에너지를 채워 장기 기능의 면역 체계를 복구합니다.
              </p>
            </div>

            <div className="detox-grid">
              <div className="detox-card">
                <div className="detox-num">01</div>
                <h3 className="detox-card-title">비움 (Toxin Release)</h3>
                <p className="detox-card-desc">
                  체내 축적된 찌꺼기, 혈관 노폐물, 그리고 림프절에 쌓여 만성 소화불량 및 통증을 일으키는 원인 독소를 정화 처방을 통해 효과적으로 흘려보냅니다.
                </p>
              </div>
              <div className="detox-card">
                <div className="detox-num">02</div>
                <h3 className="detox-card-title">해독 (Cellular Detox)</h3>
                <p className="detox-card-desc">
                  혈액 순환을 활성화하고 세포의 활성산소를 억제하며 간 문맥 대사를 촉진하여 몸 속 깊은 장기의 독소까지 완전히 중화시키는 심층 해독 단계입니다.
                </p>
              </div>
              <div className="detox-card">
                <div className="detox-num">03</div>
                <h3 className="detox-card-title">채움 (Vital Restore)</h3>
                <p className="detox-card-desc">
                  깨끗해진 몸에 기혈 순환을 도울 양질의 영양과 기력을 공급합니다. 1:1 맞춤 청정 약재를 통해 소모된 부신 기능을 보강하고 영양 흡수력을 높입니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CLINIC SPECIALTIES SECTION */}
        <section id="specialties" className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-badge">Programs</span>
              <h2 className="section-title">정원 맞춤형 특화 진료</h2>
              <p className="section-desc">
                환자 개개인의 체질을 정확하게 감별하여 질병의 원인을 규명하고, 최상의 자연 치유 솔루션을 처방합니다.
              </p>
            </div>

            <div className="specialties-grid">
              {specialties.map((specialty) => (
                <div 
                  key={specialty.id} 
                  className="specialty-card"
                  onClick={() => setSelectedSpecialty(specialty)}
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
              <span className="section-badge">Truth & Q&A</span>
              <h2 className="section-title">다한증·해독 치료의 오해와 진실</h2>
              <p className="section-desc">
                내원을 망설이게 만드는 환자분들의 무의식적인 의심과 반박들을 19년 한의사의 양심으로 솔직하게 해소해 드립니다.
              </p>
            </div>

            <div className="faq-container">
              <div className={`faq-item ${openFaq === 0 ? 'active' : ''}`}>
                <div className="faq-question" onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}>
                  <span>Q. 다한증은 유전이라 완치가 불가능하지 않나요? 결국 또 재발할 텐데요.</span>
                  <span className="faq-icon">{openFaq === 0 ? '−' : '+'}</span>
                </div>
                <div className="faq-answer">
                  <p>
                    <strong>A. 맞습니다. 단순히 땀구멍만 일시적으로 지지거나 차단하는 대증 치료는 내성이 생겨 재발합니다.</strong>
                    <br /><br />
                    하지만 다한증의 진짜 원인은 피부나 땀샘이 아닙니다. 일상 스트레스와 생활 습관으로 인해 몸속 깊이 쌓인 <strong>'체내 독소'가 자율신경계 중 교감신경을 흥분</strong>시켜 땀샘을 자극하기 때문입니다.
                    <br /><br />
                    경희정원의 해독 치료는 이 독소를 비워내어 자율신경계 균형을 맞추는 근본 요법입니다. 6개월 집중 치료를 마친 뒤, 연 5~8회 가벼운 정기 내원 관리만으로 <strong>10년째 뽀송뽀송함을 변함없이 유지하고 있는 30대 남성 환자</strong>를 비롯한 수많은 장기 성공 사례가 이를 입증합니다.
                  </p>
                </div>
              </div>

              <div className={`faq-item ${openFaq === 1 ? 'active' : ''}`}>
                <div className="faq-question" onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}>
                  <span>Q. 다한증 수술을 했다가 다른 부위에 땀이 더 나는 '보상성 부작용'이 무섭습니다.</span>
                  <span className="faq-icon">{openFaq === 1 ? '−' : '+'}</span>
                </div>
                <div className="faq-answer">
                  <p>
                    <strong>A. 신경을 인위적으로 자르는 교감신경 절제술(ETS)은 보상성 다한증 부작용 확률이 매우 높습니다.</strong>
                    <br /><br />
                    경희정원한의원에서는 칼을 대거나 인위적으로 신경 통로를 차단하는 시술을 절대 하지 않습니다. 오직 100% 안전한 한방 해독 한약(해독지한탕), 소염 해독약침, 그리고 상열감을 내리는 화주뜸만을 결합하여 신체 자연 정화를 유도하므로 <strong>보상성 다한증 부작용이 발생할 확률이 0%</strong>입니다.
                    <br /><br />
                    오히려 타 병원에서 수술 부작용으로 가슴, 등, 엉덩이에 땀이 쏟아져 절망하다 내원하신 보상성 다한증 환자들도 본원의 해독 치료를 통해 90% 이상 크게 호전되었습니다.
                  </p>
                </div>
              </div>

              <div className={`faq-item ${openFaq === 2 ? 'active' : ''}`}>
                <div className="faq-question" onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}>
                  <span>Q. 한의원 해독 치료는 너무 오래 걸리고 비용 부담이 있지 않나요?</span>
                  <span className="faq-icon">{openFaq === 2 ? '−' : '+'}</span>
                </div>
                <div className="faq-answer">
                  <p>
                    <strong>A. 매년 내성이 생기는 임시방편 시술 비용과 정신적 고통을 생각하신다면, 오히려 가장 비용을 아끼는 선택입니다.</strong>
                    <br /><br />
                    주기적으로 맞아야 하는 보톡스 주사, 드리클로, 이온영동기 사용은 땀샘 조절력을 약화시키고 피부염을 유발하며 평생 비용이 지출됩니다.
                    <br /><br />
                    경희정원에서는 6개월 동안 원인 독소를 근본적으로 정화하여 땀을 제어하는 몸을 만들고, 그 이후에는 연 5~8회 가벼운 유지 관리만 진행하므로 장기적인 의료비 지출과 삶의 질 측면에서 비교할 수 없을 정도로 훨씬 합리적이고 안전한 평생 예방 투자입니다.
                  </p>
                </div>
              </div>
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
              <span className="booking-subtitle">Directions & Booking</span>
              <h2 className="booking-title">오시는 길 & 진료 예약</h2>
              <p className="booking-desc">
                정원 한의원은 예약을 통해 환자 한 분 한 분께 정성을 다해 깊이 있는 진료를 드립니다. 아래 약도를 참조하셔서 내원해 주시기 바랍니다.
              </p>

              <div className="booking-contact-list">
                <div className="booking-contact-item">
                  <div className="booking-contact-icon">📍</div>
                  <div>
                    <h4 className="booking-contact-title">주소</h4>
                    <p className="booking-contact-value">서울특별시 마포구 마포대로 123, 정원빌딩 3층 (공덕역 4번 출구에서 150m)</p>
                  </div>
                </div>
                <div className="booking-contact-item">
                  <div className="booking-contact-icon">📞</div>
                  <div>
                    <h4 className="booking-contact-title">대표 번호</h4>
                    <p className="booking-contact-value">02-123-4567 (상담 및 내원 예약 안내)</p>
                  </div>
                </div>
                <div className="booking-contact-item">
                  <div className="booking-contact-icon">🕒</div>
                  <div>
                    <h4 className="booking-contact-title">진료 시간</h4>
                    <p className="booking-contact-value">
                      평일: 09:30 - 19:00 (점심시간 13:00 - 14:00)<br />
                      토요일: 09:30 - 14:30 (점심시간 없이 진료)<br />
                      일요일 & 공휴일: 휴진
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
                전통 한의학에 과학적인 진단을 더하여 몸의 조화를 되찾고 자생력을 깨워 건강을 돌려드립니다.
              </p>
              <div className="footer-socials">
                <a href="#naver" className="social-circle">N</a>
                <a href="#talk" className="social-circle">K</a>
                <a href="#insta" className="social-circle">I</a>
                <a href="#blog" className="social-circle">B</a>
              </div>
            </div>

            <div className="footer-col" style={{ textAlign: 'left' }}>
              <h4>진료 안내</h4>
              <ul className="footer-hours-list">
                <li><span>평일 (월~금)</span> <span>09:30 - 19:00</span></li>
                <li><span>토요일</span> <span>09:30 - 14:30</span></li>
                <li><span>점심 시간</span> <span>13:00 - 14:00 (토요일은 없음)</span></li>
                <li><span>일요일 · 공휴일</span> <span style={{ color: 'var(--accent-color)', fontWeight: '600' }}>휴진</span></li>
              </ul>
            </div>

            <div className="footer-col" style={{ textAlign: 'left' }}>
              <h4>한의원 정보</h4>
              <p className="footer-address">
                상호명: 정원 한의원<br />
                대표원장: 홍길동 | 사업자번호: 123-45-67890<br />
                의료기관개설허가번호: 제 1234호<br />
                TEL: 02-123-4567 | FAX: 02-123-4568
              </p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 Jeongwon Korean Medicine Clinic. All Rights Reserved.</p>
            <p>본 사이트는 환자분들의 편의를 위해 제작된 데모 페이지입니다.</p>
          </div>
        </div>
      </footer>

      {/* SPECIALTY DETAILS MODAL */}
      {selectedSpecialty && (
        <div className="modal-overlay" onClick={() => setSelectedSpecialty(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedSpecialty(null)}>×</button>
            <div className="modal-header">
              <div className="modal-icon">{selectedSpecialty.icon}</div>
              <div className="modal-subtitle">{selectedSpecialty.subtitle}</div>
              <h2 className="modal-title">{selectedSpecialty.title}</h2>
            </div>
            <div className="modal-body">
              <p className="modal-summary">{selectedSpecialty.summary}</p>
              
              <h4 className="modal-section-title">정원 특화 치료 프로세스</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
                {selectedSpecialty.details.map((detail, idx) => (
                  <div key={idx} className="modal-detail-item">
                    <h5 className="modal-detail-title">{detail.title}</h5>
                    <p className="modal-detail-desc">{detail.desc}</p>
                  </div>
                ))}
              </div>

              <h4 className="modal-section-title">주요 치료 대상</h4>
              <div className="modal-tag-list">
                {selectedSpecialty.target.map((t, idx) => (
                  <span key={idx} className="modal-tag">✓ {t}</span>
                ))}
              </div>
            </div>
            <div className="modal-actions">
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setBookingForm({ ...bookingForm, specialtyId: selectedSpecialty.id });
                  setSelectedSpecialty(null);
                  setShowBookingModal(true);
                }}
              >
                이 진료과목 예약신청
              </button>
              <button className="btn btn-outline" onClick={() => setSelectedSpecialty(null)}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

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

export default App;
