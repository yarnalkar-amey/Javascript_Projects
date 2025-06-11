// Get all inputs
const nameInput = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPass = document.querySelector("#confirm-password");

// Get button
const submitBtn = document.querySelector(".submit-btn");

// Get messages
const nameMsg = document.querySelector("#name-message");
const emailMsg = document.querySelector("#email-message");
const passMsg = document.querySelector("#pass-message");
const copassMsg = document.querySelector("#copass-message");

// Name validation
function handleName() {
  const nameValue = nameInput.value.trim();

  if (!nameValue) {
    nameInput.classList.add("wrong");
    nameMsg.classList.remove("hidden");
    nameMsg.textContent = "Name cannot be empty";
    return false;
  }

  const isOnlyLetters = /^[a-zA-Z ]+$/.test(nameValue);
  if (!isOnlyLetters) {
    nameInput.classList.add("wrong");
    nameInput.classList.remove("right");
    nameMsg.classList.remove("hidden");
    nameMsg.textContent = "Name must contain only letters";
    return false;
  }

  nameInput.classList.remove("wrong");
  nameInput.classList.add("right");
  nameMsg.classList.add("hidden");
  nameMsg.textContent = "";
  return true;
}

// Email validation
function handleEmail() {
  const emailValue = email.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailValue) {
    email.classList.add("wrong");
    emailMsg.classList.remove("hidden");
    emailMsg.textContent = "Email cannot be empty";
    return false;
  }

  if (!emailPattern.test(emailValue)) {
    email.classList.add("wrong");
    email.classList.remove("right");
    emailMsg.classList.remove("hidden");
    emailMsg.textContent = "Invalid email format";
    return false;
  }

  email.classList.remove("wrong");
  email.classList.add("right");
  emailMsg.classList.add("hidden");
  emailMsg.textContent = "";
  return true;
}

// Password validation
function handlePassword() {
  const passValue = password.value.trim();

  if (!passValue) {
    password.classList.add("wrong");
    passMsg.classList.remove("hidden");
    passMsg.textContent = "Password cannot be empty";
    return false;
  }

  if (passValue.length < 6) {
    password.classList.add("wrong");
    passMsg.classList.remove("hidden");
    passMsg.textContent = "Password must be at least 6 characters";
    return false;
  }

  password.classList.remove("wrong");
  password.classList.add("right");
  passMsg.classList.add("hidden");
  passMsg.textContent = "";
  return true;
}

// Confirm password validation
function handleConfirmPassword() {
  const passValue = password.value.trim();
  const confirmValue = confirmPass.value.trim();

  if (!confirmValue) {
    confirmPass.classList.add("wrong");
    copassMsg.classList.remove("hidden");
    copassMsg.textContent = "Please confirm your password";
    return false;
  }

  if (confirmValue !== passValue) {
    confirmPass.classList.add("wrong");
    copassMsg.classList.remove("hidden");
    copassMsg.textContent = "Passwords do not match";
    return false;
  }

  confirmPass.classList.remove("wrong");
  confirmPass.classList.add("right");
  copassMsg.classList.add("hidden");
  copassMsg.textContent = "";
  return true;
}

// Submit handler
submitBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const isNameValid = handleName();
  const isEmailValid = handleEmail();
  const isPassValid = handlePassword();
  const isConfirmValid = handleConfirmPassword();

  if (isNameValid && isEmailValid && isPassValid && isConfirmValid) {
    alert("Form submitted successfully!");
    // Here you can actually submit the form or reset fields
  } else {
    console.log("Validation failed");
  }
});
