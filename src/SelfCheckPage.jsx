import React, { useState } from 'react';
import './SelfCheckPage.css';

const SelfCheckPage = ({ onComplete }) => {
  const [step, setStep] = useState('intro'); // intro, q0, q1, q2, loading, result
  const [score, setScore] = useState(0);

  const questions = [
    { q: "땀이 주로 언제 많이 나나요?", options: [{ text: "긴장할 때나 덥지 않아도 수시로", score: 2 }, { text: "운동하거나 더울 때만", score: 0 }] },
    { q: "땀 때문에 일상생활에 지장이 있나요?", options: [{ text: "사람을 만나거나 물건을 잡기 힘들다", score: 2 }, { text: "약간 불편하지만 참을 만하다", score: 1 }] },
    { q: "수족냉증이나 가슴 두근거림을 동반하나요?", options: [{ text: "네, 손발이 차고 자주 두근거립니다", score: 2 }, { text: "아니요, 땀만 납니다", score: 0 }] }
  ];

  const handleStart = () => {
    setScore(0);
    setStep('q0');
  };

  const handleAnswer = (addedScore, qIndex) => {
    setScore(prev => prev + addedScore);
    const nextIndex = qIndex + 1;
    if (nextIndex < questions.length) {
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

    if (score >= 5) {
      risk = "심각";
      desc = "체내 자율신경계 교란이 심하고 열독이 매우 깊이 쌓인 상태입니다.";
      duration = "최소 3개월 ~ 6개월 집중 치료";
    } else if (score >= 3) {
      risk = "주의";
      desc = "표면적인 다한증을 넘어 만성 체질 불균형으로 진행되는 단계입니다.";
      duration = "약 2~3개월 체질 개선";
    } else {
      risk = "초기";
      desc = "비교적 초기 단계로 정원해독을 통한 빠른 자율신경 안정화가 가능합니다.";
      duration = "약 1~2개월 해독 치료";
    }

    return (
      <div className="self-check-result">
        <h2>AI 분석 결과</h2>
        <div className={`risk-badge risk-${risk === '심각' ? 'high' : risk === '주의' ? 'med' : 'low'}`}>
          위험도: {risk} 단계
        </div>
        <p className="result-desc">
          환자분의 현재 다한증 상태는 <strong>{desc}</strong>
        </p>
        <div className="duration-box">
          <p>권장 치료 기간</p>
          <h3>{duration}</h3>
        </div>
        
        <p className="cta-text">
          단순히 땀샘을 막는 것이 아닌, <strong>'비우고 채우는' 정원해독 요법</strong>으로 근본적인 자율신경계 회복이 필요합니다.<br/>
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
          <h1>AI가 내 다한증의 심각성을<br/>알려드립니다.</h1>
          <p>원장님 진료 전, 나와 비슷한 환자들의 데이터를 바탕으로<br/>예상 치료 기간과 위험도를 확인해보세요.</p>
          <button className="btn btn-accent start-btn" onClick={handleStart}>
            테스트 시작하기 🚀
          </button>
        </div>
      )}

      {step.startsWith('q') && (
        <div className="self-check-question fade-in">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((parseInt(step.charAt(1)) + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <span className="question-count">
            질문 {parseInt(step.charAt(1)) + 1} / {questions.length}
          </span>
          <h2>{questions[parseInt(step.charAt(1))].q}</h2>
          <div className="options-list">
            {questions[parseInt(step.charAt(1))].options.map((opt, idx) => (
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
          <p>수천 건의 다한증 임상 데이터를 바탕으로 위험도를 계산하고 있습니다.</p>
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
