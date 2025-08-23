function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}
// Select the toggle switch
const darkModeSwitch = document.getElementById("dark-mode-switch");

// Toggle dark mode and save the preference
darkModeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
  const isDarkMode = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
});

// Preserve dark mode across sessions
window.addEventListener("DOMContentLoaded", () => {
  const darkModePreference = localStorage.getItem("darkMode");
  if (darkModePreference === "enabled") {
    document.body.classList.add("dark-mode");
    darkModeSwitch.checked = true;
  }
});
// Ensure dark mode is always enabled on page load
window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("dark-mode");
  localStorage.setItem("darkMode", "enabled");
  const darkModeSwitch = document.getElementById("dark-mode-switch");
  if (darkModeSwitch) darkModeSwitch.checked = true;
});

// Function to calculate the difference between two dates in months and days
function calculateExperience(startDate) {
  const today = new Date();
  const start = new Date(startDate);

  let years = today.getFullYear() - start.getFullYear();
  let months = today.getMonth() - start.getMonth();
  let days = today.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days };
}

// Function to format the experience as a string
function formatExperience({ years, months, days }) {
  let experience = "";
  if (years > 0) experience += `${years} year${years > 1 ? "s" : ""} `;
  if (months > 0) experience += `${months} month${months > 1 ? "s" : ""} `;
  if (days > 0) experience += `${days} day${days > 1 ? "s" : ""}`;
  return experience.trim();
}

// Update LenDenClub experience
const lendenclubStartDate = "2025-02-05"; // Start date for LenDenClub
const lendenclubExperience = calculateExperience(lendenclubStartDate);
document.getElementById("lendenclub-experience").textContent = formatExperience(lendenclubExperience);

// StaticEducare experience (fixed at 2 months)
const staticeducareExperience = { years: 0, months: 2, days: 0 };

// Calculate total experience
const totalExperience = {
  years: lendenclubExperience.years + staticeducareExperience.years,
  months: lendenclubExperience.months + staticeducareExperience.months,
  days: lendenclubExperience.days + staticeducareExperience.days,
};

// Adjust total months and days if they exceed limits
if (totalExperience.days >= 30) {
  totalExperience.months += Math.floor(totalExperience.days / 30);
  totalExperience.days %= 30;
}
if (totalExperience.months >= 12) {
  totalExperience.years += Math.floor(totalExperience.months / 12);
  totalExperience.months %= 12;
}

// Update total experience
document.getElementById("total-experience").textContent = formatExperience(totalExperience);

// Loading dots animation
function animateDots(elementId) {
  let dots = 0;
  setInterval(() => {
    dots = (dots % 3) + 1; // Cycle through 1, 2, 3
    const dotString = ".".repeat(dots); // Create the dots string
    document.getElementById(elementId).textContent = dotString;
  }, 500); // Update every 500ms
}

// Start the loading dots animation for LenDenClub and total experience
animateDots("lendenclub-dots");
animateDots("total-dots");

// Select all highlighted words
const highlights = document.querySelectorAll(".highlight");
const imagePopup = document.getElementById("image-popup");
const popupImage = document.getElementById("popup-image");

// Add event listeners to each highlighted word
highlights.forEach((highlight) => {
  // Show image on hover
  highlight.addEventListener("mouseenter", () => {
    const imageSrc = highlight.getAttribute("data-image");
    if (imageSrc) {
      popupImage.src = imageSrc;
      imagePopup.classList.remove("hidden");
    } else {
      console.error("Image source not found for:", highlight.textContent);
    }
  });

  // Hide image when hover ends
  highlight.addEventListener("mouseleave", () => {
    imagePopup.classList.add("hidden");
  });

  // Show image on click
  highlight.addEventListener("click", () => {
    const imageSrc = highlight.getAttribute("data-image");
    if (imageSrc) {
      popupImage.src = imageSrc;
      imagePopup.classList.remove("hidden");
    } else {
      console.error("Image source not found for:", highlight.textContent);
    }
  });
});

// Hide popup when clicking on the popup itself
imagePopup.addEventListener("click", () => {
  imagePopup.classList.add("hidden");
});