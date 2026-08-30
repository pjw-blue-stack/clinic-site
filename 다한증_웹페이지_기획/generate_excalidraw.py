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
    
    # Title
    elements.append(text(300, 50, title, size=40))
    
    current_y = 150
    box_w = 800
    box_x = 100
    
    for sec in sections:
        sec_title = sec['title']
        sec_desc = sec['desc']
        
        # Calculate box height roughly
        lines = sec_desc.count('\n') + 1
        box_h = max(150, lines * 30 + 100)
        
        # Section Box
        elements.append(rect(box_x, current_y, box_w, box_h, bg="#f8f9fa"))
        
        # Section Title
        elements.append(text(box_x + 20, current_y + 20, sec_title, size=28))
        
        # Section Content
        elements.append(text(box_x + 20, current_y + 70, sec_desc, size=20))
        
        # Down Arrow
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

    # Save JSON
    data = {
        "type": "excalidraw",
        "version": 2,
        "source": "https://excalidraw.com",
        "elements": elements,
        "appState": {"viewBackgroundColor": "#ffffff"}
    }
    
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

# 1. Main Page
create_wireframe(
    "01_정원해독메인_설계도.excalidraw",
    "웹페이지 설계도: 정원해독 다한증 클리닉 (메인)",
    [
        {
            "title": "1. Hero Section (공감 & 후킹)",
            "desc": "[카피] 수술해도 재발하고, 땀구멍을 막으면 엉뚱한 곳에서 터진다면?\n- 배경: 답답하게 땀 흘리는 모습 -> 편안해지는 모습 전환\n- 버튼: [원장님 1:1 상담 예약]"
        },
        {
            "title": "2. Paradigm Shift (원인 분석 및 가치 입증)",
            "desc": "[카피] 땀은 죄가 없습니다. 고장난 온도 센서가 문제입니다.\n- 비주얼: 끓어 넘치는 냄비 그래픽 (뚜껑을 막지 말고 불을 끄자)\n- 설명: 양방 검사 정상인데 땀이 나는 이유 (자율신경 기능 오작동)"
        },
        {
            "title": "3. Solution (경희정원 3단계 해독 원리)",
            "desc": "[카피] 신경을 자르지 않는 가장 안전한 선택\n- 1단계: 비움 (해독 한약으로 노폐물/열독 배출)\n- 2단계: 순환 (수승화강 침치료)\n- 3단계: 채움 (고갈된 진액 보충)\n- 비주얼: 1->2->3 순환 인포그래픽"
        },
        {
            "title": "4. Objection Handling (안전성 증명 및 타치료 비교)",
            "desc": "[카피] 왜 해독요법이어야 할까요?\n- 비주얼: 수술/보톡스 vs 해독요법 비교 테이블\n- 핵심: 보상성 다한증 확률 0%, 전신 건강 동반 상승 증명"
        },
        {
            "title": "5. FAQ Center (다한증 100문 100답)",
            "desc": "[기능] 아코디언 토글 (60개 문항)\n- 클릭 시 부드럽게 답변이 펼쳐짐\n- 환자들의 모든 의심과 질문 철벽 방어 (검색 기능 포함)"
        }
    ]
)

# 2. Sub Page (손발땀)
create_wireframe(
    "02_손발땀_설계도.excalidraw",
    "웹페이지 설계도: 손발땀 (수족 다한증)",
    [
        {
            "title": "1. Micro-Empathy (부위별 초정밀 공감)",
            "desc": "[카피] 악수하기 전 주머니에 손을 닦는 버릇, 이제 끝내세요.\n- 환자 고충 나열: 찢어지는 시험지, 터치 안 되는 스마트폰\n- 일상 사진 배치 (공감대 극대화)"
        },
        {
            "title": "2. Targeted Cause (손발땀 특화 원인)",
            "desc": "[카피] 심열(긴장)과 위열(식적)이 손발로 터지는 것입니다.\n- 비주얼: 인체 코어(심장/위장)에 열이 뭉쳐 손발 끝으로 땀이 분출되는 그래픽\n- 설명: 수족냉증과 다한증이 같이 오는 이유 (진열가한)"
        },
        {
            "title": "3. Tailored Solution (맞춤 타겟 해독)",
            "desc": "[카피] 손끝까지 맑게, 수족해독탕 & 말초 자율신경 약침\n- 치료법 1: 속 불을 끄는 해독지한탕\n- 치료법 2: 말초 림프 순환 화주뜸\n- 비주얼: 치료 과정 사진 및 효과 설명"
        },
        {
            "title": "4. Proof & FAQ (동반 증상 호전 및 Q&A)",
            "desc": "[카피] 땀이 멎으면 무좀과 부종도 사라집니다.\n- 리뷰: 수족다한증 완치 리얼 후기 3건 슬라이드\n- FAQ: 손발땀 특화 100문 100답 (15개 문항 토글)"
        }
    ]
)
