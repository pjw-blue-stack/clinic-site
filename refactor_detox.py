import re

filepath = "/Users/parkjeuk/Library/Mobile Documents/iCloud~md~obsidian/Documents/Obsidian Vault(pjw)/홈페이지 개발/clinic-site/src/App.jsx"

with open(filepath, 'r') as f:
    content = f.read()

# 1. Extract the section from "INTERACTIVE COMPARISON SECTION" to the end of "DETOX THERAPY SECTION"
start_marker = "        {/* INTERACTIVE COMPARISON SECTION */}"
end_marker = "        {/* CLINIC SPECIALTIES SECTION */}"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx == -1 or end_idx == -1:
    print("Markers not found!")
    exit(1)

extracted_section = content[start_idx:end_idx]

# Remove the extracted section from its original place
content = content[:start_idx] + content[end_idx:]

# 2. Insert it before the main page render block
insert_marker = "        ) : (\n          <>\n            {/* HERO SECTION */}"
insert_idx = content.find(insert_marker)

if insert_idx == -1:
    print("Insert marker not found!")
    exit(1)

new_block = f"""        ) : isDetoxPage ? (
          <div className="detox-page" style={{{{ paddingTop: '80px' }}}}>
{extracted_section}          </div>
{insert_marker}"""

content = content[:insert_idx] + new_block + content[insert_idx + len(insert_marker):]

with open(filepath, 'w') as f:
    f.write(content)

print("Refactor successful!")
