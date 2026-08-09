import os
import re

source_file = "/Users/parkjeuk/.gemini/antigravity/brain/4460cd08-9a71-4c3f-8603-1923f2d66b72/.system_generated/steps/505/content.md"
with open(source_file, 'r', encoding='utf-8') as f:
    html = f.read()

# Find the start of se-main-container
start_idx = html.find('class="se-main-container"')
if start_idx != -1:
    html = html[start_idx:]
    
    # Try to find common end markers in Naver Blog HTML
    end_idx1 = html.find('<!-- _BLOG_CONTENTS_BODY_TAIL -->')
    end_idx2 = html.find('class="post-btn"')
    end_idx3 = html.find('id="printPost1"')
    
    end_indices = [idx for idx in [end_idx1, end_idx2, end_idx3] if idx != -1]
    if end_indices:
        end_idx = min(end_indices)
        html = html[:end_idx]

# Replace br tags with newlines before stripping HTML
html = re.sub(r'<br\s*/?>', '\n', html)
html = re.sub(r'</p>', '\n\n', html)
html = re.sub(r'</div>', '\n', html)

# Strip all remaining HTML tags
text = re.sub(r'<[^>]+>', ' ', html)

# Decode entities
text = text.replace('&nbsp;', ' ').replace('&lt;', '<').replace('&gt;', '>').replace('&amp;', '&').replace('&#x27;', "'").replace('&quot;', '"')

# Clean up multiple whitespaces and newlines
lines = []
for line in text.split('\n'):
    line = line.strip()
    # collapse multiple spaces
    line = re.sub(r'\s{2,}', ' ', line)
    if line:
        lines.append(line)
        
content = '\n\n'.join(lines)

target_dir = "/Users/parkjeuk/Library/Mobile Documents/iCloud~md~obsidian/Documents/Obsidian Vault(pjw)/블로그/RAW"
os.makedirs(target_dir, exist_ok=True)
target_file = os.path.join(target_dir, "다한증_클리닉_치료원리와_차별점.md")

with open(target_file, 'w', encoding='utf-8') as f:
    f.write("# 다한증 클리닉 치료 원리와 차별점\n\n")
    f.write("Source: https://blog.naver.com/pjwblue8282/223424453400\n\n")
    f.write(content)

print(f"Saved {len(content)} characters to {target_file}")
