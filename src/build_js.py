import json
import os
import re

md_dir = "/Users/parkjeuk/Library/Mobile Documents/iCloud~md~obsidian/Documents/Obsidian Vault(pjw)/홈페이지 개발/clinic-site/다한증_웹페이지_기획"
js_path = "/Users/parkjeuk/Library/Mobile Documents/iCloud~md~obsidian/Documents/Obsidian Vault(pjw)/홈페이지 개발/clinic-site/src/specialtyData.js"

files = {
    "hyperhidrosis": "01_정원해독_다한증클리닉.md",
    "sujok": "02_손발땀.md",
    "du-myeon": "03_머리얼굴땀.md",
    "sangche": "04_상체땀.md",
    "hache": "05_하체땀.md",
    "jeonsin": "06_전신다한증.md",
    "bosangseong": "07_보상성다한증.md",
    "dohan": "08_도한증_식은땀.md"
}

def parse_faqs(filepath):
    faqs = []
    if not os.path.exists(filepath):
        return faqs
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # split by #### Q
    blocks = re.split(r'(?=#### Q\d+)', content)
    for block in blocks:
        block = block.strip()
        if block.startswith('#### Q'):
            lines = block.split('\n', 1)
            if len(lines) == 2:
                q = lines[0].strip()
                a = lines[1].strip()
                # remove surrounding quotes if exist
                if a.startswith('"') and a.endswith('"'):
                    a = a[1:-1]
                faqs.append({"q": q, "a": a})
    return faqs

base_data = [
  {
    "id": "hyperhidrosis",
    "title": "정원해독 다한증 클리닉",
    "subtitle": "체내 독소 제거 및 자율신경 안정",
    "icon": "💧",
    "sixSteps": {
      "problem": {
        "title": "문제 인식 & 공감",
        "copy": "수술해도 재발하고, 땀구멍을 막으면 엉뚱한 곳에서 터진다면?",
        "desc": "이온영동기, 보톡스, 드리클로... 임시방편에 지친 환자분들의 좌절과 답답함에 깊이 공감합니다."
      },
      "authority": {
        "title": "가치 입증 & 권위",
        "copy": "14년 동안 3,800명을 쾌적한 일상으로 돌려보낸 박제욱 원장입니다.",
        "desc": "단순한 약 처방이 아닌, 근본적인 자율신경계 회복을 위한 13,200제 이상의 맞춤 해독 처방 데이터를 보유하고 있습니다."
      },
      "shift": {
        "title": "패러다임 전환",
        "copy": "땀구멍(뚜껑)을 막지 말고, 몸속의 끓는 불(독소)을 꺼야 합니다.",
        "desc": "땀은 죄가 없습니다. 일차성 다한증은 체내에 축적된 독소가 교감신경계를 흥분시켜 온도 센서가 고장난 질환입니다. 냄비 뚜껑을 돌로 막으면 폭발하지만, 가스레인지 불을 끄면 평온해집니다."
      },
      "solution": {
        "title": "솔루션 제시",
        "copy": "신경을 자르지 않는 가장 안전한 선택: 비움-순환-채움 3단계",
        "desc": "[1단계: 비움] 해독지한탕으로 몸속 열독 배출\n[2단계: 순환] 수승화강 침으로 자율신경 밸런스 회복\n[3단계: 채움] 고갈된 진액을 보충하여 재발 방지"
      },
      "objection": {
        "title": "다한증 100문 100답",
        "copy": "치료에 대한 의심과 걱정, 팩트로 완벽히 해소해 드립니다.",
        "faqs": []
      },
      "cta": {
        "title": "행동 유도",
        "copy": "더 이상 땀구멍을 억지로 막지 마세요. 내 몸의 불을 끄는 진짜 치료를 시작하세요.",
        "btnText": "원장님 1:1 진단 예약하기"
      }
    }
  },
  {
    "id": "sujok",
    "title": "손발땀 (수족다한증)",
    "subtitle": "일상의 악수를 복구하는 치료",
    "icon": "✋",
    "sixSteps": {
      "problem": {
        "title": "문제 인식 & 공감",
        "copy": "악수하기 전 주머니에 손을 닦는 버릇, 터치 안 되는 스마트폰...",
        "desc": "젖어버린 시험지, 타인과의 신체 접촉을 피하게 되는 대인관계 위축까지. 일상의 가장 치명적인 불편함입니다."
      },
      "authority": {
        "title": "가치 입증 & 권위",
        "copy": "이온영동기 내성으로 고통받던 30대 남성, 10년째 보송함을 유지 중입니다.",
        "desc": "일시적인 차단이 아닌, 장기적인 쾌적함을 유지하는 수많은 완치 사례가 증명합니다."
      },
      "shift": {
        "title": "패러다임 전환",
        "copy": "손발은 찬데 왜 열이 많다 할까요? '진열가한(眞熱假寒)'의 비밀",
        "desc": "심장(심열)과 위장(위열)의 열독이 코어에 갇히면, 몸은 끝부분인 손발로 땀을 밀어내 열을 식히려 합니다. 그래서 손발은 차가운데 땀이 나는 것입니다."
      },
      "solution": {
        "title": "솔루션 제시",
        "copy": "손끝까지 맑게, 수족해독탕 & 말초 자율신경 약침",
        "desc": "속의 뭉친 열을 끄는 '수족해독탕'과 말초 림프 순환을 살리는 '화주뜸'을 결합하여 근본적인 순환을 뚫어냅니다."
      },
      "objection": {
        "title": "부위별 맞춤 100문 100답",
        "copy": "손발 땀에 대한 궁금증, 전문의가 직접 답해드립니다.",
        "faqs": []
      },
      "cta": {
        "title": "행동 유도",
        "copy": "당당하게 손을 내밀 수 있는 일상, 무좀 없는 보송한 발, 지금 되찾으세요.",
        "btnText": "수족다한증 1:1 상담 예약"
      }
    }
  },
  {
    "id": "du-myeon",
    "title": "머리얼굴땀 (안면/미각)",
    "subtitle": "상열하한 해소 및 화장 무너짐 방지",
    "icon": "😐",
    "sixSteps": {
      "problem": {
        "title": "문제 인식 & 공감",
        "copy": "식사할 때마다 쏟아지는 땀, 속절없이 지워지는 화장",
        "desc": "매운 것만 먹어도 얼굴이 흥건해지는 미각다한증, 두피 지루성 피부염과 대인기피증으로 이어지는 고통."
      },
      "authority": {
        "title": "가치 입증 & 권위",
        "copy": "대인기피증까지 왔던 20대 직장인, 화사한 미소와 자신감을 되찾다.",
        "desc": "얼굴로 쏠리는 열을 완벽히 제어한 다양한 리얼 후기 데이터."
      },
      "shift": {
        "title": "패러다임 전환",
        "copy": "얼굴 피지가 아닙니다. 머리로 솟구치는 상열하한과 위열입니다.",
        "desc": "열기구처럼 위장/간의 열이 머리로 치솟아 발생하는 현상입니다. 두피 땀구멍을 막는 샴푸로는 절대 해결되지 않습니다."
      },
      "solution": {
        "title": "솔루션 제시",
        "copy": "치솟는 열은 내리고 순환을 뚫는 수승화강(水昇火降) 요법",
        "desc": "위열을 식히는 청열 한약과 안면 신경을 진정시키는 특화 약침으로 불기운을 아랫배로 끌어내립니다."
      },
      "objection": {
        "title": "안면다한증 핵심 Q&A",
        "copy": "안면홍조와 탈모도 함께 좋아지나요? 명쾌하게 답변드립니다.",
        "faqs": []
      },
      "cta": {
        "title": "행동 유도",
        "copy": "무너지지 않는 메이크업, 당당한 식사 자리. 지금 되찾으세요.",
        "btnText": "안면/두항부 다한증 상담 예약"
      }
    }
  },
  {
    "id": "sangche",
    "title": "상체땀 (등/가슴/겨드랑이)",
    "subtitle": "황한 및 액취증 동시 개선",
    "icon": "👕",
    "sixSteps": {
      "problem": {
        "title": "문제 인식 & 공감",
        "copy": "회색 티셔츠의 악몽, 누렇게 변색되는 옷깃의 스트레스",
        "desc": "등/가슴의 땀띠, 겨드랑이 땀자국(황한), 그리고 신경 쓰이는 시큼한 냄새(액취증)의 불편함."
      },
      "authority": {
        "title": "가치 입증 & 권위",
        "copy": "액취증 수술 없이도 맑고 냄새 없는 땀을 되찾은 실제 사례들",
        "desc": "상체 땀과 냄새를 동시에 잡는 경희정원만의 특화 해독 노하우."
      },
      "shift": {
        "title": "패러다임 전환",
        "copy": "아포크린 땀샘 자체의 문제가 아니라, 방광경/심포경의 열독 정체입니다.",
        "desc": "상체 림프절에 끈적한 노폐물(습열)이 쌓여 악취와 땀이 유발됩니다. 냄새를 덮는 데오드란트로는 근본을 고칠 수 없습니다."
      },
      "solution": {
        "title": "솔루션 제시",
        "copy": "림프관의 노폐물을 비워내는 맑은 상초 해독요법",
        "desc": "상체 경락을 소통시키는 해독탕과 림프 순환 배독 치료로 탁한 땀을 물처럼 맑게 정화합니다."
      },
      "objection": {
        "title": "상체땀 집중 Q&A",
        "copy": "수술 없이 냄새까지 줄어드는 원리, 직접 확인해 보세요.",
        "faqs": []
      },
      "cta": {
        "title": "행동 유도",
        "copy": "당당하게 밝은 옷을 입는 여름, 지금 바로 준비하세요.",
        "btnText": "상체땀/액취증 해독 상담하기"
      }
    }
  },
  {
    "id": "hache",
    "title": "하체땀 (사타구니/엉덩이)",
    "subtitle": "하초습열 제거 및 피부질환 완화",
    "icon": "👖",
    "sixSteps": {
      "problem": {
        "title": "문제 인식 & 공감",
        "copy": "일어날 때마다 젖은 방석, 긁지 못하는 지독한 가려움의 민망함",
        "desc": "사타구니 낭습, 완선, 통풍 안 되는 허벅지의 답답함은 겪어본 사람만 압니다."
      },
      "authority": {
        "title": "가치 입증 & 권위",
        "copy": "수년 된 극심한 완선과 하체 식은땀을 동시에 해결한 40대 남성의 이야기",
        "desc": "오래 앉아있는 직장인/수험생의 고질병을 완치한 데이터."
      },
      "shift": {
        "title": "패러다임 전환",
        "copy": "피부 연고로 해결되지 않습니다. 골반강에 고인 썩은 물, '하초습열'입니다.",
        "desc": "아랫배와 골반에 탁한 물과 열이 무겁게 가라앉아 곰팡이균이 서식하기 좋은 환경이 된 것이 근본 원인입니다."
      },
      "solution": {
        "title": "솔루션 제시",
        "copy": "밑 빠진 독의 썩은 물을 빼내는 하초 청열배독",
        "desc": "하체 습열을 소변과 대변으로 시원하게 빼내는 한약과 하복부 순환을 복구하는 온열 화주뜸."
      },
      "objection": {
        "title": "하체땀 핵심 Q&A",
        "copy": "피부과 약으로도 낫지 않던 가려움이 멈추는 이유를 밝힙니다.",
        "faqs": []
      },
      "cta": {
        "title": "행동 유도",
        "copy": "누구에게도 말 못 할 찝찝한 고통, 원장님과 비밀스럽게 상담하세요.",
        "btnText": "하초 습열 1:1 비밀 상담하기"
      }
    }
  },
  {
    "id": "jeonsin",
    "title": "전신다한증",
    "subtitle": "기력 회복 및 전신 면역력 강화",
    "icon": "🏃",
    "sixSteps": {
      "problem": {
        "title": "문제 인식 & 공감",
        "copy": "하루 종일 젖어있는 온몸, 숟가락 들 힘조차 없는 만성피로",
        "desc": "하루에도 수차례 옷을 갈아입고, 완전히 무너진 체력. 운동할 때 나는 개운한 땀이 아닙니다."
      },
      "authority": {
        "title": "가치 입증 & 권위",
        "copy": "다이어트 약 부작용으로 무너진 몸, 다시 일어선 리얼 스토리",
        "desc": "전신의 기력을 끌어올려 무너진 자율신경 밸런스를 복구한 임상 사례."
      },
      "shift": {
        "title": "패러다임 전환",
        "copy": "단순 다한증이 아닙니다. 방어선(위기) 붕괴와 자율신경계 온도 센서의 폭주입니다.",
        "desc": "한의학에서 말하는 기허(氣虛) 상태. 피부 땀구멍을 여닫는 조절력을 완전히 상실하여 진액이 속절없이 새어나가는 것입니다."
      },
      "solution": {
        "title": "솔루션 제시",
        "copy": "새는 진액은 막고, 무너진 방어막은 철통같이 재건합니다.",
        "desc": "텅 빈 배터리를 100% 충전하는 보양 해독 한약과 전신 밸런스를 잡아주는 전침 치료의 결합."
      },
      "objection": {
        "title": "전신다한증 팩트체크",
        "copy": "보약 먹으면 살찌지 않을까 걱정하시나요? 속 시원히 대답해 드립니다.",
        "faqs": []
      },
      "cta": {
        "title": "행동 유도",
        "copy": "단순히 땀만 멈추는 것이 아닙니다. 예전의 펄펄 끓던 진짜 체력을 되찾아 드립니다.",
        "btnText": "전신 기력/해독 치료 상담하기"
      }
    }
  },
  {
    "id": "bosangseong",
    "title": "보상성다한증",
    "subtitle": "수술 후유증 완화 및 체온 조절 시스템 복구",
    "icon": "🔄",
    "sixSteps": {
      "problem": {
        "title": "문제 인식 & 공감",
        "copy": "손 수술 후 등과 배로 폭발하는 땀... 돌이킬 수 없다는 절망감",
        "desc": "교감신경 절제술의 뼈저린 후회. 수술 부위만 말랐을 뿐, 다른 곳에서 비 오듯 쏟아지는 보상성 땀의 고통."
      },
      "authority": {
        "title": "가치 입증 & 권위",
        "copy": "신경 차단술 후 15년 고통받던 환자, 90% 이상 일상 호전의 기적",
        "desc": "재수술이 불가능한 환자들을 위한 마지막 보루, 정원해독의 압도적 임상 경험."
      },
      "shift": {
        "title": "패러다임 전환",
        "copy": "잘린 신경(비상구) 탓이 아닙니다. 속의 총 발열량(불길)이 문제입니다.",
        "desc": "하나의 비상구가 막히자 다른 곳으로 솟구치는 불길. 신경을 다시 이을 순 없지만, 몸속의 끓어오르는 불길 자체를 꺼버리면 땀 분비 신호는 급감합니다."
      },
      "solution": {
        "title": "솔루션 제시",
        "copy": "몸 전체의 총 발열량을 강력하게 낮추는 청열 보상성 해독",
        "desc": "갇힌 열을 대청소하는 특화 해독탕과 중추신경/자율신경을 동시에 진정시키는 약침 요법."
      },
      "objection": {
        "title": "보상성 다한증 심층 Q&A",
        "copy": "잘린 신경도 완벽히 치료가 될까요? 거짓 없는 솔직한 한계를 말씀드립니다.",
        "faqs": []
      },
      "cta": {
        "title": "행동 유도",
        "copy": "100% 이전으로 돌아갈 순 없어도, 일상의 80~90% 편안함은 약속합니다.",
        "btnText": "보상성 다한증 희망 상담하기"
      }
    }
  },
  {
    "id": "dohan",
    "title": "도한증 (수면 식은땀)",
    "subtitle": "음허 해소 및 깊은 숙면 유도",
    "icon": "🌙",
    "sixSteps": {
      "problem": {
        "title": "문제 인식 & 공감",
        "copy": "잠자리가 축축하게 젖어 깨어나는 무서운 밤, 만성 탈수의 고통",
        "desc": "도둑처럼 찾아오는 밤 식은땀, 갱년기 열오름, 이갈이, 그리고 극심한 불면증."
      },
      "authority": {
        "title": "가치 입증 & 권위",
        "copy": "갱년기 열오름과 식은땀, 불면증을 동시에 날려버린 50대 여성의 미소",
        "desc": "안정제나 수면제 없이 수면 장애와 식은땀을 잡는 해독 치료 데이터."
      },
      "shift": {
        "title": "패러다임 전환",
        "copy": "더위가 아닙니다. 체내 냉각수(진액)가 바닥나 밤마다 치솟는 허열(가짜 열)입니다.",
        "desc": "엔진오일(냉각수)이 말라 엔진이 밤새 헛도는 과열 상태(음허). 고갈된 몸이 남은 에너지를 쥐어짜내는 위험 신호입니다."
      },
      "solution": {
        "title": "솔루션 제시",
        "copy": "메마른 우물에 맑은 진액을 듬뿍 채우는 보음(補陰) 수면 해독",
        "desc": "허열을 끄고 진액을 공급하는 수면 해독 한약과 뇌신경을 이완시키는 심열 진정 침 치료."
      },
      "objection": {
        "title": "수면 다한증(도한증) Q&A",
        "copy": "수면제 없이 어떻게 잠이 올까요? 해독 수면의 원리를 확인하세요.",
        "faqs": []
      },
      "cta": {
        "title": "행동 유도",
        "copy": "뽀송하고 개운한 진짜 숙면, 내일 아침의 놀라운 활력을 예약하세요.",
        "btnText": "수면/도한증 해독 상담하기"
      }
    }
  }
]

# Insert FAQs
for item in base_data:
    key = item["id"]
    if key in files:
        filepath = os.path.join(md_dir, files[key])
        faqs = parse_faqs(filepath)
        item["sixSteps"]["objection"]["faqs"] = faqs

# Generate output JS string
output = "export const specialties = " + json.dumps(base_data, ensure_ascii=False, indent=2) + ";\n\n"
output += """
export const reviewsData = [
  { id: 1, type: "video", title: "15년된 보상성 다한증, 드디어 일상을 되찾았습니다.", patient: "김지민(가명) / 30대 / 회사원", rating: 5, date: "2026.07.15", content: "수술 후 배와 등으로 땀이 폭발해서...", tags: ["#보상성다한증", "#수술부작용", "#15년고통"], img: "/blog-img2.png" },
  { id: 2, type: "text", title: "수족다한증, 이온영동기 내성을 극복하다.", patient: "이정우(가명) / 20대 / 대학생", rating: 5, date: "2026.06.28", content: "악수하는게 세상에서 제일 두려웠습니다...", tags: ["#손발땀", "#이온영동기내성", "#면접자신감"], img: null },
  { id: 3, type: "video", title: "매운 것만 먹어도 줄줄 흐르던 안면땀, 이젠 화장이 안 지워져요.", patient: "박수진(가명) / 40대 / 교사", rating: 5, date: "2026.06.10", content: "식사 시간이 공포였습니다...", tags: ["#안면다한증", "#미각다한증", "#상열하한"], img: "/blog-img1.png" },
  { id: 4, type: "text", title: "갱년기 도한증, 수면제 없이 꿀잠 잡니다.", patient: "최은숙(가명) / 50대 / 주부", rating: 5, date: "2026.05.22", content: "밤마다 식은땀으로 베개가 다 젖어서...", tags: ["#도한증", "#식은땀", "#갱년기불면증"], img: null }
];
"""

with open(js_path, 'w', encoding='utf-8') as f:
    f.write(output)

print("specialtyData.js successfully generated with 6-step schema and FAQs.")
