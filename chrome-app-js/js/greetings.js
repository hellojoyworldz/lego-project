const loginForm = document.querySelector("#login-form");
const loginName = document.querySelector(".login-name");
const loginBUtton = document.querySelector(".login-form");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";

function insertUserName(userName) {
  loginForm.classList.add(HIDDEN_CLASSNAME);
  greeting.innerText = `Hello ${userName}👋`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
}

function onLoginSubmit(e) {
  e.preventDefault();
  const username = loginName.value;
  localStorage.setItem("username", username);
  insertUserName(username);
}

loginForm.addEventListener("submit", onLoginSubmit);

const savedUserName = localStorage.getItem("username");
if (savedUserName !== null) {
  insertUserName(savedUserName);
}
