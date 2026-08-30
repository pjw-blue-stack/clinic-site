import os
import re

source_dir = "/Users/parkjeuk/Library/Mobile Documents/iCloud~md~obsidian/Documents/Obsidian Vault(pjw)/홈페이지 개발/clinic-site/다한증_100문100답"
target_dir = "/Users/parkjeuk/Library/Mobile Documents/iCloud~md~obsidian/Documents/Obsidian Vault(pjw)/홈페이지 개발/clinic-site/다한증_웹페이지_기획"

source_files = [
    "01_원인과_증상.md",
    "02_치료원리와_과정.md",
    "03_특수부위와_대상.md",
    "04_타치료법_비교및_부작용.md",
    "05_생활관리_기타.md"
]

target_files = {
    "main": "01_정원해독_다한증클리닉.md",
    "sujok": "02_손발땀.md",
    "face": "03_머리얼굴땀.md",
    "upper": "04_상체땀.md",
    "lower": "05_하체땀.md",
    "body": "06_전신다한증.md",
    "bosang": "07_보상성다한증.md",
    "night": "08_도한증_식은땀.md"
}

def get_category(q_title):
    t = q_title.lower()
    
    # Priority matching
    if any(k in t for k in ["보상성", "수술", "교감신경", "클립", "차단술"]):
        return "bosang"
    elif any(k in t for k in ["밤", "도한", "식은땀", "수면", "잠", "잘때"]):
        return "night"
    elif any(k in t for k in ["손", "수족", "발", "악수", "발냄새", "무좀", "수족냉증", "동창"]):
        return "sujok"
    elif any(k in t for k in ["얼굴", "안면", "머리", "두피", "두항", "미각", "홍조", "화장", "탈모", "이마"]):
        return "face"
    elif any(k in t for k in ["엉덩이", "사타구니", "하체", "낭습", "허벅지", "습진", "완선"]):
        return "lower"
    elif any(k in t for k in ["가슴", "등", "상체", "겨드랑이", "액취", "암내", "황한", "누런"]):
        return "upper"
    elif any(k in t for k in ["전신", "온몸", "운동", "기력", "피로", "다이어트", "식욕억제제", "갱년기", "소아", "수험생"]):
        return "body"
    else:
        return "main"

# Parse all questions
all_questions = {k: [] for k in target_files.keys()}

for filename in source_files:
    filepath = os.path.join(source_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Split by #### Q to find question blocks
    blocks = re.split(r'(?=#### Q\d+)', content)
    for block in blocks:
        block = block.strip()
        if block.startswith('#### Q'):
            lines = block.split('\n')
            q_title = lines[0]
            cat = get_category(q_title)
            all_questions[cat].append(block)

# Append to target files
for cat, qs in all_questions.items():
    if not qs:
        continue
    
    target_path = os.path.join(target_dir, target_files[cat])
    
    # Read existing content to remove the old manual Q&As I added
    with open(target_path, 'r', encoding='utf-8') as f:
        target_content = f.read()
        
    # Cut off at "## 💡 [경희정원 다한증 100문 100답] 핵심 Q&A 배치안"
    split_marker = "## 💡 [경희정원 다한증 100문 100답]"
    if split_marker in target_content:
        base_content = target_content.split(split_marker)[0]
    else:
        base_content = target_content + "\n\n"
        
    new_content = base_content + f"{split_marker} 전체 보기\n\n"
    
    # Rename Q numbers to be sequential in each file
    for i, q_block in enumerate(qs, 1):
        # replace the original Q number with a sequential one for this file
        # e.g., #### Q15. ... -> #### Q1. ...
        q_block = re.sub(r'^#### Q\d+', f'#### Q{i}', q_block)
        new_content += q_block + "\n\n"
        
    with open(target_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

print("Distribution complete.")
for cat, qs in all_questions.items():
    print(f"{target_files[cat]}: {len(qs)} questions")
