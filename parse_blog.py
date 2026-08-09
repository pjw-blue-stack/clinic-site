import re
import sys

with open('/Users/parkjeuk/.gemini/antigravity/brain/4460cd08-9a71-4c3f-8603-1923f2d66b72/.system_generated/steps/243/content.md', 'r') as f:
    html_content = f.read()

# Extract se-text-paragraph contents using regex
matches = re.findall(r'<span class="se-fs-[^"]*"(?:[^>]*)>(.*?)</span>', html_content)
# some text may be directly in the paragraph or other tags, let's just strip all HTML from se-text-paragraph
paragraphs = re.findall(r'<p class="se-text-paragraph[^>]*>(.*?)</p>', html_content, re.DOTALL)

for p in paragraphs:
    text = re.sub(r'<[^>]+>', '', p) # strip html tags
    text = text.replace('&nbsp;', ' ').replace('&lt;', '<').replace('&gt;', '>').strip()
    if text:
        print(text)
