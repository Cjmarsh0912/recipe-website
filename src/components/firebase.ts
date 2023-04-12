// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCpd1gvMbRE-kwgyRLMsmApMHkzqRkIngQ',
  authDomain: 'recipe-website-43298.firebaseapp.com',
  projectId: 'recipe-website-43298',
  storageBucket: 'recipe-website-43298.appspot.com',
  messagingSenderId: '466908845368',
  appId: '1:466908845368:web:59e0d65d89aae43edf9dcd',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
