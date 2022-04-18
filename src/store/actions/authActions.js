import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from 'services/firebase';

const formatData = (obj) => ({
  uid: obj.uid,
  name: obj.displayName,
  email: obj.email,
  avatar: obj.photoURL,
});

const register = async (email, password) => {
  const userData = await createUserWithEmailAndPassword(auth, email, password);
  // console.log('register', userData.user);
  const user = formatData(userData.user);
  localStorage.setItem('user', JSON.stringify(user));
  return user;
};

const login = async (email, password) => {
  const userData = await signInWithEmailAndPassword(auth, email, password);
  // console.log('login ', userData.user);
  const user = formatData(userData.user);
  localStorage.setItem('user', JSON.stringify(user));
  return user;
};

const loginWithGoogle = async () => {
  const providerGoogle = new GoogleAuthProvider();
  const userData = await signInWithPopup(auth, providerGoogle);
  // console.log('login with Google ', userData.user);
  const user = formatData(userData.user);
  localStorage.setItem('user', JSON.stringify(user));
  return user;
};

const logout = async () => {
  await signOut(auth);
  localStorage.removeItem('user');
  localStorage.removeItem('favorites');
};

const getStatus = () => (auth.currentUser ? formatData(auth.currentUser) : false);

// const user = auth.currentUser;

//   onAuthStateChanged(auth, (currentUser) => {
//     let userState = '';
//     if (currentUser) {
//       userState = formatData(currentUser);
//       console.log('existe currentUser', userState);
//     } else {
//       userState = null;
//       localStorage.removeItem('user');
//       console.log('no Existe currentUser', userState);
//     }
//     console.log('al terminar el if ', userState);
//     return userState;
//   });

export { login, register, logout, loginWithGoogle, getStatus };
