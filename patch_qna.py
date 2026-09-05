import re

with open("src/pages/AdminPage.jsx", "r") as f:
    content = f.read()

# Add handleQnaMediaUpload
upload_func = """
  const handleQnaMediaUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploading(true);
      const url = await uploadMedia(file);
      const imgTag = `<br/><img src="${url}" style="max-width: 100%; height: auto; border-radius: 8px;" /><br/>`;
      setAnswerText((prev) => (prev || '') + imgTag);
    } catch (err) {
      alert("업로드 실패: " + err.message);
    } finally {
      setUploading(false);
    }
  };
"""

content = content.replace("  const [answerText, setAnswerText] = useState('');", "  const [answerText, setAnswerText] = useState('');\n" + upload_func)

# Replace textarea with ReactQuill
old_form = """                    <div className="form-group" style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>원장님 답변 내용</label>
                      <textarea className="form-input" rows="6" value={answerText} onChange={e => setAnswerText(e.target.value)} placeholder="원장님 답변을 입력하세요" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}></textarea>
                    </div>"""

new_form = """                    <div className="form-group" style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>원장님 답변 내용</label>
                      <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>미디어 첨부 (썸네일 미지정)</label>
                        <input type="file" accept="image/*,video/*" onChange={handleQnaMediaUpload} disabled={uploading} />
                        {uploading && <span style={{ marginLeft: '10px', color: 'blue' }}>업로드 중...</span>}
                      </div>
                      <ReactQuill theme="snow" value={answerText} onChange={setAnswerText} style={{ height: '300px', marginBottom: '50px', backgroundColor: 'white' }} />
                    </div>"""

content = content.replace(old_form, new_form)

with open("src/pages/AdminPage.jsx", "w") as f:
    f.write(content)
