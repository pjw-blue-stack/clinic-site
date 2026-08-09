import re

with open('/Users/parkjeuk/.gemini/antigravity/brain/4460cd08-9a71-4c3f-8603-1923f2d66b72/.system_generated/steps/243/content.md', 'r') as f:
    html_content = f.read()

# Remove style and script tags
html_content = re.sub(r'<script.*?>.*?</script>', '', html_content, flags=re.DOTALL)
html_content = re.sub(r'<style.*?>.*?</style>', '', html_content, flags=re.DOTALL)

# Strip all html tags
text = re.sub(r'<[^>]+>', '\n', html_content)
text = text.replace('&nbsp;', ' ').replace('&lt;', '<').replace('&gt;', '>')

lines = [line.strip() for line in text.split('\n') if line.strip()]

for line in lines:
    if len(line) > 20: # print lines with some meaningful text
        print(line)
