import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAX73Qc76klOrwCK_Wvtq6FO476V9ofSmk",
  authDomain: "hungry-explorer.firebaseapp.com",
  projectId: "hungry-explorer",
  storageBucket: "hungry-explorer.appspot.com",
  messagingSenderId: "640585247186",
  appId: "1:640585247186:web:817712df8e94831800c00b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
