// Character sets
const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()-_=+[]{};:',.<>?/|`~";

const dataset = {
  upperCase: upperChars,
  lowerCase: lowerChars,
  numbers: numberChars,
  symbols: symbolChars,
};

// DOM Elements
const inputRange = document.querySelector("#character-num");
const rangeValue = document.querySelector("#length-value");
const upperOption = document.querySelector("#upper");
const lowerOption = document.querySelector("#lower");
const numberOption = document.querySelector("#numbers");
const symbolOption = document.querySelector("#symbol");
const generateBtn = document.querySelector("#generate-pass");
const passwordInput = document.querySelector("#password");
const copyBtn = document.querySelector("#copy-btn");
const strengthText = document.querySelector("#strength-text");
const strengthIndicator = document.querySelector("#strength-indicator");

// Live range value update
inputRange.addEventListener("input", function (e) {
  rangeValue.textContent = e.target.value;
});

// Check if checkbox is checked
function isChecked(option) {
  return option.checked;
}

// Get all selected options and password length
function includedOptions() {
  return {
    total_characters: parseInt(rangeValue.textContent),
    upperCase_Permission: isChecked(upperOption),
    lowerCase_Permission: isChecked(lowerOption),
    numbers_permission: isChecked(numberOption),
    symbols_permission: isChecked(symbolOption),
  };
}

// Handle zero selection
function handleZeroOptionSelection(permissions) {
  const status = Object.values(permissions).slice(1);
  if (status.every((value) => value === false)) {
    alert("Please select at least one option.");
    throw new Error("No options selected");
  }
}

// Get valid permission keys
function oneOptionHandler(permissions) {
  const options = Object.keys(permissions);
  return options.filter((key) => permissions[key] === true);
}

// Resolve options into dataset keys
function resolveOptions(userPermissions) {
  let options = [];

  if (userPermissions.includes("upperCase_Permission")) options.push("upperCase");
  if (userPermissions.includes("lowerCase_Permission")) options.push("lowerCase");
  if (userPermissions.includes("numbers_permission")) options.push("numbers");
  if (userPermissions.includes("symbols_permission")) options.push("symbols");

  return options;
}

// Generate password string
function passwordString(total_characters, options) {
  let password = "";
  const baseLength = Math.floor(total_characters / options.length);
  let remaining = total_characters % options.length;

  options.forEach((key) => {
    const charset = dataset[key];
    const charsToPick = baseLength + (remaining > 0 ? 1 : 0);
    remaining--;

    for (let i = 0; i < charsToPick; i++) {
      const index = Math.floor(Math.random() * charset.length);
      password += charset[index];
    }
  });

  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

// Check password strength
function evaluateStrength(password, selectedTypes) {
  const length = password.length;
  let strength = 0;

  if (length >= 8) strength++;
  if (length >= 12) strength++;
  if (selectedTypes >= 2) strength++;
  if (selectedTypes >= 3) strength++;

  // Apply UI updates
  if (strength <= 1) {
    strengthText.textContent = "Strength: Weak";
    strengthIndicator.style.background = "red";
  } else if (strength === 2) {
    strengthText.textContent = "Strength: Medium";
    strengthIndicator.style.background = "orange";
  } else if (strength >= 3) {
    strengthText.textContent = "Strength: Strong";
    strengthIndicator.style.background = "green";
  }
}

// Generate password handler
function generatePassword() {
  const permissions = includedOptions();
  handleZeroOptionSelection(permissions);

  const userPermissions = oneOptionHandler(permissions);
  const resolvedOptions = resolveOptions(userPermissions);
  const totalLength = permissions.total_characters;

  const finalPassword = passwordString(totalLength, resolvedOptions);

  passwordInput.value = finalPassword;

  evaluateStrength(finalPassword, resolvedOptions.length);
}

// Copy to clipboard
copyBtn.addEventListener("click", () => {
  const password = passwordInput.value;
  if (password) {
    navigator.clipboard.writeText(password);
    copyBtn.textContent = "✅";
    setTimeout(() => (copyBtn.textContent = "📋"), 1000);
  }
});

// Generate password
generateBtn.addEventListener("click", generatePassword);
