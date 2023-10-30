import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_APIKEY,
  authDomain: `${process.env.NEXT_PUBLIC_FB_PROJECT}.firebaseapp.com`,
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT,
  storageBucket: `${process.env.NEXT_PUBLIC_FB_PROJECT}.appspot.com`,
  messagingSenderId: process.env.NEXT_PUBLIC_FB_SENDER,
  appId: process.env.NEXT_PUBLIC_FB_APPID,
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
