import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_APIKEY,
  authDomain: `${process.env.REACT_APP_FB_PROJECT}.firebaseapp.com`,
  projectId: process.env.REACT_APP_FB_PROJECT,
  storageBucket: `${process.env.REACT_APP_FB_PROJECT}.appspot.com`,
  messagingSenderId: process.env.REACT_APP_FB_SENDER,
  appId: process.env.REACT_APP_FB_APPID,
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
