/* main.js - التفاعلات الأساسية */

(function () {
  'use strict';

  // DOM Elements
  const navbar = document.getElementById('navbar');
  const scrollProgress = document.getElementById('scrollProgress');
  const cursorGlow = document.getElementById('cursorGlow');
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');
  const langToggle = document.getElementById('langToggle');
  const bookModal = document.getElementById('bookModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalClose = document.getElementById('modalClose');
  const downloadCounter = document.getElementById('downloadCounter');

  // Scroll Progress Bar
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (scrollProgress) {
      scrollProgress.style.width = `${scrollPercent}%`;
    }
  }

  // Navbar scroll effect
  function updateNavbar() {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // Cursor Glow Effect
  function initCursorGlow() {
    if (!cursorGlow) return;
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      cursorGlow.style.display = 'none';
      return;
    }
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });
  }

  // Mobile Menu Toggle
  function initMobileMenu() {
    if (!mobileMenuToggle || !navLinks) return;
    mobileMenuToggle.addEventListener('click', () => {
      const isActive = navLinks.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
      mobileMenuToggle.setAttribute('aria-expanded', isActive);
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Smooth scroll for anchor links
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const navHeight = navbar ? navbar.offsetHeight : 0;
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Language Toggle
  function initLangToggle() {
    if (!langToggle) return;
    langToggle.addEventListener('click', () => {
      const currentLang = document.documentElement.lang;
      const targetLang = currentLang === 'ar' ? 'en' : 'ar';
      const targetDir = currentLang === 'ar' ? 'ltr' : 'rtl';
      const targetFile = currentLang === 'ar' ? 'en.html' : 'index.html';
      window.location.href = targetFile;
    });
  }

  // Modal Functions
  function openModal() {
    if (!bookModal) return;
    bookModal.hidden = false;
    document.body.style.overflow = 'hidden';
    const modalContent = bookModal.querySelector('.modal-content');
    if (modalContent) {
      modalContent.focus();
    }
  }

  function closeModal() {
    if (!bookModal) return;
    bookModal.hidden = true;
    document.body.style.overflow = '';
  }

  function initModal() {
    if (!modalBackdrop || !modalClose) return;
    modalBackdrop.addEventListener('click', closeModal);
    modalClose.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && bookModal && !bookModal.hidden) {
        closeModal();
      }
    });
  }

  // Download Counter Animation
  function animateDownloadCounter() {
    if (!downloadCounter) return;
    const target = parseInt(downloadCounter.getAttribute('data-count'), 10);
    if (isNaN(target)) return;

    const duration = 2000;
    const startTime = performance.now();
    const startValue = 0;

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startValue + (target - startValue) * easeOut);
      downloadCounter.textContent = current.toLocaleString('en-US');

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // Initialize particles
  function initParticles() {
    const particlesContainer = document.getElementById('heroParticles');
    if (!particlesContainer) return;

    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 8}s`;
      particle.style.animationDuration = `${6 + Math.random() * 4}s`;
      particle.style.width = `${2 + Math.random() * 4}px`;
      particle.style.height = particle.style.width;
      particlesContainer.appendChild(particle);
    }
  }

  // Magnetic Buttons Effect
  function initMagneticButtons() {
    const buttons = document.querySelectorAll('.magnetic');
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      return;
    }

    buttons.forEach(button => {
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        button.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });

      button.addEventListener('mouseleave', () => {
        button.style.transform = '';
      });
    });
  }

  // Book card mouse tracking
  function initBookCardEffects() {
    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
      });
    });
  }

  // Scroll event handler with throttle
  let scrollTicking = false;
  function onScroll() {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        updateScrollProgress();
        updateNavbar();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }

  // Initialize everything
  function init() {
    initCursorGlow();
    initMobileMenu();
    initSmoothScroll();
    initLangToggle();
    initModal();
    initParticles();
    initMagneticButtons();
    initBookCardEffects();
    animateDownloadCounter();

    // Initial calls
    updateScrollProgress();
    updateNavbar();

    // Event listeners
    window.addEventListener('scroll', onScroll, { passive: true });

    // Reveal elements on scroll (fallback if GSAP not loaded)
    if (typeof gsap === 'undefined') {
      initScrollRevealFallback();
    }
  }

  // Fallback scroll reveal without GSAP
  function initScrollRevealFallback() {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
