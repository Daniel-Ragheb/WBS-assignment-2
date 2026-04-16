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

  const navLinks = document.querySelectorAll('.nav-link');
  const tabSections = document.querySelectorAll('.tab-section');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      
      tabSections.forEach(section => section.style.display = 'none');
      navLinks.forEach(nav => nav.classList.remove('active-link'));
      
      document.getElementById(targetId).style.display = 'block';
      this.classList.add('active-link');
    });
  });

  async function fetchGitHubProjects() {
    const loadingEl = document.getElementById('github-loading');
    const errorEl = document.getElementById('github-error');
    const containerEl = document.getElementById('github-projects-container');
    
    const username = 'Daniel-Ragheb'; 
    
    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const repos = await response.json();
      
      loadingEl.style.display = 'none';
      
      const topRepos = repos.filter(repo => !repo.fork).slice(0, 4);
      
      if (topRepos.length === 0) {
         containerEl.innerHTML = '<p>No public repositories found.</p>';
         return;
      }

      topRepos.forEach(repo => {
        const card = document.createElement('div');
        card.className = 'mini-card github-repo-card';
        card.innerHTML = `
          <div>
            <h3 style="word-break: break-all;">${repo.name}</h3>
            <p style="font-size: 0.9rem; margin-top: 8px;">${repo.description || 'No description provided.'}</p>
          </div>
          <div>
            ${repo.language ? `<span class="repo-language">${repo.language}</span>` : ''}
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="action-btn" style="display: block; text-align: center; margin-top: 15px; width: 100%;">View Source Code</a>
          </div>
        `;
        containerEl.appendChild(card);
      });
      
    } catch (error) {
      loadingEl.style.display = 'none';
      errorEl.textContent = 'Unable to load projects at this time. Please check back later.';
      errorEl.style.display = 'block';
      console.error(error);
    }
  }

  fetchGitHubProjects();
});