import re

with open('src/App.jsx', 'r') as f:
    content = f.read()

# 1. Add key to SpecialtyDetailPage to force unmount
content = content.replace(
    "<SpecialtyDetailPage \n            specialty={selectedSpecialty} ",
    "<SpecialtyDetailPage \n            key={selectedSpecialty.id}\n            specialty={selectedSpecialty} "
)

# 2. Fix the tab buttons for sujok
old_btn2 = """<button 
                    className={`tab-btn ${activeTab === 'head' ? 'active' : ''}`}
                    onClick={() => setActiveTab('head')}
                  >
                    {specialty.id === 'du-myeon' ? '머리 땀만 (두한증)' : '손 땀만 (수한증)'}
                  </button>"""
new_btn2 = """<button 
                    className={`tab-btn ${activeTab === (specialty.id === 'du-myeon' ? 'head' : 'hand') ? 'active' : ''}`}
                    onClick={() => setActiveTab(specialty.id === 'du-myeon' ? 'head' : 'hand')}
                  >
                    {specialty.id === 'du-myeon' ? '머리 땀만 (두한증)' : '손 땀만 (수한증)'}
                  </button>"""
content = content.replace(old_btn2, new_btn2)

old_btn3 = """<button 
                    className={`tab-btn ${activeTab === 'face' ? 'active' : ''}`}
                    onClick={() => setActiveTab('face')}
                  >
                    {specialty.id === 'du-myeon' ? '얼굴 땀만 (안면다한증)' : '발 땀만 (족한증)'}
                  </button>"""
new_btn3 = """<button 
                    className={`tab-btn ${activeTab === (specialty.id === 'du-myeon' ? 'face' : 'foot') ? 'active' : ''}`}
                    onClick={() => setActiveTab(specialty.id === 'du-myeon' ? 'face' : 'foot')}
                  >
                    {specialty.id === 'du-myeon' ? '얼굴 땀만 (안면다한증)' : '발 땀만 (족한증)'}
                  </button>"""
content = content.replace(old_btn3, new_btn3)

# 3. Add safety fallback to tabs
old_tabs_logic = """if ((specialty.id === 'du-myeon' || specialty.id === 'sujok') && specialty.tabs) {
    currentSummary = specialty.tabs[activeTab].summary;
    currentDetails = specialty.tabs[activeTab].details;
  }"""
new_tabs_logic = """if ((specialty.id === 'du-myeon' || specialty.id === 'sujok') && specialty.tabs) {
    const tabData = specialty.tabs[activeTab] || specialty.tabs['both'];
    if (tabData) {
      currentSummary = tabData.summary;
      currentDetails = tabData.details;
    }
  }"""
content = content.replace(old_tabs_logic, new_tabs_logic)

with open('src/App.jsx', 'w') as f:
    f.write(content)

