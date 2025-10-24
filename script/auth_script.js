// DOM Elements
const authContainer = document.getElementById("authContainer");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const profilePage = document.getElementById("profilePage");
const settingsPage = document.getElementById("settingsPage");
const navAuth = document.getElementById("navAuth");
const navUser = document.getElementById("navUser");
const profileLink = document.getElementById("profileLink");
const settingsLink = document.getElementById("settingsLink");
const logoutModal = document.getElementById("logoutModal");
const deleteModal = document.getElementById("deleteModal");

// Current user data
let currentUser = null;

// Check login status and setup on page load
document.addEventListener("DOMContentLoaded", function () {
  // Check URL parameters for form type
  const urlParams = new URLSearchParams(window.location.search);
  const action = urlParams.get("action");

  // Set initial form state
  if (action === "register") {
    showRegisterForm();
  } else if (action === "profile") {
    showProfilePage();
  } else if (action === "settings") {
    showSettingsPage();
  } else {
    showLoginForm();
  }

  // Setup event listeners
  setupEventListeners();

  // Check if user is logged in
  checkLoginStatus();
});

function setupEventListeners() {
  // Form switching
  document.querySelectorAll(".switch-form").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = this.getAttribute("data-target");
      if (target === "register") {
        showRegisterForm();
      } else {
        showLoginForm();
      }
    });
  });

  // Password toggle
  document.querySelectorAll(".password-toggle").forEach((button) => {
    button.addEventListener("click", function () {
      const input = this.parentElement.querySelector("input");
      const icon = this.querySelector("i");

      if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
      } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      }
    });
  });

  // Form submissions
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      handleFormSubmit(this);
    });
  });

  // Password strength indicator
  const passwordInput = document.getElementById("registerPassword");
  if (passwordInput) {
    passwordInput.addEventListener("input", updatePasswordStrength);
  }

  // Profile navigation
  profileLink?.addEventListener("click", function (e) {
    e.preventDefault();
    showProfilePage();
  });

  settingsLink?.addEventListener("click", function (e) {
    e.preventDefault();
    showSettingsPage();
  });

  // Tab switching
  document.querySelectorAll(".nav-tab").forEach((tab) => {
    tab.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");
      switchTab(tabId);
    });
  });

  // Like buttons
  document.querySelectorAll(".like-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      this.classList.toggle("active");
      const countSpan = this.querySelector("span");
      let count = parseInt(countSpan.textContent);
      if (this.classList.contains("active")) {
        countSpan.textContent = count + 1;
      } else {
        countSpan.textContent = count - 1;
      }
    });
  });

  // Play buttons
  document.querySelectorAll(".play-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      this.classList.toggle("playing");
      const icon = this.querySelector("i");
      if (this.classList.contains("playing")) {
        icon.classList.remove("fa-play");
        icon.classList.add("fa-pause");
      } else {
        icon.classList.remove("fa-pause");
        icon.classList.add("fa-play");
      }
    });
  });

  // Profile actions
  document
    .getElementById("logoutActionBtn")
    ?.addEventListener("click", showLogoutModal);
  document
    .getElementById("deleteAccountBtn")
    ?.addEventListener("click", showDeleteModal);

  // Modal actions
  document
    .getElementById("closeLogoutModal")
    ?.addEventListener("click", hideLogoutModal);
  document
    .getElementById("cancelLogoutBtn")
    ?.addEventListener("click", hideLogoutModal);
  document
    .getElementById("confirmLogoutBtn")
    ?.addEventListener("click", handleLogout);

  document
    .getElementById("closeDeleteModal")
    ?.addEventListener("click", hideDeleteModal);
  document
    .getElementById("cancelDeleteBtn")
    ?.addEventListener("click", hideDeleteModal);
  document
    .getElementById("confirmDeleteBtn")
    ?.addEventListener("click", handleDeleteAccount);

  // Settings actions
  document
    .getElementById("cancelSettingsBtn")
    ?.addEventListener("click", goBack);
  document
    .getElementById("saveSettingsBtn")
    ?.addEventListener("click", saveSettings);

  // Load user data if available
  loadUserData();
}

function showLoginForm() {
  loginForm.style.display = "block";
  registerForm.style.display = "none";
  profilePage.style.display = "none";
  settingsPage.style.display = "none";

  // Update URL without reload
  const newUrl =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname +
    "?action=login";
  window.history.pushState({ path: newUrl }, "", newUrl);
}

function showRegisterForm() {
  loginForm.style.display = "none";
  registerForm.style.display = "block";
  profilePage.style.display = "none";
  settingsPage.style.display = "none";

  // Update URL without reload
  const newUrl =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname +
    "?action=register";
  window.history.pushState({ path: newUrl }, "", newUrl);
}

function showProfilePage() {
  loginForm.style.display = "none";
  registerForm.style.display = "none";
  profilePage.style.display = "block";
  settingsPage.style.display = "none";

  // Update URL
  const newUrl =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname +
    "?action=profile";
  window.history.pushState({ path: newUrl }, "", newUrl);

  // Load profile data
  loadProfileData();
}

function showSettingsPage() {
  loginForm.style.display = "none";
  registerForm.style.display = "none";
  profilePage.style.display = "none";
  settingsPage.style.display = "block";

  // Update URL
  const newUrl =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname +
    "?action=settings";
  window.history.pushState({ path: newUrl }, "", newUrl);

  // Load settings data
  loadSettingsData();
}

function switchTab(tabId) {
  // Update active tab
  document.querySelectorAll(".nav-tab").forEach((tab) => {
    tab.classList.remove("active");
  });
  document.querySelector(`[data-tab="${tabId}"]`).classList.add("active");

  // Update active content
  document.querySelectorAll(".tab-pane").forEach((pane) => {
    pane.classList.remove("active");
  });
  document.getElementById(`${tabId}Tab`).classList.add("active");
}

function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  if (isLoggedIn === "true" && currentUser) {
    if (navAuth) navAuth.style.display = "none";
    if (navUser) navUser.style.display = "block";

    // Nếu đang ở trang auth và đã đăng nhập, chuyển đến profile
    if (window.location.pathname.includes("outhen.html")) {
      const urlParams = new URLSearchParams(window.location.search);
      const action = urlParams.get("action");

      if (action === "profile") {
        showProfilePage();
      } else if (action === "settings") {
        showSettingsPage();
      } else if (!action || action === "login" || action === "register") {
        showProfilePage();
      }
    }
  } else {
    if (navAuth) navAuth.style.display = "flex";
    if (navUser) navUser.style.display = "none";

    // Redirect to login if trying to access profile without login
    if (
      window.location.search.includes("action=profile") ||
      window.location.search.includes("action=settings")
    ) {
      showLoginForm();
    }
  }
}

function handleFormSubmit(form) {
  const formId = form.parentElement.id;

  // Simple validation
  let isValid = true;
  const inputs = form.querySelectorAll("input[required]");

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      isValid = false;
      showInputError(input, "Trường này là bắt buộc");
    } else {
      clearInputError(input);
    }
  });

  // Email validation
  const emailInput = form.querySelector('input[type="email"]');
  if (emailInput && emailInput.value) {
    if (!isValidEmail(emailInput.value)) {
      isValid = false;
      showInputError(emailInput, "Email không hợp lệ");
    }
  }

  // Password confirmation for register form
  if (formId === "registerForm") {
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById(
      "registerConfirmPassword"
    ).value;

    if (password !== confirmPassword) {
      isValid = false;
      showInputError(
        document.getElementById("registerConfirmPassword"),
        "Mật khẩu không khớp"
      );
    }

    // Check terms agreement
    const agreeTerms = document.getElementById("agreeTerms");
    if (!agreeTerms.checked) {
      isValid = false;
      showNotification("Vui lòng đồng ý với điều khoản dịch vụ", "error");
    }
  }

  if (isValid) {
    // Simulate form submission
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    submitButton.textContent = "Đang xử lý...";
    submitButton.disabled = true;

    setTimeout(() => {
      if (formId === "loginForm") {
        simulateLogin();
      } else if (formId === "registerForm") {
        simulateRegistration();
      }

      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }, 1500);
  }
}

function simulateLogin() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  // For demo purposes, always succeed
  currentUser = {
    name: "Name",
    email: email,
    gender: "male",
    age: "18",
    username: email.split("@")[0],
    joinDate: new Date().toISOString(),
  };

  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  showNotification("Đăng nhập thành công!", "success");
  checkLoginStatus();
  showProfilePage();
}

function simulateRegistration() {
  // Save registration data
  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const gender = document.getElementById("registerGender").value;
  const age = document.getElementById("registerAge").value;

  currentUser = {
    name: name,
    email: email,
    gender: gender,
    age: age,
    username: email.split("@")[0],
    joinDate: new Date().toISOString(),
  };

  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  showNotification("Đăng ký thành công!", "success");
  checkLoginStatus();
  showProfilePage();
}

function loadUserData() {
  currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
}

function loadProfileData() {
  if (!currentUser) return;

  document.getElementById("displayProfileName").textContent = currentUser.name;
  document.getElementById(
    "displayProfileUsername"
  ).textContent = `@${currentUser.username}`;

  // Update post names
  document.querySelectorAll("#post1Name, #post2Name").forEach((el) => {
    el.textContent = currentUser.name;
  });
}

function loadSettingsData() {
  if (!currentUser) return;

  document.getElementById("settingsName").value = currentUser.name || "";
  document.getElementById("settingsEmail").value = currentUser.email || "";
  document.getElementById("settingsGender").value = currentUser.gender || "";
  document.getElementById("settingsAge").value = currentUser.age || "";
}

function saveSettings() {
  const name = document.getElementById("settingsName").value;
  const email = document.getElementById("settingsEmail").value;
  const gender = document.getElementById("settingsGender").value;
  const age = document.getElementById("settingsAge").value;

  // Simple validation
  if (!name || !email) {
    showNotification("Vui lòng điền đầy đủ thông tin bắt buộc", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showNotification("Email không hợp lệ", "error");
    return;
  }

  // Update current user
  currentUser.name = name;
  currentUser.email = email;
  currentUser.gender = gender;
  currentUser.age = age;
  currentUser.username = email.split("@")[0];

  // Save to localStorage
  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  showNotification("Cập nhật thông tin thành công!", "success");

  // Update profile display
  loadProfileData();
}

function showLogoutModal() {
  logoutModal.style.display = "flex";
}

function hideLogoutModal() {
  logoutModal.style.display = "none";
}

function showDeleteModal() {
  deleteModal.style.display = "flex";
}

function hideDeleteModal() {
  deleteModal.style.display = "none";
}

function handleLogout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");
  currentUser = null;

  hideLogoutModal();
  showNotification("Đã đăng xuất thành công!", "success");

  setTimeout(() => {
    showLoginForm();
    checkLoginStatus();
  }, 1000);
}

function handleDeleteAccount() {
  // Clear all user data
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");
  currentUser = null;

  hideDeleteModal();
  showNotification("Tài khoản đã được xóa thành công!", "success");

  setTimeout(() => {
    showLoginForm();
    checkLoginStatus();
  }, 1500);
}

function goBack() {
  if (currentUser) {
    showProfilePage();
  } else {
    window.location.href = "index.html";
  }
}

function updatePasswordStrength() {
  const password = this.value;
  const strengthBar = document.querySelector(".strength-bar");
  const strengthText = document.querySelector(".strength-text");

  let strength = 0;
  let color = "#e53e3e";
  let text = "Rất yếu";

  if (password.length >= 8) strength += 25;
  if (/[A-Z]/.test(password)) strength += 25;
  if (/[0-9]/.test(password)) strength += 25;
  if (/[^A-Za-z0-9]/.test(password)) strength += 25;

  if (strength >= 75) {
    color = "#38a169";
    text = "Mạnh";
  } else if (strength >= 50) {
    color = "#d69e2e";
    text = "Trung bình";
  } else if (strength >= 25) {
    color = "#ed8936";
    text = "Yếu";
  }

  strengthBar.style.width = strength + "%";
  strengthBar.style.backgroundColor = color;
  strengthText.textContent = text;
  strengthText.style.color = color;
}

function showInputError(input, message) {
  clearInputError(input);

  const errorDiv = document.createElement("div");
  errorDiv.className = "input-error";
  errorDiv.textContent = message;
  errorDiv.style.color = "#e53e3e";
  errorDiv.style.fontSize = "0.8rem";
  errorDiv.style.marginTop = "0.25rem";

  input.parentElement.appendChild(errorDiv);
  input.style.borderColor = "#e53e3e";
}

function clearInputError(input) {
  const existingError = input.parentElement.querySelector(".input-error");
  if (existingError) {
    existingError.remove();
  }
  input.style.borderColor = "";
}

function isValidEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${
              type === "success"
                ? "check-circle"
                : type === "error"
                ? "exclamation-circle"
                : "info-circle"
            }"></i>
            <span>${message}</span>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${
          type === "success"
            ? "#38a169"
            : type === "error"
            ? "#e53e3e"
            : "#3182ce"
        };
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Mobile menu functionality
document.getElementById("hamburger")?.addEventListener("click", function () {
  const navMenu = document.querySelector(".nav-menu");
  navMenu.style.display = navMenu.style.display === "flex" ? "none" : "flex";
});
