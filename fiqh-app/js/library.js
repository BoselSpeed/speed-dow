/* library.js - منطق المكتبة والـ Modal */

(function () {
  'use strict';

  // Book data for modal
  const booksData = {
    1: {
      emoji: '📕',
      title: 'كتاب التوحيد',
      titleEn: 'Kitab Al-Tawhid',
      author: 'محمد بن عبد الوهاب',
      authorEn: 'Muhammad ibn Abdul Wahhab',
      publisher: 'دار طيبة',
      year: '1440 هـ',
      language: 'العربية',
      category: 'عقيدة',
      madhhab: 'سلفي',
      volumes: '1',
      description: 'من أهم الكتب في باب التوحيد، يبين أركانه ويجيب عن الشبهات المعاصرة.',
      pages: '180'
    },
    2: {
      emoji: '📗',
      title: 'ثلاثة الأصول وأدلتها',
      titleEn: 'Thalathat Al-Usul wa Adillatuha',
      author: 'محمد بن عبد الوهاب',
      authorEn: 'Muhammad ibn Abdul Wahhab',
      publisher: 'دار طيبة',
      year: '1440 هـ',
      language: 'العربية',
      category: 'عقيدة',
      madhhab: 'سلفي',
      volumes: '1',
      description: 'يحدد الأصول الثلاثة التي يجب على كل مسلم معرفتها.',
      pages: '120'
    },
    3: {
      emoji: '📘',
      title: 'العقيدة الواسطية',
      titleEn: 'Al-Aqidah Al-Wasitiyyah',
      author: 'ابن تيمية',
      authorEn: 'Ibn Taymiyyah',
      publisher: 'دار الإسلام',
      year: '1441 هـ',
      language: 'العربية',
      category: 'عقيدة',
      madhhab: 'حنبلي',
      volumes: '1',
      description: 'عقيدة أهل السنة والجماعة كما بينها شيخ الإسلام ابن تيمية.',
      pages: '150'
    },
    4: {
      emoji: '📙',
      title: 'كشف الشبهات',
      titleEn: 'Kashf Al-Shubuhat',
      author: 'محمد بن عبد الوهاب',
      authorEn: 'Muhammad ibn Abdul Wahhab',
      publisher: 'دار طيبة',
      year: '1440 هـ',
      language: 'العربية',
      category: 'عقيدة',
      madhhab: 'سلفي',
      volumes: '1',
      description: 'يكشف الشبهات الشائعة حول التوحيد ويجيب عليها بأسلوب علمي.',
      pages: '140'
    },
    5: {
      emoji: '📚',
      title: '50 قصة من صحيح البخاري',
      titleEn: '50 Stories from Sahih Bukhari',
      author: 'مختارات',
      authorEn: 'Selected',
      publisher: 'دار التقوى',
      year: '1442 هـ',
      language: 'العربية',
      category: 'حديث',
      madhhab: 'سلفي',
      volumes: '1',
      description: 'مجموعة مختارة من أحاديث صحيح البخاري المختارة للأطفال والكبار.',
      pages: '200'
    },
    6: {
      emoji: '📖',
      title: 'تفسير القرآن العظيم',
      titleEn: 'Tafsir Al-Quran Al-Azeem',
      author: 'ابن كثير',
      authorEn: 'Ibn Kathir',
      publisher: 'دار الفكر',
      year: '1439 هـ',
      language: 'العربية',
      category: 'تفسير',
      madhhab: 'شافعي',
      volumes: '4',
      description: 'من أهم تفاسير القرآن الكريم معروفة بالاعتناء بالأحاديث والآثار.',
      pages: '2500'
    },
    7: {
      emoji: '📗',
      title: 'صحيح البخاري',
      titleEn: 'Sahih Al-Bukhari',
      author: 'الإمام البخاري',
      authorEn: 'Imam Bukhari',
      publisher: 'دار إحياء التراث',
      year: '1438 هـ',
      language: 'العربية',
      category: 'حديث',
      madhhab: 'حنبلي',
      volumes: '5',
      description: 'أصح كتاب بعد القرآن الكريم، جمع فيه الإمام البخاري أحاديث النبي صلى الله عليه وسلم.',
      pages: '3200'
    },
    8: {
      emoji: '📘',
      title: 'صحيح مسلم',
      titleEn: 'Sahih Muslim',
      author: 'الإمام مسلم',
      authorEn: 'Imam Muslim',
      publisher: 'دار إحياء التراث',
      year: '1438 هـ',
      language: 'العربية',
      category: 'حديث',
      madhhab: 'جعفي',
      volumes: '5',
      description: 'ثاني أصح كتب الحديث بعد صحيح البخاري.',
      pages: '2800'
    },
    9: {
      emoji: '📔',
      title: 'تفسير البغوي',
      titleEn: 'Tafsir Al-Baghawi',
      author: 'أبو محمد الحسين البغوي',
      authorEn: 'Abu Muhammad Al-Baghawi',
      publisher: 'دار الفكر',
      year: '1441 هـ',
      language: 'العربية',
      category: 'تفسير',
      madhhab: 'شافعي',
      volumes: '2',
      description: 'تفسير معتمد يجمع بين الحديث واللغة والفقه.',
      pages: '1200'
    },
    10: {
      emoji: '📔',
      title: 'تفسير القرطبي',
      titleEn: 'Tafsir Al-Qurtubi',
      author: 'أبو عبد الله القرطبي',
      authorEn: 'Abu Abdullah Al-Qurtubi',
      publisher: 'دار إحياء التراث',
      year: '1440 هـ',
      language: 'العربية',
      category: 'تفسير',
      madhhab: 'مالكي',
      volumes: '4',
      description: 'تفسير قرآني فقهي واسع يعتمد على المذاهب الأربعة.',
      pages: '3000'
    },
    11: {
      emoji: '📔',
      title: 'تفسير الطبري',
      titleEn: 'Tafsir Al-Tabari',
      author: 'ابن جرير الطبري',
      authorEn: 'Ibn Jarir Al-Tabari',
      publisher: 'دار إحياء التراث',
      year: '1439 هـ',
      language: 'العربية',
      category: 'تفسير',
      madhhab: 'شافعي',
      volumes: '3',
      description: 'تفسير تاريخي لغوي يجمع بين التفسير بالمأثور والرأي.',
      pages: '2400'
    },
    12: {
      emoji: '📔',
      title: 'تفسير الشوكاني',
      titleEn: 'Tafsir Al-Shawkani',
      author: 'محمد الشوكاني',
      authorEn: 'Muhammad Al-Shawkani',
      publisher: 'دار إحياء التراث',
      year: '1441 هـ',
      language: 'العربية',
      category: 'تفسير',
      madhhab: 'زيدية',
      volumes: '1',
      description: 'تفسير شامل يجمع بين التفسير بالمأثور واللغة والبلاغة.',
      pages: '800'
    },
    13: {
      emoji: '📔',
      title: 'مسند أبي داود الطيالسي',
      titleEn: 'Musnad Abu Dawud Al-Tayalisi',
      author: 'أبو داود الطيالسي',
      authorEn: 'Abu Dawud Al-Tayalisi',
      publisher: 'دار الفكر',
      year: '1442 هـ',
      language: 'العربية',
      category: 'حديث',
      madhhab: 'حنفي',
      volumes: '2',
      description: 'مسند يجمع أحاديث النبي صلى الله عليه وسلم مرتبة حسب أسماء الصحابة.',
      pages: '900'
    },
    14: {
      emoji: '📔',
      title: 'سنن النسائي',
      titleEn: 'Sunan An-Nasa\'i',
      author: 'الإمام النسائي',
      authorEn: 'Imam An-Nasa\'i',
      publisher: 'دار إحياء التراث',
      year: '1440 هـ',
      language: 'العربية',
      category: 'حديث',
      madhhab: 'شافعي',
      volumes: '2',
      description: 'من كتب السنن الصحيحة المعتمدة.',
      pages: '1100'
    },
    15: {
      emoji: '📔',
      title: 'سنن الترمذي',
      titleEn: 'Sunan At-Tirmidhi',
      author: 'الإمام الترمذي',
      authorEn: 'Imam At-Tirmidhi',
      publisher: 'دار إحياء التراث',
      year: '1440 هـ',
      language: 'العربية',
      category: 'حديث',
      madhhab: 'شافعي',
      volumes: '2',
      description: 'سنن معتمد مع أحكام على الأسانيد والمتون.',
      pages: '1000'
    },
    16: {
      emoji: '📔',
      title: 'سنن أبي داود',
      titleEn: 'Sunan Abu Dawud',
      author: 'أبو داود السجستاني',
      authorEn: 'Abu Dawud Al-Sijistani',
      publisher: 'دار إحياء التراث',
      year: '1440 هـ',
      language: 'العربية',
      category: 'حديث',
      madhhab: 'حنفي',
      volumes: '2',
      description: 'سنن معتمد من كتب السنن الأربعة.',
      pages: '1200'
    },
    17: {
      emoji: '📔',
      title: 'سنن ابن ماجه',
      titleEn: 'Sunan Ibn Majah',
      author: 'ابن ماجه القزويني',
      authorEn: 'Ibn Majah Al-Qazwini',
      publisher: 'دار إحياء التراث',
      year: '1440 هـ',
      language: 'العربية',
      category: 'حديث',
      madhhab: 'شافعي',
      volumes: '2',
      description: 'من كتب السنن المعتمدة مع أحاديث نافعة.',
      pages: '1100'
    },
    18: {
      emoji: '📔',
      title: 'موطأ مالك',
      titleEn: 'Muwatta Malik',
      author: 'الإمام مالك',
      authorEn: 'Imam Malik',
      publisher: 'دار إحياء التراث',
      year: '1441 هـ',
      language: 'العربية',
      category: 'حديث',
      madhhab: 'مالكي',
      volumes: '1',
      description: 'أول كتاب في الحديثSorted بعد الصحاح الستة.',
      pages: '700'
    },
    19: {
      emoji: '📔',
      title: 'مسند أحمد',
      titleEn: 'Musnad Ahmad',
      author: 'الإمام أحمد بن حنبل',
      authorEn: 'Imam Ahmad ibn Hanbal',
      publisher: 'دار إحياء التراث',
      year: '1441 هـ',
      language: 'العربية',
      category: 'حديث',
      madhhab: 'حنبل',
      volumes: '6',
      description: 'أكبر مسند في الحديثSorted يجمع أحاديث الصحابة مرتبة.',
      pages: '4000'
    },
    20: {
      emoji: '📔',
      title: 'صحيح ابن حبان',
      titleEn: 'Sahih Ibn Hibban',
      author: 'ابن حبان',
      authorEn: 'Ibn Hibban',
      publisher: 'دار إحياء التراث',
      year: '1442 هـ',
      language: 'العربية',
      category: 'حديث',
      madhhab: 'شافعي',
      volumes: '3',
      description: 'من الصحاح المعتمدة مع ترتيب خاص حسب الأبواب.',
      pages: '1800'
    },
    21: {
      emoji: '📔',
      title: 'المستدرك على الصحيحين',
      titleEn: 'Al-Mustadrak',
      author: 'الحاكم النيسابوري',
      authorEn: 'Al-Hakim An-Nisaburi',
      publisher: 'دار إحياء التراث',
      year: '1441 هـ',
      language: 'العربية',
      category: 'حديث',
      madhhab: 'شافعي',
      volumes: '2',
      description: 'يستدرك ما فات البخاري ومسلم من الأحاديث الصحيحة.',
      pages: '1400'
    },
    22: {
      emoji: '📔',
      title: 'السنن الكبرى',
      titleEn: 'Al-Sunan Al-Kubra',
      author: 'البيهقي',
      authorEn: 'Al-Bayhaqi',
      publisher: 'دار إحياء التراث',
      year: '1441 هـ',
      language: 'العربية',
      category: 'حديث',
      madhhab: 'شافعي',
      volumes: '4',
      description: 'من أمهات كتب السنن والآثار.',
      pages: '2200'
    },
    23: {
      emoji: '📔',
      title: 'تفسير ابن أبي حاتم',
      titleEn: 'Tafsir Ibn Abi Hatim',
      author: 'ابن أبي حاتم الرازي',
      authorEn: 'Ibn Abi Hatim Ar-Razi',
      publisher: 'دار الفكر',
      year: '1442 هـ',
      language: 'العربية',
      category: 'تفسير',
      madhhab: 'شافعي',
      volumes: '2',
      description: 'تفسير يجمع بين التفسير بالمأثور والدراسات اللغوية.',
      pages: '1600'
    }
  };

  // DOM Elements
  const bookModal = document.getElementById('bookModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalClose = document.getElementById('modalClose');
  const modalBookEmoji = document.getElementById('modalBookEmoji');
  const modalTitle = document.getElementById('modalTitle');
  const modalInfoGrid = document.getElementById('modalInfoGrid');

  // Open modal with book data
  function openBookModal(bookId) {
    const book = booksData[bookId];
    if (!book || !bookModal) return;

    const isArabic = document.documentElement.lang === 'ar';

    modalBookEmoji.textContent = book.emoji;
    modalTitle.textContent = isArabic ? book.title : book.titleEn;

    const infoItems = [
      { label: isArabic ? 'المؤلف' : 'Author', value: isArabic ? book.author : book.authorEn },
      { label: isArabic ? 'الناشر' : 'Publisher', value: book.publisher },
      { label: isArabic ? 'السنة' : 'Year', value: book.year },
      { label: isArabic ? 'اللغة' : 'Language', value: book.language },
      { label: isArabic ? 'التصنيف' : 'Category', value: book.category },
      { label: isArabic ? 'المذهب' : 'School', value: book.madhhab },
      { label: isArabic ? 'الوصف' : 'Description', value: book.description },
      { label: isArabic ? 'عدد المجلدات' : 'Volumes', value: book.volumes },
      { label: isArabic ? 'عدد الصفحات' : 'Pages', value: book.pages }
    ];

    modalInfoGrid.innerHTML = infoItems.map(item => `
      <div class="modal-info-item">
        <span class="modal-info-label">${item.label}</span>
        <span class="modal-info-value">${item.value}</span>
      </div>
    `).join('');

    bookModal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  // Close modal
  function closeBookModal() {
    if (!bookModal) return;
    bookModal.hidden = true;
    document.body.style.overflow = '';
  }

  // Initialize
  function init() {
    // Book card click handlers
    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach(card => {
      card.addEventListener('click', () => {
        const bookId = card.getAttribute('data-book-id');
        if (bookId) {
          openBookModal(bookId);
        }
      });

      // Keyboard accessibility
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const bookId = card.getAttribute('data-book-id');
          if (bookId) {
            openBookModal(bookId);
          }
        }
      });
    });

    // Modal event listeners
    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', closeBookModal);
    }

    if (modalClose) {
      modalClose.addEventListener('click', closeBookModal);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && bookModal && !bookModal.hidden) {
        closeBookModal();
      }
    });
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
