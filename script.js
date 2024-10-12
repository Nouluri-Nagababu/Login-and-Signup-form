// Select form and input elements for both forms
const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");

// Registration form inputs
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Login form inputs
const loginUsername = document.getElementById("login-username");
const loginPassword = document.getElementById("login-password");

// Function to show error messages
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
  // console.log(`Error: ${getFieldName(input)} - ${message}`); // Debugging log
}

// Function to show success state
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
  console.log(`Success: ${getFieldName(input)}`); // Debugging log
}

// Function to capitalize the first letter of the input id
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Function to check if fields are required
function checkRequired(inputs) {
  let isValid = true;
  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
      isValid = false;
    } else {
      showSuccess(input);
    }
  });
  return isValid;
}

// Function to check input length
function checkLength(input, min, max) {
  let isValid = true;
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
    isValid = false;
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
    isValid = false;
  } else {
    showSuccess(input);
  }
  return isValid;
}

// Function to validate email format
function checkEmail(input) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
    return true;
  } else {
    showError(input, `${getFieldName(input)} is not valid`);
    return false;
  }
}

// Function to check if passwords match
function checkPasswordMatch(password1, password2) {
  if (password1.value !== password2.value) {
    showError(password2, "Passwords do not match");
    return false;
  } else {
    showSuccess(password2);
    return true;
  }
}

// Function to validate registration form
function validateRegisterForm() {
  const isRequiredValid = checkRequired([username, email, password, password2]);
  const isUsernameLengthValid = checkLength(username, 3, 15);
  const isPasswordLengthValid = checkLength(password, 6, 25);
  const isEmailValid = checkEmail(email);
  const isPasswordMatch = checkPasswordMatch(password, password2);

  return (
    isRequiredValid &&
    isUsernameLengthValid &&
    isPasswordLengthValid &&
    isEmailValid &&
    isPasswordMatch
  );
}

// Function to validate login form
function validateLoginForm() {
  const isRequiredValid = checkRequired([loginUsername, loginPassword]);
  const isUsernameLengthValid = checkLength(loginUsername, 3, 15);
  const isPasswordLengthValid = checkLength(loginPassword, 6, 25);

  return isRequiredValid && isUsernameLengthValid && isPasswordLengthValid;
}

// Check if elements exist before adding event listeners
if (username && email && password && password2) {
  username.addEventListener("input", () => checkLength(username, 3, 15));
  email.addEventListener("input", () => checkEmail(email));
  password.addEventListener("input", () => checkLength(password, 6, 25));
  password2.addEventListener("input", () =>
    checkPasswordMatch(password, password2)
  );
}

if (loginUsername && loginPassword) {
  loginUsername.addEventListener("input", () =>
    checkLength(loginUsername, 3, 15)
  );
  loginPassword.addEventListener("input", () =>
    checkLength(loginPassword, 6, 25)
  );
}

// Form submit event listener for registration
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateRegisterForm()) {
      alert("Registration successful");
      // Clear form fields
      username.value = "";
      email.value = "";
      password.value = "";
      password2.value = "";
    }
  });
}

// Form submit event listener for login
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateLoginForm()) {
      alert("Login successful");
      // Clear form fields
      loginUsername.value = "";
      loginPassword.value = "";
    }
  });
}

// Initialize form visibility based on URL or default to register form
window.onload = function () {
  registerForm.style.display = "block";
  loginForm.style.display = "none";
};
