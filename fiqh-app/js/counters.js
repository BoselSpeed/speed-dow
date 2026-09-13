/* counters.js - العدادات التصاعدية */

(function () {
  'use strict';

  function animateCounter(element, target, suffix, isDecimal) {
    const duration = 2000;
    const startTime = performance.now();
    const startValue = 0;

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (target - startValue) * easeOut;

      if (isDecimal) {
        element.textContent = current.toFixed(1) + suffix;
      } else {
        element.textContent = Math.floor(current).toLocaleString('en-US') + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');

    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const target = parseFloat(element.getAttribute('data-count'));
          const suffix = element.getAttribute('data-suffix') || '';
          const isDecimal = element.getAttribute('data-decimal') === 'true';

          if (!isNaN(target)) {
            animateCounter(element, target, suffix, isDecimal);
          }

          observer.unobserve(element);
        }
      });
    }, {
      threshold: 0.5,
      rootMargin: '0px'
    });

    counters.forEach(counter => observer.observe(counter));
  }

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCounters);
  } else {
    initCounters();
  }
})();
