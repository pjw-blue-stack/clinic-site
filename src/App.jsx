import { useState, useEffect } from 'react';
import './App.css';
import { specialties, reviewsData } from './specialtyData';
import { defaultColumns } from './columnData';
import { textContent } from './textContent';
import SelfCheckPage from './SelfCheckPage';
// 구글폼 사전 설문지 URL (노쇼 방지용)
const PRE_CONSULTATION_FORM_URL = "https://forms.gle/zFfy9MMUtm9tCZ9Z7";

const DirectorProfile = () => (
  <div className="director-profile-card" style={{ padding: '30px', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
    <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      {/* 사진 및 배지 영역 */}
      <div style={{ flex: '1 1 240px', minWidth: '240px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100%', aspectRatio: '3/4', backgroundColor: '#f0f4f8', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem', marginBottom: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
           👨‍⚕️
        </div>
        <div style={{ textAlign: 'center', color: 'var(--text-main)', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '4px' }}>박제욱 대표원장</h3>
          <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>경희대 한의과대학 졸 / 경희의료원 수련의</p>
        </div>
        <div className="authority-badge-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', width: '100%' }}>
          <div className="authority-badge-card" style={{ padding: '12px 8px', textAlign: 'center', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <span style={{ display: 'block', fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--primary-color)', marginBottom: '4px' }}>19년</span>
            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-light)' }}>임상 진료 경력</span>
          </div>
          <div className="authority-badge-card" style={{ padding: '12px 8px', textAlign: 'center', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <span style={{ display: 'block', fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--primary-color)', marginBottom: '4px' }}>3,800+</span>
            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-light)' }}>만성병 완치</span>
          </div>
          <div className="authority-badge-card" style={{ padding: '12px 8px', textAlign: 'center', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <span style={{ display: 'block', fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--primary-color)', marginBottom: '4px' }}>900+</span>
            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-light)' }}>다한증 직접 진료</span>
          </div>
          <div className="authority-badge-card" style={{ padding: '12px 8px', textAlign: 'center', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <span style={{ display: 'block', fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--primary-color)', marginBottom: '4px' }}>13,200제</span>
            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-light)' }}>맞춤 해독 처방</span>
          </div>
        </div>
      </div>

      {/* 약력 및 이력 영역 */}
      <div style={{ flex: '2 1 300px', minWidth: '300px' }}>
        <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-main)', borderBottom: '2px solid var(--accent-color)', paddingBottom: '8px', marginBottom: '16px', display: 'inline-block' }}>약력 및 이력</h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: '1fr', gap: '10px', color: 'var(--text-light)', fontSize: '0.95rem', lineHeight: '1.5' }}>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}><span style={{ color: 'var(--accent-color)' }}>•</span> 경희대학교 한의과대학 졸업</li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}><span style={{ color: 'var(--accent-color)' }}>•</span> 경희의료원 본원 일반수련의 수료</li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}><span style={{ color: 'var(--accent-color)' }}>•</span> 남원시 보건소 한방 진료 과장</li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}><span style={{ color: 'var(--accent-color)' }}>•</span> 전) 경희대학교 한의대 외래 강사</li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}><span style={{ color: 'var(--accent-color)' }}>•</span> 한의학 연구원 침구치료 기술조사단 단원</li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}><span style={{ color: 'var(--accent-color)' }}>•</span> Kinesio Taping Supremacy Master Course 수료</li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}><span style={{ color: 'var(--accent-color)' }}>•</span> 대한 한방 비만 학회 회원</li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}><span style={{ color: 'var(--accent-color)' }}>•</span> 시리아스 정형의학 연구회 회원</li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}><span style={{ color: 'var(--accent-color)' }}>•</span> 척추 추나학회 학술 부장</li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}><span style={{ color: 'var(--accent-color)' }}>•</span> 네이버 지식in 상담 한의사</li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}><span style={{ color: 'var(--accent-color)' }}>•</span> 중국동포 진료소 봉사진료</li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}><span style={{ color: 'var(--accent-color)' }}>•</span> 전) 경희 대성 한의원 대표 원장</li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}><span style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>•</span> <strong style={{ color: 'var(--text-main)' }}>현) 경희 정원 한의원 대표 원장 (목동 14년차)</strong></li>
        </ul>
        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: 'rgba(212, 175, 55, 0.08)', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#b58e2a', letterSpacing: '-0.5px' }}>
            "치료 결과로 보답해드리겠습니다."
          </p>
        </div>
      </div>
    </div>
  </div>
);

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

  // URL Parameter Detection for micro-landing page support (Naver Ads) and refresh preservation
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let specId = params.get('specialty');
    let pageId = params.get('page');
    
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
    } else if (pageId) {
      if (pageId === 'column') setIsColumnPage(true);
      else if (pageId === 'review') setIsReviewPage(true);
      else if (pageId === 'clinic') setIsClinicPage(true);
      else if (pageId === 'detox') setIsDetoxPage(true);
      else if (pageId === 'selfcheck') setIsSelfCheckPage(true);
      window.scrollTo(0, 0);
    }
  }, []);

  // Modals state
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [columns, setColumns] = useState(defaultColumns);
  const [isColumnPage, setIsColumnPage] = useState(false);
  const [isReviewPage, setIsReviewPage] = useState(false);
  const [isClinicPage, setIsClinicPage] = useState(false);
  const [isDetoxPage, setIsDetoxPage] = useState(false);
  const [isSelfCheckPage, setIsSelfCheckPage] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [showWriteForm, setShowWriteForm] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Sync state to URL for page refreshes
  useEffect(() => {
    if (selectedSpecialty) {
      window.history.replaceState({}, '', `?specialty=${selectedSpecialty.id}`);
    } else if (isColumnPage) {
      window.history.replaceState({}, '', `?page=column`);
    } else if (isReviewPage) {
      window.history.replaceState({}, '', `?page=review`);
    } else if (isClinicPage) {
      window.history.replaceState({}, '', `?page=clinic`);
    } else if (isDetoxPage) {
      window.history.replaceState({}, '', `?page=detox`);
    } else if (isSelfCheckPage) {
      window.history.replaceState({}, '', `?page=selfcheck`);
    } else {
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [selectedSpecialty, isColumnPage, isReviewPage, isClinicPage, isDetoxPage, isSelfCheckPage]);

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
    setSelectedSpecialty(null); 
    setIsColumnPage(false);
    setSelectedColumn(null);
    setIsReviewPage(false);
    setIsClinicPage(false);
    setIsDetoxPage(false);
    setIsSelfCheckPage(false);
    
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
    setIsSelfCheckPage(false);
    setIsReviewPage(false);
    setIsClinicPage(false);
    setIsDetoxPage(false);
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
    setIsSelfCheckPage(false);
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
              className={`nav-link ${isDetoxPage ? 'active' : ''}`}
              onClick={(e) => { 
                e.preventDefault(); 
                setIsMobileMenuOpen(false);
                setSelectedSpecialty(null);
                setIsColumnPage(false);
                setSelectedColumn(null);
                setIsReviewPage(false);
                setIsClinicPage(false);
                setIsSelfCheckPage(false);
                setIsDetoxPage(true);
                window.scrollTo(0, 0); 
              }}
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
              href="#selfcheck" 
              className={`nav-link ${isSelfCheckPage ? 'active' : ''}`}
              onClick={(e) => { 
                e.preventDefault(); 
                setIsMobileMenuOpen(false);
                setSelectedSpecialty(null);
                setIsColumnPage(false);
                setSelectedColumn(null);
                setIsReviewPage(false);
                setIsClinicPage(false);
                setIsDetoxPage(false);
                setIsSelfCheckPage(true);
                window.scrollTo(0, 0); 
              }}
            >
              AI 자가진단
            </a>
            <a 
              href="#reviews" 
              className={`nav-link ${isReviewPage ? 'active' : ''}`}
              onClick={(e) => { 
                e.preventDefault(); 
                setIsMobileMenuOpen(false);
                setSelectedSpecialty(null);
                setIsColumnPage(false);
                setSelectedColumn(null);
                setIsClinicPage(false);
                setIsDetoxPage(false);
                setIsSelfCheckPage(false);
                setIsReviewPage(true);
                window.scrollTo(0, 0); 
              }}
            >
              치료후기
            </a>
            <a 
              href="#booking" 
              className={`nav-link ${isClinicPage ? 'active' : ''}`}
              onClick={(e) => { 
                e.preventDefault(); 
                setIsMobileMenuOpen(false);
                setSelectedSpecialty(null);
                setIsColumnPage(false);
                setSelectedColumn(null);
                setIsReviewPage(false);
                setIsDetoxPage(false);
                setIsSelfCheckPage(false);
                setIsClinicPage(true);
                window.scrollTo(0, 0); 
              }}
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
            key={selectedSpecialty.id}
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
                ) : isClinicPage ? (
          <div className="clinic-page-wrapper six-step-funnel">
            {/* 1. 원장 철학 (가치 입증 & 공감) */}
            <section className="funnel-section section-problem">
              <div className="container">
                <span className="step-badge">STEP 1. 진정성</span>
                <h2 className="funnel-title">땀구멍을 막는 의사가 아닌, 불을 끄는 의사 박제욱입니다.</h2>
                <h3 className="funnel-copy">"19년 전, 다한증 환자의 눈물을 보고 해독 요법을 시작했습니다."</h3>
                <p className="funnel-desc">단순히 증상만 덮어두고 평생 약을 달고 살게 하는 것은 진정한 의술이 아니라고 믿습니다.</p>
              </div>
            </section>

            {/* 2. 핵심 차별성 (권위) */}
            <section className="funnel-section section-authority">
              <div className="container">
                <span className="step-badge">STEP 2. 신뢰의 증명</span>
                <h2 className="funnel-title">수많은 환자가 돌고 돌아 경희정원을 찾는 이유</h2>
                <h3 className="funnel-copy">최후의 보루, 13,200제 이상의 맞춤 해독 처방</h3>
                <p className="funnel-desc">수술 부작용, 보톡스 내성으로 고통받던 분들이 마침내 정착하는 곳입니다.</p>
                <div style={{ marginTop: '40px' }}>
                  <DirectorProfile />
                </div>
              </div>
            </section>

            {/* 3. 진료 환경 (공감 & 패러다임) */}
            <section className="funnel-section section-shift">
              <div className="container">
                <span className="step-badge">STEP 3. 안심 진료</span>
                <h2 className="funnel-title">대인기피증 환자도 안심하는 1:1 프라이빗 진료실</h2>
                <h3 className="funnel-copy">"누구와도 마주치지 않게, 당신의 이야기를 깊이 듣습니다."</h3>
                <p className="funnel-desc">공장형 진료가 아닙니다. 하루 제한된 인원만 예약받아 충분한 상담을 진행합니다.</p>
              </div>
            </section>

            {/* 4. 투명성 (솔루션 신뢰) */}
            <section className="funnel-section section-solution">
              <div className="container">
                <span className="step-badge">STEP 4. 투명한 약재</span>
                <h2 className="funnel-title">"내 가족이 먹을 수 없다면 달이지 않습니다"</h2>
                <h3 className="funnel-copy">오픈 조제실과 식약처 인증 청정 한약재</h3>
                <p className="funnel-desc">환자분이 직접 볼 수 있는 원내 조제실에서 가장 깨끗한 약재만을 고집합니다.</p>
              </div>
            </section>

            {/* 5. 반박 제거 (FAQ) */}
            <section className="funnel-section section-objection">
              <div className="container">
                <span className="step-badge">STEP 5. 팩트 체크</span>
                <h2 className="funnel-title">한약 먹으면 간 나빠진다?</h2>
                <h3 className="funnel-copy">속을 씻어내는 독소 0% 정화 한약의 진실</h3>
                <div className="faq-accordion" style={{ marginTop: '30px' }}>
                  <div className="faq-item active">
                    <div className="faq-question">
                      <span className="faq-q-icon">Q.</span>
                      <h4>한약을 장기 복용해도 간이나 신장에 무리가 없나요?</h4>
                    </div>
                    <div className="faq-answer">
                      <span className="faq-a-icon">A.</span>
                      <p>경희정원의 해독탕은 오히려 간과 신장의 독소를 빼내어 수치를 정상화시키는 '청열해독' 처방입니다. 정기적인 혈액 검사 데이터가 그 안전성을 증명합니다.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 6. 정보 & 행동 유도 */}
            <section className="funnel-section section-cta">
              <div className="container">
                <span className="step-badge">STEP 6. 오시는 길</span>
                <h2 className="funnel-title">경희정원한의원 오시는 길</h2>
                <h3 className="funnel-copy">서울특별시 양천구 오목로 344 (목동, 청학빌딩) 2층</h3>
                
                <div className="cta-action-box" style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '30px' }}>
                  <button 
                    className="btn btn-accent btn-large" 
                    onClick={() => {
                      setBookingForm({ ...bookingForm, specialtyId: 'detox' });
                      setShowBookingModal(true);
                    }}
                  >
                    네이버 실시간 예약
                  </button>
                  <a href="tel:02-2649-7582" className="btn btn-outline" style={{ fontSize: '1.2rem', padding: '15px 40px' }}>
                    📞 02-2649-7582
                  </a>
                </div>
              </div>
            </section>
          </div>
        ) : isSelfCheckPage ? (
          <div className="self-check-page-wrapper" style={{ paddingTop: '100px', backgroundColor: '#f0f4f8' }}>
            <SelfCheckPage onComplete={() => {}} />
          </div>
        ) : isReviewPage ? (
          <div className="review-page-wrapper six-step-funnel">
            {/* 1. 가치 입증 */}
            <section className="funnel-section section-authority">
              <div className="container">
                <span className="step-badge">STEP 1. 압도적 결과</span>
                <h2 className="funnel-title">14년, 3,800개의 리얼 데이터가 증명합니다.</h2>
                <h3 className="funnel-copy">더 이상 치료를 포기하지 마세요.</h3>
                <p className="funnel-desc">수많은 환자분들이 이미 쾌적한 일상을 되찾았습니다.</p>
              </div>
            </section>

            {/* 2 & 3. 리얼리티 증명 및 분류/검색 */}
            <section className="funnel-section section-problem">
              <div className="container">
                <span className="step-badge">STEP 2. 100% 자필 후기</span>
                <h2 className="funnel-title">나와 똑같은 부위의 후기를 확인하세요.</h2>
                <div className="reviews-filters" style={{ marginTop: '30px', justifyContent: 'center' }}>
                  <button 
                    className={`filter-btn ${filterSpecialty === 'all' ? 'active' : ''}`}
                    onClick={() => setFilterSpecialty('all')}
                  >전체</button>
                  {specialties.map(spec => (
                    <button key={spec.id} className={`filter-btn ${filterSpecialty === spec.id ? 'active' : ''}`} onClick={() => setFilterSpecialty(spec.id)}>
                      {spec.title}
                    </button>
                  ))}
                </div>
                
                {/* 5. 의료법 준수 로그인 게시판 (반박 제거) */}
                <div className="reviews-grid" style={{ marginTop: '40px' }}>
                  {!loggedInUser ? (
                    <div className="no-reviews-card" style={{ margin: '0 auto' }}>
                      <span style={{ fontSize: '3rem' }}>🔒</span>
                      <h3>의료법 제56조에 의거, 치료 후기는 로그인 후 열람하실 수 있습니다.</h3>
                      <p>환자분들의 소중한 개인정보와 100% 진실된 후기를 보호하기 위함입니다.</p>
                      <button className="btn btn-accent" onClick={() => setShowLoginModal(true)}>1초 간편 로그인하고 후기 보기</button>
                    </div>
                  ) : (
                    reviews
                      .filter(review => filterSpecialty === 'all' || review.specialtyId === filterSpecialty)
                      .map(review => (
                        <div key={review.id} className="review-card" style={{ textAlign: 'left' }}>
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
                      ))
                  )}
                </div>
              </div>
            </section>

            {/* 4. 장기 유지 증명 */}
            <section className="funnel-section section-shift">
              <div className="container">
                <span className="step-badge">STEP 3. 장기 추적 데이터</span>
                <h2 className="funnel-title">1년이 아니라 '10년 후'에도 요요가 없어야 합니다.</h2>
                <h3 className="funnel-copy">"치료 종결 5년 차 환자 인터뷰"</h3>
                <p className="funnel-desc">일시적으로 땀구멍만 막는 치료는 반드시 재발합니다. 체질 자체가 변한 환자들의 장기 유지 데이터를 확인하세요.</p>
              </div>
            </section>

            {/* 6. 행동 유도 */}
            <section className="funnel-section section-cta">
              <div className="container">
                <span className="step-badge">STEP 4. 새로운 시작</span>
                <h2 className="funnel-title">이제 당신이 주인공이 될 차례입니다.</h2>
                <h3 className="funnel-copy">수백 개의 후기 다음 칸은, 바로 환자님의 자리입니다.</h3>
                <div className="cta-action-box">
                  <button className="btn btn-accent btn-large" onClick={() => setShowBookingModal(true)}>
                    원장님 1:1 상담 예약
                  </button>
                </div>
              </div>
            </section>
          </div>
        ) : isDetoxPage ? (
          <div className="detox-page" style={{ paddingTop: '40px' }}>
            {/* DETOX HERO SECTION */}
            <section className="hero" style={{ paddingTop: '80px', paddingBottom: '60px', backgroundColor: 'var(--bg-color)' }}>
              <div className="container hero-grid" style={{ minHeight: 'auto', alignItems: 'center' }}>
                <div className="hero-content">
                  <div className="hero-badge" style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)', color: '#b58e2a' }}>
                    <span>🌿</span> {textContent.detoxHero.badge}
                  </div>
                  <h1 className="hero-title" style={{ whiteSpace: 'pre-wrap', color: 'var(--accent-color)' }}>
                    {textContent.detoxHero.title}
                  </h1>
                  <p className="hero-desc" style={{ fontSize: '1.1rem' }}>
                    {textContent.detoxHero.desc}
                  </p>
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


        {/* DETOX GRAPHS SECTION */}
        <section id="detox-graphs" className="section" style={{ backgroundColor: '#fff' }}>
          <div className="container">
            <div className="section-header" style={{ marginBottom: '40px' }}>
              <span className="section-badge">{textContent.detoxGraphs.badge}</span>
              <h2>{textContent.detoxGraphs.title}</h2>
              <p className="section-desc" style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.7', fontSize: '1.05rem', color: '#555' }}>
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
              <DirectorProfile />
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

          </div>
        ) : (
          <>
            {/* HERO SECTION */}
        <section id="home" className="hero">
          <div className="container hero-grid">
            <div className="hero-content">
              <div className="hero-badge">
                <span>✦</span> {textContent.mainHero.badge}
              </div>
              <h1 className="hero-title" style={{ whiteSpace: 'pre-wrap' }}>
                {textContent.mainHero.title}
              </h1>
              <p className="hero-desc">
                {textContent.mainHero.desc}
              </p>
              <div className="hero-btns">
                <button className="btn btn-primary" onClick={() => setShowBookingModal(true)}>
                  {textContent.mainHero.btnBooking}
                </button>
                <button className="btn btn-outline" onClick={() => {
                  setSelectedSpecialty(null);
                  setIsColumnPage(false);
                  setSelectedColumn(null);
                  setIsClinicPage(false);
                  setIsDetoxPage(false);
                  setIsReviewPage(true);
                  window.scrollTo(0, 0);
                }}>
                  {textContent.mainHero.btnReviews}
                </button>
              </div>
            </div>
            
            <div className="hero-visual">
              <div className="hero-circle-bg"></div>
              <div className="hero-card hero-card-1">
                <div className="hero-card-icon">💧</div>
                <h4 className="hero-card-title">{textContent.mainHero.card1Title}</h4>
                <p className="hero-card-desc">{textContent.mainHero.card1Desc}</p>
              </div>
              <div className="hero-card hero-card-2">
                <div className="hero-card-icon">🧠</div>
                <h4 className="hero-card-title">{textContent.mainHero.card2Title}</h4>
                <p className="hero-card-desc">{textContent.mainHero.card2Desc}</p>
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

      {/* Floating Quick Menu (하단 고정 퀵메뉴) */}
      <div className="floating-quick-menu">
        <a href="tel:02-2649-7582" className="quick-menu-item quick-menu-call">
          <span className="quick-icon">📞</span>
          <span className="quick-text">전화상담</span>
        </a>
        <a href="https://pf.kakao.com/_yKxcUxl" target="_blank" rel="noreferrer" className="quick-menu-item quick-menu-kakao">
          <span className="quick-icon">💬</span>
          <span className="quick-text">카톡상담</span>
        </a>
        <button className="quick-menu-item quick-menu-naver" onClick={() => setShowBookingModal(true)}>
          <span className="quick-icon">📅</span>
          <span className="quick-text">네이버예약</span>
        </button>
      </div>
    </>
  );
}

// ==========================================================================
// SpecialtyDetailPage Component (Detailed landing page for condition subtypes)
// ==========================================================================
function SpecialtyDetailPage({ specialty, onBack, reviews, getSpecialtyName, setShowBookingModal, setBookingForm, bookingForm }) {
  // Tab State for Head/Face/Both sweat condition (du-myeon)
  const [activeTab, setActiveTab] = useState('both');

  // Multi-select State for Upper Body Sweat (sangche)
  const [selectedParts, setSelectedParts] = useState(['head']);

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

  // FAQ toggle state
  const [openFaq, setOpenFaq] = useState(null);

  if (!specialty || !specialty.sixSteps) return null;

  // Determine current active content (tabs & multi-select parts support)
  let currentSummary = specialty.summary;
  let currentDetails = specialty.details;

  if ((specialty.id === 'du-myeon' || specialty.id === 'sujok') && specialty.tabs) {
    const tabData = specialty.tabs[activeTab] || specialty.tabs['both'];
    if (tabData) {
      currentSummary = tabData.summary;
      currentDetails = tabData.details;
    }
  } else if (specialty.id === 'sangche' && specialty.parts) {
    const partNames = selectedParts.map(p => specialty.parts[p]?.name).join(', ');
    currentSummary = `[선택하신 불편 부위: ${partNames}]\n\n` + selectedParts.map(p => specialty.parts[p]?.summary).join('\n\n');
    currentDetails = selectedParts.map(p => specialty.parts[p]?.details);
  } else if (specialty.id === 'hache' && specialty.parts) {
    const partNames = selectedHacheParts.map(p => specialty.parts[p]?.name).join(', ');
    currentSummary = `[선택하신 불편 부위: ${partNames}]\n\n` + selectedHacheParts.map(p => specialty.parts[p]?.summary).join('\n\n');
    currentDetails = selectedHacheParts.map(p => specialty.parts[p]?.details);
  }

  const { problem, authority, shift, solution, objection, cta } = specialty.sixSteps;

  return (
    <div className="specialty-detail-page six-step-funnel">
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
                    className={`tab-btn ${activeTab === (specialty.id === 'du-myeon' ? 'head' : 'hand') ? 'active' : ''}`}
                    onClick={() => setActiveTab(specialty.id === 'du-myeon' ? 'head' : 'hand')}
                  >
                    {specialty.id === 'du-myeon' ? '머리 땀만 (두한증)' : '손 땀만 (수한증)'}
                  </button>
                  <button 
                    className={`tab-btn ${activeTab === (specialty.id === 'du-myeon' ? 'face' : 'foot') ? 'active' : ''}`}
                    onClick={() => setActiveTab(specialty.id === 'du-myeon' ? 'face' : 'foot')}
                  >
                    {specialty.id === 'du-myeon' ? '얼굴 땀만 (안면다한증)' : '발 땀만 (족한증)'}
                  </button>
                </div>
              )}

              {/* Multi-select UI for Upper Body Sweat (sangche) */}
              {specialty.id === 'sangche' && specialty.parts && (
                <div className="detail-parts-selector">
                  {['head', 'chest', 'back', 'armpit', 'belly', 'waist'].map((key) => {
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
              </div>
            </div>
            
            <div className="detail-hero-visual">
              {specialty.id === 'sujok' ? (
                <div className="hero-ghibli-image-container" style={{ width: '100%', height: 'auto', aspectRatio: '16/9', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc' }}>
                  <img 
                    src={
                      activeTab === 'hand' ? '/images/ghibli_sweaty_hands_1786840280563.jpg' :
                      activeTab === 'foot' ? '/images/ghibli_sweaty_feet_1786840228204.jpg' :
                      '/images/ghibli_sweaty_both_1786840242168.jpg'
                    } 
                    alt="불편한 상황"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s ease' }}
                  />
                </div>
              ) : (
                <div className="detail-visual-circle">
                  <span className="detail-visual-icon">{specialty.icon}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 1. Problem & Empathy */}
      <section className="funnel-section section-problem">
        <div className="container">
          <span className="step-badge">STEP 1. 공감</span>
          <h2 className="funnel-title">{problem.title}</h2>
          <h3 className="funnel-copy">"{problem.copy}"</h3>
          <p className="funnel-desc">{problem.desc}</p>
        </div>
      </section>

      {/* 2. Authority & Value Proof */}
      <section className="funnel-section section-authority">
        <div className="container">
          <span className="step-badge">STEP 2. 가치 입증</span>
          <h2 className="funnel-title">{authority.title}</h2>
          <h3 className="funnel-copy">{authority.copy}</h3>
          <p className="funnel-desc">{authority.desc}</p>
          <div style={{ marginTop: '40px' }}>
            <DirectorProfile />
          </div>
        </div>
      </section>

      {/* 3. Paradigm Shift */}
      <section className="funnel-section section-shift">
        <div className="container">
          <span className="step-badge">STEP 3. 원인 파악</span>
          <h2 className="funnel-title">{shift.title}</h2>
          <h3 className="funnel-copy">{shift.copy}</h3>
          <p className="funnel-desc">{shift.desc}</p>
          <div className="shift-visual">
            <div className="pot-graphic">🔥 냄비 뚜껑(땀구멍)을 막지 말고, 가스 불(열독)을 끄세요 🔥</div>
          </div>
        </div>
      </section>

      {/* 4. Solution */}
      <section className="funnel-section section-solution">
        <div className="container">
          <span className="step-badge">STEP 4. 해결책</span>
          <h2 className="funnel-title">{solution.title}</h2>
          <h3 className="funnel-copy">{solution.copy}</h3>
          <div className="solution-steps">
            <p className="funnel-desc" style={{whiteSpace: 'pre-line'}}>{solution.desc}</p>
          </div>
        </div>
      </section>

      {/* 5. Objection Handling (FAQ) */}
      <section className="funnel-section section-objection">
        <div className="container">
          <span className="step-badge">STEP 5. 반박 제거</span>
          <h2 className="funnel-title">{objection.title}</h2>
          <h3 className="funnel-copy">{objection.copy}</h3>
          
          <div className="faq-accordion">
            {objection.faqs && objection.faqs.map((faq, idx) => (
              <div key={idx} className={`faq-item ${openFaq === idx ? 'active' : ''}`}>
                <div className="faq-question" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                  <span className="faq-q-icon">Q.</span>
                  <h4>{faq.q}</h4>
                  <span className="faq-toggle-icon">{openFaq === idx ? '−' : '+'}</span>
                </div>
                <div className="faq-answer">
                  <span className="faq-a-icon">A.</span>
                  <p style={{whiteSpace: 'pre-wrap'}}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA (Call To Action) */}
      <section className="funnel-section section-cta">
        <div className="container">
          <span className="step-badge">STEP 6. 행동 유도</span>
          <h2 className="funnel-title">{cta.title}</h2>
          <h3 className="funnel-copy">{cta.copy}</h3>
          
          <div className="cta-cool-box" style={{ marginTop: '30px', marginBottom: '30px' }}>
            <p className="cta-cool-attitude">
              <strong>꼭 저희 경희정원한의원이 아니어도 좋습니다.</strong> 다만, 겉만 억지로 막아 다른 부위에 땀이 터지는 보상성 부작용이나 내성으로 평생 후회하지 마시고, 원인을 다스리는 치료를 제공하는 곳인지 꼼꼼히 비교해 보시길 진심으로 바랍니다.
            </p>
          </div>

          <div className="cta-action-box">
            <button 
              className="btn btn-accent btn-large" 
              onClick={() => {
                setBookingForm({ ...bookingForm, specialtyId: specialty.id });
                setShowBookingModal(true);
              }}
              style={{ fontSize: '1.2rem', padding: '15px 40px' }}
            >
              {cta.btnText}
            </button>
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
