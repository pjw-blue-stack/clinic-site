import re

with open("src/App.jsx", "r") as f:
    content = f.read()

# 1. Add imports for new pages
import_pages = "import LoginPage from './pages/LoginPage';\nimport SignupPage from './pages/SignupPage';\nimport MyPage from './pages/MyPage';\n"
content = content.replace("import AdminPage from './pages/AdminPage';", import_pages + "import AdminPage from './pages/AdminPage';")

# 2. Add auth guard to QnA and Review writing
# Currently: onClick={() => setShowQnaModal(true)}
content = content.replace(
    "onClick={() => setShowQnaModal(true)}",
    "onClick={() => { if(!loggedInUser) { alert('로그인이 필요한 서비스입니다.'); setPage('login'); } else { setShowQnaModal(true); } }}"
)
# For reviews: onClick={() => setShowReviewModal(true)}
content = content.replace(
    "onClick={() => setShowReviewModal(true)}",
    "onClick={() => { if(!loggedInUser) { alert('로그인이 필요한 서비스입니다.'); setPage('login'); } else { setShowReviewModal(true); } }}"
)

# 3. Update Header Navigation (Login -> My Page / Logout, etc)
old_nav = """          <div className="nav-links">
            <a href="#specialties" onClick={(e) => {e.preventDefault(); setPage('home'); document.getElementById('specialties')?.scrollIntoView({behavior: 'smooth'})}}>진료과목</a>
            <a href="#announcements" onClick={(e) => {e.preventDefault(); setPage('home'); document.getElementById('announcements')?.scrollIntoView({behavior: 'smooth'})}}>공지/칼럼</a>
            <a href="#reviews" onClick={(e) => {e.preventDefault(); setPage('home'); document.getElementById('reviews')?.scrollIntoView({behavior: 'smooth'})}}>치료후기</a>
            <a href="#qna" onClick={(e) => {e.preventDefault(); setPage('home'); document.getElementById('qna')?.scrollIntoView({behavior: 'smooth'})}}>Q&A</a>
            <a href="#location" onClick={(e) => {e.preventDefault(); setPage('home'); document.getElementById('location')?.scrollIntoView({behavior: 'smooth'})}}>오시는길</a>
            {loggedInUser ? (
              <div className="user-menu">
                <span className="user-email">{loggedInUser}</span>
                {(loggedInUser.includes('원장') || loggedInUser.includes('parkjeuk')) && (
                  <button className="btn btn-outline admin-btn" onClick={() => setPage('admin')}>관리자 메뉴</button>
                )}
                <button className="btn btn-outline" onClick={handleLogout}>로그아웃</button>
              </div>
            ) : (
              <button className="btn btn-outline" onClick={() => setShowLoginModal(true)}>로그인</button>
            )}
          </div>"""

new_nav = """          <div className="nav-links">
            <a href="#specialties" onClick={(e) => {e.preventDefault(); setPage('home'); document.getElementById('specialties')?.scrollIntoView({behavior: 'smooth'})}}>진료과목</a>
            <a href="#announcements" onClick={(e) => {e.preventDefault(); setPage('home'); document.getElementById('announcements')?.scrollIntoView({behavior: 'smooth'})}}>공지/칼럼</a>
            <a href="#reviews" onClick={(e) => {e.preventDefault(); setPage('home'); document.getElementById('reviews')?.scrollIntoView({behavior: 'smooth'})}}>치료후기</a>
            <a href="#qna" onClick={(e) => {e.preventDefault(); setPage('home'); document.getElementById('qna')?.scrollIntoView({behavior: 'smooth'})}}>Q&A</a>
            <a href="#location" onClick={(e) => {e.preventDefault(); setPage('home'); document.getElementById('location')?.scrollIntoView({behavior: 'smooth'})}}>오시는길</a>
            {currentUser ? (
              <div className="user-menu">
                <button className="btn btn-primary" onClick={() => setPage('mypage')}>마이페이지</button>
                {(loggedInUser && (loggedInUser.includes('원장') || loggedInUser.includes('parkjeuk'))) && (
                  <button className="btn btn-outline admin-btn" onClick={() => setPage('admin')}>관리자 메뉴</button>
                )}
                <button className="btn btn-outline" onClick={handleLogout}>로그아웃</button>
              </div>
            ) : (
              <button className="btn btn-outline" onClick={() => setPage('login')}>로그인/회원가입</button>
            )}
          </div>"""

content = content.replace(old_nav, new_nav)

# 4. Handle currentUser state from auth
# Need to add currentUser state and update onAuthStateChanged
old_auth = """  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUser(user.email);
      } else {
        setLoggedInUser(null);
      }
    });
    return () => unsubscribe();
  }, []);"""

new_auth = """  const [currentUser, setCurrentUser] = useState(null);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setLoggedInUser(user.email);
      } else {
        setCurrentUser(null);
        setLoggedInUser(null);
      }
    });
    return () => unsubscribe();
  }, []);"""

content = content.replace(old_auth, new_auth)

# 5. Render new pages based on 'page' state
old_render = """        {page === 'admin' && (loggedInUser?.includes('원장') || loggedInUser?.includes('parkjeuk')) ? (
          <AdminPage 
            onBack={() => setPage('home')} 
            qnaList={qnaList}
            handleQnaAnswer={handleQnaAnswer}
          />
        ) : selectedSpecialty ? ("""

new_render = """        {page === 'admin' && (loggedInUser?.includes('원장') || loggedInUser?.includes('parkjeuk')) ? (
          <AdminPage 
            onBack={() => setPage('home')} 
            qnaList={qnaList}
            handleQnaAnswer={handleQnaAnswer}
          />
        ) : page === 'login' ? (
          <LoginPage setPage={setPage} />
        ) : page === 'signup' ? (
          <SignupPage setPage={setPage} />
        ) : page === 'mypage' ? (
          <MyPage user={currentUser} qnaList={qnaList} reviews={reviews} setPage={setPage} />
        ) : selectedSpecialty ? ("""

content = content.replace(old_render, new_render)

# Remove login modal rendering
content = re.sub(r'\{showLoginModal && \(.*?</form>\s*</div>\s*</div>\s*\)\}', '', content, flags=re.DOTALL)

with open("src/App.jsx", "w") as f:
    f.write(content)
