import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWweycQG7JDUmjVsKQt0FFgdjiGgvCgDY",
  authDomain: "queuing-system-f7b73.firebaseapp.com",
  projectId: "queuing-system-f7b73",
  storageBucket: "queuing-system-f7b73.appspot.com",
  messagingSenderId: "63099389277",
  appId: "1:63099389277:web:8468c7c3366b7567c254b4",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export default firebase;
