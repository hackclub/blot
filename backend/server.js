import express from "express";
import dotenv from "dotenv";

import admin from 'firebase-admin'
import { initializeApp, getApp } from 'firebase-admin/app'
import { getFirestore, Timestamp } from 'firebase-admin/firestore'
import { customAlphabet } from 'nanoid'
import { collection, doc, setDoc, query, where } from "firebase/firestore"; 

dotenv.config();

console.log(process.env.FIREBASE_CREDENTIAL)

const firebaseApp = initializeApp({
  credential: admin.credential.cert(
    JSON.parse(
      Buffer.from(process.env.FIREBASE_CREDENTIAL, 'base64').toString()
    )
  )
});

const db = getFirestore(firebaseApp);


const app = express();

app.use(express.json());

const numberid = customAlphabet('0123456789', 6);
const uuid = customAlphabet('0123456789abcedefghijklmnopqrstuvwxyz', 8);


app.get('/hello', (req, res) => {
  const code = numberid();

  const id = `login_${uuid()}`;

  console.log("id", id);

  console.log("db", db, db.constructor.name);


  let newDoc;
  try {
    newDoc = doc(db, "loginCodes", "test");
  } catch (err) {
    console.log("erred", err);
  }

  console.log(newDoc);

  res.send('<h1>Hello World</h1>');
});

app.post('/submit-data', (req, res) => {
    const postData = req.body;
    res.status(200).json({
        status: 'success',
        data: postData
    });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});