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
