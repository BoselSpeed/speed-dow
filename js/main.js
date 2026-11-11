/* ============================================================
   نادي متعدد المجالات - المدرسة العليا للأساتذة ملحقة سوڨر تيارت
   JavaScript (simple, no framework)
   ============================================================ */

(function () {
  "use strict";

  // ---------- Mobile Menu Toggle ----------
  const menuToggle = document.getElementById("menu-toggle");
  const mainNav = document.getElementById("main-nav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isExpanded));
      mainNav.classList.toggle("open");
    });

    const navLinks = mainNav.querySelectorAll("a");
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        menuToggle.setAttribute("aria-expanded", "false");
        mainNav.classList.remove("open");
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && mainNav.classList.contains("open")) {
        menuToggle.setAttribute("aria-expanded", "false");
        mainNav.classList.remove("open");
      }
    });
  }

  // ---------- Header scroll effect ----------
  const header = document.getElementById("header");
  if (header) {
    window.addEventListener(
      "scroll",
      function () {
        if (window.scrollY > 50) {
          header.style.boxShadow = "0 4px 12px rgba(62, 39, 35, 0.15)";
        } else {
          header.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
        }
      },
      { passive: true }
    );
  }

  // ---------- Registration Form (multi-step) ----------
  const form = document.getElementById("registration-form");
  if (form) {
    const sections = form.querySelectorAll(".form-section");
    const progressSteps = form.querySelectorAll(".progress-step");
    const btnPrev = document.getElementById("btn-prev");
    const btnNext = document.getElementById("btn-next");
    const btnSubmit = document.getElementById("btn-submit");
    const successMsg = document.getElementById("form-success");

    let currentSection = 0;

    function showSection(index) {
      sections.forEach((sec, i) => {
        sec.classList.toggle("active", i === index);
      });
      progressSteps.forEach((step, i) => {
        step.classList.toggle("current", i === index);
      });
      btnPrev.style.display = index === 0 ? "none" : "inline-flex";
      if (index === sections.length - 1) {
        btnNext.style.display = "none";
        btnSubmit.style.display = "inline-flex";
      } else {
        btnNext.style.display = "inline-flex";
        btnSubmit.style.display = "none";
      }
    }

    function validateSection(index) {
      const section = sections[index];
      const inputs = section.querySelectorAll("input[required], select[required], textarea[required]");
      let valid = true;
      inputs.forEach(function (input) {
        const errorEl = document.getElementById("error-" + input.id);
        if (!input.value.trim()) {
          input.classList.add("input-error");
          if (errorEl) errorEl.textContent = "هذا الحقل مطلوب";
          valid = false;
        } else {
          input.classList.remove("input-error");
          if (errorEl) errorEl.textContent = "";
        }
      });

      // Email validation
      const email = section.querySelector('input[type="email"][required]');
      if (email && email.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
          email.classList.add("input-error");
          const errorEl = document.getElementById("error-email");
          if (errorEl) errorEl.textContent = "الرجاء إدخال بريد إلكتروني صحيح";
          valid = false;
        }
      }

      // Terms checkbox
      const terms = section.querySelector('#terms');
      if (terms && !terms.checked) {
        terms.classList.add("input-error");
        const errorEl = document.getElementById("error-terms");
        if (errorEl) errorEl.textContent = "يجب الموافقة على الشروط والأحكام";
        valid = false;
      }

      return valid;
    }

    if (btnNext) {
      btnNext.addEventListener("click", function () {
        if (validateSection(currentSection)) {
          if (currentSection < sections.length - 1) {
            currentSection++;
            showSection(currentSection);
          }
        }
      });
    }

    if (btnPrev) {
      btnPrev.addEventListener("click", function () {
        if (currentSection > 0) {
          currentSection--;
          showSection(currentSection);
        }
      });
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!validateSection(currentSection)) return;

      const formData = new FormData(form);
      const submission = {
        id: Date.now(),
        fullName: formData.get("full-name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        studentId: formData.get("student-id"),
        department: formData.get("department"),
        year: formData.get("year"),
        interest: formData.getAll("interest"),
        motivation: formData.get("motivation"),
        skills: formData.get("skills"),
        status: "pending",
        date: new Date().toLocaleString("ar-SA")
      };

      // Store in localStorage
      const existing = JSON.parse(localStorage.getItem("club_submissions") || "[]");
      existing.push(submission);
      localStorage.setItem("club_submissions", JSON.stringify(existing));

      // Show success
      form.style.display = "none";
      if (successMsg) successMsg.style.display = "block";
    });

    // Initialize first section
    showSection(0);
  }

  // ---------- Placeholder Links ----------
  const PLACEHOLDER_LINKS = {
    PLACEHOLDER_LINK_1: "#",
    PLACEHOLDER_LINK_2: "#",
    PLACEHOLDER_LINK_3: "#",
    PLACEHOLDER_LINK_4: "#"
  };

  function initPlaceholderLinks() {
    document.querySelectorAll('[data-placeholder]').forEach(el => {
      const key = el.getAttribute('data-placeholder');
      if (PLACEHOLDER_LINKS[key]) {
        el.href = PLACEHOLDER_LINKS[key];
      }
    });
  }

  document.addEventListener('DOMContentLoaded', initPlaceholderLinks);

  // ---------- Accessibility: focus styles ----------
  document.addEventListener("DOMContentLoaded", function () {
    const style = document.createElement("style");
    style.textContent = `
      .input-error {
        border-color: #B71C1C !important;
        box-shadow: 0 0 0 3px rgba(183, 28, 28, 0.2) !important;
      }
      .btn-full {
        width: 100%;
      }
    `;
    document.head.appendChild(style);
  });

  // ---------- Reduced motion ----------
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.style.setProperty("--transition-fast", "0.01ms");
    document.documentElement.style.setProperty("--transition-base", "0.01ms");
    document.documentElement.style.scrollBehavior = "auto";
  }
})();
