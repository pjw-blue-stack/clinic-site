import re

with open('src/App.jsx', 'r') as f:
    lines = f.readlines()

# 1. Add isReviewPage state
for i, line in enumerate(lines):
    if 'const [isColumnPage, setIsColumnPage] = useState(false);' in line:
        lines.insert(i + 1, '  const [isReviewPage, setIsReviewPage] = useState(false);\n')
        break

# 2. Update scrollToSection
for i, line in enumerate(lines):
    if 'setSelectedColumn(null);' in line and 'setIsColumnPage(false);' in lines[i-1]:
        lines.insert(i + 1, '    setIsReviewPage(false);\n')
        break

# 3. Cut section id="reviews"
start_idx = -1
end_idx = -1
for i, line in enumerate(lines):
    if '<section id="reviews"' in line:
        start_idx = i - 1 # Include comment
    elif 'BOOKING & MAP SECTION' in line and start_idx != -1:
        end_idx = i - 1 # Go up to the empty line before BOOKING
        break

if start_idx != -1 and end_idx != -1:
    reviews_code = lines[start_idx:end_idx]
    del lines[start_idx:end_idx]
else:
    print("Could not find reviews section")
    exit(1)

# 4. Inject into the main ternary
# Find the start of the main fallback branch:
# ) : (
#   <>
#     {/* HERO SECTION */}
inject_idx = -1
for i, line in enumerate(lines):
    if '          <>' in line and '        ) : (' in lines[i-1]:
        inject_idx = i - 1
        break

if inject_idx != -1:
    # We replace:
    # ) : (
    # with
    # ) : isReviewPage ? (
    #   <div className="review-page-wrapper" style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
    #      {reviews_code}
    #   </div>
    # ) : (
    
    lines[inject_idx] = '        ) : isReviewPage ? (\n'
    
    wrapper_code = ['          <div className="review-page-wrapper" style={{ paddingTop: "80px", minHeight: "100vh", backgroundColor: "var(--bg-color)" }}>\n']
    wrapper_code.extend(reviews_code)
    wrapper_code.append('          </div>\n')
    wrapper_code.append('        ) : (\n')
    
    lines[inject_idx+1:inject_idx+1] = wrapper_code
else:
    print("Could not find inject location")
    exit(1)

with open('src/App.jsx', 'w') as f:
    f.writelines(lines)
print("Refactored structure")
