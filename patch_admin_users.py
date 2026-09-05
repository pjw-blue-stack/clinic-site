import re

with open("src/pages/AdminPage.jsx", "r") as f:
    content = f.read()

# 1. Add usersQuery and fetch users
# We need to fetch 'users' collection
# import { collection, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore'; (already there)
new_users = """  const qnaRef = collection(db, 'qna'); // Wait, we don't have qnaRef here because it's passed as prop
  const usersRef = collection(db, 'users');
  const usersQuery = query(usersRef, orderBy('createdAt', 'desc'));
  const [usersSnapshot] = useCollection(usersQuery);
  const usersList = usersSnapshot?.docs.map(d => ({ firestoreId: d.id, ...d.data() })) || [];
"""
content = content.replace("  const [answerText, setAnswerText] = useState('');", new_users + "\n  const [answerText, setAnswerText] = useState('');")

# 2. Add 'users' tab to the sidebar
old_sidebar = """            <li 
              className={activeTab === 'settings' ? 'active' : ''} 
              onClick={() => { setActiveTab('settings'); window.history.pushState({}, '', '#admin-tab-settings'); }}
              style={{ padding: '15px', cursor: 'pointer', borderRadius: '8px', backgroundColor: activeTab === 'settings' ? 'var(--primary-light)' : 'transparent', fontWeight: activeTab === 'settings' ? 'bold' : 'normal', color: activeTab === 'settings' ? 'var(--primary-dark)' : '#555' }}
            >
              관리자 설정
            </li>"""

new_sidebar = """            <li 
              className={activeTab === 'users' ? 'active' : ''} 
              onClick={() => { setActiveTab('users'); window.history.pushState({}, '', '#admin-tab-users'); }}
              style={{ padding: '15px', cursor: 'pointer', borderRadius: '8px', marginBottom: '5px', backgroundColor: activeTab === 'users' ? 'var(--primary-light)' : 'transparent', fontWeight: activeTab === 'users' ? 'bold' : 'normal', color: activeTab === 'users' ? 'var(--primary-dark)' : '#555' }}
            >
              회원 관리
            </li>
""" + old_sidebar

content = content.replace(old_sidebar, new_sidebar)

# 3. Render 'users' tab content
users_tab = """
          {/* ======================= USERS ======================= */}
          {activeTab === 'users' && (
            <section className="admin-section" style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <div className="admin-tab-header">
                <h3 style={{ fontSize: '1.5rem', margin: 0 }}>환자 회원 관리 ({usersList.length}명)</h3>
              </div>
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th style={{ width: '20%' }}>이름</th>
                      <th style={{ width: '30%' }}>이메일</th>
                      <th style={{ width: '20%' }}>가입 방식</th>
                      <th style={{ width: '30%' }}>가입일</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersList.length > 0 ? usersList.map(u => (
                      <tr key={u.firestoreId}>
                        <td style={{ fontWeight: 'bold' }}>{u.name || '미입력'}</td>
                        <td>{u.email}</td>
                        <td>
                          {u.provider === 'google.com' ? '구글 로그인' : u.provider === 'password' ? '이메일 가입' : u.provider}
                        </td>
                        <td>{u.createdAt ? new Date(u.createdAt).toLocaleString() : '알 수 없음'}</td>
                      </tr>
                    )) : (
                      <tr><td colSpan="4" style={{ textAlign: 'center', padding: '30px', color: '#888' }}>가입한 회원이 없습니다.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}
"""

# Insert before {/* ======================= SETTINGS ======================= */}
content = content.replace("          {/* ======================= SETTINGS ======================= */}", users_tab + "\n          {/* ======================= SETTINGS ======================= */}")

with open("src/pages/AdminPage.jsx", "w") as f:
    f.write(content)
