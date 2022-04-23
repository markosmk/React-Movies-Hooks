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

const handleErrors = (code) => {
  const states = {
    //signInWithEmailAndPassword
    'auth/user-not-found': 'User not Found',
    'auth/invalid-email': 'Invalid Email',
    'auth/user-disabled': 'User has been disabled',
    'auth/wrong-password': 'Wrong password',
    //createUserWithEmailAndPassword
    'auth/email-already-in-use': 'Email already exists',
    'auth/operation-not-allowed': 'The email/password accounts are not enabled',
    'auth/weak-password': 'Password is not strong enough',
    //signInWithPopup
    'auth/timeout': 'Domain is not authorized',
    'auth/account-exists-with-different-credential':
      'An account with the email address asserted already exists',
    'auth/credential-already-in-use': 'The credential already exists',
  };
  return states[code] || 'Error Server, sorry try later';
};

const register = async (email, password) => {
  try {
    const userData = await createUserWithEmailAndPassword(auth, email, password);
    const user = formatData(userData.user);
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (error) {
    throw new Error(handleErrors(error.code));
  }
};

const login = async (email, password) => {
  try {
    const userData = await signInWithEmailAndPassword(auth, email, password);
    const user = formatData(userData.user);
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (error) {
    console.log(error.code);
    throw new Error(handleErrors(error.code));
  }
};

const loginWithGoogle = async () => {
  try {
    const providerGoogle = new GoogleAuthProvider();
    const userData = await signInWithPopup(auth, providerGoogle);
    const user = formatData(userData.user);
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (error) {
    throw new Error(handleErrors(error.code));
  }
};

const logout = async () => {
  await signOut(auth);
  localStorage.removeItem('user');
  localStorage.removeItem('favorites');
};

const getStatus = () => (auth.currentUser ? formatData(auth.currentUser) : false);

export { login, register, logout, loginWithGoogle, getStatus };
