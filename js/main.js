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

    const ERROR_ID_ALIASES = {
      "ready-to-join": "error-ready"
    };

    function getErrorElement(name, input) {
      if (ERROR_ID_ALIASES[name]) {
        return document.getElementById(ERROR_ID_ALIASES[name]);
      }
      if (name) {
        const byName = document.getElementById("error-" + name);
        if (byName) return byName;
      }
      if (input && input.id) {
        const byId = document.getElementById("error-" + input.id);
        if (byId) return byId;
      }
      const group = input ? input.closest(".form-group") : null;
      return group ? group.querySelector(".error-message") : null;
    }

    function setError(input, name, message) {
      input.classList.add("input-error");
      const errorEl = getErrorElement(name, input);
      if (errorEl) errorEl.textContent = message;
    }

    function clearErrors(section) {
      section.querySelectorAll(".input-error").forEach(function (el) {
        el.classList.remove("input-error");
      });
      section.querySelectorAll(".error-message").forEach(function (el) {
        el.textContent = "";
      });
    }

    function validateSection(index) {
      const section = sections[index];
      let valid = true;
      clearErrors(section);

      // Required text, date, select and textarea fields
      section
        .querySelectorAll("input[required], select[required], textarea[required]")
        .forEach(function (input) {
          if (input.type === "radio" || input.type === "checkbox") return;
          if (!input.value.trim()) {
            setError(input, input.name, "هذا الحقل مطلوب");
            valid = false;
          }
        });

      // Email format validation
      const email = section.querySelector('input[type="email"][required]');
      if (email && email.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
          setError(email, email.name, "الرجاء إدخال بريد إلكتروني صحيح");
          valid = false;
        }
      }

      // Required radio groups
      section.querySelectorAll('input[type="radio"][required]').forEach(function (radio) {
        const name = radio.name;
        const checked = section.querySelector(
          'input[type="radio"][name="' + name + '"]:checked'
        );
        if (!checked) {
          setError(radio, name, "الرجاء اختيار خيار واحد");
          valid = false;
        }
      });

      // Required checkbox groups (at least one selection)
      section.querySelectorAll('input[type="checkbox"][required]').forEach(function (checkbox) {
        const name = checkbox.name;
        const anyChecked = section.querySelector(
          'input[type="checkbox"][name="' + name + '"]:checked'
        );
        if (!anyChecked) {
          setError(checkbox, name, "الرجاء اختيار خيار واحد على الأقل");
          valid = false;
        }
      });

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

      // Validate every step, in case earlier data was changed
      for (let i = 0; i < sections.length; i++) {
        if (!validateSection(i)) {
          currentSection = i;
          showSection(i);
          return;
        }
      }

      const formData = new FormData(form);
      const getValue = function (name) {
        const value = formData.get(name);
        return value ? value.toString().trim() : "";
      };
      const getValues = function (name) {
        return formData
          .getAll(name)
          .map(function (value) {
            return value.toString().trim();
          })
          .filter(Boolean);
      };

      const group = getValue("group") === "أخرى"
        ? getValue("group-other") || "أخرى"
        : getValue("group");
      const specialization = getValue("specialization") === "أخرى"
        ? getValue("specialization-other") || "أخرى"
        : getValue("specialization");
      const cohort = getValue("cohort") === "أخرى"
        ? getValue("cohort-other") || "أخرى"
        : getValue("cohort");
      const team = getValue("team") === "أخرى"
        ? getValue("team-other") || "أخرى"
        : getValue("team");

      const rawActivities = getValues("activities");
      const activities = rawActivities.filter(function (value) {
        return value !== "أخرى";
      });
      if (rawActivities.indexOf("أخرى") !== -1) {
        activities.push(getValue("activities-other") || "أخرى");
      }

      const submission = {
        id: Date.now(),
        fullName: getValue("full-name"),
        email: getValue("email"),
        phone: getValue("phone"),
        birthDate: getValue("birth-date"),
        group: group,
        specialization: specialization,
        cohort: cohort,
        team: team,
        activities: activities,
        questions: getValue("questions"),
        skills: getValue("skills"),
        suggestions: getValue("suggestions"),
        readyToJoin: getValue("ready-to-join"),
        message: getValue("message"),
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

    // Show "other" text inputs when the matching option is selected
    function initOtherFields() {
      const pairs = [
        ["specialization", "specialization-other"],
        ["cohort", "cohort-other"]
      ];
      pairs.forEach(function (pair) {
        const select = document.getElementById(pair[0]);
        const otherInput = document.getElementById(pair[1]);
        if (!select || !otherInput) return;
        const toggle = function () {
          otherInput.style.display = select.value === "أخرى" ? "block" : "none";
          if (select.value !== "أخرى") otherInput.value = "";
        };
        select.addEventListener("change", toggle);
        toggle();
      });
    }

    // Initialize first section
    showSection(0);
    initOtherFields();
  }

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
