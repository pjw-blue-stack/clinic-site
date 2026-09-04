import { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, updateDoc, doc } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, googleProvider, db } from './firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import './App.css';
import { specialties, reviewsData } from './specialtyData';
import { defaultColumns } from './columnData';
import { textContent } from './textContent';
import SelfCheckPage from './SelfCheckPage';
import DetoxPage from './pages/DetoxPage';
import ClinicPage from './pages/ClinicPage';
import ColumnPage from './pages/ColumnPage';
import AdminPage from './pages/AdminPage';

const ADMIN_EMAILS = ['pjw-blue@hanmail.net'];
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


const getAppleGridImage = (id) => {
  const imgMap = {
    'sujok': '/images/ghibli_sweaty_both_fixed_1786859540856.jpg',
    'du-myeon': '/images/ghibli_sweaty_head_face_1786858400182.jpg',
    'sangche': '/images/ghibli_sweaty_upper_1786858446561.jpg',
    'hache': '/images/ghibli_sweaty_lower_1786858457417.jpg',
    'jeonsin': '/images/ghibli_sweaty_whole_1786858470503.jpg',
    'bosangseong': '/images/ghibli_sweaty_compensatory_1786858493740.jpg',
    'dohan': '/images/ghibli_sweaty_night_1786858513250.jpg',
    'jahan': '/images/ghibli_sweaty_day_1788053312092.jpg'
  };
  return imgMap[id] || '/images/ghibli_sweaty_general_1786858532513.jpg';
};


const MegaMenu = ({ hoveredMenu, setHoveredMenu, handleNavClick, setIsDetoxPage, setIsSelfCheckPage, setIsReviewPage, setIsClinicPage, setIsColumnPage, setSelectedSpecialty }) => {
  const contentMap = {
    'detox': {
      col1: { title: '정원해독 철학 및 원리', links: [{ text: '진정성과 철학', action: 'detox#detox-philosophy' }, { text: '기존 치료의 한계', action: 'detox#detox-limitations' }, { text: '정원 해독 요법 3단계', action: 'detox#detox-methods' }] },
      col2: { title: '치료 효과 및 후기', links: [{ text: '독소와 다한증의 관계', action: 'detox#detox-correlation' }, { text: '치료 기대 효과', action: 'detox#detox-improvement' }, { text: '다한증 치료 후기', action: 'detox#detox-reviews' }] },
      col3: { title: '관리 및 안내', links: [{ text: '치료 기간 및 비용', action: 'detox#detox-duration' }, { text: '다한증 관리 요법', action: 'detox#detox-maintenance' }, { text: '자주 묻는 질문(Q&A)', action: 'detox#detox-qa' }] }
    },
    'selfcheck': {
      col1: { title: 'AI 자가진단', links: [{ text: '다한증 진단 테스트' }, { text: '결과 분석' }] },
      col2: { title: '진단 후 단계', links: [{ text: '치료후기 확인' }] },
      col3: { title: '진료 및 예약', links: [{ text: '결과 상담 예약', action: 'booking' }] }
    },
    'reviews': {
      col1: { title: '치료 후기', links: [{ text: '손발땀 후기' }, { text: '도한증 후기' }, { text: '전신 다한증 후기' }] },
      col2: { title: '의학 정보', links: [{ text: '대표원장 칼럼' }] },
      col3: { title: '진료 및 예약', links: [{ text: '상담 예약하기', action: 'booking' }] }
    },
    'booking': {
      col1: { title: '경희정원 소개', links: [{ text: '대표원장 인사말', action: 'clinic#greeting' }, { text: '공지사항', action: 'clinic#notice' }] },
      col2: { title: '의학 및 한약재', links: [{ text: '다한증 의학 칼럼', action: 'clinic#column' }, { text: '청정 GMP 한약재', action: 'clinic#herb' }] },
      col3: { title: '진료 및 예약', links: [{ text: '진료시간 안내', action: 'clinic#hours' }, { text: '오시는 길', action: 'clinic#location' }, { text: '상담 / 예약 / 문의', action: 'clinic#cta' }] }
    },
    'default': {
      col1: { title: '해당 부위 다한증', links: [{ text: '특징 및 증상' }, { text: '원인 분석 (기허/음허)' }, { text: '보약식 해독 치료' }] },
      col2: { title: '빠른 링크', links: [{ text: '치료 후기 보기', action: 'reviews' }, { text: 'AI 자가진단', action: 'selfcheck' }] },
      col3: { title: '진료 및 예약', links: [{ text: '대표원장 1:1 상담 예약', action: 'booking' }] }
    }
  };

  const content = contentMap[hoveredMenu] || contentMap['default'];

  const handleAction = (action) => {
    setHoveredMenu(null);
    if (action.startsWith('clinic')) {
      setIsDetoxPage(false); setIsSelfCheckPage(false); setIsReviewPage(false); setIsColumnPage(false); setIsClinicPage(true); setSelectedSpecialty(null); 
      const hash = action.split('#')[1];
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 150); // slight delay to allow page render
      } else {
        window.scrollTo(0, 0);
      }
    } else if (action.startsWith('detox#')) {
      setIsDetoxPage(true); setIsSelfCheckPage(false); setIsReviewPage(false); setIsColumnPage(false); setIsClinicPage(false); setSelectedSpecialty(null); 
      const hash = action.split('#')[1];
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 150); // slight delay to allow page render
      } else {
        window.scrollTo(0, 0);
      }
    } else if (action === 'booking') {
      setIsDetoxPage(false); setIsSelfCheckPage(false); setIsReviewPage(false); setIsColumnPage(false); setIsClinicPage(true); setSelectedSpecialty(null); window.scrollTo(0, 0);
    } else if (action === 'reviews') {
      setIsDetoxPage(false); setIsSelfCheckPage(false); setIsClinicPage(false); setIsColumnPage(false); setIsReviewPage(true); setSelectedSpecialty(null); window.scrollTo(0, 0);
    } else if (action === 'selfcheck') {
      setIsDetoxPage(false); setIsClinicPage(false); setIsReviewPage(false); setIsColumnPage(false); setIsSelfCheckPage(true); setSelectedSpecialty(null); window.scrollTo(0, 0);
    }
  };

  return (
    <div className={`mega-menu ${hoveredMenu ? 'active' : ''}`} onMouseLeave={() => setHoveredMenu(null)}>
      <div className="mega-menu-inner">
        <div className="container mega-menu-container">
            {[content.col1, content.col2, content.col3].map((col, idx) => (
              <div className="mega-col" key={idx}>
                <h4 className="mega-col-title">{col.title}</h4>
                <ul className="mega-col-list">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx} onClick={() => link.action ? handleAction(link.action) : null} className={link.action ? 'clickable' : ''}>
                      {link.text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
};

function App() {
  // Navigation & Scroll
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activePulseIndex, setActivePulseIndex] = useState(null);

  // Random pulse animation for Value Proof cards
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePulseIndex(prev => {
        let nextIdx = Math.floor(Math.random() * 6);
        while (nextIdx === prev) {
          nextIdx = Math.floor(Math.random() * 6);
        }
        return nextIdx;
      });
    }, 6000);

    const initialTimeout = setTimeout(() => {
      setActivePulseIndex(Math.floor(Math.random() * 6));
    }, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, []);

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
  const [hoveredMenu, setHoveredMenu] = useState(null);
  
  // Columns state
  const columnsRef = collection(db, 'columns');
  const columnsQuery = query(columnsRef, orderBy('id', 'asc'));
  const [firestoreColumns] = useCollectionData(columnsQuery, { idField: 'firestoreId' });
  const columns = firestoreColumns && firestoreColumns.length > 0 ? firestoreColumns : defaultColumns;
  
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
  const [isAdminPage, setIsAdminPage] = useState(false);
  const isAdmin = loggedInUser && ADMIN_EMAILS.includes(auth.currentUser?.email);
  const [selectedDetoxStep, setSelectedDetoxStep] = useState(null);

  // Sync state to URL for page refreshes and history
  useEffect(() => {
    let targetSearch = '';
    if (selectedSpecialty) {
      targetSearch = `?specialty=${selectedSpecialty.id}`;
    } else if (isColumnPage) {
      targetSearch = `?page=column`;
    } else if (isReviewPage) {
      targetSearch = `?page=review`;
    } else if (isClinicPage) {
      targetSearch = `?page=clinic`;
    } else if (isDetoxPage) {
      targetSearch = `?page=detox`;
    } else if (isSelfCheckPage) {
      targetSearch = `?page=selfcheck`;
    }

    if (window.location.search !== targetSearch) {
      window.history.pushState({}, '', targetSearch || window.location.pathname);
    }
  }, [selectedSpecialty, isColumnPage, isReviewPage, isClinicPage, isDetoxPage, isSelfCheckPage]);

  // Handle browser back button (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      let specId = params.get('specialty');
      let pageId = params.get('page');
      
      // Backward compatibility mapping for merged categories
      if (specId === 'anmyeon' || specId === 'duhan' || specId === 'migak') {
        specId = 'du-myeon';
      }

      if (specId) {
        const specialty = specialties.find(s => s.id === specId);
        if (specialty) {
          setSelectedSpecialty(specialty);
          setIsColumnPage(false);
          setIsReviewPage(false);
          setIsClinicPage(false);
          setIsDetoxPage(false);
          setIsSelfCheckPage(false);
        }
      } else if (pageId) {
        setSelectedSpecialty(null);
        setIsColumnPage(pageId === 'column');
        setIsReviewPage(pageId === 'review');
        setIsClinicPage(pageId === 'clinic');
        setIsDetoxPage(pageId === 'detox');
        setIsSelfCheckPage(pageId === 'selfcheck');
      } else {
        setSelectedSpecialty(null);
        setIsColumnPage(false);
        setIsReviewPage(false);
        setIsClinicPage(false);
        setIsDetoxPage(false);
        setIsSelfCheckPage(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Reviews state
  const reviewsRef = collection(db, 'reviews');
  const reviewsQuery = query(reviewsRef, orderBy('createdAt', 'desc'));
  const [firestoreReviews] = useCollectionData(reviewsQuery, { idField: 'id' });
  const reviews = firestoreReviews && firestoreReviews.length > 0 ? firestoreReviews : reviewsData;
  const [filterSpecialty, setFilterSpecialty] = useState('all');
  const [newReview, setNewReview] = useState({
    name: '',
    title: '',
    content: '',
    rating: 5,
    specialtyId: 'sujok',
    isSecret: false
  });

  // Notices state
  const noticesRef = collection(db, 'notices');
  const noticesQuery = query(noticesRef, orderBy('createdAt', 'desc'));
  const [firestoreNotices] = useCollectionData(noticesQuery, { idField: 'id' });
  const notices = firestoreNotices && firestoreNotices.length > 0 ? firestoreNotices : textContent.announcementHero.announcements;
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // QnA state
  const qnaRef = collection(db, 'qna');
  const qnaQuery = query(qnaRef, orderBy('createdAt', 'desc'));
  const [firestoreQna] = useCollectionData(qnaQuery, { idField: 'id' });
  const qnaList = firestoreQna || [];
  
  const [showQnaModal, setShowQnaModal] = useState(false);
  const [newQna, setNewQna] = useState({
    category: 'detox',
    question: '',
    isSecret: false
  });
  const [answeringQnaId, setAnsweringQnaId] = useState(null);
  const [qnaAnswerText, setQnaAnswerText] = useState('');

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

  // Firebase Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUser(user.displayName || user.email);
      } else {
        setLoggedInUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Login handler
  const handleSocialLogin = async (platform) => {
    if (platform === '구글') {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        setShowLoginModal(false);
        alert(`환영합니다, ${result.user.displayName || result.user.email}님!`);
      } catch (error) {
        console.error("로그인 에러:", error);
        alert('로그인에 실패했습니다. 다시 시도해주세요.');
      }
    } else {
      alert(`${platform} 로그인은 현재 준비 중입니다. 구글 로그인을 이용해주세요.`);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('로그아웃 되었습니다.');
    } catch (error) {
      console.error("로그아웃 에러:", error);
    }
  };

  // Review Form Submit
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.title || !newReview.content) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    
    const submittedReview = {
      name: newReview.name.substring(0, 1) + '*' + newReview.name.substring(Math.max(1, newReview.name.length - 1)),
      specialtyId: newReview.specialtyId,
      title: newReview.title,
      content: newReview.content,
      rating: newReview.rating,
      date: new Date().toISOString().split('T')[0],
      createdAt: Date.now()
    };

    try {
      await addDoc(collection(db, 'reviews'), submittedReview);
      setNewReview({
        name: '',
        title: '',
        content: '',
        rating: 5,
        specialtyId: 'sujok',
        isSecret: false
      });
      setReviewSuccess(true);
      setTimeout(() => setReviewSuccess(false), 3000);
    } catch (err) {
      console.error("Error adding review: ", err);
      alert('리뷰 등록에 실패했습니다.');
    }
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

  // QnA Submit
  const handleQnaSubmit = async (e) => {
    e.preventDefault();
    if (!loggedInUser || !auth.currentUser) {
      alert("구글 로그인 후 질문을 남기실 수 있습니다.");
      return;
    }
    if (!newQna.question) {
      alert("질문 내용을 입력해주세요.");
      return;
    }
    
    try {
      await addDoc(collection(db, 'qna'), {
        category: newQna.category,
        question: newQna.question,
        answer: '',
        author: auth.currentUser.displayName || auth.currentUser.email.split('@')[0],
        authorEmail: auth.currentUser.email,
        createdAt: Date.now(),
        isSecret: newQna.isSecret,
        isAnswered: false
      });
      alert('질문이 성공적으로 등록되었습니다. 원장님 확인 후 답변이 달립니다.');
      setShowQnaModal(false);
      setNewQna({ ...newQna, question: '' });
    } catch(err) {
      console.error(err);
      alert('질문 등록에 실패했습니다.');
    }
  };

  // QnA Answer Submit
  const handleQnaAnswer = async (qnaId) => {
    if(!qnaAnswerText) return;
    try {
      await updateDoc(doc(db, 'qna', qnaId), {
        answer: qnaAnswerText,
        isAnswered: true
      });
      setAnsweringQnaId(null);
      setQnaAnswerText('');
      alert('답변이 등록되었습니다.');
    } catch(err) {
      console.error(err);
      alert('답변 등록에 실패했습니다.');
    }
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
      <div className="header-wrapper" onMouseLeave={() => setHoveredMenu(null)}>
      <header className="header">
        <div className="container header-container">
          <a href="#home" className="logo" onClick={(e) => { 
            e.preventDefault(); 
            if (isAdminPage) setIsAdminPage(false);
            scrollToSection('home'); 
          }}>
            <img src="/Hyperhydrosis.svg" alt="경희정원한의원 로고" style={{ height: '38px', width: '38px', objectFit: 'contain' }} />
          </a>

          {!isAdminPage && (
          <nav className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            <a 
              href="#specialties" 
              className={`nav-link ${isDetoxPage ? 'active' : ''}`} onMouseEnter={() => setHoveredMenu('detox')}
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
              className="nav-link" onMouseEnter={() => setHoveredMenu('sujok')}
              onClick={(e) => { e.preventDefault(); handleNavClick('sujok'); }}
            >
              손발땀
            </a>
            <a 
              href="#du-myeon" 
              className="nav-link" onMouseEnter={() => setHoveredMenu('du-myeon')}
              onClick={(e) => { e.preventDefault(); handleNavClick('du-myeon'); }}
            >
              머리 얼굴땀
            </a>
            <a 
              href="#sangche" 
              className="nav-link" onMouseEnter={() => setHoveredMenu('sangche')}
              onClick={(e) => { e.preventDefault(); handleNavClick('sangche'); }}
            >
              상체땀
            </a>
            <a 
              href="#hache" 
              className="nav-link" onMouseEnter={() => setHoveredMenu('hache')}
              onClick={(e) => { e.preventDefault(); handleNavClick('hache'); }}
            >
              하체땀
            </a>
            <a 
              href="#jeonsin" 
              className="nav-link" onMouseEnter={() => setHoveredMenu('jeonsin')}
              onClick={(e) => { e.preventDefault(); handleNavClick('jeonsin'); }}
            >
              전신땀
            </a>
            <a 
              href="#bosangseong" 
              className="nav-link" onMouseEnter={() => setHoveredMenu('bosangseong')}
              onClick={(e) => { e.preventDefault(); handleNavClick('bosangseong'); }}
            >
              보상성 다한증
            </a>
            <a 
              href="#dohan" 
              className="nav-link" onMouseEnter={() => setHoveredMenu('dohan')}
              onClick={(e) => { e.preventDefault(); handleNavClick('dohan'); }}
            >
              도한증(밤)
            </a>
            <a 
              href="#jahan" 
              className="nav-link" onMouseEnter={() => setHoveredMenu('jahan')}
              onClick={(e) => { e.preventDefault(); handleNavClick('jahan'); }}
            >
              식은땀(낮)
            </a>
            <a 
              href="#selfcheck" 
              className={`nav-link ${isSelfCheckPage ? 'active' : ''}`} onMouseEnter={() => setHoveredMenu('selfcheck')}
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
              className={`nav-link ${isReviewPage ? 'active' : ''}`} onMouseEnter={() => setHoveredMenu('reviews')}
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
              className={`nav-link ${isClinicPage ? 'active' : ''}`} onMouseEnter={() => setHoveredMenu('booking')}
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
          )}

          <div className="header-actions">
            {loggedInUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{loggedInUser}</span>
                {isAdmin && !isAdminPage && (
                  <button className="btn btn-sm btn-outline" onClick={() => setIsAdminPage(true)} style={{ borderColor: 'var(--primary-color)', color: 'var(--primary-color)' }}>
                    관리자 페이지
                  </button>
                )}
                <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={handleLogout}>
                  로그아웃
                </button>
              </div>
            ) : (
              <button className="btn btn-outline" onClick={() => setShowLoginModal(true)}>
                로그인
              </button>
            )}
            {!isAdmin && !isAdminPage && (
            <button className="btn btn-accent" onClick={() => setShowBookingModal(true)}>
              실시간 예약
            </button>
            )}
            <button className={`mobile-toggle ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>
      <MegaMenu 
        hoveredMenu={hoveredMenu} 
        setHoveredMenu={setHoveredMenu}
        handleNavClick={handleNavClick}
        setIsDetoxPage={setIsDetoxPage}
        setIsSelfCheckPage={setIsSelfCheckPage}
        setIsReviewPage={setIsReviewPage}
        setIsClinicPage={setIsClinicPage}
        setIsColumnPage={setIsColumnPage}
        setSelectedSpecialty={setSelectedSpecialty}
      />
      </div>

      <main className={`main-content ${hoveredMenu ? 'blurred' : ''}`}>
        {isAdminPage ? (
          <AdminPage 
            onBack={() => setIsAdminPage(false)} 
            qnaList={qnaList}
            handleQnaAnswer={handleQnaAnswer}
          />
        ) : selectedSpecialty ? (
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
                ) : isClinicPage ? (
          <ClinicPage 
            columns={columns}
            setColumns={setColumns}
            selectedColumn={selectedColumn}
            setSelectedColumn={setSelectedColumn}
            showWriteForm={showWriteForm}
            setShowWriteForm={setShowWriteForm}
            setShowBookingModal={setShowBookingModal}
            setBookingForm={setBookingForm}
            bookingForm={bookingForm}
          />
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
                    <>
                      {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={`locked-${item}`} className="no-reviews-card hover-lift" style={{ textAlign: 'center', padding: '40px', backgroundColor: '#f9fbfd', borderRadius: '16px', boxShadow: '0 5px 20px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'all 0.3s ease' }}>
                          <span style={{ fontSize: '3rem', marginBottom: '15px' }}>🔒</span>
                          <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', wordBreak: 'keep-all', color: 'var(--text-main)', lineHeight: '1.4' }}>
                            의료법 제56조에 의거,<br/>
                            <span style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>[{filterSpecialty === 'all' ? '다한증' : getSpecialtyName(filterSpecialty)}]</span> 치료 후기는<br/>
                            로그인 후 열람하실 수 있습니다.
                          </h3>
                          <p style={{ color: 'var(--text-light)', marginBottom: '20px', fontSize: '0.9rem', wordBreak: 'keep-all' }}>환자분들의 소중한 개인정보와 100% 진실된 후기를 보호하기 위함입니다.</p>
                          <button className="btn btn-accent" style={{ marginTop: 'auto' }} onClick={() => setShowLoginModal(true)}>1초 간편 로그인하고 후기 보기</button>
                        </div>
                      ))}
                    </>
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
          <DetoxPage 
            setShowBookingModal={setShowBookingModal} 
            reviews={reviews} 
            setIsReviewPage={setIsReviewPage} 
            setIsDetoxPage={setIsDetoxPage}
            getSpecialtyName={getSpecialtyName}
            loggedInUser={loggedInUser}
            setShowLoginModal={setShowLoginModal}
            qnaList={qnaList}
            setShowQnaModal={setShowQnaModal}
            setNewQna={setNewQna}
            answeringQnaId={answeringQnaId}
            setAnsweringQnaId={setAnsweringQnaId}
            qnaAnswerText={qnaAnswerText}
            setQnaAnswerText={setQnaAnswerText}
            handleQnaAnswer={handleQnaAnswer}
          />
        ) : (
          <>
            {/* 1. HERO SECTION (최신 공지사항) */}
            <section id="home" className="hero announcement-hero" style={{ background: 'linear-gradient(135deg, var(--bg-color) 0%, #e2e8f0 100%)', padding: '100px 0 80px' }}>
              <div className="container hero-grid">
                <div className="hero-content">
                  <div className="hero-badge">
                    <span>{textContent.announcementHero.badge.charAt(0)}</span> {textContent.announcementHero.badge.slice(2)}
                  </div>
                  <h1 className="hero-title" style={{ whiteSpace: 'pre-wrap' }}>
                    {textContent.announcementHero.title}
                  </h1>
                  <p className="hero-desc">
                    {textContent.announcementHero.desc}
                  </p>
                  <div className="hero-btns">
                    <button className="btn btn-primary" onClick={() => setShowBookingModal(true)}>
                      {textContent.announcementHero.btnBooking}
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
                      {textContent.announcementHero.btnReviews}
                    </button>
                  </div>
                </div>
                
                <div className="hero-visual announcement-board glass-card" style={{ padding: '30px', textAlign: 'left', borderTop: '4px solid var(--accent-color)' }}>
                  <h3 style={{ marginBottom: '20px', color: 'var(--primary-dark)', fontSize: '1.4rem' }}>최신 공지사항</h3>
                  <div className="announcement-list" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {notices.slice(0, 5).map((ann) => (
                      <div key={ann.id} className="announcement-item" style={{ padding: '15px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.9)', cursor: 'pointer', transition: 'all 0.3s ease', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                        <div>
                          <span style={{ display: 'inline-block', padding: '3px 8px', borderRadius: '4px', backgroundColor: 'var(--accent-light)', color: 'var(--accent-color)', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '8px' }}>{ann.tag}</span>
                          <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-main)' }}>{ann.title}</h4>
                        </div>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>{ann.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 2. VALUE PROOF SECTION (가치 입증) */}
            <section className="section-value-proof" style={{ backgroundColor: '#f8fafc', padding: '60px 0' }}>
              <div className="container">
                <div className="value-proof-grid">
                  <div className={`value-proof-item glass-card ${activePulseIndex === 0 ? 'card-pulse-active' : ''}`} style={{ padding: '30px', textAlign: 'center' }}>
                    <div className="value-proof-num" style={{ fontSize: '3rem', color: 'var(--primary-color)', fontWeight: '800' }}>{textContent.valueProof.item1Num}<span style={{ fontSize: '1.2rem' }}>{textContent.valueProof.item1Unit}</span></div>
                    <h4 className="value-proof-title" style={{ margin: '15px 0 10px', fontSize: '1.1rem' }}>{textContent.valueProof.item1Title}</h4>
                    <p className="value-proof-desc" style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>{textContent.valueProof.item1Desc}</p>
                  </div>
                  <div className={`value-proof-item glass-card ${activePulseIndex === 1 ? 'card-pulse-active' : ''}`} style={{ padding: '30px', textAlign: 'center' }}>
                    <div className="value-proof-num" style={{ fontSize: '3rem', color: 'var(--primary-color)', fontWeight: '800' }}>{textContent.valueProof.item2Num}<span style={{ fontSize: '1.2rem' }}>{textContent.valueProof.item2Unit}</span></div>
                    <h4 className="value-proof-title" style={{ margin: '15px 0 10px', fontSize: '1.1rem' }}>{textContent.valueProof.item2Title}</h4>
                    <p className="value-proof-desc" style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>{textContent.valueProof.item2Desc}</p>
                  </div>
                  <div className={`value-proof-item glass-card ${activePulseIndex === 2 ? 'card-pulse-active' : ''}`} style={{ padding: '30px', textAlign: 'center' }}>
                    <div className="value-proof-num" style={{ fontSize: '2.5rem', color: 'var(--primary-color)', fontWeight: '800' }}>{textContent.valueProof.item3Num}<span style={{ fontSize: '1.2rem' }}>{textContent.valueProof.item3Unit}</span></div>
                    <h4 className="value-proof-title" style={{ margin: '15px 0 10px', fontSize: '1.1rem' }}>{textContent.valueProof.item3Title}</h4>
                    <p className="value-proof-desc" style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>{textContent.valueProof.item3Desc}</p>
                  </div>
                  <div className={`value-proof-item glass-card ${activePulseIndex === 3 ? 'card-pulse-active' : ''}`} style={{ padding: '30px', textAlign: 'center' }}>
                    <div className="value-proof-num" style={{ fontSize: '3rem', color: 'var(--primary-color)', fontWeight: '800' }}>{textContent.valueProof.item4Num}<span style={{ fontSize: '1.2rem' }}>{textContent.valueProof.item4Unit}</span></div>
                    <h4 className="value-proof-title" style={{ margin: '15px 0 10px', fontSize: '1.1rem' }}>{textContent.valueProof.item4Title}</h4>
                    <p className="value-proof-desc" style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>{textContent.valueProof.item4Desc}</p>
                  </div>
                  <div className={`value-proof-item glass-card ${activePulseIndex === 4 ? 'card-pulse-active' : ''}`} style={{ padding: '30px', textAlign: 'center' }}>
                    <div className="value-proof-num" style={{ fontSize: '3rem', color: 'var(--primary-color)', fontWeight: '800' }}>{textContent.valueProof.item5Num}<span style={{ fontSize: '1.2rem' }}>{textContent.valueProof.item5Unit}</span></div>
                    <h4 className="value-proof-title" style={{ margin: '15px 0 10px', fontSize: '1.1rem' }}>{textContent.valueProof.item5Title}</h4>
                    <p className="value-proof-desc" style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>{textContent.valueProof.item5Desc}</p>
                  </div>
                  <div className={`value-proof-item glass-card ${activePulseIndex === 5 ? 'card-pulse-active' : ''}`} style={{ padding: '30px', textAlign: 'center' }}>
                    <div className="value-proof-num" style={{ fontSize: '2.5rem', color: 'var(--primary-color)', fontWeight: '800' }}>{textContent.valueProof.item6Num}<span style={{ fontSize: '1.2rem' }}>{textContent.valueProof.item6Unit}</span></div>
                    <h4 className="value-proof-title" style={{ margin: '15px 0 10px', fontSize: '1.1rem' }}>{textContent.valueProof.item6Title}</h4>
                    <p className="value-proof-desc" style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>{textContent.valueProof.item6Desc}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. DETOX PRINCIPLES SECTION (정원해독 치료 원리) */}
            <section className="section section-principles" style={{ 
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.95)), url(/images/jeongwon_detox_bg.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              padding: '100px 0',
              textAlign: 'center'
            }}>
              <div className="container">
                <div className="section-header" style={{ marginBottom: '40px' }}>
                  <span className="section-badge">{textContent.detoxPrinciples.badge}</span>
                  <h2 className="apple-title" style={{ color: 'var(--primary-dark)', marginBottom: '20px' }}>{textContent.detoxPrinciples.title}</h2>
                  <p className="section-desc" style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-main)' }}>
                    {textContent.detoxPrinciples.desc}
                  </p>
                </div>
                
                <button 
                  className="btn btn-primary btn-large" 
                  onClick={() => {
                    setIsColumnPage(false);
                    setIsClinicPage(false);
                    setIsReviewPage(false);
                    setIsSelfCheckPage(false);
                    setSelectedSpecialty(null);
                    setIsDetoxPage(true);
                    window.scrollTo(0, 0);
                  }}
                  style={{ fontSize: '1.2rem', padding: '15px 40px', borderRadius: '30px', boxShadow: '0 10px 20px rgba(74, 144, 226, 0.3)' }}
                >
                  정원 해독 자세히 보기
                </button>
              </div>
            </section>

            {/* 4. CLINIC SPECIALTIES SECTION (애플 스타일) */}
            <section id="specialties" className="apple-specialties-container">

              {/* Hero 1: 수족다한증 (iPhone Style) */}
              {(() => {
                const spec = specialties.find(s => s.id === 'sujok');
                return spec ? (
                  <div className="apple-full-section apple-theme-light" onClick={() => { setSelectedSpecialty(spec); window.scrollTo(0,0); }}>
                    <h3 className="apple-title">{spec.title.split(' (')[0]}</h3>
                    <p className="apple-subtitle">{spec.title.includes('(') ? '(' + spec.title.split('(')[1] : spec.subtitle}</p>
                    <div className="apple-btns">
                      <button className="apple-btn-primary" onClick={(e) => { e.stopPropagation(); setSelectedSpecialty(spec); window.scrollTo(0,0); }}>더 알아보기</button>
                      <button className="apple-btn-secondary" onClick={(e) => { e.stopPropagation(); setShowBookingModal(true); }}>상담하기</button>
                    </div>
                    <img src={getAppleGridImage(spec.id)} alt={spec.title} className="apple-product-img" style={{ objectFit: "cover" }} />
                  </div>
                ) : null;
              })()}

              {/* Hero 2: 안면다한증 (MacBook Air Style) */}
              {(() => {
                const spec = specialties.find(s => s.id === 'du-myeon');
                return spec ? (
                  <div className="apple-full-section apple-theme-light-blue" onClick={() => { setSelectedSpecialty(spec); window.scrollTo(0,0); }}>
                    <h3 className="apple-title">{spec.title.split(' (')[0]}</h3>
                    <p className="apple-subtitle">{spec.title.includes('(') ? '(' + spec.title.split('(')[1] : spec.subtitle}</p>
                    <div className="apple-btns">
                      <button className="apple-btn-primary" onClick={(e) => { e.stopPropagation(); setSelectedSpecialty(spec); window.scrollTo(0,0); }}>더 알아보기</button>
                      <button className="apple-btn-secondary" onClick={(e) => { e.stopPropagation(); setShowBookingModal(true); }}>상담하기</button>
                    </div>
                    <img src={getAppleGridImage(spec.id)} alt={spec.title} className="apple-product-img" style={{ objectFit: "cover" }} />
                  </div>
                ) : null;
              })()}

              {/* Grid 1: 상체땀 / 하체땀 (iPad Air / MacBook Pro Style) */}
              <div className="apple-grid-row">
                {(() => {
                  const spec1 = specialties.find(s => s.id === 'sangche');
                  return spec1 ? (
                    <div className="apple-half-section apple-theme-light-gray" onClick={() => { setSelectedSpecialty(spec1); window.scrollTo(0,0); }}>
                      <h3 className="apple-title" style={{ fontSize: '2.5rem' }}>{spec1.title.split(' (')[0]}</h3>
                      <p className="apple-subtitle" style={{ fontSize: '1.2rem' }}>{spec1.title.includes('(') ? '(' + spec1.title.split('(')[1] : spec1.subtitle}</p>
                      <div className="apple-btns">
                        <button className="apple-btn-primary" onClick={(e) => { e.stopPropagation(); setSelectedSpecialty(spec1); window.scrollTo(0,0); }}>더 알아보기</button>
                        <button className="apple-btn-secondary" onClick={(e) => { e.stopPropagation(); setShowBookingModal(true); }}>상담하기</button>
                      </div>
                      <img src={getAppleGridImage(spec1.id)} alt={spec1.title} className="apple-product-img" style={{ objectFit: "cover" }} />
                    </div>
                  ) : null;
                })()}
                {(() => {
                  const spec2 = specialties.find(s => s.id === 'hache');
                  return spec2 ? (
                    <div className="apple-half-section apple-theme-dark" onClick={() => { setSelectedSpecialty(spec2); window.scrollTo(0,0); }}>
                      <h3 className="apple-title" style={{ fontSize: '2.5rem' }}>{spec2.title.split(' (')[0]}</h3>
                      <p className="apple-subtitle" style={{ fontSize: '1.2rem' }}>{spec2.title.includes('(') ? '(' + spec2.title.split('(')[1] : spec2.subtitle}</p>
                      <div className="apple-btns">
                        <button className="apple-btn-primary" onClick={(e) => { e.stopPropagation(); setSelectedSpecialty(spec2); window.scrollTo(0,0); }}>더 알아보기</button>
                        <button className="apple-btn-secondary" onClick={(e) => { e.stopPropagation(); setShowBookingModal(true); }}>상담하기</button>
                      </div>
                      <img src={getAppleGridImage(spec2.id)} alt={spec2.title} className="apple-product-img" style={{ objectFit: "cover" }} />
                    </div>
                  ) : null;
                })()}
              </div>

              {/* Grid 2: 전신다한증 / 보상성다한증 (iPad Pro / AirPods Pro Style) */}
              <div className="apple-grid-row">
                {(() => {
                  const spec1 = specialties.find(s => s.id === 'jeonsin');
                  return spec1 ? (
                    <div className="apple-half-section apple-theme-dark" onClick={() => { setSelectedSpecialty(spec1); window.scrollTo(0,0); }}>
                      <h3 className="apple-title" style={{ fontSize: '2.5rem' }}>{spec1.title.split(' (')[0]}</h3>
                      <p className="apple-subtitle" style={{ fontSize: '1.2rem' }}>{spec1.title.includes('(') ? '(' + spec1.title.split('(')[1] : spec1.subtitle}</p>
                      <div className="apple-btns">
                        <button className="apple-btn-primary" onClick={(e) => { e.stopPropagation(); setSelectedSpecialty(spec1); window.scrollTo(0,0); }}>더 알아보기</button>
                        <button className="apple-btn-secondary" onClick={(e) => { e.stopPropagation(); setShowBookingModal(true); }}>상담하기</button>
                      </div>
                      <img src={getAppleGridImage(spec1.id)} alt={spec1.title} className="apple-product-img" style={{ objectFit: "cover" }} />
                    </div>
                  ) : null;
                })()}
                {(() => {
                  const spec2 = specialties.find(s => s.id === 'bosangseong');
                  return spec2 ? (
                    <div className="apple-half-section apple-theme-light" onClick={() => { setSelectedSpecialty(spec2); window.scrollTo(0,0); }}>
                      <h3 className="apple-title" style={{ fontSize: '2.5rem' }}>{spec2.title.split(' (')[0]}</h3>
                      <p className="apple-subtitle" style={{ fontSize: '1.2rem' }}>{spec2.title.includes('(') ? '(' + spec2.title.split('(')[1] : spec2.subtitle}</p>
                      <div className="apple-btns">
                        <button className="apple-btn-primary" onClick={(e) => { e.stopPropagation(); setSelectedSpecialty(spec2); window.scrollTo(0,0); }}>더 알아보기</button>
                        <button className="apple-btn-secondary" onClick={(e) => { e.stopPropagation(); setShowBookingModal(true); }}>상담하기</button>
                      </div>
                      <img src={getAppleGridImage(spec2.id)} alt={spec2.title} className="apple-product-img" style={{ objectFit: "cover" }} />
                    </div>
                  ) : null;
                })()}
              </div>

              {/* Grid 3: 도한증 / 카카오톡 실시간 상담 (Apple Watch / Trade In Style) */}
              <div className="apple-grid-row">
                {(() => {
                  const spec1 = specialties.find(s => s.id === 'dohan');
                  return spec1 ? (
                    <div className="apple-half-section apple-theme-light-gray" onClick={() => { setSelectedSpecialty(spec1); window.scrollTo(0,0); }}>
                      <h3 className="apple-title" style={{ fontSize: '2.5rem' }}>{spec1.title.split(' (')[0]}</h3>
                      <p className="apple-subtitle" style={{ fontSize: '1.2rem' }}>{spec1.title.includes('(') ? '(' + spec1.title.split('(')[1] : spec1.subtitle}</p>
                      <div className="apple-btns">
                        <button className="apple-btn-primary" onClick={(e) => { e.stopPropagation(); setSelectedSpecialty(spec1); window.scrollTo(0,0); }}>더 알아보기</button>
                        <button className="apple-btn-secondary" onClick={(e) => { e.stopPropagation(); setShowBookingModal(true); }}>상담하기</button>
                      </div>
                      <img src={getAppleGridImage(spec1.id)} alt={spec1.title} className="apple-product-img" style={{ objectFit: "cover" }} />
                    </div>
                  ) : null;
                })()}
                
                {(() => {
                  const spec2 = specialties.find(s => s.id === 'jahan');
                  return spec2 ? (
                    <div className="apple-half-section apple-theme-light" onClick={() => { setSelectedSpecialty(spec2); window.scrollTo(0,0); }}>
                      <h3 className="apple-title" style={{ fontSize: '2.5rem' }}>{spec2.title.split(' (')[0]}</h3>
                      <p className="apple-subtitle" style={{ fontSize: '1.2rem' }}>{spec2.title.includes('(') ? '(' + spec2.title.split('(')[1] : spec2.subtitle}</p>
                      <div className="apple-btns">
                        <button className="apple-btn-primary" onClick={(e) => { e.stopPropagation(); setSelectedSpecialty(spec2); window.scrollTo(0,0); }}>더 알아보기</button>
                        <button className="apple-btn-secondary" onClick={(e) => { e.stopPropagation(); setShowBookingModal(true); }}>상담하기</button>
                      </div>
                      <img src={getAppleGridImage(spec2.id)} alt={spec2.title} className="apple-product-img" style={{ objectFit: "cover" }} />
                    </div>
                  ) : null;
                })()}
              </div>
            </section>

            {/* 5. REVIEWS PREVIEW SECTION */}
            <section className="section section-reviews-preview" style={{ 
              padding: '100px 0', 
              backgroundImage: 'url(/images/clinic_review_bg.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative'
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(5px)' }}></div>
              <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="section-header text-center mb-5">
                  <span className="section-badge">Reviews</span>
                  <h2>다한증 치료 후기</h2>
                  <p className="section-desc">수많은 환자분들이 이미 쾌적한 일상을 되찾았습니다.</p>
                </div>

                <div className="reviews-grid">
                  {!loggedInUser ? (
                    <div className="no-reviews-text" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 20px', margin: '0 auto', maxWidth: '800px' }}>
                      <h3 style={{ fontSize: '1.6rem', marginBottom: '25px', color: 'var(--text-main)', fontWeight: '700', lineHeight: '1.5' }}>
                        의료법 제56조에 의거,<br/>치료 후기는 로그인 후 열람하실 수 있습니다.
                      </h3>
                      <div style={{ color: 'var(--text-dark)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '40px', wordBreak: 'keep-all' }}>
                        <p style={{ marginBottom: '15px' }}>경희정원한의원은 환자분들의 소중한 개인정보를 철저히 보호하며, 거짓되거나 과장된 대가성 후기를 엄격히 배제합니다.</p>
                        <p>오직 본원에서 치료를 마친 분들의 <strong>100% 진실된 실제 치유 사례</strong>만을 투명하게 제공합니다.<br/>수많은 다한증 환자분들이 쾌적한 일상을 되찾은 기적 같은 변화를 직접 확인해 보세요.</p>
                      </div>
                      <button 
                        className="btn btn-accent btn-large" 
                        onClick={() => { setIsReviewPage(true); window.scrollTo(0, 0); }}
                        style={{ padding: '15px 50px', fontSize: '1.1rem', borderRadius: '30px', boxShadow: '0 5px 15px rgba(80, 227, 194, 0.4)' }}
                      >
                        치료 후기 보기 &rarr;
                      </button>
                    </div>
                  ) : (
                    reviews && reviews.slice(0, 3).map(review => (
                      <div key={review.id} className="review-card hover-lift" style={{ textAlign: 'left', backgroundColor: 'rgba(255,255,255,0.9)', padding: '25px', borderRadius: '16px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)', border: '1px solid rgba(255,255,255,0.5)', transition: 'all 0.3s ease' }}>
                        <div className="review-meta" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                          <div className="review-rating" style={{ color: '#FFD700', fontSize: '1.1rem' }}>
                            {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                          </div>
                          <span className="review-tag" style={{ fontSize: '0.8rem', backgroundColor: 'var(--accent-light)', color: 'var(--accent-color)', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
                            {getSpecialtyName(review.specialtyId)}
                          </span>
                        </div>
                        <h4 className="review-title" style={{ fontSize: '1.1rem', marginBottom: '10px', color: 'var(--text-main)' }}>{review.title}</h4>
                        <p className="review-content" style={{ fontSize: '0.9rem', color: 'var(--text-light)', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{review.content}</p>
                        <div className="review-footer" style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-light)', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '15px' }}>
                          <span className="review-writer" style={{ fontWeight: '600' }}>{review.name} 환자님</span>
                          <span>{review.date}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

              </div>
            </section>
          </>
        )}
      </main>

      {/* FOOTER */}
      <footer className={`footer ${hoveredMenu ? 'blurred' : ''}`}>
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

      {/* QnA MODAL */}
      {showQnaModal && (
        <div className="modal-overlay" onClick={() => setShowQnaModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <button className="modal-close" onClick={() => setShowQnaModal(false)}>✕</button>
            <div className="modal-header">
              <span className="modal-badge">Q&A</span>
              <h2 className="modal-title">원장님께 질문 남기기</h2>
              <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>궁금하신 점을 남겨주시면 원장님이 직접 답변해 드립니다.</p>
            </div>
            
            <form onSubmit={handleQnaSubmit} className="booking-form" style={{ marginTop: '20px' }}>
              <div className="form-group" style={{ textAlign: 'left' }}>
                <label className="form-label">카테고리</label>
                <select 
                  className="form-select"
                  value={newQna.category}
                  onChange={(e) => setNewQna({...newQna, category: e.target.value})}
                >
                  <option value="detox">정원해독</option>
                  <option value="hyperhidrosis">다한증(수족/전신 등)</option>
                  <option value="diet">해독다이어트</option>
                  <option value="other">기타 문의</option>
                </select>
              </div>
              <div className="form-group" style={{ textAlign: 'left' }}>
                <label className="form-label">질문 내용</label>
                <textarea 
                  className="form-input" 
                  rows="5"
                  placeholder="증상이나 치료에 대해 궁금하신 점을 자유롭게 적어주세요."
                  value={newQna.question}
                  onChange={(e) => setNewQna({...newQna, question: e.target.value})}
                  required
                ></textarea>
              </div>
              <div className="form-group" style={{ textAlign: 'left' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.95rem' }}>
                  <input 
                    type="checkbox" 
                    checked={newQna.isSecret}
                    onChange={(e) => setNewQna({...newQna, isSecret: e.target.checked})}
                  />
                  비밀글로 작성하기 (작성자와 관리자만 볼 수 있습니다)
                </label>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '15px', fontSize: '1.1rem', marginTop: '10px' }}>
                질문 등록하기
              </button>
            </form>
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
      {/* MEGA MENU OVERLAY */}
      <div className={`mega-menu-overlay ${hoveredMenu ? 'active' : ''}`}></div>
      {/* Detox Step Modal */}
      {selectedDetoxStep && (
        <div className="modal-overlay" onClick={() => setSelectedDetoxStep(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <button className="modal-close" onClick={() => setSelectedDetoxStep(null)}>×</button>
            <div className="modal-header" style={{ marginBottom: '20px' }}>
              <div className="modal-icon" style={{ fontSize: '3rem', marginBottom: '10px' }}>{selectedDetoxStep.icon}</div>
              <div className="modal-subtitle" style={{ color: 'var(--primary-color)' }}>{selectedDetoxStep.stepNum}단계</div>
              <h2 className="modal-title" style={{ fontSize: '1.8rem' }}>{selectedDetoxStep.title}</h2>
            </div>
            <div className="modal-body" style={{ textAlign: 'center', padding: '10px 0' }}>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: 'var(--text-main)', wordBreak: 'keep-all' }}>
                {selectedDetoxStep.modalContent}
              </p>
            </div>
            <div className="form-submit" style={{ marginTop: '30px' }}>
              <button type="button" className="btn btn-primary" style={{ width: '100%' }} onClick={() => setSelectedDetoxStep(null)}>
                확인
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}

// ==========================================================================
// SpecialtyDetailPage Component (Detailed landing page for condition subtypes)
// ==========================================================================
function SpecialtyDetailPage({ 
  specialty, 
  onBack, 
  reviews, 
  getSpecialtyName, 
  setShowBookingModal, 
  setBookingForm, 
  bookingForm,
  qnaList,
  setShowQnaModal,
  setNewQna,
  loggedInUser,
  answeringQnaId,
  setAnsweringQnaId,
  qnaAnswerText,
  setQnaAnswerText,
  handleQnaAnswer
}) {
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

  const { problem, authority, shift, solution, objection, cta, timeline, pricing } = specialty.sixSteps;

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
                <div className="hero-ghibli-image-container" style={{ position: 'absolute', top: '-50px', bottom: '-70px', left: 0, right: '-50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img 
                    src={(() => {
                      if (specialty.id === 'sujok') {
                        if (activeTab === 'hand') return '/images/ghibli_sweaty_hands_1786840280563.jpg';
                        if (activeTab === 'foot') return '/images/ghibli_sweaty_feet_1786840228204.jpg';
                        return '/images/ghibli_sweaty_both_fixed_1786859540856.jpg';
                      }
                      if (specialty.id === 'du-myeon') {
                        if (activeTab === 'head') return '/images/ghibli_sweaty_head_1786858414579.jpg';
                        if (activeTab === 'face') return '/images/ghibli_sweaty_face_1786858424914.jpg';
                        return '/images/ghibli_sweaty_head_face_1786858400182.jpg';
                      }
                      if (specialty.id === 'sangche') return '/images/ghibli_sweaty_upper_1786858446561.jpg';
                      if (specialty.id === 'hache') return '/images/ghibli_sweaty_lower_1786858457417.jpg';
                      if (specialty.id === 'jeonsin') return '/images/ghibli_sweaty_whole_1786858470503.jpg';
                      if (specialty.id === 'bosangseong') return '/images/ghibli_sweaty_compensatory_1786858493740.jpg';
                      if (specialty.id === 'dohan') return '/images/ghibli_sweaty_night_1786858513250.jpg';
                      return '/images/ghibli_sweaty_general_1786858532513.jpg';
                    })()}
                    alt="불편한 상황"
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover', 
                      transition: 'opacity 0.3s ease',
                      maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 100%)',
                      WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 100%)'
                    }}
                  />
                </div>
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

      {/* 4.5 Timeline & Pricing & Self-Check */}
      {timeline && (
        <section className="funnel-section section-timeline">
          <div className="container">
            <h2 className="funnel-title" style={{ textAlign: 'center', marginBottom: '40px' }}>{timeline.title}</h2>
            <div className="timeline-container">
              {timeline.steps.map((step, idx) => (
                <div key={idx} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content glass-card">
                    <h4 className="timeline-step">{step.step} <span className="timeline-period">({step.period})</span></h4>
                    <p className="timeline-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {pricing && (
        <section className="funnel-section section-pricing">
          <div className="container">
            <div className="pricing-card glass-card">
              <h2 className="funnel-title" style={{ textAlign: 'center', marginBottom: '15px' }}>{pricing.title}</h2>
              <div className="pricing-amount">
                <span className="pricing-highlight">{pricing.description}</span>
              </div>
              <p className="pricing-subtext">{pricing.subtext}</p>
              <div className="pricing-action">
                <button 
                  className="btn btn-accent btn-pulse" 
                  onClick={() => window.open('https://pf.kakao.com', '_blank')}
                  style={{ fontSize: '1.2rem', padding: '15px 30px', marginTop: '20px' }}
                >
                  {pricing.btnText}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="funnel-section section-selfcheck-banner">
        <div className="container">
          <div className="selfcheck-banner glass-card" style={{ background: 'linear-gradient(135deg, rgba(74, 144, 226, 0.1), rgba(80, 227, 194, 0.1))', padding: '40px', borderRadius: '20px', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '15px', color: 'var(--text-main)' }}>내 다한증은 얼마나 심각할까?</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-light)', marginBottom: '30px' }}>단 1분만에 알아보는 AI 맞춤형 다한증 자가진단 테스트</p>
            <button 
              className="btn btn-primary btn-large btn-pulse"
              onClick={() => window.location.href = '?page=selfcheck'}
            >
              자가진단 테스트 시작하기
            </button>
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

          {/* 환자 Q&A 게시판 */}
          <div className="qna-board" style={{ marginTop: '50px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.5rem', margin: 0 }}>온라인 상담 / Q&A</h3>
              <button className="btn btn-primary btn-sm" onClick={() => {
                setNewQna({ category: specialty.id, question: '', isSecret: false });
                setShowQnaModal(true);
              }}>
                질문 남기기
              </button>
            </div>
            
            <div className="qna-list">
              {qnaList && qnaList.filter(q => q.category === specialty.id || q.category === 'all').length > 0 ? (
                qnaList.filter(q => q.category === specialty.id || q.category === 'all').map(q => (
                  <div key={q.id} className="qna-card" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', marginBottom: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', textAlign: 'left' }}>
                    <div className="qna-q" style={{ marginBottom: '15px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--text-main)', flex: 1, marginRight: '10px', wordBreak: 'keep-all' }}>
                          <span style={{ color: 'var(--primary-color)', marginRight: '5px' }}>Q.</span>
                          {q.isSecret ? (loggedInUser && (loggedInUser.includes('원장') || loggedInUser.includes('parkjeuk')) || loggedInUser === q.author ? q.question : '비밀글입니다. 작성자와 관리자만 볼 수 있습니다.') : q.question}
                        </span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{q.author} | {new Date(q.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    {q.isAnswered ? (
                      <div className="qna-a" style={{ backgroundColor: '#f9fbfd', padding: '15px', borderRadius: '8px', borderLeft: '4px solid var(--accent-color)' }}>
                        <span style={{ fontWeight: 'bold', color: 'var(--accent-color)', marginRight: '8px' }}>A.</span>
                        <span style={{ color: 'var(--text-main)', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{q.isSecret ? (loggedInUser && (loggedInUser.includes('원장') || loggedInUser.includes('parkjeuk')) || loggedInUser === q.author ? q.answer : '비밀글입니다.') : q.answer}</span>
                      </div>
                    ) : (
                      <div className="qna-a" style={{ backgroundColor: '#f9fbfd', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #e2e8f0' }}>
                        <span style={{ color: 'var(--text-light)' }}>원장님께서 확인 중입니다. 곧 답변이 달릴 예정입니다.</span>
                        {loggedInUser && (loggedInUser.includes('원장') || loggedInUser.includes('parkjeuk')) && (
                          <div style={{ marginTop: '15px' }}>
                            {answeringQnaId === q.id ? (
                              <div>
                                <textarea className="form-input" rows="4" value={qnaAnswerText} onChange={(e) => setQnaAnswerText(e.target.value)} placeholder="원장님 답변을 입력하세요"></textarea>
                                <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                                  <button className="btn btn-sm btn-accent" onClick={() => handleQnaAnswer(q.id)}>등록</button>
                                  <button className="btn btn-sm btn-outline" onClick={() => setAnsweringQnaId(null)}>취소</button>
                                </div>
                              </div>
                            ) : (
                              <button className="btn btn-sm btn-outline" onClick={() => {
                                setAnsweringQnaId(q.id);
                                setQnaAnswerText(q.answer || '');
                              }}>원장님 답변 달기 (관리자용)</button>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)', backgroundColor: '#f9fbfd', borderRadius: '12px' }}>
                  등록된 질문이 없습니다. 궁금한 점이 있으시면 언제든 남겨주세요!
                </div>
              )}
            </div>
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

export default App;
