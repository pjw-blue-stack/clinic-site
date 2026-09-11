const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function checkUser() {
  const usersRef = db.collection('users');
  const snapshot = await usersRef.where('email', '==', 'pjwblue82@naver.com').get();
  
  if (snapshot.empty) {
    console.log('No matching documents in users.');
  } else {
    snapshot.forEach(doc => {
      console.log('users doc:', doc.id, doc.data());
    });
  }

  const unverifiedRef = db.collection('unverifiedUsers');
  const snap2 = await unverifiedRef.where('email', '==', 'pjwblue82@naver.com').get();
  if (snap2.empty) {
    console.log('No matching documents in unverifiedUsers.');
  } else {
    snap2.forEach(doc => {
      console.log('unverifiedUsers doc:', doc.id, doc.data());
    });
  }
}

checkUser().then(() => process.exit(0)).catch(console.error);
