const signupPassword = document.getElementById("signupPassword");
const loginPassword = document.getElementById("password");
const showPassword = document.getElementById("showPassword");

showPassword.addEventListener("click", () => {

  // signup password
  if (signupPassword) {
    signupPassword.type =
      signupPassword.type === "password" ? "text" : "password";
  }

  // login password
  if (loginPassword) {
    loginPassword.type =
      loginPassword.type === "password" ? "text" : "password";
  }

});
