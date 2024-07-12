import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_KEY_FIREBASE,
  authDomain: "project-img-86376.firebaseapp.com",
  projectId: "project-img-86376",
  storageBucket: "project-img-86376.appspot.com",
  messagingSenderId: "973196808455",
  appId: "1:973196808455:web:8e4cabae6536367edcf5a2",
  measurementId: "G-LVPSN1YCMW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
