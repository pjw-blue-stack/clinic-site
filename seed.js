import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAi_D3ESFwcrcDgFTylCVlkYRK534sdP54",
  authDomain: "jungwon-homepage.firebaseapp.com",
  projectId: "jungwon-homepage",
  storageBucket: "jungwon-homepage.firebasestorage.app",
  messagingSenderId: "594080834053",
  appId: "1:594080834053:web:c5596b4e9a2dec5f82326c",
  measurementId: "G-1C07PNB61R"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const seedData = async () => {
    console.log("Seeding data...");
    
    // Seed Notices
    const notices = [
        { tag: "[안내]", title: "다한증 원장님 1:1 맞춤 진료 사전예약 안내", date: "2026.08.30", createdAt: Date.now() - 3000 },
        { tag: "[공지]", title: "추석 연휴 휴진 및 정상 진료 일정 안내", date: "2026.08.25", createdAt: Date.now() - 2000 },
        { tag: "[소식]", title: "건물 내 전용 주차장 만차 시 공영주차장 안내", date: "2026.08.10", createdAt: Date.now() - 1000 }
    ];
    for(let n of notices) {
        await addDoc(collection(db, "notices"), n);
    }
    console.log("Notices seeded.");
    
    // Seed Columns
    const columns = [
        { id: 1, title: '전신 다한증, 왜 생기고 어떻게 치료할까?', category: '전신다한증', icon: '💧', summary: '머리부터 발끝까지 땀이 멈추지 않는 전신 다한증의 근본 원인과 한방 치료법에 대해 알아봅니다.', content: '전신 다한증은...', readTime: '5분', date: '2026.08.15', createdAt: Date.now() - 4000, author: '대표원장 박제욱' },
        { id: 2, title: '수족다한증, 수술 없이 치료가 가능할까요?', category: '수족다한증', icon: '🖐️', summary: '손발에 땀이 많이 나는 수족다한증, 부작용 걱정 없는 비수술적 치료법을 소개합니다.', content: '수족다한증은...', readTime: '4분', date: '2026.08.20', createdAt: Date.now() - 3000, author: '대표원장 박제욱' },
        { id: 3, title: '얼굴 다한증과 안면홍조의 연관성', category: '두안면다한증', icon: '🥵', summary: '얼굴에 땀이 나는 두안면다한증은 안면홍조와 동반되는 경우가 많습니다. 그 이유를 파헤쳐봅니다.', content: '두안면다한증은...', readTime: '6분', date: '2026.08.25', createdAt: Date.now() - 2000, author: '대표원장 박제욱' },
        { id: 4, title: '보상성 다한증, 교감신경 절제술의 딜레마', category: '보상성다한증', icon: '⚖️', summary: '다한증 수술 후 다른 부위에서 땀이 나는 보상성 다한증의 원인과 해결책을 알아봅니다.', content: '보상성 다한증은...', readTime: '5분', date: '2026.09.01', createdAt: Date.now() - 1000, author: '대표원장 박제욱' },
    ];
    for(let c of columns) {
        await addDoc(collection(db, "columns"), c);
    }
    console.log("Columns seeded.");
    
    // Seed QnA
    const qnas = [
        { isSecret: false, question: '다한증 약침 치료는 얼마나 받아야 효과가 있나요?', author: '박*민', authorEmail: 'park@example.com', isAnswered: true, answer: '환자분의 상태에 따라 다르지만 보통 1~2개월 꾸준히 치료받으시면 호전됩니다.', createdAt: Date.now() - 5000 },
        { isSecret: true, question: '수족다한증 수술 부작용(보상성)도 치료 가능한가요?', author: '이*준', authorEmail: 'lee@example.com', isAnswered: false, answer: '', createdAt: Date.now() - 1000 }
    ];
    for(let q of qnas) {
        await addDoc(collection(db, "qna"), q);
    }
    console.log("QnA seeded.");
    
    // Seed Reviews
    const reviews = [
        { name: '김*현', specialtyId: '전신다한증', title: '여름이 두렵지 않게 되었습니다', content: '항상 여름만 되면...', rating: 5, date: '2026.07.15', createdAt: Date.now() - 6000 },
        { name: '이*준', specialtyId: '수족다한증', title: '악수하는게 더이상 겁나지 않아요', content: '수족다한증 때문에 사람 만나는게 힘들었는데...', rating: 5, date: '2026.08.02', createdAt: Date.now() - 5000 }
    ];
    for(let r of reviews) {
        await addDoc(collection(db, "reviews"), r);
    }
    console.log("Reviews seeded.");
    
    process.exit(0);
};

seedData();
