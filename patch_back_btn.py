import re

with open("src/App.jsx", "r") as f:
    content = f.read()

# Add popstate listener and open/close handlers
history_logic = """
  const [isAdminPage, setIsAdminPage] = useState(false);

  useEffect(() => {
    const handlePopState = (e) => {
      if (window.location.hash === '#admin') {
        setIsAdminPage(true);
      } else {
        setIsAdminPage(false);
      }
    };
    window.addEventListener('popstate', handlePopState);
    
    // Initial check
    if (window.location.hash === '#admin') {
      setIsAdminPage(true);
    }
    
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenAdmin = () => {
    setIsAdminPage(true);
    window.history.pushState({}, '', '#admin');
  };

  const handleCloseAdmin = () => {
    setIsAdminPage(false);
    if (window.location.hash === '#admin') {
      window.history.back();
    }
  };
"""

content = re.sub(r"  const \[isAdminPage, setIsAdminPage\] = useState\(false\);", history_logic, content)

# Replace setIsAdminPage(true) with handleOpenAdmin()
content = content.replace("onClick={() => setIsAdminPage(true)}", "onClick={handleOpenAdmin}")

# Replace setIsAdminPage(false) with handleCloseAdmin() in Logo click and onBack
content = content.replace("if (isAdminPage) setIsAdminPage(false);", "if (isAdminPage) handleCloseAdmin();")
content = content.replace("onBack={() => setIsAdminPage(false)}", "onBack={handleCloseAdmin}")

with open("src/App.jsx", "w") as f:
    f.write(content)
