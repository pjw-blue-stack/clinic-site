import json
import uuid

filepath = "/Users/parkjeuk/Library/Mobile Documents/iCloud~md~obsidian/Documents/Obsidian Vault(pjw)/홈페이지 개발/clinic-site/다한증_웹페이지_기획/00_다한증_전체_설계도_6단계.excalidraw"

with open(filepath, 'r') as f:
    data = json.load(f)

# Find max y to append at the bottom, or just put it at the top right
max_y = max((el.get('y', 0) for el in data['elements']), default=0)

new_element = {
    "type": "text",
    "version": 1,
    "versionNonce": 123456789,
    "isDeleted": False,
    "id": str(uuid.uuid4()),
    "fillStyle": "solid",
    "strokeWidth": 1,
    "strokeStyle": "solid",
    "roughness": 0,
    "opacity": 100,
    "angle": 0,
    "x": 800,
    "y": 50,
    "strokeColor": "#c92a2a",
    "backgroundColor": "transparent",
    "width": 300,
    "height": 50,
    "seed": 1,
    "groupIds": [],
    "boundElements": [],
    "fontSize": 28,
    "fontFamily": 1,
    "text": "🔥 신규 추가: 상단 GNB 'AI 자가진단' 퍼널 연동",
    "baseline": 28,
    "textAlign": "left",
    "verticalAlign": "top",
    "containerId": None,
    "originalText": "🔥 신규 추가: 상단 GNB 'AI 자가진단' 퍼널 연동",
    "autoResize": True,
    "lineHeight": 1.25,
    "locked": False,
    "rawText": "🔥 신규 추가: 상단 GNB 'AI 자가진단' 퍼널 연동"
}

data['elements'].append(new_element)

with open(filepath, 'w') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Successfully added the element to excalidraw file")
