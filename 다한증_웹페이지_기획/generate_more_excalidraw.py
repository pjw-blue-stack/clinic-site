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

def create_wireframe(filename, title, sections):
    elements = []
    elements.append(text(300, 50, title, size=40))
    current_y = 150
    box_w = 800
    box_x = 100
    
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

    data = {
        "type": "excalidraw",
        "version": 2,
        "source": "https://excalidraw.com",
        "elements": elements,
        "appState": {"viewBackgroundColor": "#ffffff"}
    }
    
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

create_wireframe(
    "03_머리얼굴땀_설계도.excalidraw",
    "웹페이지 설계도: 머리얼굴땀 (안면/두항부 다한증)",
    [
        {"title": "1. Micro-Empathy (공감)", "desc": "[카피] 식사할 때마다 눈치 보며 닦아내는 땀, 다 지워지는 화장\n- 환자 고충: 미각다한증, 대인관계 위축, 두피 지루성 피부염\n- 일상 사진: 휴지를 달고 사는 밥상, 당황한 얼굴"},
        {"title": "2. Targeted Cause (안면땀 원인)", "desc": "[카피] 머리로 솟구치는 상열하한(上熱下寒)과 위열(胃熱)입니다.\n- 비주얼: 열기구처럼 위장/간의 열이 머리로 치솟는 그래픽\n- 설명: 밥만 먹어도 열이 오르는 이유 (위장 엔진 과열)"},
        {"title": "3. Tailored Solution (맞춤 솔루션)", "desc": "[카피] 치솟는 열은 내리고 꽉 막힌 순환을 뚫는 수승화강 요법\n- 치료법 1: 위열을 식히는 청열 한약\n- 치료법 2: 안면 신경 진정 약침\n- 비주얼: 불을 아래로 끌어내리는 시원한 인포그래픽"},
        {"title": "4. Proof & FAQ (동반 증상 호전 및 Q&A)", "desc": "[카피] 땀이 마르면 안면홍조와 탈모도 함께 잡힙니다.\n- 리뷰: 안면땀/미각다한증 완치 후기 슬라이드\n- FAQ: 안면땀 특화 100문 100답 (6개 문항 토글)"}
    ]
)

create_wireframe(
    "04_상체땀_설계도.excalidraw",
    "웹페이지 설계도: 상체땀 (가슴, 등, 겨드랑이)",
    [
        {"title": "1. Micro-Empathy (공감)", "desc": "[카피] 회색 티셔츠의 악몽, 누렇게 변색된 옷깃의 스트레스\n- 환자 고충: 등/가슴 땀띠, 겨드랑이 땀자국(황한), 액취증 냄새\n- 일상 사진: 땀 자국 때문에 어두운 옷만 고르는 모습"},
        {"title": "2. Targeted Cause (상체땀 원인)", "desc": "[카피] 특정 경락(방광경, 심포경)의 열독 정체가 원인입니다.\n- 비주얼: 등(방광경)/가슴(심포경) 라인을 따라 열이 고인 인체 그래픽\n- 설명: 림프절에 끈적한 노폐물(습열)이 쌓여 악취와 땀 유발"},
        {"title": "3. Tailored Solution (맞춤 솔루션)", "desc": "[카피] 림프관의 노폐물을 비워내는 맑은 상체 해독요법\n- 치료법 1: 상체 경락 소통 해독탕\n- 치료법 2: 림프 순환 배독 치료\n- 비주얼: 탁한 땀이 맑아지는 정화 프로세스"},
        {"title": "4. Proof & FAQ (동반 증상 호전 및 Q&A)", "desc": "[카피] 땀 양은 줄이고 냄새(액취증)는 말끔히 지웁니다.\n- 리뷰: 액취증 및 등땀 완치 후기 슬라이드\n- FAQ: 상체땀 특화 100문 100답 (6개 문항 토글)"}
    ]
)

create_wireframe(
    "05_하체땀_설계도.excalidraw",
    "웹페이지 설계도: 하체땀 (엉덩이, 사타구니, 허벅지)",
    [
        {"title": "1. Micro-Empathy (공감)", "desc": "[카피] 의자에서 일어날 때마다 방석이 젖는 민망함, 긁지 못하는 고통\n- 환자 고충: 사타구니 낭습, 완선(습진), 지독한 가려움증\n- 일상 사진: 바지가 축축하게 젖은 직장인/수험생의 답답함"},
        {"title": "2. Targeted Cause (하체땀 원인)", "desc": "[카피] 하복부와 골반강에 갇힌 끈적한 하초습열(下焦濕熱)입니다.\n- 비주얼: 아랫배와 골반에 탁한 물과 열이 무겁게 가라앉은 그래픽\n- 설명: 오래 앉아있는 습관과 림프 정체로 썩은 물이 고인 상태"},
        {"title": "3. Tailored Solution (맞춤 솔루션)", "desc": "[카피] 밑 빠진 독의 물을 빼내는 하초 청열배독 요법\n- 치료법 1: 하체 습열을 소변으로 빼내는 한약\n- 치료법 2: 하복부 온열 화주뜸 (순환 복구)\n- 비주얼: 끈적한 습기를 날려 뽀송하게 말리는 이미지"},
        {"title": "4. Proof & FAQ (동반 증상 호전 및 Q&A)", "desc": "[카피] 땀이 마르면 무좀균과 가려움증도 영원히 사라집니다.\n- 리뷰: 사타구니 습진/낭습 완치 후기 슬라이드\n- FAQ: 하체땀 특화 100문 100답 (1개 문항 토글)"}
    ]
)

create_wireframe(
    "06_전신다한증_설계도.excalidraw",
    "웹페이지 설계도: 전신다한증",
    [
        {"title": "1. Micro-Empathy (공감)", "desc": "[카피] 숟가락 들 힘조차 없는 만성피로, 하루 종일 젖어있는 온몸\n- 환자 고충: 수차례 옷 갈아입기, 무너진 체력, 다이어트 약 부작용\n- 일상 사진: 탈진하여 땀을 흘리며 쓰러질 듯한 모습"},
        {"title": "2. Targeted Cause (전신땀 원인)", "desc": "[카피] 면역 방어선(위기) 붕괴와 자율신경계 온도 센서의 완전 폭주\n- 비주얼: 피부 방어막이 뚫려 진액이 마구 새어나가는 그래픽\n- 설명: 기허(氣虛) 상태. 땀구멍 조절력을 완전히 상실한 몸"},
        {"title": "3. Tailored Solution (맞춤 솔루션)", "desc": "[카피] 새는 진액은 막고, 무너진 방어막은 철통같이 재건합니다.\n- 치료법 1: 체력과 진액을 꽉 채워주는 보양 해독 한약\n- 치료법 2: 전신 자율신경 밸런스 회복 전침\n- 비주얼: 배터리가 방전상태에서 100% 충전되는 에너지업 이미지"},
        {"title": "4. Proof & FAQ (동반 증상 호전 및 Q&A)", "desc": "[카피] 땀이 멈추는 것은 시작입니다. 진짜 활력을 되찾아 드립니다.\n- 리뷰: 전신다한증 완치 후기 슬라이드\n- FAQ: 전신다한증/부작용 100문 100답 (5개 문항 토글)"}
    ]
)

create_wireframe(
    "07_보상성다한증_설계도.excalidraw",
    "웹페이지 설계도: 보상성 다한증",
    [
        {"title": "1. Micro-Empathy (공감)", "desc": "[카피] 수술 후 등과 배로 폭발하는 땀, 돌이킬 수 없다는 절망감\n- 환자 고충: 교감신경 절제술의 후회, 수술보다 심해진 보상성 부작용\n- 일상 사진: 수술 자국 위로 또 땀이 비 오듯 쏟아지는 모습"},
        {"title": "2. Targeted Cause (보상성 원인)", "desc": "[카피] 잘린 신경(비상구) 탓이 아닙니다. 속의 총 발열량(열독)이 문제입니다.\n- 비주얼: 하나의 비상구가 막히자 다른 쪽으로 불길이 솟구치는 건물 그래픽\n- 설명: 신경을 이어붙일 순 없지만 뇌에서 내리는 땀 신호를 줄일 순 있다"},
        {"title": "3. Tailored Solution (맞춤 솔루션)", "desc": "[카피] 불필요한 열을 대청소하여 땀 분비 신호 자체를 급감시킵니다.\n- 치료법 1: 끓어오르는 열독을 내리는 청열 보상성 해독탕\n- 치료법 2: 자율신경 진정 약침\n- 비주얼: 불기운 자체를 식혀 몸 전체가 시원해지는 구조도"},
        {"title": "4. Proof & FAQ (동반 증상 호전 및 Q&A)", "desc": "[카피] 100% 막을 순 없지만 90% 이상 쾌적하게 덜어드릴 순 있습니다.\n- 리뷰: 수술 부작용(보상성 다한증) 완화 실제 후기\n- FAQ: 보상성 다한증 100문 100답 (4개 문항 토글)"}
    ]
)

create_wireframe(
    "08_도한증_설계도.excalidraw",
    "웹페이지 설계도: 도한증 (밤 식은땀)",
    [
        {"title": "1. Micro-Empathy (공감)", "desc": "[카피] 잠자리가 축축하게 젖어 깨어나는 무서운 밤, 만성 탈수\n- 환자 고충: 도둑처럼 찾아오는 땀, 이갈이, 갱년기 열오름, 극심한 불면증\n- 일상 사진: 젖은 베개와 뜬눈으로 밤을 지새우는 모습"},
        {"title": "2. Targeted Cause (도한증 원인)", "desc": "[카피] 체내 냉각수(진액)가 바닥나 밤마다 치솟는 허열(虛熱)입니다.\n- 비주얼: 엔진오일(냉각수)이 말라 엔진이 밤새 헛도는 과열 그래픽\n- 설명: 음허(陰虛) 상태. 고갈된 몸이 남은 에너지를 쥐어짜내는 신호"},
        {"title": "3. Tailored Solution (맞춤 솔루션)", "desc": "[카피] 메마른 우물에 맑은 진액을 듬뿍 채우는 보음(補陰) 요법\n- 치료법 1: 허열을 끄고 진액을 공급하는 수면 해독 한약\n- 치료법 2: 뇌신경 이완 및 심열 진정 치료\n- 비주얼: 마른 장작이 아닌 촉촉하게 물이 차오르는 오아시스 이미지"},
        {"title": "4. Proof & FAQ (동반 증상 호전 및 Q&A)", "desc": "[카피] 뽀송하고 개운한 진짜 숙면, 아침의 활력을 선물합니다.\n- 리뷰: 불면증/갱년기 식은땀 완치 후기\n- FAQ: 식은땀/수면 100문 100답 (3개 문항 토글)"}
    ]
)
