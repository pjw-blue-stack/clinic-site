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
      
      const uid = `kakao:${data.id}`;
      const email = data.kakao_account?.email || `${uid}@kakao.com`;
      const displayName = data.kakao_account?.profile?.nickname || '카카오 사용자';
      const userRecord = { email, displayName };
      if (data.kakao_account?.profile?.profile_image_url) {
        userRecord.photoURL = data.kakao_account.profile.profile_image_url;
      }

      // 2. 파이어베이스 사용자 확인 및 생성/업데이트
      try {
        await admin.auth().updateUser(uid, userRecord);
      } catch (error) {
        if (error.code === 'auth/user-not-found') {
          await admin.auth().createUser({
            uid: uid,
            ...userRecord
          });
        } else {
          throw error;
        }
      }

      // 3. 커스텀 토큰 생성 및 반환
      const customToken = await admin.auth().createCustomToken(uid);
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
      
      const uid = `naver:${data.id}`;
      const userRecord = {
        email: data.email || `${uid}@naver.com`,
        displayName: data.name || data.nickname || '네이버 사용자',
      };
      if (data.profile_image) {
        userRecord.photoURL = data.profile_image;
      }

      // 2. 파이어베이스 사용자 확인 및 생성/업데이트
      try {
        await admin.auth().updateUser(uid, userRecord);
      } catch (error) {
        if (error.code === 'auth/user-not-found') {
          await admin.auth().createUser({
            uid: uid,
            ...userRecord
          });
        } else {
          throw error;
        }
      }

      // 3. 커스텀 토큰 생성 및 반환
      const customToken = await admin.auth().createCustomToken(uid);
      return res.status(200).json({ firebaseToken: customToken });

    } catch (error) {
      console.error('Error creating custom token for Naver:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
});
