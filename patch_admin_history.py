import re

with open("src/pages/AdminPage.jsx", "r") as f:
    content = f.read()

# Insert the popstate listener in AdminPage
effect = """
  useEffect(() => {
    const handlePopState = () => {
      if (window.location.hash === '#admin') {
        setNoticeMode('list');
        setColumnMode('list');
        setQnaMode('list');
        setReviewMode('list');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
"""
content = re.sub(r'(const \[uploading, setUploading\] = useState\(false\);)', r'\1\n' + effect, content)

# Replace setters to also push history state
content = re.sub(r"setNoticeMode\('write'\);", r"setNoticeMode('write'); window.history.pushState({}, '', '#admin-form');", content)
content = re.sub(r"setNoticeMode\('edit'\);", r"setNoticeMode('edit'); window.history.pushState({}, '', '#admin-form');", content)
content = re.sub(r"setColumnMode\('write'\);", r"setColumnMode('write'); window.history.pushState({}, '', '#admin-form');", content)
content = re.sub(r"setColumnMode\('edit'\);", r"setColumnMode('edit'); window.history.pushState({}, '', '#admin-form');", content)
content = re.sub(r"setReviewMode\('write'\);", r"setReviewMode('write'); window.history.pushState({}, '', '#admin-form');", content)
content = re.sub(r"setReviewMode\('edit'\);", r"setReviewMode('edit'); window.history.pushState({}, '', '#admin-form');", content)
content = re.sub(r"setQnaMode\('answer'\);", r"setQnaMode('answer'); window.history.pushState({}, '', '#admin-form');", content)

# Replace '← 목록으로' handlers to pop state or just use pushState back to #admin to be safe
# Actually, if they click the button, we should history.back() if the hash is #admin-form, otherwise just set to list.
back_logic = """{
                      if (window.location.hash === '#admin-form') {
                        window.history.back();
                      } else {
                        set\\1Mode('list');
                      }
                    }"""
content = re.sub(r"onClick=\{\(\) => set(Notice|Column|Qna|Review)Mode\('list'\)\}", r"onClick={() => " + back_logic + "}", content)

# But wait, there are other places where setNoticeMode('list') is called, like after save!
# If we save, we want to go back to list. If we are on #admin-form, we should history.back().
# To make it simple, we can just replace all occurrences of `set.*Mode('list')` inside save functions with history.back(), but that's risky.
# Instead, let's just make a helper function.

with open("src/pages/AdminPage.jsx", "w") as f:
    f.write(content)
