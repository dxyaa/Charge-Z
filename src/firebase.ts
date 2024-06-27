import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Firestore, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyC66aGB_i8uwcMdlrrzs9-AAFjMJl5JdGE",
  authDomain: "ev-charge-d2d21.firebaseapp.com",
  projectId: "ev-charge-d2d21",
  storageBucket: "ev-charge-d2d21.appspot.com",
  messagingSenderId: "406568900413",
  appId: "1:406568900413:web:caf63e4d26b6edad619754",
  measurementId: "G-D9PHWPZ0EG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;
