// Function to generate a random hex byte (00 to FF)
function getRandomHexByte() {
  const num = Math.floor(Math.random() * 256); // 0 to 255
  const hex = num.toString(16).toUpperCase(); // Convert to hex
  return hex.padStart(2, "0"); // Ensure two characters
}

// Function to generate a full hex color (e.g., #A3F92D)
function getRandomColor() {
  let color = "#";
  for (let i = 0; i < 3; i++) {
    color += getRandomHexByte();
  }
  return color;
}

const statusMsg = document.getElementById("statusMsg");

function showStatusMessage() {

  // Reset any existing animation classes
  statusMsg.classList.remove("hide");
  statusMsg.classList.remove("show");

  // Trigger reflow to restart animation
//   void statusMsg.offsetWidth;

  // Add show animation
  statusMsg.classList.add("show");

  // After delay, trigger fade out
  setTimeout(() => {
    statusMsg.classList.remove("show");
    statusMsg.classList.add("hide");
  }, 1600); // show duration
}


// Get DOM elements
const generateBtn = document.querySelector("button");
const colorContainer = document.querySelectorAll(".color-container");
const colorCode = Array.from(document.querySelectorAll(".color-code"));
const colorBox = Array.from(document.querySelectorAll(".color-box"));
const copyButtons = Array.from(document.querySelectorAll(".color-box i"));

// Add event listener to button
generateBtn.addEventListener("click", () => {
  colorContainer.forEach((container, index) => {
    const color = getRandomColor();
    container.style.backgroundColor = color; // fixed typo and reference
    colorCode[index].textContent = color.toUpperCase();
  });
});

colorBox.forEach((box) => {
  box.addEventListener("click", (e) => {
    if (copyButtons.includes(e.target)) {
      const icon = e.target;

      // Change icon immediately
      icon.classList.remove("fa-copy");
      icon.classList.add("fa-check");

      // Revert icon back after 2 seconds
      setTimeout(() => {
        icon.classList.remove("fa-check");
        icon.classList.add("fa-copy");
      }, 2000);

      const sibling = icon.previousElementSibling;
      navigator.clipboard.writeText(sibling.textContent)
      .then(
        showStatusMessage()
      )
    }
  });
});
