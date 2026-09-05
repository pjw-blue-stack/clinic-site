import re

with open("src/pages/AdminPage.jsx", "r") as f:
    content = f.read()

# Replace activeTab initialization
old_init = """  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('adminActiveTab') || 'notices';
  });

  useEffect(() => {
    localStorage.setItem('adminActiveTab', activeTab);
  }, [activeTab]);"""

new_init = """  const getTabFromHash = () => {
    const hash = window.location.hash;
    if (hash.startsWith('#admin-tab-')) {
      return hash.replace('#admin-tab-', '');
    }
    return 'notices';
  };
  const [activeTab, setActiveTab] = useState(getTabFromHash);"""

content = content.replace(old_init, new_init)

# Replace handlePopState to also sync activeTab
old_popstate = """  useEffect(() => {
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
  }, []);"""

new_popstate = """  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#admin-tab-') || hash === '#admin') {
        setNoticeMode('list');
        setColumnMode('list');
        setQnaMode('list');
        setReviewMode('list');
        setActiveTab(getTabFromHash());
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);"""

content = content.replace(old_popstate, new_popstate)

# Replace tab onClick handlers
# We need to change onClick={() => setActiveTab('notices')} to:
# onClick={() => { setActiveTab('notices'); window.history.pushState({}, '', '#admin-tab-notices'); }}
def replace_tab(m):
    tab = m.group(1)
    return f"onClick={{() => {{ setActiveTab('{tab}'); window.history.pushState({{}}, '', '#admin-tab-{tab}'); }}}}"

content = re.sub(r"onClick=\{\(\) => setActiveTab\('([^']+)'\)\}", replace_tab, content)

with open("src/pages/AdminPage.jsx", "w") as f:
    f.write(content)
