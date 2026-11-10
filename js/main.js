/* ============================================================
   Club Aris – Static Website
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

    // Close menu when clicking a nav link
    const navLinks = mainNav.querySelectorAll("a");
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        menuToggle.setAttribute("aria-expanded", "false");
        mainNav.classList.remove("open");
      });
    });

    // Close menu on Escape key
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && mainNav.classList.contains("open")) {
        menuToggle.setAttribute("aria-expanded", "false");
        mainNav.classList.remove("open");
      }
    });
  }

  // ---------- Contact Form (static demo) ----------
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = "جاري الإرسال...";
      submitBtn.disabled = true;

      // Simulate form submission (static site - no backend)
      setTimeout(function () {
        submitBtn.textContent = "تم الإرسال بنجاح";
        submitBtn.style.backgroundColor = "#2e7d32";

        setTimeout(function () {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.backgroundColor = "";
          contactForm.reset();
        }, 2000);
      }, 1000);
    });
  }

  // ---------- Header scroll effect ----------
  const header = document.getElementById("header");
  let lastScrollY = window.scrollY;

  window.addEventListener(
    "scroll",
    function () {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 50) {
        header.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
      } else {
        header.style.boxShadow = "none";
      }
      lastScrollY = currentScrollY;
    },
    { passive: true }
  );
})();
