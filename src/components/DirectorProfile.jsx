import React from 'react';

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

export default DirectorProfile;
