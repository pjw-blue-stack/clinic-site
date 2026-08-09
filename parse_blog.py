import os
import requests
from bs4 import BeautifulSoup

url = "https://blog.naver.com/PostView.naver?blogId=pjwblue8282&logNo=223424453400"
response = requests.get(url)
response.encoding = 'utf-8'

soup = BeautifulSoup(response.text, 'html.parser')
container = soup.find('div', class_='se-main-container')

if container:
    text = container.get_text(separator='\n\n', strip=True)
else:
    # try older naver blog format
    container = soup.find('div', id='postViewArea')
    if container:
        text = container.get_text(separator='\n\n', strip=True)
    else:
        text = soup.get_text(separator='\n', strip=True)

# Save to obsidian
target_dir = "/Users/parkjeuk/Library/Mobile Documents/iCloud~md~obsidian/Documents/Obsidian Vault(pjw)/블로그/RAW"
os.makedirs(target_dir, exist_ok=True)
target_file = os.path.join(target_dir, "다한증_클리닉_치료원리와_차별점.md")

with open(target_file, 'w', encoding='utf-8') as f:
    f.write(f"# {soup.title.text if soup.title else '블로그 글'}\n\n")
    f.write(f"Source: {url}\n\n")
    f.write(text)

print(f"Saved to {target_file}")
