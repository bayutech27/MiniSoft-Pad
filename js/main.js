
  // Import the functions you need from the SDKs you need


 import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";


  // TODO: Add SDKs for Firebase products that you want to use


  // https://firebase.google.com/docs/web/setup#available-libraries


  // Your web app's Firebase configuration

  const firebaseConfig = {
    apiKey: "AIzaSyBUzlV3wV-yGU-GwN4DavUsr_dDpZxGl48",
    authDomain: "minisoftpad.firebaseapp.com",
    projectId: "minisoftpad",
    storageBucket: "minisoftpad.firebasestorage.app",
    messagingSenderId: "410356466832",
    appId: "1:410356466832:web:08ef229514060cfbb40415"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
  