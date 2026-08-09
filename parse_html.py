import re
import os

source_file = "/Users/parkjeuk/.gemini/antigravity/brain/4460cd08-9a71-4c3f-8603-1923f2d66b72/.system_generated/steps/505/content.md"
with open(source_file, 'r', encoding='utf-8') as f:
    html = f.read()

# Try to extract the main content container
match = re.search(r'<div[^>]*class="se-main-container"[^>]*>(.*?)<!--', html, re.DOTALL)
if not match:
    match = re.search(r'<div[^>]*id="postViewArea"[^>]*>(.*?)</div>\s*<!--', html, re.DOTALL)

if match:
    content = match.group(1)
else:
    content = html

# Replace break tags and paragraphs with newlines
content = re.sub(r'<br\s*/?>', '\n', content)
content = re.sub(r'</p>', '\n\n', content)
content = re.sub(r'</div>', '\n', content)

# Remove all other tags
content = re.sub(r'<[^>]+>', ' ', content)

# Decode simple entities
content = content.replace('&nbsp;', ' ')
content = content.replace('&lt;', '<')
content = content.replace('&gt;', '>')
content = content.replace('&amp;', '&')

# Clean up whitespace
lines = []
for line in content.split('\n'):
    line = line.strip()
    if line:
        lines.append(line)
content = '\n\n'.join(lines)

target_dir = "/Users/parkjeuk/Library/Mobile Documents/iCloud~md~obsidian/Documents/Obsidian Vault(pjw)/블로그/RAW"
os.makedirs(target_dir, exist_ok=True)
target_file = os.path.join(target_dir, "다한증_클리닉_치료원리와_차별점.md")

with open(target_file, 'w', encoding='utf-8') as f:
    f.write("# 다한증 클리닉 치료 원리와 차별점\n\n")
    f.write("Source: https://blog.naver.com/pjwblue8282/223424453400\n\n")
    f.write(content.strip())

print(f"Saved to {target_file}")
