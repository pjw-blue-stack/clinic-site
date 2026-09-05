import re

with open("src/pages/AdminPage.jsx", "r") as f:
    content = f.read()

# 1. Imports
imports = """import React, { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { db } from '../firebase';
import { uploadMedia } from '../utils/uploadMedia';
import './AdminPage.css';"""

content = re.sub(r"import React.*?\nimport '\./AdminPage\.css';", imports, content, flags=re.DOTALL)

# 2. Upload state
upload_state = """  const [uploading, setUploading] = useState(false);

  const handleMediaUpload = async (e, formSetter, currentForm) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploading(true);
      const url = await uploadMedia(file);
      formSetter({ ...currentForm, thumbnailUrl: url });
    } catch (err) {
      alert("업로드 실패: " + err.message);
    } finally {
      setUploading(false);
    }
  };"""

content = content.replace("const [activeTab, setActiveTab] = useState('notices');", "const [activeTab, setActiveTab] = useState('notices');\n\n" + upload_state)

# 3. Initial states and edit mappings
content = content.replace("const initialNotice = { tag: '[공지]', title: '', content: '' };", "const initialNotice = { tag: '[공지]', title: '', content: '', thumbnailUrl: '' };")
content = content.replace("const initialColumn = { title: '', category: '전신다한증', summary: '', content: '', icon: '🔬', readTime: '3분' };", "const initialColumn = { title: '', category: '전신다한증', summary: '', content: '', icon: '🔬', readTime: '3분', thumbnailUrl: '' };")
content = content.replace("const initialReview = { name: '', specialtyId: '전신다한증', title: '', content: '', rating: 5 };", "const initialReview = { name: '', specialtyId: '전신다한증', title: '', content: '', rating: 5, thumbnailUrl: '' };")

content = content.replace("setNoticeForm({ tag: notice.tag, title: notice.title, content: notice.content });", "setNoticeForm({ tag: notice.tag, title: notice.title, content: notice.content, thumbnailUrl: notice.thumbnailUrl || '' });")
content = content.replace("setColumnForm({ title: col.title, category: col.category, summary: col.summary, content: col.content, icon: col.icon, readTime: col.readTime });", "setColumnForm({ title: col.title, category: col.category, summary: col.summary, content: col.content, icon: col.icon, readTime: col.readTime, thumbnailUrl: col.thumbnailUrl || '' });")
content = content.replace("setReviewForm({ name: review.name, specialtyId: review.specialtyId, title: review.title, content: review.content, rating: review.rating });", "setReviewForm({ name: review.name, specialtyId: review.specialtyId, title: review.title, content: review.content, rating: review.rating, thumbnailUrl: review.thumbnailUrl || '' });")

# 4. Replace textareas with ReactQuill and Add upload input

# Notice Form
notice_textarea_regex = r'<textarea className="form-input" rows="5".*?value=\{noticeForm\.content\}.*?></textarea>'
notice_quill = """
<div style={{ marginBottom: '15px' }}>
  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>썸네일 / 미디어 첨부</label>
  <input type="file" accept="image/*,video/*" onChange={(e) => handleMediaUpload(e, setNoticeForm, noticeForm)} disabled={uploading} />
  {uploading && <span style={{ marginLeft: '10px', color: 'blue' }}>업로드 중...</span>}
  {noticeForm.thumbnailUrl && <div style={{ marginTop: '10px' }}><img src={noticeForm.thumbnailUrl} alt="thumbnail" style={{ maxWidth: '200px', borderRadius: '8px' }}/></div>}
</div>
<ReactQuill theme="snow" value={noticeForm.content} onChange={(val) => setNoticeForm({...noticeForm, content: val})} style={{ height: '300px', marginBottom: '50px', backgroundColor: 'white' }} />
"""
content = re.sub(notice_textarea_regex, notice_quill, content, flags=re.DOTALL)

# Column Form
column_textarea_regex = r'<textarea className="form-input" rows="8".*?value=\{columnForm\.content\}.*?></textarea>'
column_quill = """
<div style={{ marginBottom: '15px' }}>
  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>썸네일 / 미디어 첨부</label>
  <input type="file" accept="image/*,video/*" onChange={(e) => handleMediaUpload(e, setColumnForm, columnForm)} disabled={uploading} />
  {uploading && <span style={{ marginLeft: '10px', color: 'blue' }}>업로드 중...</span>}
  {columnForm.thumbnailUrl && <div style={{ marginTop: '10px' }}><img src={columnForm.thumbnailUrl} alt="thumbnail" style={{ maxWidth: '200px', borderRadius: '8px' }}/></div>}
</div>
<ReactQuill theme="snow" value={columnForm.content} onChange={(val) => setColumnForm({...columnForm, content: val})} style={{ height: '400px', marginBottom: '50px', backgroundColor: 'white' }} />
"""
content = re.sub(column_textarea_regex, column_quill, content, flags=re.DOTALL)

# Review Form
review_textarea_regex = r'<textarea className="form-input" rows="5".*?value=\{reviewForm\.content\}.*?></textarea>'
review_quill = """
<div style={{ marginBottom: '15px' }}>
  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>썸네일 / 미디어 첨부</label>
  <input type="file" accept="image/*,video/*" onChange={(e) => handleMediaUpload(e, setReviewForm, reviewForm)} disabled={uploading} />
  {uploading && <span style={{ marginLeft: '10px', color: 'blue' }}>업로드 중...</span>}
  {reviewForm.thumbnailUrl && <div style={{ marginTop: '10px' }}><img src={reviewForm.thumbnailUrl} alt="thumbnail" style={{ maxWidth: '200px', borderRadius: '8px' }}/></div>}
</div>
<ReactQuill theme="snow" value={reviewForm.content} onChange={(val) => setReviewForm({...reviewForm, content: val})} style={{ height: '200px', marginBottom: '50px', backgroundColor: 'white' }} />
"""
content = re.sub(review_textarea_regex, review_quill, content, flags=re.DOTALL)

with open("src/pages/AdminPage.jsx", "w") as f:
    f.write(content)
