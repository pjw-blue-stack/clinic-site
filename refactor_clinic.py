import re

with open('src/App.jsx', 'r') as f:
    lines = f.readlines()

# 1. Add isClinicPage state
for i, line in enumerate(lines):
    if 'const [isReviewPage, setIsReviewPage] = useState(false);' in line:
        lines.insert(i + 1, '  const [isClinicPage, setIsClinicPage] = useState(false);\n')
        break

# 2. Update scrollToSection
for i, line in enumerate(lines):
    if 'setIsReviewPage(false);' in line and 'setSelectedColumn(null);' in lines[i-1]:
        lines.insert(i + 1, '    setIsClinicPage(false);\n')
        break

# 3. Cut section id="booking"
start_idx = -1
end_idx = -1
for i, line in enumerate(lines):
    if '<section id="booking"' in line:
        start_idx = i - 1 # Include comment
    elif '</main>' in line and start_idx != -1: 
        # Find the closing </section> of booking
        for j in range(i, start_idx, -1):
            if '</section>' in lines[j]:
                end_idx = j + 1
                break
        if end_idx != -1:
            break

if start_idx != -1 and end_idx != -1:
    booking_code = lines[start_idx:end_idx]
    del lines[start_idx:end_idx]
else:
    print("Could not find booking section")
    exit(1)

# 4. Inject into the main ternary right before isReviewPage
inject_idx = -1
for i, line in enumerate(lines):
    if '        ) : isReviewPage ? (' in line:
        inject_idx = i
        break

if inject_idx != -1:
    lines[inject_idx] = '        ) : isClinicPage ? (\n'
    
    wrapper_code = [
        '          <div className="clinic-page-wrapper" style={{ paddingTop: "80px", minHeight: "100vh", backgroundColor: "var(--bg-color)" }}>\n',
        '            <div className="container" style={{ paddingBottom: "40px" }}>\n',
        '              <div className="section-header" style={{ marginBottom: "40px" }}>\n',
        '                <span className="section-badge">Clinic Info</span>\n',
        '                <h2 className="section-title">경희정원한의원 소개</h2>\n',
        '              </div>\n',
        '              \n',
        '              {/* 원장 인사말 */}\n',
        '              <div className="detail-letter-grid" style={{ marginBottom: "60px" }}>\n',
        '                <div className="letter-box">\n',
        '                  <div className="letter-header">\n',
        '                    ✉️ 19년 다한증 해독 명의 박제욱 원장이 드리는 편지\n',
        '                  </div>\n',
        '                  <div className="letter-body">\n',
        '                    <p>\n',
        '                      안녕하십니까. 목동에서 14년째 한 자리를 지키며, 다한증 이웃들의 눅눅하고 시린 일상을 함께 고민해 온 <strong>경희정원한의원 대표원장 박제욱</strong>입니다.\n',
        '                    </p>\n',
        '                    <p>\n',
        '                      누군가와 손을 잡거나 악수하는 평범한 일상이 두려움으로 변하고, 계절에 맞지 않게 옷이 축축하게 젖어버리는 절망감... \n',
        '                      그 고통이 매일의 삶을 얽매는 감옥과 같다는 사실을 19년 동안 마주하며 누구보다 잘 알고 있습니다.\n',
        '                    </p>\n',
        '                    <p>\n',
        '                      오늘 이 글을 통해, 겉의 땀구멍만 물리적으로 막아두는 방법이 아닌 <strong>몸속에 누적된 열독과 순환 장애의 근본 독소를 비워내어</strong> 자율신경계가 자연스러운 조절력을 되찾게 돕는 해독의 본질을 밝혀드리고자 합니다.\n',
        '                    </p>\n',
        '                  </div>\n',
        '                  <div className="letter-signature">\n',
        '                    경희정원한의원 대표원장 <strong>박제욱 드림</strong>\n',
        '                  </div>\n',
        '                </div>\n',
        '\n',
        '                <div className="director-profile-card">\n',
        '                  <div className="director-avatar-box">👨‍⚕️</div>\n',
        '                  <div className="director-title-box">\n',
        '                    <h3>박제욱 대표원장</h3>\n',
        '                    <p>경희대 한의과대학 졸 / 경희의료원 수련의</p>\n',
        '                  </div>\n',
        '                  <div className="authority-badge-grid">\n',
        '                    <div className="authority-badge-card">\n',
        '                      <span className="badge-stat">19년</span>\n',
        '                      <span className="badge-label">임상 진료 경력</span>\n',
        '                    </div>\n',
        '                    <div className="authority-badge-card">\n',
        '                      <span className="badge-stat">3,800+</span>\n',
        '                      <span className="badge-label">만성병 완치</span>\n',
        '                    </div>\n',
        '                  </div>\n',
        '                </div>\n',
        '              </div>\n',
        '\n',
        '              {/* 다한증 칼럼 미리보기 */}\n',
        '              <div className="clinic-columns-preview" style={{ marginBottom: "60px" }}>\n',
        '                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "20px" }}>\n',
        '                  <h3 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>📚 최근 다한증 건강 칼럼</h3>\n',
        '                  <button className="btn btn-outline" style={{ padding: "8px 16px", fontSize: "0.9rem" }} onClick={() => { setIsClinicPage(false); setIsColumnPage(true); window.scrollTo(0,0); }}>전체 칼럼 보기 →</button>\n',
        '                </div>\n',
        '                <div className="columns-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>\n',
        '                  {columns.slice(0, 3).map(col => (\n',
        '                    <div key={col.id} className="column-card" onClick={() => { setIsClinicPage(false); setIsColumnPage(true); setSelectedColumn(col); window.scrollTo(0,0); }}>\n',
        '                      <div className="column-card-icon">{col.icon}</div>\n',
        '                      <div className="column-card-content">\n',
        '                        <span className="column-card-category">{col.category}</span>\n',
        '                        <h4 className="column-card-title">{col.title}</h4>\n',
        '                        <p className="column-card-summary">{col.summary}</p>\n',
        '                        <div className="column-card-footer">\n',
        '                          <span>{col.date}</span>\n',
        '                          <span style={{ color: "var(--accent-color)" }}>자세히 읽기 →</span>\n',
        '                        </div>\n',
        '                      </div>\n',
        '                    </div>\n',
        '                  ))}\n',
        '                </div>\n',
        '              </div>\n',
        '\n',
        '              {/* SNS 링크 */}\n',
        '              <div className="clinic-sns-section" style={{ marginBottom: "60px", backgroundColor: "#fff", padding: "40px", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", textAlign: "center" }}>\n',
        '                <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "30px" }}>정원한의원 소식 만나보기</h3>\n',
        '                <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>\n',
        '                  <a href="https://blog.naver.com/pjwblue8282" target="_blank" rel="noreferrer" className="sns-link-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", textDecoration: "none", color: "var(--text-main)", padding: "20px", borderRadius: "12px", border: "1px solid #eee", width: "140px", transition: "all 0.3s ease" }}>\n',
        '                    <div style={{ fontSize: "2.5rem", color: "#03C75A" }}>🟩</div>\n',
        '                    <span style={{ fontWeight: "600" }}>네이버 블로그</span>\n',
        '                  </a>\n',
        '                  <a href="https://cafe.naver.com/" target="_blank" rel="noreferrer" className="sns-link-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", textDecoration: "none", color: "var(--text-main)", padding: "20px", borderRadius: "12px", border: "1px solid #eee", width: "140px", transition: "all 0.3s ease" }}>\n',
        '                    <div style={{ fontSize: "2.5rem", color: "#03C75A" }}>☕</div>\n',
        '                    <span style={{ fontWeight: "600" }}>네이버 카페</span>\n',
        '                  </a>\n',
        '                  <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="sns-link-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", textDecoration: "none", color: "var(--text-main)", padding: "20px", borderRadius: "12px", border: "1px solid #eee", width: "140px", transition: "all 0.3s ease" }}>\n',
        '                    <div style={{ fontSize: "2.5rem", color: "#E1306C" }}>📷</div>\n',
        '                    <span style={{ fontWeight: "600" }}>인스타그램</span>\n',
        '                  </a>\n',
        '                </div>\n',
        '              </div>\n',
        '            </div>\n'
    ]
    wrapper_code.extend(booking_code)
    wrapper_code.append('          </div>\n')
    wrapper_code.append('        ) : isReviewPage ? (\n')
    
    lines[inject_idx+1:inject_idx+1] = wrapper_code
else:
    print("Could not find inject location")
    exit(1)

with open('src/App.jsx', 'w') as f:
    f.writelines(lines)
print("Refactored structure")
