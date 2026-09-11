import re

with open("src/App.jsx", "r") as f:
    content = f.read()

# Replace the login button in the header nav
old_nav_block = """            ) : (
              <button className="btn btn-outline" onClick={() => setShowLoginModal(true)}>
                로그인
              </button>
            )}"""

new_nav_block = """            ) : (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn btn-outline" onClick={() => setPage('login')}>로그인</button>
                <button className="btn btn-primary" onClick={() => setPage('signup')}>회원가입</button>
              </div>
            )}"""

content = content.replace(old_nav_block, new_nav_block)

# Update MyPage button for logged in user
old_user_block = """                )}
                <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={handleLogout}>
                  로그아웃
                </button>
              </div>
            ) : ("""

new_user_block = """                )}
                <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => setPage('mypage')}>
                  마이페이지
                </button>
                <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={handleLogout}>
                  로그아웃
                </button>
              </div>
            ) : ("""

content = content.replace(old_user_block, new_user_block)

# Remove showLoginModal state if present
content = re.sub(r'const \[showLoginModal, setShowLoginModal\] = useState\(false\);\n?', '', content)

# Remove the old handleSocialLogin that references showLoginModal
content = re.sub(r'const handleSocialLogin = async \(platform\).*?alert\(`\$\{platform\} 로그인은 현재 준비 중입니다\..*?\}\n', '', content, flags=re.DOTALL)

# Find and replace all onClick={() => setShowLoginModal(true)} to onClick={() => setPage('login')}
content = content.replace("onClick={() => setShowLoginModal(true)}", "onClick={() => setPage('login')}")

with open("src/App.jsx", "w") as f:
    f.write(content)
