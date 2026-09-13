/* lang-switch.js - تبديل اللغة */

(function () {
  'use strict';

  const langToggle = document.getElementById('langToggle');

  // Language data
  const translations = {
    ar: {
      navLibrary: 'المكتبة',
      navFeatures: 'الميزات',
      navReader: 'القارئ',
      navFaq: 'الأسئلة الشائعة',
      navDownload: 'حمّل التطبيق',
      heroTitle: 'تطبيق الفقه',
      heroSubtitle: 'مكتبتك الفقهية الشاملة — <strong>23 كتابًا</strong> في جيبك، بدون إنترنت',
      heroDownload: 'تحميلات',
      downloadText: 'طالب علم حمّلوا التطبيق',
      btnDownload: '⬇ حمّل التطبيق — مجانًا',
      btnBrowse: 'استعرض المكتبة',
      downloadFromPlay: 'حمّل من Google Play',
      directDownload: 'حمل مباشرة (APK)',
      libraryTitle: 'المكتبة الفقهية الشاملة',
      librarySubtitle: '23 كتابًا من أمهات كتب التوحيد والعقيدة والحديث والتفسير',
      offlineBadge: '📴 بدون إنترنت',
      loadedBooks: 'كتب محمّلة — تعمل بدون إنترنت',
      downloadableBooks: 'مكتبة إضافية — 15 كتابًا قابل للتحميل',
      downloadableBadge: 'قابل للتحميل',
      featuresTitle: 'ميزات أساسية',
      featuresSubtitle: 'كل ما تحتاجه لطلب العلم في تطبيق واحد',
      readerTitle: 'قارئ PDF تفاعلي',
      readerSubtitle: 'تجربة قراءة مريحة ومتقدمة',
      readerFeaturesTitle: 'ميزات القارئ المتقدمة',
      learningTitle: 'تعلّم واختبر نفسك',
      learningSubtitle: 'دروس فقهية تفاعلية مع اختبارات ذكية',
      trackingTitle: 'تتبّع وإنجازات',
      trackingSubtitle: 'لوحة تحكم مصغّرة لتتبع تقدمك',
      achievementsTitle: '🏆 الشارات والإنجازات',
      howTitle: 'كيف يعمل؟',
      howSubtitle: 'ثلاث خطوات بسيطة لبدء رحلتك الفقهية',
      screenshotsTitle: 'لقطات الشاشة',
      screenshotsSubtitle: 'نظرة حية على واجهة التطبيق',
      testimonialsTitle: 'آراء المستخدمين',
      testimonialsSubtitle: 'ماذا يقول طلاب العلم عن التطبيق',
      statsTitle: 'أرقام تتكلّم',
      faqTitle: 'الأسئلة الشائعة',
      faqSubtitle: 'إجابات على أكثر الأسئلة شيوعًا',
      reqTitle: 'متطلبات النظام',
      ctaTitle: 'ابدأ رحلتك الفقهية اليوم',
      ctaSubtitle: '23 كتابًا إسلاميًا في جيبك — مجانًا تمامًا',
      footerTagline: 'مكتبتك الفقهية الشاملة في جيبك',
      duaText: 'اللهم انفع به، واجعله في ميزان حسناتنا',
      copyright: '© 2024 تطبيق الفقه. جميع الحقوق محفوظة.'
    },
    en: {
      navLibrary: 'Library',
      navFeatures: 'Features',
      navReader: 'Reader',
      navFaq: 'FAQ',
      navDownload: 'Download',
      heroTitle: 'Fiqh App',
      heroSubtitle: 'Your Comprehensive Fiqh Library — <strong>23 books</strong> in your pocket, offline',
      heroDownload: 'downloads',
      downloadText: 'students have downloaded the app',
      btnDownload: '⬇ Download the App — Free',
      btnBrowse: 'Browse Library',
      downloadFromPlay: 'Download from Google Play',
      directDownload: 'Direct Download (APK)',
      libraryTitle: 'The Comprehensive Fiqh Library',
      librarySubtitle: '23 books from the masterworks of monotheism, creed, hadith, and tafsir',
      offlineBadge: '📴 Offline',
      loadedBooks: 'Loaded Books — Work Offline',
      downloadableBooks: 'Additional Library — 15 downloadable books',
      downloadableBadge: 'Downloadable',
      featuresTitle: 'Core Features',
      featuresSubtitle: 'Everything you need for Islamic learning in one app',
      readerTitle: 'Interactive PDF Reader',
      readerSubtitle: 'A comfortable and advanced reading experience',
      readerFeaturesTitle: 'Advanced Reader Features',
      learningTitle: 'Learn & Test Yourself',
      learningSubtitle: 'Interactive fiqh lessons with smart quizzes',
      trackingTitle: 'Tracking & Achievements',
      trackingSubtitle: 'A mini dashboard to track your progress',
      achievementsTitle: '🏆 Badges & Achievements',
      howTitle: 'How It Works',
      howSubtitle: 'Three simple steps to start your fiqh journey',
      screenshotsTitle: 'Screenshots',
      screenshotsSubtitle: 'A live look at the app interface',
      testimonialsTitle: 'User Testimonials',
      testimonialsSubtitle: 'What students of knowledge say about the app',
      statsTitle: 'Numbers That Speak',
      faqTitle: 'Frequently Asked Questions',
      faqSubtitle: 'Answers to the most common questions',
      reqTitle: 'System Requirements',
      ctaTitle: 'Start Your Fiqh Journey Today',
      ctaSubtitle: '23 Islamic books in your pocket — completely free',
      footerTagline: 'Your comprehensive fiqh library in your pocket',
      duaText: 'O Allah, benefit through it, and place it in the scale of our good deeds',
      copyright: '© 2024 Fiqh App. All rights reserved.'
    }
  };

  // Get current language
  function getCurrentLang() {
    return document.documentElement.lang;
  }

  // Update page content based on language
  function updateContent(lang) {
    const t = translations[lang];
    if (!t) return;

    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) {
        el.innerHTML = t[key];
      }
    });

    // Update section titles
    document.querySelectorAll('.section-title').forEach(el => {
      const sectionId = el.closest('section')?.id;
      if (sectionId === 'library') el.innerHTML = `<span class="section-icon">📚</span> ${t.libraryTitle}`;
      if (sectionId === 'features') el.innerHTML = `<span class="section-icon">⭐</span> ${t.featuresTitle}`;
      if (sectionId === 'reader') el.innerHTML = `<span class="section-icon">📖</span> ${t.readerTitle}`;
      if (sectionId === 'learning') el.innerHTML = `<span class="section-icon">🎓</span> ${t.learningTitle}`;
      if (sectionId === 'tracking') el.innerHTML = `<span class="section-icon">📊</span> ${t.trackingTitle}`;
      if (sectionId === 'howItWorks') el.innerHTML = `<span class="section-icon">🚀</span> ${t.howTitle}`;
      if (sectionId === 'screenshots') el.innerHTML = `<span class="section-icon">📱</span> ${t.screenshotsTitle}`;
      if (sectionId === 'testimonials') el.innerHTML = `<span class="section-icon">💬</span> ${t.testimonialsTitle}`;
      if (sectionId === 'stats') el.innerHTML = `<span class="section-icon">📊</span> ${t.statsTitle}`;
      if (sectionId === 'faq') el.innerHTML = `<span class="section-icon">❓</span> ${t.faqTitle}`;
      if (sectionId === 'requirements') el.innerHTML = `<span class="section-icon">⚙️</span> ${t.reqTitle}`;
    });

    // Update hero content
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) heroTitle.innerHTML = `<span class="gold-shimmer">${t.heroTitle}</span>`;

    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) heroSubtitle.innerHTML = t.heroSubtitle;

    const heroStat = document.querySelector('.hero-stat .stat-label');
    if (heroStat) heroStat.textContent = t.downloadText;

    // Update buttons
    document.querySelectorAll('.hero-actions .btn span').forEach(btn => {
      if (btn.textContent.includes('تحميل') || btn.textContent.includes('Download')) {
        btn.textContent = t.btnDownload.replace('⬇ ', '');
      }
    });

    // Update category titles
    document.querySelectorAll('.category-title').forEach(title => {
      if (title.textContent.includes('بدون إنترنت') || title.textContent.includes('Offline')) {
        title.innerHTML = `<span class="category-badge offline">${t.offlineBadge.split(' ')[0]}</span> ${t.loadedBooks}`;
      } else if (title.textContent.includes('قابل للتحميل') || title.textContent.includes('downloadable')) {
        title.innerHTML = `<span class="category-badge downloadable">⬇️</span> ${t.downloadableBooks}`;
      }
    });

    // Update footer
    const footerTagline = document.querySelector('.footer-tagline');
    if (footerTagline) footerTagline.textContent = t.footerTagline;

    const duaText = document.querySelector('.dua-text');
    if (duaText) duaText.textContent = t.duaText;

    const copyright = document.querySelector('.copyright');
    if (copyright) copyright.textContent = t.copyright;
  }

  // Switch language
  function switchLanguage() {
    const currentLang = getCurrentLang();
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    const newDir = newLang === 'ar' ? 'rtl' : 'ltr';
    const targetFile = newLang === 'ar' ? 'index.html' : 'en.html';

    // Navigate to the other language page
    window.location.href = targetFile;
  }

  // Initialize
  function init() {
    if (!langToggle) return;

    langToggle.addEventListener('click', () => {
      switchLanguage();
    });
  }

  // Start
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
