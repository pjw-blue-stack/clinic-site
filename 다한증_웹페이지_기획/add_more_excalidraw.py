import json
import uuid

def get_id(): return str(uuid.uuid4())

def rect(x, y, w, h, bg="#ffffff", stroke="#000000"):
    return {
        "type": "rectangle", "version": 1, "versionNonce": 0, "isDeleted": False,
        "id": get_id(), "fillStyle": "solid", "strokeWidth": 2, "strokeStyle": "solid",
        "roughness": 0, "opacity": 100, "angle": 0, "x": x, "y": y,
        "strokeColor": stroke, "backgroundColor": bg, "width": w, "height": h,
        "seed": 1, "groupIds": [], "strokeSharpness": "sharp", "boundElements": []
    }

def text(x, y, txt, size=20, bold=False):
    return {
        "type": "text", "version": 1, "versionNonce": 0, "isDeleted": False,
        "id": get_id(), "fillStyle": "solid", "strokeWidth": 1, "strokeStyle": "solid",
        "roughness": 0, "opacity": 100, "angle": 0, "x": x, "y": y,
        "strokeColor": "#000000", "backgroundColor": "transparent",
        "width": max(200, len(txt)*size*0.6), "height": len(txt.split('\n'))*size*1.2,
        "seed": 1, "groupIds": [], "strokeSharpness": "sharp", "boundElements": [],
        "fontSize": size, "fontFamily": 1, "text": txt, "baseline": size,
        "textAlign": "left", "verticalAlign": "top"
    }

def generate_section_elements(offset_x, title, sections):
    elements = []
    elements.append(text(offset_x + 300, 50, title, size=40))
    current_y = 150
    box_w = 800
    box_x = offset_x + 100
    
    for sec in sections:
        sec_title = sec['title']
        sec_desc = sec['desc']
        lines = sec_desc.count('\n') + 1
        box_h = max(150, lines * 30 + 100)
        
        elements.append(rect(box_x, current_y, box_w, box_h, bg="#f8f9fa"))
        elements.append(text(box_x + 20, current_y + 20, sec_title, size=28))
        elements.append(text(box_x + 20, current_y + 70, sec_desc, size=20))
        elements.append({
            "type": "arrow", "version": 1, "versionNonce": 0, "isDeleted": False,
            "id": get_id(), "fillStyle": "solid", "strokeWidth": 2, "strokeStyle": "solid",
            "roughness": 0, "opacity": 100, "angle": 0, "x": box_x + box_w/2, "y": current_y + box_h + 10,
            "strokeColor": "#adb5bd", "backgroundColor": "transparent", "width": 0, "height": 40,
            "seed": 1, "groupIds": [], "strokeSharpness": "round", "boundElements": [],
            "startBinding": None, "endBinding": None, "lastCommittedPoint": None,
            "startArrowhead": None, "endArrowhead": "arrow",
            "points": [[0, 0], [0, 40]]
        })
        current_y += box_h + 70
    return elements

with open("00_다한증_전체_설계도.excalidraw", "r", encoding="utf-8") as f:
    data = json.load(f)

reviews_elements = generate_section_elements(8000, "웹페이지 설계도: 치료후기", [
    {"title": "1. Micro-Empathy (공감)", "desc": "[카피] 수많은 실패와 좌절 끝에 찾은 뽀송한 일상의 기적\n- 공감 요소: 수술을 고민했던 밤, 바르는 약 부작용의 고통, 민망했던 순간들\n- 비주얼: 어두운 터널에서 빛을 향해 걸어나가는 감성적 이미지"},
    {"title": "2. Proof (압도적 가치 입증)", "desc": "[카피] 14년, 3,800명 이상의 리얼 데이터가 원리를 증명합니다.\n- 비주얼: 부위별(손발, 얼굴, 등/가슴, 보상성 등) 치료 사례 모아보기\n- 핵심: 과장 광고가 아닌 100% 자필/리얼 후기 갤러리"},
    {"title": "3. Long-term Success (반박제거 & 영구성 입증)", "desc": "[카피] 10년이 지나도 요요 없이 쾌적한 30대 남성의 이야기\n- 비주얼: 치료 직후가 아닌, 몇 년 뒤에도 유지되는 실제 사례 인터뷰\n- 원리 설명: 신경을 자르지 않고 '불(열독)'을 껐기에 내성이나 부작용이 없음을 입증"},
    {"title": "4. Search & Action (행동 유도)", "desc": "[기능] 나와 똑같은 증상을 가진 사람의 후기를 검색해 보세요.\n- 비주얼: 검색창 UI 및 '보상성', '수족냉증', '액취증' 등 주요 해시태그\n- CTA: 치료 희망을 얻었다면, 이제 원장님과 직접 만나보세요. (상담 예약 버튼)"}
])

about_elements = generate_section_elements(9000, "웹페이지 설계도: 한의원 소개", [
    {"title": "1. Philosophy (박제욱 원장님의 진료 철학)", "desc": "[카피] 땀구멍을 막는 의사가 아닌, 몸속의 불을 끄는 의사입니다.\n- 비주얼: 원장님의 신뢰감 있는 프로필 및 진료/연구 모습\n- 스토리: 14년간 오직 '해독'이라는 근본 원리 하나에 매달려온 고집과 철학 입증"},
    {"title": "2. Facility & Experience (진료 환경 안내)", "desc": "[카피] 치유의 시작은 편안하고 쾌적한 공간에서부터.\n- 비주얼: 경희정원 한의원의 내부 전경 (시원한 대기실, 프라이빗 1:1 진료실)\n- 핵심: 대인기피증이 있는 다한증 환자의 프라이버시를 존중하는 프라이빗 예약제"},
    {"title": "3. Transparency (한약재 관리 및 안전성)", "desc": "[카피] 내 가족이 먹는 약처럼, 깐깐하고 투명하게 달입니다.\n- 비주얼: 정원해독탕에 사용되는 청정 인증 약재 및 위생적인 조제실 전경\n- 반박제거: 한약 부작용(간 수치)? 속을 편안하게 씻어내는 독소 0%의 정화 한약임을 강조"},
    {"title": "4. Location & Time (오시는 길 및 진료 정보)", "desc": "[정보] 환자분의 소중한 걸음이 헛되지 않도록.\n- 비주얼: 직관적이고 큰 약도, 넉넉한 주차 공간 안내, 지하철/버스 노선표\n- 정보: 진료 시간, [카카오톡 실시간 상담] 버튼, [빠른 전화 연결] 버튼"}
])

data["elements"].extend(reviews_elements)
data["elements"].extend(about_elements)

with open("00_다한증_전체_설계도.excalidraw", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Added 치료후기 and 한의원 to 00_다한증_전체_설계도.excalidraw")
