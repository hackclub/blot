import admin from 'firebase-admin'
import { initializeApp, getApp } from 'firebase-admin/app'
import { getFirestore, Timestamp } from 'firebase-admin/firestore'
import { customAlphabet } from 'nanoid'
import { collection, doc, setDoc, query, where } from "firebase/firestore"; 

const numberid = customAlphabet('0123456789', 6);
const uuid = customAlphabet('0123456789abcedefghijklmnopqrstuvwxyz', 8);


const initted = admin.apps.length > 0;

let app;
if (!initted) {
  app = initializeApp({
    credential: admin.credential.cert(
      JSON.parse(
        Buffer.from(import.meta.env.FIREBASE_CREDENTIAL, 'base64').toString()
      )
    )
  }); 
} else {
  console.log("getting existing app");
  app = getApp();
}

const db = getFirestore(app);

// export async function getUserByEmail(email) {
//   console.log("**GET USER BY EMAIL**");

//   try {
//     console.log(db);

//     const _users = await db
//       .collection('users')
//       .where('email', '==', email)
//       .limit(1)
//       .get()

//     console.log("USERRS", _users);

//     if (_users.empty) {
//       return await makeUser();
//     }

//     return { 
//       id: _users.docs[0]?.id, 
//       ..._users.docs[0]?.data() 
//     }
//   } catch (err) {
//     console.log("ERRED WHILE GETTING USER")
//     console.log(err);
//   }
// }

// async function makeUser(email, username) {
//   const data = { 
//     email, 
//     username, 
//     createdAt: Timestamp.now() 
//   };

//   const usersRef = collection(db, "users");

//   const _user = await setDoc()
  
//   return { 
//     id: _user.id, 
//     ...data 
//   };
// }

export async function makeLoginCode(email) {
  const code = numberid();

  const id = `login_${uuid()}`;

  console.log("id", id);

  console.log("db", db);


  let newDoc;
  try {
    newDoc = doc(db, "loginCodes", id);
  } catch (err) {
    console.log(err);
  }

  console.log(newDoc);

  await setDoc(newDoc, {
    code,
    email,
    createdAt: Timestamp.now()
  });

  return code;
}
