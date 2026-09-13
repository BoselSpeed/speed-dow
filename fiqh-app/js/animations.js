/* animations.js - GSAP + ScrollTrigger + Reveal Animations */

(function () {
  'use strict';

  // Check if GSAP is available
  const gsapAvailable = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';

  if (!gsapAvailable) {
    console.warn('GSAP or ScrollTrigger not loaded. Using CSS fallback animations.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Hero Timeline Animation
  function initHeroAnimations() {
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTl
      .from('.hero-badge', {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        y: 20
      })
      .from('.hero-title', {
        opacity: 0,
        y: 40,
        duration: 1
      }, '-=0.4')
      .from('.hero-verse', {
        opacity: 0,
        y: 30,
        duration: 0.8
      }, '-=0.6')
      .from('.hero-subtitle', {
        opacity: 0,
        y: 20,
        duration: 0.8
      }, '-=0.4')
      .from('.hero-stats', {
        opacity: 0,
        y: 20,
        duration: 0.8
      }, '-=0.4')
      .from('.hero-actions', {
        opacity: 0,
        y: 20,
        duration: 0.8
      }, '-=0.4')
      .from('.phone-mockup', {
        opacity: 0,
        rotationY: -15,
        rotationX: 10,
        y: 60,
        duration: 1.2,
        ease: 'power2.out'
      }, '-=0.6');

    // Continuous shimmer effect on CTA
    gsap.to('.btn-gold-lg', {
      boxShadow: '0 0 30px rgba(212, 175, 55, 0.6)',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Phone mockup floating animation
    gsap.to('.phone-mockup-inner', {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }

  // Scroll Reveal Animations
  function initScrollReveal() {
    // Reveal elements
    gsap.utils.toArray('.reveal').forEach((element) => {
      gsap.fromTo(element, {
        opacity: 0,
        y: 40
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Stagger animations for grid items
    gsap.utils.toArray('.books-grid-8, .books-grid-15, .features-grid, .stats-grid, .badges-grid, .testimonials-grid').forEach(grid => {
      gsap.fromTo(grid.children, {
        opacity: 0,
        y: 30,
        scale: 0.95
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: grid,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Steps timeline animation
    const steps = gsap.utils.toArray('.step');
    if (steps.length > 0) {
      gsap.fromTo(steps, {
        opacity: 0,
        y: 50,
        scale: 0.9
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: '.steps-timeline',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });

      // Timeline line animation
      gsap.fromTo('.timeline-line', {
        scaleX: 0
      }, {
        scaleX: 1,
        duration: 1.5,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: '.steps-timeline',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    }

    // Reader features staggered reveal
    gsap.utils.toArray('.reader-feature').forEach((feature, index) => {
      gsap.fromTo(feature, {
        opacity: 0,
        x: -30
      }, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.reader-features-list',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });
  }

  // Parallax Effects
  function initParallax() {
    // Slow parallax for background patterns
    gsap.utils.toArray('.islamic-pattern-bg').forEach(pattern => {
      gsap.to(pattern, {
        backgroundPosition: `+=100 ${'+=100'}`,
        ease: 'none',
        scrollTrigger: {
          trigger: pattern.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    });

    // Phone mockup parallax
    const phoneMockup = document.querySelector('.phone-mockup');
    if (phoneMockup) {
      gsap.to(phoneMockup, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
    }
  }

  // Counter Animations
  function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-count]');

    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-count'));
      const suffix = counter.getAttribute('data-suffix') || '';
      const isDecimal = counter.getAttribute('data-decimal') === 'true';

      ScrollTrigger.create({
        trigger: counter,
        start: 'top 85%',
        onEnter: () => {
          animateCounter(counter, target, suffix, isDecimal);
        },
        once: true
      });
    });
  }

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

  // Carousel Animation
  function initCarousel() {
    const track = document.getElementById('carouselTrack');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    let currentSlide = 0;
    const totalSlides = 5;

    if (!track || !dots.length) return;

    function goToSlide(index) {
      currentSlide = (index + totalSlides) % totalSlides;
      gsap.to(track, {
        x: `-${currentSlide * 100}%`,
        duration: 0.5,
        ease: 'power2.inOut'
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
    }

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const slideIndex = parseInt(dot.getAttribute('data-slide'), 10) - 1;
        goToSlide(slideIndex);
      });
    });

    // Auto-advance carousel
    setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 5000);
  }

  // FAQ Accordion Animation
  function initFAQAnimation() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');

      if (!question || !answer) return;

      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherAnswer = otherItem.querySelector('.faq-answer');
            if (otherAnswer) {
              gsap.to(otherAnswer, {
                maxHeight: 0,
                duration: 0.3,
                ease: 'power2.inOut'
              });
              otherAnswer.hidden = true;
            }
            const otherQuestion = otherItem.querySelector('.faq-question');
            if (otherQuestion) {
              otherQuestion.setAttribute('aria-expanded', 'false');
            }
          }
        });

        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
          gsap.to(answer, {
            maxHeight: 0,
            duration: 0.3,
            ease: 'power2.inOut'
          });
          answer.hidden = true;
          question.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          answer.hidden = false;
          gsap.set(answer, { maxHeight: 0 });
          gsap.to(answer, {
            maxHeight: answer.scrollHeight,
            duration: 0.4,
            ease: 'power2.out'
          });
          question.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // Progress bar animations
  function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');

    progressBars.forEach(bar => {
      const progress = bar.getAttribute('data-progress');
      if (!progress) return;

      ScrollTrigger.create({
        trigger: bar,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(bar, {
            width: `${progress}%`,
            duration: 1.5,
            ease: 'power2.out'
          });
        },
        once: true
      });
    });
  }

  // Initialize all animations
  function init() {
    initHeroAnimations();
    initScrollReveal();
    initParallax();
    initCounterAnimations();
    initCarousel();
    initFAQAnimation();
    initProgressBars();
  }

  // Wait for DOM and start
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
