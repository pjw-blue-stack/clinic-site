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
    elements.append(text(offset_x + 250, 50, title, size=36))
    current_y = 150
    box_w = 800
    box_x = offset_x + 50
    
    for sec in sections:
        sec_title = sec['title']
        sec_desc = sec['desc']
        lines = sec_desc.count('\n') + 1
        box_h = max(130, lines * 28 + 80)
        
        elements.append(rect(box_x, current_y, box_w, box_h, bg="#f8f9fa"))
        elements.append(text(box_x + 20, current_y + 15, sec_title, size=24))
        elements.append(text(box_x + 20, current_y + 60, sec_desc, size=18))
        elements.append({
            "type": "arrow", "version": 1, "versionNonce": 0, "isDeleted": False,
            "id": get_id(), "fillStyle": "solid", "strokeWidth": 2, "strokeStyle": "solid",
            "roughness": 0, "opacity": 100, "angle": 0, "x": box_x + box_w/2, "y": current_y + box_h + 10,
            "strokeColor": "#adb5bd", "backgroundColor": "transparent", "width": 0, "height": 30,
            "seed": 1, "groupIds": [], "strokeSharpness": "round", "boundElements": [],
            "startBinding": None, "endBinding": None, "lastCommittedPoint": None,
            "startArrowhead": None, "endArrowhead": "arrow",
            "points": [[0, 0], [0, 30]]
        })
        current_y += box_h + 50
    return elements

pages = [
    {
        "title": "01. 메인 (정원해독 다한증 클리닉)",
        "sections": [
            {"title": "1. 문제 인식 & 공감 (Problem)", "desc": "[카피] 수술해도 재발하고, 땀구멍을 막으면 엉뚱한 곳에서 터진다면?\n- 비주얼: 답답하게 땀 흘리는 모습 (보톡스/수술에 지친 환자의 절망감 공감)"},
            {"title": "2. 가치 입증 & 권위 (Authority)", "desc": "[카피] 14년 동안 3,800명을 쾌적한 일상으로 돌려보낸 박제욱 원장입니다.\n- 비주얼: 압도적인 치료 후기 숫자와 원장님 진료 모습 노출"},
            {"title": "3. 패러다임 전환 (Shift)", "desc": "[카피] 땀은 죄가 없습니다. 땀구멍(뚜껑)을 막지 말고 불(독소)을 꺼야 합니다.\n- 비주얼: 끓어 넘치는 냄비 그래픽. 자율신경계 온도 센서 고장의 개념 제시"},
            {"title": "4. 솔루션 제시 (Solution)", "desc": "[카피] 신경을 자르지 않는 가장 안전한 선택: 비움-순환-채움 3단계\n- 비주얼: 해독탕(비움) -> 침(순환) -> 보양(채움) 3단계 인포그래픽"},
            {"title": "5. 반박 제거 (Objection/FAQ)", "desc": "[카피] 부작용이 걱정되시나요? 보상성 0%의 이유를 밝힙니다.\n- 기능: 수술/보톡스 비교표 & 100문 100답 (60문항 아코디언 토글)"},
            {"title": "6. 행동 유도 (CTA)", "desc": "[카피] 더 이상 땀구멍을 막지 마세요. 지금 내 체질 원인을 확인해 보세요.\n- 기능: [원장님 1:1 상담 예약] / [나와 같은 증상 치료후기 보기] 버튼"}
        ]
    },
    {
        "title": "02. 손발땀 (수족다한증)",
        "sections": [
            {"title": "1. 문제 인식 & 공감", "desc": "[카피] 악수하기 전 주머니에 손 닦는 버릇, 터치 안 되는 스마트폰...\n- 비주얼: 젖은 시험지, 땀나는 손. 일상의 치명적 불편함 공감"},
            {"title": "2. 가치 입증 & 권위", "desc": "[카피] 이온영동기 내성을 겪던 30대 남성, 10년째 보송함을 유지 중입니다.\n- 비주얼: 수족다한증 장기 치료 성공 사례"},
            {"title": "3. 패러다임 전환", "desc": "[카피] 손발은 찬데 왜 열이 많다 할까요? '진열가한'의 비밀\n- 비주얼: 중심에 갇힌 심열/위열 때문에 손발로 땀이 밀려나는 그래픽"},
            {"title": "4. 솔루션 제시", "desc": "[카피] 손끝까지 맑게, 수족해독탕 & 말초 자율신경 약침\n- 비주얼: 뭉친 속 열을 끄고 말초 순환을 돕는 치료 원리"},
            {"title": "5. 반박 제거", "desc": "[카피] 100% 멈추는 수술 대신 10%의 건강한 촉촉함을 약속합니다.\n- 기능: 100문 100답 (15문항 토글). 수족냉증/부종 동반 해결 입증"},
            {"title": "6. 행동 유도", "desc": "[카피] 당당하게 손을 내밀 수 있는 일상, 지금 예약하세요.\n- 기능: [손발땀 집중 치료 상담하기] 버튼"}
        ]
    },
    {
        "title": "03. 머리얼굴땀 (안면/두항부)",
        "sections": [
            {"title": "1. 문제 인식 & 공감", "desc": "[카피] 밥 먹을 때마다 쏟아지는 땀, 속절없이 지워지는 화장\n- 비주얼: 미각다한증, 젖은 머리칼, 대인기피증 공감"},
            {"title": "2. 가치 입증 & 권위", "desc": "[카피] 대인기피증까지 왔던 20대 여성의 화사한 미소 되찾기\n- 비주얼: 안면 다한증 치료 성공 리얼 후기"},
            {"title": "3. 패러다임 전환", "desc": "[카피] 얼굴 피지가 아닙니다. 머리로 솟구치는 상열하한과 위열입니다.\n- 비주얼: 열기구처럼 위장의 열이 안면으로 치솟는 그래픽"},
            {"title": "4. 솔루션 제시", "desc": "[카피] 치솟는 열은 내리고 순환을 뚫는 수승화강(水昇火降) 요법\n- 비주얼: 위열을 식히는 청열 한약과 안면 약침 인포그래픽"},
            {"title": "5. 반박 제거", "desc": "[카피] 땀이 멈추면 탈모와 안면홍조, 넓어진 땀구멍도 함께 수축됩니다.\n- 기능: 100문 100답 (6문항 토글). 미각다한증 원리 설명"},
            {"title": "6. 행동 유도", "desc": "[카피] 화장이 무너지지 않는 보송한 하루, 지금 상담하세요.\n- 기능: [머리얼굴땀 타겟 치료 상담하기] 버튼"}
        ]
    },
    {
        "title": "04. 상체땀 (가슴, 등, 겨드랑이)",
        "sections": [
            {"title": "1. 문제 인식 & 공감", "desc": "[카피] 회색 티셔츠의 악몽, 누렇게 변색되는 옷깃과 시큼한 냄새\n- 비주얼: 땀 자국 때문에 어두운 옷만 입는 스트레스 공감"},
            {"title": "2. 가치 입증 & 권위", "desc": "[카피] 액취증 수술 없이도 맑은 땀을 되찾은 직장인 사례\n- 비주얼: 상체 땀 및 암내 호전 리얼 후기"},
            {"title": "3. 패러다임 전환", "desc": "[카피] 겨드랑이 땀샘 문제가 아니라, 방광경과 심포경의 열독 정체입니다.\n- 비주얼: 등/가슴 림프절에 끈적한 습열 노폐물이 고인 인체 그래픽"},
            {"title": "4. 솔루션 제시", "desc": "[카피] 상체 림프관의 노폐물을 비워내는 맑은 상초 해독요법\n- 비주얼: 상체 경락 소통 및 림프 순환 배독 치료 과정"},
            {"title": "5. 반박 제거", "desc": "[카피] 땀 양만 줄어드는 게 아닙니다. 땀 성분 자체가 물처럼 맑아집니다.\n- 기능: 100문 100답 (6문항 토글). 액취증/황한 동시 치료 입증"},
            {"title": "6. 행동 유도", "desc": "[카피] 당당하게 흰옷을 입는 여름, 지금 준비하세요.\n- 기능: [상체땀/액취증 해독 상담하기] 버튼"}
        ]
    },
    {
        "title": "05. 하체땀 (엉덩이, 사타구니)",
        "sections": [
            {"title": "1. 문제 인식 & 공감", "desc": "[카피] 의자에서 일어날 때 젖은 방석, 긁지 못하는 지독한 가려움\n- 비주얼: 사타구니 낭습, 완선, 직장인/수험생의 민망함 공감"},
            {"title": "2. 가치 입증 & 권위", "desc": "[카피] 수년 된 완선과 하체 식은땀을 동시에 해결한 40대 남성 후기\n- 비주얼: 하체 다한증 완치 후기 슬라이드"},
            {"title": "3. 패러다임 전환", "desc": "[카피] 연고로 해결되지 않습니다. 골반강에 갇힌 끈적한 '하초습열'입니다.\n- 비주얼: 아랫배와 골반에 탁한 물과 열이 무겁게 가라앉은 그래픽"},
            {"title": "4. 솔루션 제시", "desc": "[카피] 밑 빠진 독의 물을 시원하게 비우는 하초 청열배독\n- 비주얼: 소변과 대변으로 습열을 배출시키고 온열 화주뜸으로 순환"},
            {"title": "5. 반박 제거", "desc": "[카피] 속을 비우면 무좀균(곰팡이)이 살 환경 자체가 영원히 사라집니다.\n- 기능: 100문 100답 (관련 문항 토글). 피부과 연고 내성 반박"},
            {"title": "6. 행동 유도", "desc": "[카피] 누구에게도 말 못 할 찝찝한 고통, 원장님과 비밀 상담하세요.\n- 기능: [하초 습열 1:1 비밀 상담하기] 버튼"}
        ]
    },
    {
        "title": "06. 전신다한증",
        "sections": [
            {"title": "1. 문제 인식 & 공감", "desc": "[카피] 하루 종일 젖어있는 온몸, 숟가락 들 힘조차 없는 만성피로\n- 비주얼: 수차례 옷을 갈아입고 탈진하여 쓰러질 듯한 모습 공감"},
            {"title": "2. 가치 입증 & 권위", "desc": "[카피] 다이어트 약 부작용으로 무너진 몸, 다시 일어선 리얼 스토리\n- 비주얼: 전신다한증 극복 및 체력 회복 후기"},
            {"title": "3. 패러다임 전환", "desc": "[카피] 운동 땀이 아닙니다. 방어선(위기) 붕괴와 자율신경계 폭주입니다.\n- 비주얼: 기허(氣虛) 상태로 진액이 마구 새어 나가는 고장 난 몸 그래픽"},
            {"title": "4. 솔루션 제시", "desc": "[카피] 새는 진액은 막고, 무너진 방어막은 철통같이 튼튼하게 재건합니다.\n- 비주얼: 텅 빈 배터리가 100% 충전되는 보양 해독 요법"},
            {"title": "5. 반박 제거", "desc": "[카피] 땀을 막는 것이 아닙니다. 땀구멍이 스스로 닫히는 '힘'을 길러줍니다.\n- 기능: 100문 100답 (5문항 토글). 양약 부작용 해독 원리"},
            {"title": "6. 행동 유도", "desc": "[카피] 무너진 체력과 뽀송한 일상을 동시에 되찾으세요.\n- 기능: [전신 기력/해독 치료 상담하기] 버튼"}
        ]
    },
    {
        "title": "07. 보상성 다한증",
        "sections": [
            {"title": "1. 문제 인식 & 공감", "desc": "[카피] 손 수술 후 등과 배로 폭발하는 땀... 시간을 되돌리고 싶다면?\n- 비주얼: 수술 후회, 엉뚱한 곳에서 비 오듯 땀 쏟는 절망감 공감"},
            {"title": "2. 가치 입증 & 권위", "desc": "[카피] 교감신경 차단술 후 15년 고통받던 환자, 90% 호전의 기적\n- 비주얼: 보상성 다한증 호전 리얼리티 갤러리"},
            {"title": "3. 패러다임 전환", "desc": "[카피] 신경을 다시 이을 순 없지만, 땀 분비 신호(열독)를 꺼버릴 순 있습니다.\n- 비주얼: 하나의 비상구가 막혀 다른 곳으로 솟구치는 불길 그래픽"},
            {"title": "4. 솔루션 제시", "desc": "[카피] 끓어오르는 몸 전체의 총 발열량을 낮추는 청열 보상성 해독\n- 비주얼: 갇힌 열을 대청소하여 뇌의 흥분 신호 자체를 줄이는 인포그래픽"},
            {"title": "5. 반박 제거", "desc": "[카피] 잘린 신경을 이을 순 없어도, 일상의 80~90% 편안함은 약속합니다.\n- 기능: 100문 100답 (4문항 토글). 수술과 해독의 속도 차이 반박"},
            {"title": "6. 행동 유도", "desc": "[카피] 재수술의 부작용 두려움 없이, 가장 안전하게 되돌려드립니다.\n- 기능: [보상성 다한증 자연 치유 상담하기] 버튼"}
        ]
    },
    {
        "title": "08. 도한증 (밤 식은땀)",
        "sections": [
            {"title": "1. 문제 인식 & 공감", "desc": "[카피] 젖은 베개와 뜬눈으로 밤을 지새우는 만성 탈수의 고통\n- 비주얼: 수면 중 식은땀, 이갈이, 갱년기 불면증 공감"},
            {"title": "2. 가치 입증 & 권위", "desc": "[카피] 갱년기 열오름과 식은땀 불면증을 동시에 날려버린 50대 여성\n- 비주얼: 도한증 및 수면장애 완치 리얼 후기"},
            {"title": "3. 패러다임 전환", "desc": "[카피] 체내 냉각수(진액)가 바닥나 밤마다 치솟는 허열(가짜 열)입니다.\n- 비주얼: 엔진오일이 말라 밤새 헛도는 과열(음허) 엔진 그래픽"},
            {"title": "4. 솔루션 제시", "desc": "[카피] 메마른 우물에 맑은 진액을 듬뿍 채우는 보음(補陰) 수면 해독\n- 비주얼: 마른 장작이 아닌 촉촉하게 물이 차오르는 치유 이미지"},
            {"title": "5. 반박 제거", "desc": "[카피] 수면제 없이도, 뇌신경이 이완되면 식은땀이 멎고 깊은 잠에 빠집니다.\n- 기능: 100문 100답 (3문항 토글). 허열과 진액 고갈 설명"},
            {"title": "6. 행동 유도", "desc": "[카피] 뽀송하고 개운한 진짜 숙면, 내일 아침의 활력을 예약하세요.\n- 기능: [수면/도한증 해독 상담하기] 버튼"}
        ]
    },
    {
        "title": "09. 치료후기 (리뷰 특화 구조)",
        "sections": [
            {"title": "1. 가치 입증 (Social Proof)", "desc": "[카피] 다한증은 불치병이 아님을 3,800개의 데이터가 증명합니다.\n- 비주얼: 병원 로비에 빼곡히 쌓인 자필 후기 차트 사진 노출"},
            {"title": "2. 리얼리티 (Authenticity)", "desc": "[카피] 과장 광고가 아닌 100% 자필 후기 원본 공개\n- 기능: 의료법을 준수한 로그인 기반의 프리미엄 후기 열람 기능"},
            {"title": "3. 증상별 분류 (Categorization)", "desc": "[기능] 나와 똑같은 증상을 가진 사람의 후기를 직관적으로 찾아보세요.\n- 비주얼: 탭 메뉴 (손발 / 얼굴 / 전신 / 보상성 / 액취증 등 분류)"},
            {"title": "4. 장기 유지 증명 (Long-term)", "desc": "[카피] \"10년이 지나도 요요 없이 쾌적합니다.\"\n- 비주얼: 치료 직후가 아닌, 몇 년 뒤에도 뽀송함이 유지되는 장기 추적 인터뷰"},
            {"title": "5. 반박 제거 (Objection Handling)", "desc": "[카피] \"정말 내성이나 재발이 없을까요?\" 의심을 팩트로 타파합니다.\n- 내용: 신경을 자르지 않고 '불(열독)'을 껐기 때문에 평생 유지가 가능함 설명"},
            {"title": "6. 행동 유도 (CTA)", "desc": "[카피] 이제 당신이 이 기적 같은 후기의 주인공이 될 차례입니다.\n- 기능: [상담 예약하기] / [원장님 1:1 카톡 문의] 버튼"}
        ]
    },
    {
        "title": "10. 한의원 소개 (브랜드 특화 구조)",
        "sections": [
            {"title": "1. 원장 철학 (Philosophy)", "desc": "[카피] \"땀구멍을 막는 의사가 아닌, 불을 끄는 의사 박제욱입니다.\"\n- 비주얼: 원장님의 신뢰감 있는 프로필. 14년 해독 외길 스토리"},
            {"title": "2. 핵심 차별성 (Core Competence)", "desc": "[카피] 왜 수많은 다한증 환자들이 돌고 돌아 결국 경희정원을 찾을까요?\n- 비주얼: 타 병원 포기 환자, 부작용 환자들의 최후의 보루라는 권위 어필"},
            {"title": "3. 진료 환경 (Privacy)", "desc": "[카피] 대인기피증 환자도 안심하는 1:1 프라이빗 진료 시스템\n- 비주얼: 번잡한 공장형 병원이 아닌, 시원하고 쾌적한 프라이빗 진료실 전경"},
            {"title": "4. 투명성 및 안전성 (Transparency)", "desc": "[카피] 내 가족이 먹을 수 없다면 달이지 않습니다.\n- 비주얼: 식약처 인증 청정 약재 및 위생적인 오픈 조제실 전경 사진"},
            {"title": "5. 반박 제거 (Objection Handling)", "desc": "[카피] 한약 먹으면 간 나빠진다? 속을 편안하게 씻어내는 독소 0% 정화 한약\n- 비주얼: 간 수치 저하/안전성을 입증하는 한약재 검사 결과표 노출"},
            {"title": "6. 오시는 길 (Location & CTA)", "desc": "[정보] 환자분의 소중한 걸음이 헛되지 않도록 최선을 다하겠습니다.\n- 기능: 지도, 주차 정보, 진료 시간표 및 [길찾기] / [예약하기] 버튼"}
        ]
    }
]

all_elements = []
for i, page in enumerate(pages):
    offset_x = i * 1000
    els = generate_section_elements(offset_x, page["title"], page["sections"])
    all_elements.extend(els)

data = {
    "type": "excalidraw",
    "version": 2,
    "source": "https://excalidraw.com",
    "elements": all_elements,
    "appState": {"viewBackgroundColor": "#ffffff"}
}

with open("00_다한증_전체_설계도_6단계.excalidraw", 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Updated 00_다한증_전체_설계도_6단계.excalidraw with tailored steps for reviews and about pages.")
