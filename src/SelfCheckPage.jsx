import React, { useState, useRef, useEffect } from 'react';
import { db, functions } from './firebase';
import { collection, addDoc, updateDoc, doc, serverTimestamp, arrayUnion } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import './SelfCheckPage.css';

const SelfCheckPage = ({ onComplete }) => {
  const [step, setStep] = useState(() => sessionStorage.getItem('selfCheckStep') || 'intro');
  const [score, setScore] = useState(() => Number(sessionStorage.getItem('selfCheckScore')) || 0);
  const [answerHistory, setAnswerHistory] = useState(() => JSON.parse(sessionStorage.getItem('selfCheckHistory') || '[]'));
  const [globalQuestionCount, setGlobalQuestionCount] = useState(() => {
    const storedDate = localStorage.getItem('aiQuestionsDate');
    const today = new Date().toDateString();
    if (storedDate !== today) {
      localStorage.setItem('aiQuestionsDate', today);
      localStorage.setItem('totalAiQuestions', '0');
      return 0;
    }
    return Number(localStorage.getItem('totalAiQuestions')) || 0;
  });

  // AI Chat States
  const [showChat, setShowChat] = useState(() => sessionStorage.getItem('selfCheckShowChat') === 'true');
  const [messages, setMessages] = useState(() => JSON.parse(sessionStorage.getItem('selfCheckMessages') || '[]'));
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [consultationId, setConsultationId] = useState(() => sessionStorage.getItem('selfCheckConsultId') || null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isChatLoading]);

  useEffect(() => {
    sessionStorage.setItem('selfCheckStep', step);
    sessionStorage.setItem('selfCheckScore', score);
    sessionStorage.setItem('selfCheckHistory', JSON.stringify(answerHistory));
    sessionStorage.setItem('selfCheckShowChat', showChat);
    sessionStorage.setItem('selfCheckMessages', JSON.stringify(messages));
    if (consultationId) sessionStorage.setItem('selfCheckConsultId', consultationId);
  }, [step, score, answerHistory, showChat, messages, consultationId]);

  useEffect(() => {
    const handlePopState = (e) => {
      if (e.state && e.state.step) {
        setStep(e.state.step);
        setScore(e.state.score || 0);
        setAnswerHistory(e.state.answerHistory || []);
      } else {
        setStep('intro');
        setScore(0);
        setAnswerHistory([]);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept backspace if the user is typing in an input/textarea
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key === 'Backspace') {
        e.preventDefault(); // Unconditionally prevent browser history back
        if (step.startsWith('q')) {
          const currentIdx = parseInt(step.replace('q', ''));
          if (currentIdx > 0) {
            window.history.back();
          } else if (currentIdx === 0) {
            window.history.back();
          }
        } else if (step === 'result' && !showChat) {
          window.history.back();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step, showChat]);

  const handleReset = () => {
    setStep('intro');
    setScore(0);
    setAnswerHistory([]);
    setShowChat(false);
    setMessages([]);
    setConsultationId(null);
    sessionStorage.removeItem('selfCheckStep');
    sessionStorage.removeItem('selfCheckScore');
    sessionStorage.removeItem('selfCheckHistory');
    sessionStorage.removeItem('selfCheckShowChat');
    sessionStorage.removeItem('selfCheckMessages');
    sessionStorage.removeItem('selfCheckConsultId');
  };

  const questions = [
    { q: "땀이 주로 언제 많이 나나요?", options: [{ text: "긴장할 때나 덥지 않아도 수시로", score: 2 }, { text: "운동하거나 더울 때만", score: 0 }] },
    { q: "땀 때문에 일상생활에 지장이 있나요?", options: [{ text: "사람을 만나거나 물건을 잡기 힘들다", score: 2 }, { text: "약간 불편하지만 참을 만하다", score: 1 }] },
    { q: "수족냉증이나 가슴 두근거림을 동반하나요?", options: [{ text: "네, 손발이 차고 자주 두근거립니다", score: 2 }, { text: "아니요, 땀만 납니다", score: 0 }] }
  ];

  const handleStart = () => {
    setScore(0);
    setAnswerHistory([]);
    setStep('q0');
    window.history.pushState({ step: 'q0', score: 0, answerHistory: [] }, '');
  };

  const handleAnswer = (addedScore, qIndex) => {
    const nextScore = score + addedScore;
    const nextHistory = [...answerHistory, addedScore];
    setScore(nextScore);
    setAnswerHistory(nextHistory);
    
    const nextIndex = qIndex + 1;
    if (nextIndex < questions.length) {
      const nextStep = `q${nextIndex}`;
      setStep(nextStep);
      window.history.pushState({ step: nextStep, score: nextScore, answerHistory: nextHistory }, '');
    } else {
      setStep('loading');
      setTimeout(() => {
        setStep('result');
        window.history.pushState({ step: 'result', score: nextScore, answerHistory: nextHistory }, '');
      }, 2000);
    }
  };

  const startChat = async (riskDesc, riskCategory, durationStr) => {
    setShowChat(true);
    const initialMessage = {
      role: 'ai',
      content: `안녕하세요 환자분, 경희 정원 AI 상담입니다. 자가진단 결과 다한증 상태가 [${riskCategory}] 단계로 의심되며, ${durationStr}가 권장됩니다. 결과에 대해 더 궁금한 점이 있으시다면 편하게 질문해주세요.`
    };
    setMessages([initialMessage]);

    try {
      const docRef = await addDoc(collection(db, 'ai_consultations'), {
        score: score,
        risk: riskCategory,
        resultDesc: riskDesc,
        createdAt: serverTimestamp(),
        messages: [initialMessage]
      });
      setConsultationId(docRef.id);
    } catch (e) {
      console.error("Error creating consultation doc:", e);
    }
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isChatLoading) return;
    
    const userMsg = chatInput.trim();
    setChatInput('');
    setIsChatLoading(true);

    const newGlobalCount = globalQuestionCount + 1;
    setGlobalQuestionCount(newGlobalCount);
    localStorage.setItem('totalAiQuestions', newGlobalCount.toString());

    const newMessages = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);

    if (consultationId) {
      await updateDoc(doc(db, 'ai_consultations', consultationId), {
        messages: arrayUnion({ role: 'user', content: userMsg }),
        lastUpdatedAt: serverTimestamp()
      });
    }

    try {
      const chatWithGemini = httpsCallable(functions, 'chatWithGemini');
      const response = await chatWithGemini({
        messages: newMessages,
        scoreResult: score,
        specialty: '다한증 전신' // 기본값, 실제로는 특화 부위를 넣으면 더 좋습니다.
      });

      const aiMsg = response.data.reply;
      setMessages(prev => [...prev, { role: 'ai', content: aiMsg }]);

      if (consultationId) {
        await updateDoc(doc(db, 'ai_consultations', consultationId), {
          messages: arrayUnion({ role: 'ai', content: aiMsg }),
          lastUpdatedAt: serverTimestamp()
        });
      }
    } catch (error) {
      console.error("Chat error:", error);
      const now = new Date();
      now.setMinutes(now.getMinutes() + 2);
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      
      const errorMsg = `현재 다른 환자분들을 상담하느라 잠시 AI 상담 한도가 다 찼습니다. 약 ${hours}시 ${minutes}분 경에 다시 질문을 남겨주시면 감사하겠습니다.`;
      setMessages(prev => [...prev, { role: 'ai', content: errorMsg }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
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
        
        {!showChat ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginTop: '30px' }}>
            <p className="cta-text" style={{ margin: 0 }}>
              결과에 대해 궁금한 점이 있으신가요?<br/>
              <strong>경희 정원 AI</strong>에게 무료로 상담 받아보세요!
            </p>
            
            <button 
              className="pulse-btn" 
              style={{ 
                width: 'auto', 
                minWidth: '280px',
                padding: '16px 32px', 
                fontSize: '1.2rem',
                borderRadius: '30px',
                background: 'linear-gradient(135deg, var(--primary-color), var(--primary-dark))', 
                border: 'none', 
                color: '#ffffff', 
                fontWeight: 'bold',
                cursor: 'pointer',
                marginBottom: '10px'
              }} 
              onClick={() => startChat(desc, risk, duration)}
            >
              🩺 실시간 AI 상담 시작하기
            </button>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', alignItems: 'center' }}>
              <a href="http://pf.kakao.com/_hjWxaE/chat" target="_blank" rel="noreferrer" className="chat-action-btn btn-kakao-action" style={{ width: 'auto', minWidth: '280px', margin: 0 }}>
                💬 카카오톡으로 자세한 상담받기
              </a>
              <a href="http://talk.naver.com/w4xpjd?frm=mnmb&frm=nmb_detail" target="_blank" rel="noreferrer" className="chat-action-btn btn-naver-action" style={{ width: 'auto', minWidth: '280px', margin: 0 }}>
                N 네이버 톡톡으로 자세한 상담받기
              </a>
              <a href="/?page=clinic" className="chat-action-btn" style={{ background: '#005b9f', color: '#fff', width: 'auto', minWidth: '280px', margin: 0 }}>
                📝 홈페이지 Q&A 게시판에 문의하기
              </a>
              <button 
                className="chat-action-btn btn-reset-action" 
                style={{ width: 'auto', minWidth: '280px', margin: 0 }}
                onClick={handleReset}
              >
                테스트 다시 하기
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="chat-container">
              <div className="chat-header">
                <span style={{ fontSize: '1.5rem' }}>🩺</span>
                <h3>경희 정원 AI 상담</h3>
              </div>
              <div className="chat-messages" ref={chatContainerRef}>
                {messages.map((m, idx) => (
                  <div key={idx} className={`chat-message ${m.role}`}>
                    {m.content}
                  </div>
                ))}
                {isChatLoading && (
                  <div className="chat-message ai">
                    <div className="chat-typing-indicator">
                      <div className="chat-typing-dot"></div>
                      <div className="chat-typing-dot"></div>
                      <div className="chat-typing-dot"></div>
                    </div>
                  </div>
                )}
              </div>
              <div className="chat-input-area">
                <textarea 
                  className="chat-input"
                  rows={2}
                  placeholder={globalQuestionCount >= 10 ? "10개의 질문을 다 하셨습니다. 더 궁금하신 점 있으시면, 아래 버튼을 클릭하셔서, 의문점을 말끔히 해소해보세요." : "궁금한 점을 자유롭게 물어보세요..."} 
                  value={chatInput} 
                  onChange={e => setChatInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={globalQuestionCount >= 10}
                />
                <button className="chat-send-btn" onClick={handleSendMessage} disabled={isChatLoading || !chatInput.trim() || globalQuestionCount >= 10}>
                  전송
                </button>
              </div>
            </div>
            
            <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem', color: '#666', lineHeight: '1.6', padding: '0 10px' }}>
              * 원활한 상담을 위해 AI 채팅은 <strong>최대 10회</strong>까지만 가능합니다.<br/>
              더 궁금한 점이 있으시다면 <strong>카카오톡, 네이버톡톡</strong> 또는 <strong>온라인 Q&A 게시판</strong>을 이용해주세요!
            </div>
            
            <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="http://pf.kakao.com/_hjWxaE/chat" target="_blank" rel="noreferrer" className="chat-action-btn btn-kakao-action">
                💬 카카오톡으로 자세한 상담받기
              </a>
              <a href="http://talk.naver.com/w4xpjd?frm=mnmb&frm=nmb_detail" target="_blank" rel="noreferrer" className="chat-action-btn btn-naver-action">
                N 네이버 톡톡으로 자세한 상담받기
              </a>
              <a href="/?page=clinic" className="chat-action-btn" style={{ background: '#005b9f', color: '#fff' }}>
                📝 홈페이지 Q&A 게시판에 문의하기
              </a>
              <button className="chat-action-btn btn-reset-action" onClick={handleReset}>
                테스트 다시 하기
              </button>
            </div>
          </>
        )}
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
