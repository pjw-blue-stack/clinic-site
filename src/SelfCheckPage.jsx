import React, { useState } from 'react';
import './SelfCheckPage.css';

const SelfCheckPage = ({ onComplete }) => {
  const [step, setStep] = useState('intro'); // intro, category, q1, q2, q3, loading, result
  const [category, setCategory] = useState(null);
  const [score, setScore] = useState(0);

  const categories = [
    { id: 'hyperhidrosis', title: '다한증 (손발/전신땀)', icon: '💦' },
    { id: 'damjeok', title: '담적 (만성 소화불량)', icon: '🔥' },
    { id: 'detox', title: '해독 다이어트 (비만)', icon: '⚖️' }
  ];

  const questions = {
    hyperhidrosis: [
      { q: "땀이 주로 언제 많이 나나요?", options: [{ text: "긴장할 때나 덥지 않아도 수시로", score: 2 }, { text: "운동하거나 더울 때만", score: 0 }] },
      { q: "땀 때문에 일상생활에 지장이 있나요?", options: [{ text: "사람을 만나거나 물건을 잡기 힘들다", score: 2 }, { text: "약간 불편하지만 참을 만하다", score: 1 }] },
      { q: "수족냉증이나 가슴 두근거림을 동반하나요?", options: [{ text: "네, 손발이 차고 자주 두근거립니다", score: 2 }, { text: "아니요, 땀만 납니다", score: 0 }] }
    ],
    damjeok: [
      { q: "명치끝을 깊게 누르면 어떤가요?", options: [{ text: "딱딱한 덩어리가 만져지고 아프다", score: 2 }, { text: "말랑하고 통증이 없다", score: 0 }] },
      { q: "소화불량 외에 다른 증상이 있나요?", options: [{ text: "잦은 두통, 어지럼증, 만성피로가 있다", score: 2 }, { text: "속만 답답한 편이다", score: 1 }] },
      { q: "증상이 얼마나 오래되었나요?", options: [{ text: "6개월 이상 (만성)", score: 2 }, { text: "최근 1~2개월", score: 1 }] }
    ],
    detox: [
      { q: "살이 찌는 주된 원인이 무엇이라 생각하나요?", options: [{ text: "적게 먹어도 찌고 잘 붓는다", score: 2 }, { text: "야식이나 폭식 등 많이 먹어서", score: 1 }] },
      { q: "소화불량이나 변비가 자주 있나요?", options: [{ text: "항상 가스가 차고 화장실 가기 힘들다", score: 2 }, { text: "소화나 배변은 원활하다", score: 0 }] },
      { q: "다이어트 요요를 겪어보셨나요?", options: [{ text: "양약/단식 후 요요를 여러 번 겪었다", score: 2 }, { text: "이번이 처음이다", score: 0 }] }
    ]
  };

  const handleCategorySelect = (id) => {
    setCategory(id);
    setScore(0);
    setStep('q0');
  };

  const handleAnswer = (addedScore, qIndex) => {
    setScore(prev => prev + addedScore);
    const nextIndex = qIndex + 1;
    if (nextIndex < questions[category].length) {
      setStep(`q${nextIndex}`);
    } else {
      setStep('loading');
      setTimeout(() => {
        setStep('result');
      }, 2000); // 2 second loading for dramatic effect
    }
  };

  const renderResult = () => {
    let risk = "경계";
    let desc = "";
    let duration = "1~2개월";
    let catName = categories.find(c => c.id === category)?.title;

    if (score >= 5) {
      risk = "심각";
      desc = "체내 독소가 매우 깊이 쌓여 대사 통로가 막힌 상태입니다.";
      duration = "최소 3개월 ~ 6개월 집중 치료";
    } else if (score >= 3) {
      risk = "주의";
      desc = "독소가 쌓이기 시작하여 만성으로 넘어가는 단계입니다.";
      duration = "약 2~3개월 체질 개선";
    } else {
      risk = "초기";
      desc = "비교적 초기 단계로 가벼운 해독으로도 빠른 호전이 가능합니다.";
      duration = "약 1~2개월 해독 치료";
    }

    return (
      <div className="self-check-result">
        <h2>AI 분석 결과</h2>
        <div className={`risk-badge risk-${risk === '심각' ? 'high' : risk === '주의' ? 'med' : 'low'}`}>
          위험도: {risk} 단계
        </div>
        <p className="result-desc">
          환자분의 현재 {catName} 상태는 <strong>{desc}</strong>
        </p>
        <div className="duration-box">
          <p>권장 치료 기간</p>
          <h3>{duration}</h3>
        </div>
        
        <p className="cta-text">
          단순한 증상 완화가 아닌, <strong>'비우고 채우는' 정원해독 요법</strong>으로 근본적인 체질 개선이 필요합니다.<br/>
          지금 바로 카톡으로 정확한 내 맞춤 비용을 안내받아보세요.
        </p>
        
        <a href="https://pf.kakao.com/_yKxcUxl" target="_blank" rel="noreferrer" className="btn btn-kakao">
          💬 내 예상 비용 카톡으로 안내받기
        </a>
        <button className="btn btn-outline reset-btn" onClick={() => setStep('intro')}>
          테스트 다시 하기
        </button>
      </div>
    );
  };

  return (
    <div className="self-check-container">
      {step === 'intro' && (
        <div className="self-check-intro fade-in">
          <span className="step-badge">1분 자가진단</span>
          <h1>AI가 내 증상의 심각성을<br/>알려드립니다.</h1>
          <p>원장님 진료 전, 나와 비슷한 환자들의 데이터를 바탕으로<br/>예상 치료 기간과 위험도를 확인해보세요.</p>
          <button className="btn btn-accent start-btn" onClick={() => setStep('category')}>
            테스트 시작하기 🚀
          </button>
        </div>
      )}

      {step === 'category' && (
        <div className="self-check-category fade-in">
          <h2>어떤 증상이 가장 불편하신가요?</h2>
          <div className="category-grid">
            {categories.map(c => (
              <button key={c.id} className="category-card" onClick={() => handleCategorySelect(c.id)}>
                <span className="category-icon">{c.icon}</span>
                <span className="category-title">{c.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step.startsWith('q') && (
        <div className="self-check-question fade-in">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((parseInt(step.charAt(1)) + 1) / questions[category].length) * 100}%` }}
            ></div>
          </div>
          <span className="question-count">
            질문 {parseInt(step.charAt(1)) + 1} / {questions[category].length}
          </span>
          <h2>{questions[category][parseInt(step.charAt(1))].q}</h2>
          <div className="options-list">
            {questions[category][parseInt(step.charAt(1))].options.map((opt, idx) => (
              <button key={idx} className="option-btn" onClick={() => handleAnswer(opt.score, parseInt(step.charAt(1)))}>
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'loading' && (
        <div className="self-check-loading fade-in">
          <div className="spinner"></div>
          <h2>AI가 환자분의 증상을 분석 중입니다...</h2>
          <p>수천 건의 임상 데이터를 바탕으로 위험도를 계산하고 있습니다.</p>
        </div>
      )}

      {step === 'result' && (
        <div className="fade-in">
          {renderResult()}
        </div>
      )}
    </div>
  );
};

export default SelfCheckPage;
