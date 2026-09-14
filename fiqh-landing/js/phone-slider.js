/* phone-slider.js - تبديل شاشات الهاتف + Parallax */

(function () {
  'use strict';

  // DOM Elements
  const phoneWrapper = document.getElementById('phoneWrapper');
  const phoneFrame = document.getElementById('phoneFrame');
  const phoneDots = document.getElementById('phoneDots');
  const slides = document.querySelectorAll('.screen-slide');
  const dots = document.querySelectorAll('.dot');

  if (!phoneWrapper || !phoneFrame || !slides.length) return;

  let currentIndex = 0;
  let autoPlayInterval = null;
  const AUTO_PLAY_DELAY = 4000;

  // Go to specific slide
  function goToSlide(index) {
    if (index === currentIndex) return;

    // Remove active from current
    slides[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');

    // Update index
    currentIndex = (index + slides.length) % slides.length;

    // Add active to new
    slides[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
  }

  // Auto play
  function startAutoPlay() {
    stopAutoPlay();
    autoPlayInterval = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, AUTO_PLAY_DELAY);
  }

  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  }

  // Dot click handlers
  if (phoneDots && dots.length) {
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        stopAutoPlay();
        goToSlide(index);
        startAutoPlay();
      });
    });
  }

  // Parallax with mouse movement
  function initParallax() {
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      return;
    }

    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 8;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      phoneFrame.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    });

    // Reset on mouse leave
    document.addEventListener('mouseleave', () => {
      phoneFrame.style.transform = '';
    });
  }

  // Stop autoplay when section is not visible
  function initVisibilityObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startAutoPlay();
        } else {
          stopAutoPlay();
        }
      });
    }, {
      threshold: 0.3
    });

    observer.observe(phoneWrapper);
  }

  // Touch/Swipe support
  function initTouchSupport() {
    let touchStartX = 0;
    let touchEndX = 0;

    phoneWrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    phoneWrapper.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const diff = touchStartX - touchEndX;
      const threshold = 50;

      if (Math.abs(diff) > threshold) {
        stopAutoPlay();
        if (diff > 0) {
          // Swipe left (next)
          goToSlide(currentIndex + 1);
        } else {
          // Swipe right (previous)
          goToSlide(currentIndex - 1);
        }
        startAutoPlay();
      }
    }
  }

  // Keyboard navigation
  function initKeyboardNav() {
    phoneWrapper.setAttribute('tabindex', '0');
    phoneWrapper.setAttribute('role', 'region');
    phoneWrapper.setAttribute('aria-label', 'معرض شاشات التطبيق');

    phoneWrapper.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        stopAutoPlay();
        goToSlide(currentIndex + 1);
        startAutoPlay();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        stopAutoPlay();
        goToSlide(currentIndex - 1);
        startAutoPlay();
      }
    });
  }

  // Initialize
  function init() {
    // Set initial active state
    slides[0].classList.add('active');
    if (dots.length) {
      dots[0].classList.add('active');
    }

    initParallax();
    initVisibilityObserver();
    initTouchSupport();
    initKeyboardNav();
    startAutoPlay();
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
