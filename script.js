document.addEventListener("DOMContentLoaded", function () {
  const welcomeMessage = document.getElementById("welcomeMessage");
  welcomeMessage.textContent = "Welcome to my portfolio page!";
  welcomeMessage.style.display = "block";

  const themeToggleBtn = document.getElementById("themeToggleBtn");
  themeToggleBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    themeToggleBtn.textContent = document.body.classList.contains("dark-mode")
      ? "Switch to Light Mode"
      : "Switch to Dark Mode";
  });

  function setupToggle(buttonId, contentId, visibleText, hiddenText) {
    const button = document.getElementById(buttonId);
    const content = document.getElementById(contentId);

    button.addEventListener("click", function () {
      content.classList.toggle("hidden-section");
      const isHidden = content.classList.contains("hidden-section");
      button.textContent = isHidden ? visibleText : hiddenText;
    });
  }

  setupToggle("toggleSkillsBtn", "skillsList", "Show Skills", "Hide Skills");
  setupToggle("toggleCertificationsBtn", "certificationsContent", "Show Certifications", "Hide Certifications");
  setupToggle("toggleProjectsBtn", "projectsContent", "Show Projects", "Hide Projects");

  const addSkillBtn = document.getElementById("addSkillBtn");
  const skillInput = document.getElementById("skillInput");
  const skillsList = document.getElementById("skillsList");
  const projectButtons = document.querySelectorAll(".project-details-btn");
  projectButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const targetId = button.getAttribute("data-target");
      const detailsBox = document.getElementById(targetId);
      const isOpen = detailsBox.classList.contains("open");

      detailsBox.classList.toggle("open");
      button.textContent = isOpen ? "Show Details" : "Hide Details";
    });
  });

  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
      formMessage.textContent = "Please fill in all required fields.";
      formMessage.className = "form-message error";
      return;
    }

    if (!emailPattern.test(email)) {
      formMessage.textContent = "Please enter a valid email address.";
      formMessage.className = "form-message error";
      return;
    }

    formMessage.textContent = "Your message has been submitted successfully.";
    formMessage.className = "form-message success";
    contactForm.reset();
  });
});
