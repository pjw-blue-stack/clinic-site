import re

with open("src/App.jsx", "r") as f:
    content = f.read()

# Replace plain text rendering with dangerouslySetInnerHTML
# <span style={{ color: 'var(--text-main)', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{q.isSecret ? (loggedInUser && (loggedInUser.includes('원장') || loggedInUser.includes('parkjeuk')) || loggedInUser === q.author ? q.answer : '비밀글입니다.') : q.answer}</span>
# to
# <div className="qna-rich-text" dangerouslySetInnerHTML={{ __html: q.isSecret ? (loggedInUser && (loggedInUser.includes('원장') || loggedInUser.includes('parkjeuk')) || loggedInUser === q.author ? q.answer : '비밀글입니다.') : q.answer }} style={{ color: 'var(--text-main)', lineHeight: '1.6' }} />

old_span = """<span style={{ color: 'var(--text-main)', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{q.isSecret ? (loggedInUser && (loggedInUser.includes('원장') || loggedInUser.includes('parkjeuk')) || loggedInUser === q.author ? q.answer : '비밀글입니다.') : q.answer}</span>"""
new_div = """<div className="rich-text-content" dangerouslySetInnerHTML={{ __html: q.isSecret ? (loggedInUser && (loggedInUser.includes('원장') || loggedInUser.includes('parkjeuk')) || loggedInUser === q.author ? q.answer : '비밀글입니다.') : q.answer }} style={{ color: 'var(--text-main)', lineHeight: '1.6' }} />"""

content = content.replace(old_span, new_div)

with open("src/App.jsx", "w") as f:
    f.write(content)
