import React from 'react';

const JahanDetail = ({ specialty, onBook }) => {
  if (!specialty) return null;

  return (
    <main className="main-content" style={{ backgroundColor: '#fffbf5', color: '#333' }}>
      {/* Hero Section */}
      <section style={{ 
        padding: '100px 20px 60px', 
        textAlign: 'center', 
        background: 'linear-gradient(to bottom, #fff4e6, #fffbf5)' 
      }}>
        <div className="container">
          <span style={{ 
            display: 'inline-block', 
            padding: '8px 16px', 
            backgroundColor: '#ffb347', 
            color: '#fff', 
            borderRadius: '20px',
            fontWeight: 'bold',
            marginBottom: '20px'
          }}>
            정원해독 식은땀 클리닉
          </span>
          <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '20px', color: '#5c4322' }}>
            {specialty.title}
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#8c7355', maxWidth: '600px', margin: '0 auto 40px', lineHeight: '1.6' }}>
            {specialty.subtitle}
          </p>
          <div style={{ fontSize: '5rem', marginBottom: '30px' }}>{specialty.icon}</div>
        </div>
      </section>

      {/* Cause Section */}
      <section style={{ padding: '80px 20px' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.2rem', color: '#5c4322', marginBottom: '30px' }}>
            {specialty.sixSteps.problem.title}
          </h2>
          <h3 style={{ fontSize: '1.5rem', color: '#d97706', marginBottom: '20px' }}>
            "{specialty.sixSteps.problem.copy}"
          </h3>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#665' }}>
            {specialty.sixSteps.problem.desc}
          </p>
        </div>
      </section>

      {/* Core Shift */}
      <section style={{ padding: '80px 20px', backgroundColor: '#fdf8f5' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '40px',
            alignItems: 'center'
          }}>
            <div style={{ padding: '40px', backgroundColor: '#fff', borderRadius: '20px', boxShadow: '0 10px 30px rgba(92, 67, 34, 0.05)' }}>
              <h3 style={{ color: '#d97706', marginBottom: '15px', fontSize: '1.3rem' }}>잘못된 접근</h3>
              <h4 style={{ fontSize: '1.8rem', marginBottom: '20px', color: '#333' }}>땀을 억지로 막는 것</h4>
              <p style={{ color: '#665', lineHeight: '1.6' }}>
                자한증은 열이 나서 나는 땀이 아닙니다. 기운이 허해져 땀구멍이 닫히지 않는 '기허(氣虛)' 상태입니다. 억제제로 막으면 속은 더 허해집니다.
              </p>
            </div>
            <div style={{ padding: '40px', backgroundColor: '#5c4322', borderRadius: '20px', color: '#fff', boxShadow: '0 10px 30px rgba(92, 67, 34, 0.15)' }}>
              <h3 style={{ color: '#ffb347', marginBottom: '15px', fontSize: '1.3rem' }}>정원해독의 정답</h3>
              <h4 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>{specialty.sixSteps.shift.copy}</h4>
              <p style={{ color: '#eed', lineHeight: '1.6' }}>
                {specialty.sixSteps.shift.desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section style={{ padding: '80px 20px' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.2rem', color: '#5c4322', marginBottom: '20px' }}>
            {specialty.sixSteps.solution.title}
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#d97706', marginBottom: '50px' }}>
            {specialty.sixSteps.solution.copy}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            {specialty.sixSteps.solution.desc.split('\\n').map((item, i) => (
              <div key={i} style={{ 
                padding: '25px', 
                backgroundColor: '#fff', 
                borderRadius: '15px', 
                borderLeft: '5px solid #d97706',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                fontSize: '1.1rem',
                fontWeight: '500',
                color: '#5c4322'
              }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '80px 20px', backgroundColor: '#fdf8f5' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.2rem', color: '#5c4322', marginBottom: '40px', textAlign: 'center' }}>
            {specialty.sixSteps.objection.title}
          </h2>
          {specialty.sixSteps.objection.faqs.map((faq, i) => (
            <div key={i} style={{ marginBottom: '30px', backgroundColor: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.03)' }}>
              <h4 style={{ fontSize: '1.2rem', color: '#d97706', marginBottom: '15px', lineHeight: '1.5' }}>
                {faq.q.replace('#### ', '')}
              </h4>
              <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: '1.7' }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 20px', textAlign: 'center', backgroundColor: '#fffbf5' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', color: '#5c4322', marginBottom: '20px' }}>
            식은땀, 더 이상 참지 마세요.
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#8c7355', marginBottom: '40px' }}>
            정원해독의 보양 솔루션으로 잃어버린 활력을 되찾아 드립니다.
          </p>
          <button 
            onClick={onBook}
            style={{
              padding: '15px 40px',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              backgroundColor: '#d97706',
              color: '#fff',
              border: 'none',
              borderRadius: '30px',
              cursor: 'pointer',
              boxShadow: '0 10px 25px rgba(217, 119, 6, 0.3)',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            원장님과 상담하기
          </button>
        </div>
      </section>
    </main>
  );
};

export default JahanDetail;
