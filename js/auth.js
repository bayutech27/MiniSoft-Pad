import { auth } from "./main.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";


// 🟢 WAIT UNTIL HTML IS READY
document.addEventListener("DOMContentLoaded", () => {

  // ===== GET ELEMENTS =====
  const signUpName = document.getElementById("userName");  
  const signUpEmail = document.getElementById("signupEmail");
  const signUpPassword = document.getElementById("signupPassword");
  const signUpBtn = document.getElementById("signup");

  const signInEmail = document.getElementById("email");
  const signInPassword = document.getElementById("password");
  const signInBtn = document.getElementById("login");

  const logOutBtn = document.getElementById("logOutBtn");

  const resetEmail = document.getElementById("recoverEmail");
  const resetPasswordBtn = document.getElementById("getPassword");


  // ===== SIGN UP =====
  const userSignUp = async (e) => {
    e.preventDefault();

    const userEmail = signUpEmail.value;
    const userPassword = signUpPassword.value;

    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        console.log(userCredential.user);
        alert("Your account has been successfully created!");
      })
      .catch((error) => {
        console.log(error.code, error.message);
        alert(error.message);
      });
  };


  // ===== LOGIN =====
  const userSignIn = async (e) => {
    e.preventDefault();

    const userEmail = signInEmail.value;
    const userPassword = signInPassword.value;

    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        console.log(userCredential.user);
        alert("You have logged in successfully!");
      })
      .catch((error) => {
        console.log(error.code, error.message);
        alert(error.message);
      });
  };


  // ===== LOGOUT =====
  const userLogOut = async () => {
    await signOut(auth);
    window.location.href = "index.html";
  };


  // ===== AUTH STATE =====
  onAuthStateChanged(auth, (user) => {
  const path = window.location.pathname;

  if (user) {
    // logged in
    if (path.includes("index")) {
      window.location.href = "dashboard.html";
    }
  } else {
    // logged out
    if (path.includes("dashboard")) {
      window.location.href = "index.html";
    }
  }
});


//======RESET PASSWORD=======

if (resetPasswordBtn) {
  resetPasswordBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    if (!resetEmail.value) {
      alert("Enter your email");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail.value);
      alert("Password reset email sent. If you don't see it, please check your spam or junk folder.");

    } catch (error) {
      alert(error.message);
    }
  });
}



  // ===== EVENT LISTENERS (SAFE) =====
  if (signUpBtn) signUpBtn.addEventListener("click", userSignUp);
  if (signInBtn) signInBtn.addEventListener("click", userSignIn);
  if (logOutBtn) logOutBtn.addEventListener("click", userLogOut);

});
