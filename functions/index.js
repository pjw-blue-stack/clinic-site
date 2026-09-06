const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
const cors = require('cors')({ origin: true });

admin.initializeApp();

/**
 * 카카오 액세스 토큰으로 파이어베이스 커스텀 토큰 발급
 */
exports.createCustomTokenKakao = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(400).json({ error: 'Only POST requests are accepted' });
    }

    let token = req.body.token;
    const code = req.body.code;
    const clientId = req.body.clientId;
    const redirectUri = req.body.redirectUri;

    if (!token && !code) {
      return res.status(400).json({ error: 'There is no token or code in the request body.' });
    }

    console.log('Kakao token exchange request:', { clientId, redirectUri, code });

    try {
      // 1. 코드가 넘어왔다면 먼저 액세스 토큰으로 교환
      if (code) {
        const tokenResponse = await axios.post('https://kauth.kakao.com/oauth/token', 
          new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: clientId,
            client_secret: 'ww60WOhNQ2eHKMWtdrzRJzPSOdBliW6j',
            redirect_uri: redirectUri,
            code: code
          }).toString(),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
          }
        );
        token = tokenResponse.data.access_token;
      }

      // 2. 카카오 API로 사용자 정보 가져오기
      const kakaoResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = kakaoResponse.data;
      console.log('Kakao user data:', JSON.stringify(data));
      
      const uid = `kakao:${data.id}`;
      const email = data.kakao_account?.email || `${data.id}@kakao.com`;
      const displayName = data.kakao_account?.profile?.nickname || '카카오 사용자';
      const userRecord = { email, displayName };
      if (data.kakao_account?.profile?.profile_image_url) {
        userRecord.photoURL = data.kakao_account.profile.profile_image_url;
      }

      // 2. 파이어베이스 사용자 확인 및 생성/업데이트
      const saveUser = async (record) => {
        try {
          await admin.auth().updateUser(uid, record);
          return uid;
        } catch (error) {
          if (error.code === 'auth/user-not-found') {
            await admin.auth().createUser({ uid: uid, ...record });
            return uid;
          } else {
            throw error;
          }
        }
      };

      let tokenUid = uid;
      try {
        tokenUid = await saveUser(userRecord);
      } catch (error) {
        if (error.code === 'auth/email-already-exists') {
          // 기존 구글 계정 등과 이메일이 겹치면 해당 계정으로 연결 (계정 통합)
          const existingUser = await admin.auth().getUserByEmail(userRecord.email);
          tokenUid = existingUser.uid;
        } else if (error.code === 'auth/invalid-email') {
          delete userRecord.email;
          tokenUid = await saveUser(userRecord);
        } else {
          throw error;
        }
      }

      // 3. 커스텀 토큰 생성 및 반환
      const customToken = await admin.auth().createCustomToken(tokenUid);
      return res.status(200).json({ firebaseToken: customToken });

    } catch (error) {
      console.error('Error creating custom token for Kakao:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
});

/**
 * 네이버 액세스 토큰으로 파이어베이스 커스텀 토큰 발급
 */
exports.createCustomTokenNaver = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(400).json({ error: 'Only POST requests are accepted' });
    }

    const token = req.body.token;
    if (!token) {
      return res.status(400).json({ error: 'There is no token in the request body.' });
    }

    try {
      // 1. 네이버 API로 사용자 정보 가져오기
      const naverResponse = await axios.get('https://openapi.naver.com/v1/nid/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = naverResponse.data.response;
      console.log('Naver user data:', JSON.stringify(data));
      
      const uid = `naver:${data.id}`;
      const userRecord = {
        email: data.email || `${data.id}@naver.com`,
        displayName: data.name || data.nickname || '네이버 사용자',
      };
      if (data.profile_image) {
        userRecord.photoURL = data.profile_image;
      }

      // 2. 파이어베이스 사용자 확인 및 생성/업데이트
      const saveUser = async (record) => {
        try {
          await admin.auth().updateUser(uid, record);
          return uid;
        } catch (error) {
          if (error.code === 'auth/user-not-found') {
            await admin.auth().createUser({ uid: uid, ...record });
            return uid;
          } else {
            throw error;
          }
        }
      };

      let tokenUid = uid;
      try {
        tokenUid = await saveUser(userRecord);
      } catch (error) {
        if (error.code === 'auth/email-already-exists') {
          // 기존 구글 계정 등과 이메일이 겹치면 해당 계정으로 연결 (계정 통합)
          const existingUser = await admin.auth().getUserByEmail(userRecord.email);
          tokenUid = existingUser.uid;
        } else if (error.code === 'auth/invalid-email') {
          delete userRecord.email;
          tokenUid = await saveUser(userRecord);
        } else {
          throw error;
        }
      }

      // 3. 커스텀 토큰 생성 및 반환
      const customToken = await admin.auth().createCustomToken(tokenUid);
      return res.status(200).json({ firebaseToken: customToken });

    } catch (error) {
      console.error('Error creating custom token for Naver:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
});

/**
 * 사용자 강제 탈퇴 (Firebase Auth에서 삭제)
 */
exports.deleteUserAccount = functions.https.onCall(async (data, context) => {
  // 1. 요청자가 관리자인지 확인 (보안)
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', '인증되지 않은 사용자입니다.');
  }

  const requesterUid = context.auth.uid;
  const requesterEmail = context.auth.token.email;

  // 관리자 권한 확인 로직 (최고 관리자 이메일이거나 Firestore role이 admin인지 검사)
  // 여기서는 Firestore를 직접 조회하거나 이메일 검사를 수행합니다.
  const adminEmails = ['pjw-blue@hanmail.net'];
  const db = admin.firestore();
  
  let isRequesterAdmin = false;
  if (adminEmails.includes(requesterEmail)) {
    isRequesterAdmin = true;
  } else {
    const requesterDoc = await db.collection('users').doc(requesterUid).get();
    if (requesterDoc.exists && requesterDoc.data().role === 'admin') {
      isRequesterAdmin = true;
    }
  }

  if (!isRequesterAdmin) {
    throw new functions.https.HttpsError('permission-denied', '관리자 권한이 없습니다.');
  }

  const targetUid = data.uid;
  if (!targetUid) {
    throw new functions.https.HttpsError('invalid-argument', '삭제할 사용자의 UID가 필요합니다.');
  }

  // 2. Firebase Auth에서 해당 유저 삭제
  try {
    await admin.auth().deleteUser(targetUid);
    
    // (선택) Firestore에서도 지우고 싶다면 여기서 지울 수 있지만, 프론트에서 이미 지우도록 짤 수 있음.
    // await db.collection('users').doc(targetUid).delete();
    
    return { success: true, message: '사용자가 성공적으로 삭제되었습니다.' };
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new functions.https.HttpsError('internal', '사용자 삭제에 실패했습니다.', error.message);
  }
});

/**
 * Gemini AI 상담 챗봇 기능
 */
const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.chatWithGemini = functions.https.onCall(async (data, context) => {
  // 인증 여부는 선택 (비로그인도 진단 가능하게 하려면 주석 유지)
  // if (!context.auth) {
  //   throw new functions.https.HttpsError('unauthenticated', '로그인이 필요합니다.');
  // }

  const { messages, scoreResult, specialty } = data;
  if (!messages || !Array.isArray(messages)) {
    throw new functions.https.HttpsError('invalid-argument', '메시지 배열이 올바르지 않습니다.');
  }

  const apiKey = process.env.GEMINI_API_KEY || functions.config().gemini?.apikey;
  if (!apiKey) {
    throw new functions.https.HttpsError('failed-precondition', 'Gemini API Key가 설정되지 않았습니다.');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  
  // Use gemini-1.5-flash as it's the recommended fast/cheap model
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const systemPrompt = `
당신은 '정원한의원'의 박제욱 대표 원장입니다.
환자가 다한증 관련 AI 자가진단을 마친 후 추가적인 질문을 하고 있습니다.
환자의 자가진단 결과는 다음과 같습니다:
- 종합 상태: ${scoreResult}
- 주요 증상 부위: ${specialty}

지침:
1. 항상 따뜻하고 전문적인 말투('~습니다', '~해요', '~다')를 사용하세요.
2. 수술(교감신경절제술 등)을 권유하지 마시고, 정원한의원의 '비우고 채우는' 한방 해독 치료(정원해독)를 통해 근본적인 자율신경계 회복이 가능하다고 안내하세요.
3. 다른 병원 이름이나 양방 치료법은 구체적으로 언급하지 마세요.
4. 환자의 증상에 공감해주고, 정확한 진단을 위해서는 내원이 필요함을 부드럽게 안내하세요.
5. 답변은 너무 길지 않게 핵심만 2~4문장으로 답변해주세요.
`;

  try {
    // Convert generic messages [{role: 'user', content: '...'}, {role: 'model', content: '...'}] 
    // to Gemini's format: [{role: 'user', parts: [{text: '...'}]}, {role: 'model', parts: [{text: '...'}]}]
    const history = messages.slice(0, -1).map(m => ({
      role: m.role === 'ai' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));
    
    // Add system instruction as the very first message internally if history allows, or just prepend to the prompt.
    // Gemini JS SDK supports systemInstruction field for gemini-1.5 models.
    const modelWithInstruction = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: systemPrompt
    });

    const chat = modelWithInstruction.startChat({
      history: history
    });

    const userMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    const text = response.text();

    return { reply: text };

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new functions.https.HttpsError('internal', 'AI 상담 처리 중 오류가 발생했습니다.', error.message);
  }
});

