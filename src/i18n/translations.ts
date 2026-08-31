export type Lang = 'ar' | 'en'

export interface Translation {
  dir: 'rtl' | 'ltr'
  langName: string
  navHome: string
  navAbout: string
  navFeatures: string
  navScreenshots: string
  navFaq: string
  navDownload: string
  switchLangLabel: string
  heroBadge: string
  heroTitle: string
  heroHighlight: string
  heroSubtitle: string
  heroDownload: string
  heroDiscover: string
  statsBooks: string
  statsOffline: string
  statsProgress: string
  aboutAnchor: string
  aboutEyebrow: string
  aboutTitle: string
  aboutIntro: string
  aboutP1: string
  aboutP2: string
  aboutP3: string
  featuresAnchor: string
  featuresEyebrow: string
  featuresTitle: string
  featuresSubtitle: string
  featureLibraryTitle: string
  featureLibraryDesc: string
  featurePdfTitle: string
  featurePdfDesc: string
  featureOfflineTitle: string
  featureOfflineDesc: string
  featureVolumesTitle: string
  featureVolumesDesc: string
  featureBilingualTitle: string
  featureBilingualDesc: string
  featureProgressTitle: string
  featureProgressDesc: string
  featureQuizTitle: string
  featureQuizDesc: string
  contentsAnchor: string
  contentsEyebrow: string
  contentsTitle: string
  contentsSubtitle: string
  contentsBooksTitle: string
  contentsBooksDesc: string
  contentsReadingTitle: string
  contentsReadingDesc: string
  contentsVolumesTitle: string
  contentsVolumesDesc: string
  contentsOfflineTitle: string
  contentsOfflineDesc: string
  contentsLanguagesTitle: string
  contentsLanguagesDesc: string
  screenshotsAnchor: string
  screenshotsEyebrow: string
  screenshotsTitle: string
  screenshotsSubtitle: string
  shotLibraryTitle: string
  shotLibraryDesc: string
  shotReaderTitle: string
  shotReaderDesc: string
  shotDetailsTitle: string
  shotDetailsDesc: string
  shotVolumesTitle: string
  shotVolumesDesc: string
  openFullscreen: string
  volumeSectionAnchor: string
  volumeSectionEyebrow: string
  volumeSectionTitle: string
  volumeSectionDesc: string
  oneBook: string
  firstVol: string
  secondVol: string
  convert: (labels: { first: string; second: string; third: string; fourth: string }) => string[]
  volumesNote: string
  howAnchor: string
  howEyebrow: string
  howTitle: string
  howSubtitle: string
  howStep1Title: string
  howStep1Desc: string
  howStep2Title: string
  howStep2Desc: string
  howStep3Title: string
  howStep3Desc: string
  howStep4Title: string
  howStep4Desc: string
  howStep5Title: string
  howStep5Desc: string
  faqAnchor: string
  faqEyebrow: string
  faqTitle: string
  faqSubtitle: string
  faq1Q: string
  faq1A: string
  faq2Q: string
  faq2A: string
  faq3Q: string
  faq3A: string
  faq4Q: string
  faq4A: string
  faq5Q: string
  faq5A: string
  faq6Q: string
  faq6A: string
  faq7Q: string
  faq7A: string
  faq8Q: string
  faq8A: string
  ctaEyebrow: string
  ctaTitle: string
  ctaSubtitle: string
  ctaButton: string
  ctaNote: string
  footerTagline: string
  footerLinksTitle: string
  footerRights: string
  installBtn: string
  installTitle: string
  installAcknowledge: string
  downloadableNote: string
  themeDarkLabel: string
  themeLightLabel: string
  themeDarkTitle: string
  themeLightTitle: string
  adLabel: string
  warningTitle: string
  warningIntro: string
  warningPoint1: string
  warningPoint2: string
  warningPoint3: string
  warningPoint4: string
}

const ar: Translation = {
  dir: 'rtl',
  langName: 'English',
  navHome: 'الرئيسية',
  navAbout: 'عن التطبيق',
  navFeatures: 'المميزات',
  navScreenshots: 'صور التطبيق',
  navFaq: 'الأسئلة الشائعة',
  navDownload: 'تنزيل التطبيق',
  switchLangLabel: 'English',
  heroBadge: 'موسوعة فقهية بين يديك',
  heroTitle: 'تطبيق الفقه',
  heroHighlight: 'ادرس الفقه والعقيدة بطريقة منظمة',
  heroSubtitle: 'مكتبة فقهية منظمة تضع بين يديك كتب التوحيد والعقيدة والتفسير والحديث، مع تجربة قراءة مريحة ومحتوى يمكنك الوصول إليه دون اتصال.',
  heroDownload: 'تنزيل التطبيق',
  heroDiscover: 'اكتشف المميزات',
  statsBooks: 'مكتبة كتب منظمة',
  statsOffline: 'قراءة دون اتصال',
  statsProgress: 'تتبع تقدّم القراءة',
  aboutAnchor: 'عن التطبيق',
  aboutEyebrow: 'عن التطبيق',
  aboutTitle: 'ما هو تطبيق الفقه؟',
  aboutIntro: 'تطبيق الفقه هو مكتبة فقهية متكاملة مصممة لمساعدتك على دراسة كتب التوحيد والعقيدة والتفسير والحديث بطريقة منظمة ومريحة.',
  aboutP1: 'يجمع التطبيق مجموعة مختارة من الكتب والمراجع الشرعية في مكان واحد، وينظّمها في مكتبة واضحة يسهل التنقل فيها. يمكنك اختيار كتابك والعثور على أجزائه والانتقال إلى القراءة بخطوات قليلة.',
  aboutP2: 'صُمم التطبيق ليكون مناسبًا للمبتدئين وطلبة العلم على حد سواء: أقسام منظمة، دروس متدرجة المستوى، وتتبّع لتقدّمك في القراءة يوضّح ما أنجزته وما بقي أمامك.',
  aboutP3: 'المحتوى المرفق في التطبيق، والمجلدات الأولى من الكتب متعددة الأجزاء، يمكنك الوصول إليها دون اتصال بالإنترنت — لتبقى القراءة متاحة أينما كنت.',
  featuresAnchor: 'المميزات',
  featuresEyebrow: 'المميزات',
  featuresTitle: 'لماذا تطبيق الفقه؟',
  featuresSubtitle: 'ميزات مصممة لتحويل القراءة إلى تجربة دراسة منظمة وممتعة.',
  featureLibraryTitle: 'مكتبة كتب منظمة',
  featureLibraryDesc: 'مكتبة مرتبة بوضوح تضم كتب التوحيد والعقيدة والتفسير والحديث، مع تفاصيل كاملة لكل كتاب.',
  featurePdfTitle: 'قراءة بصيغة PDF',
  featurePdfDesc: 'قارئ كتب مدمج يعرض الكتب بصيغة PDF مع التحكم في حجم الخط وملاءمة العرض.',
  featureOfflineTitle: 'قراءة دون اتصال',
  featureOfflineDesc: 'المحتوى المرفق والمجلدات الأولى من الكتب متاحة لك حتى بدون اتصال بالإنترنت.',
  featureVolumesTitle: 'كتب متعددة المجلدات',
  featureVolumesDesc: 'تنظيم ذكي للكتب متعددة الأجزاء، مع تنزيل المجلدات الإضافية عند الحاجة.',
  featureBilingualTitle: 'بالعربية والإنجليزية',
  featureBilingualDesc: 'واجهة تدعم العربية والإنجليزية، مع تبديل العناوين والتفاصيل بين اللغتين.',
  featureProgressTitle: 'تتبّع تقدّم القراءة',
  featureProgressDesc: 'قسّم الكتب إلى دروس وأقسام، وضَع علامة اكتمال، واحفظ تقدّمك ومفضّلتك بسهولة.',
  featureQuizTitle: 'اختبارات لكل درس',
  featureQuizDesc: 'اختبر فهمك بعد كل درس باختبارات قصيرة ومراجعة للإجابات.',
  contentsAnchor: 'ماذا يحتوي؟',
  contentsEyebrow: 'ماذا يحتوي',
  contentsTitle: 'ماذا يحتوي التطبيق؟',
  contentsSubtitle: 'نظرة على ما ستجده داخل التطبيق.',
  contentsBooksTitle: 'الكتب',
  contentsBooksDesc: 'مكتبة تضم مختارات من كتب التوحيد والعقيدة والتفسير والحديث، مع بيانات المؤلّف والمحقق والفئة لكل كتاب.',
  contentsReadingTitle: 'القراءة',
  contentsReadingDesc: 'قارئ PDF مدمج يتيح قراءة الكتب مباشرة داخل التطبيق مع أدوات تحكم مريحة في طريقة العرض.',
  contentsVolumesTitle: 'المجلدات',
  contentsVolumesDesc: 'الكتب متعددة الأجزاء مقسّمة إلى مجلدات واضحة، والمجلدات الأولى مرفقة مع التطبيق للقراءة دون اتصال.',
  contentsOfflineTitle: 'المحتوى دون اتصال',
  contentsOfflineDesc: 'ما هو مرفق مع التطبيق متاح دون إنترنت؛ أما المجلدات الإضافية فتُحمَّل من الشبكة مرة واحدة عند الحاجة.',
  contentsLanguagesTitle: 'اللغات',
  contentsLanguagesDesc: 'يدعم التطبيق العربية والإنجليزية مع تبديل سلس للغة الواجهة والعناوين.',
  screenshotsAnchor: 'صور التطبيق',
  screenshotsEyebrow: 'صور التطبيق',
  screenshotsTitle: 'جولة داخل التطبيق',
  screenshotsSubtitle: 'تعرّف على شكل التطبيق من الداخل عبر صور تعتمد على محتوى التطبيق الحقيقي.',
  shotLibraryTitle: 'مكتبة الكتب',
  shotLibraryDesc: 'تصفّح الكتب في مكتبة منظمة واختر ما تريد قراءته.',
  shotReaderTitle: 'قارئ PDF',
  shotReaderDesc: 'اقرأ الكتب بملء الشاشة مع تحكم مريح بالتكبير والتنقل.',
  shotDetailsTitle: 'تفاصيل الكتاب',
  shotDetailsDesc: 'عرض معلومات الكتاب والمجلدات وخيارات القراءة أو التنزيل.',
  shotVolumesTitle: 'مجلدات الكتاب',
  shotVolumesDesc: 'الكتب متعددة الأجزاء منظمة في مجلدات واضحة.',
  openFullscreen: 'عرض بالحجم الكامل',
  volumeSectionAnchor: 'الكتب متعددة المجلدات',
  volumeSectionEyebrow: 'الكتب متعددة المجلدات',
  volumeSectionTitle: 'من كتاب واحد إلى عدة مجلدات',
  volumeSectionDesc: 'يعرض التطبيق الكتاب متعدد الأجزاء كوحدة واحدة، ثم يفتحه إلى مجلدات واضحة ليصلك كل جزء بالترتيب.',
  oneBook: 'كتاب واحد',
  firstVol: 'المجلد الأول',
  secondVol: 'المجلد الثاني',
  convert: ({ first, second, third, fourth }) => [first, second, third, fourth],
  volumesNote: 'المجلدات الأولى مرفقة مع التطبيق للقراءة دون اتصال، وتنزّل بقية المجلدات عند الحاجة.',
  howAnchor: 'طريقة الاستخدام',
  howEyebrow: 'طريقة الاستخدام',
  howTitle: 'كيف تستخدم التطبيق؟',
  howSubtitle: 'ابدأ خلال لحظات بخطوات بسيطة.',
  howStep1Title: 'تنزيل التطبيق',
  howStep1Desc: 'حمّل ملف التطبيق من هذا الموقع بزر التنزيل.',
  howStep2Title: 'فتح التطبيق',
  howStep2Desc: 'ثبّت التطبيق وافتحه من جهازك.',
  howStep3Title: 'اختيار الكتاب',
  howStep3Desc: 'اختر كتابًا من مكتبة الكتب المنظمة.',
  howStep4Title: 'اختيار المجلد',
  howStep4Desc: 'اختر الجزء أو المجلد الذي تريد قراءته.',
  howStep5Title: 'بدء القراءة',
  howStep5Desc: 'استمتع بالقراءة وسجّل تقدّمك.',
  faqAnchor: 'الأسئلة الشائعة',
  faqEyebrow: 'الأسئلة الشائعة',
  faqTitle: 'أسئلة شائعة',
  faqSubtitle: 'إجابات لأكثر الأسئلة شيوعًا حول التطبيق.',
  faq1Q: 'ما هو تطبيق الفقه؟',
  faq1A: 'تطبيق الفقه هو مكتبة فقهية منظمة تضم كتب التوحيد والعقيدة والتفسير والحديث، مصممة لمساعدتك على الدراسة والقراءة بطريقة مريحة ومنظمة.',
  faq2Q: 'ماذا يحتوي التطبيق؟',
  faq2A: 'يحتوي التطبيق على مكتبة مختارة من الكتب الشرعية (بصيغة PDF) منظمة في أقسام، مع تفاصيل كاملة لكل كتاب، وأقسام ودروس تتابع فيها القراءة.',
  faq3Q: 'هل يمكن قراءة الكتب دون اتصال؟',
  faq3A: 'نعم. المحتوى المرفق مع التطبيق والمجلدات الأولى من الكتب متعددة الأجزاء متاحة للقراءة دون اتصال بالإنترنت.',
  faq4Q: 'كيف يتم تنزيل المجلدات الإضافية؟',
  faq4A: 'المجلدات الإضافية غير المرفقة مع التطبيق تُحمَّل من داخل التطبيق عند اختيارها، وتحتاج إلى اتصال بالإنترنت أثناء التنزيل، وتبقى محفوظة على جهازك بعد ذلك.',
  faq5Q: 'هل الكتب بصيغة PDF؟',
  faq5A: 'نعم، تُعرض الكتب داخل التطبيق بصيغة PDF عبر قارئ مدمج يتيح التحكم في طريقة العرض وحجم الخط.',
  faq6Q: 'ما اللغات التي يدعمها التطبيق؟',
  faq6A: 'يدعم التطبيق اللغة العربية والإنجليزية، ويمكنك التبديل بينهما من إعدادات التطبيق.',
  faq7Q: 'كيف يمكن تنزيل التطبيق؟',
  faq7A: 'اضغط زر «تنزيل التطبيق» في هذا الموقع لتحميل ملف التطبيق مباشرة، ثم ثبّته على جهازك وافتحه.',
  faq8Q: 'هل أستطيع متابعة تقدّمي في القراءة؟',
  faq8A: 'نعم. يتيح التطبيق وضع علامة اكتمال على الدروس، وحفظ المفضلة، وتتبّع تقدّمك في القراءة.',
  ctaEyebrow: 'ابدأ الآن',
  ctaTitle: 'حمّل تطبيق الفقه الآن',
  ctaSubtitle: 'ابدأ رحلتك في دراسة الفقه والعقيدة بمكتبة منظمة وتجربة قراءة مريحة.',
  ctaButton: 'تنزيل التطبيق',
  ctaNote: 'الملف يُحمّل مباشرة من هذا الموقع.',
  footerTagline: 'مكتبة فقهية منظمة تضع بين يديك كتب التوحيد والعقيدة والتفسير والحديث.',
  footerLinksTitle: 'أقسام الموقع',
  footerRights: 'جميع الحقوق محفوظة.',
  installBtn: '📱 كيفية تثبيت التطبيق',
  installTitle: 'خطوات تعطيل Play Protect وتنزيل التطبيق',
  installAcknowledge: 'فهمت، أُكمل',
  downloadableNote: 'الملف مُحضّر للتنزيل مباشرة من هذا الموقع.',
  themeDarkLabel: 'الوضع الداكن',
  themeLightLabel: 'الوضع الفاتح',
  themeDarkTitle: 'التبديل إلى الوضع الداكن',
  themeLightTitle: 'التبديل إلى الوضع الفاتح',
  adLabel: 'إعلان',
  warningTitle: 'تنبيه مهم: حمّل الملف بأمان',
  warningIntro: 'تتم جميع عمليات التنزيل داخل هذه الصفحة حصريًا، ولن يُنقل تحميلك إلى أي نافذة أو موقع خارجي.',
  warningPoint1: 'زر «تنزيل التطبيق» في هذا الموقع هو الزر الوحيد الذي يُنزّل الملف الحقيقي؛ إذ لا تتم عملية التنزيل أبدًا عبر الإعلانات.',
  warningPoint2: 'إذا رأيت في إعلان أو نافذة منبثقة أي زر «تنزيل» أو «مدير تنزيل» (Download Manager)، فاعلم أنه إعلان مضلل — أغلق تلك النافذة وارجع إلى هنا لإكمال تنزيلك.',
  warningPoint3: 'تحقق من اسم الملف الذي يصل إليك: يجب أن يكون «تطبيق-الفقه.apk». ونحن لا نعرض نوافذ «مدير التنزيل» المنبثقة أبدًا.',
  warningPoint4: 'الملف الحقيقي كبير الحجم ويُحمّل من داخل هذه الصفحة مباشرة؛ فلا تنخدع بملفات الإعلانات الصغيرة.',
}

const en: Translation = {
  dir: 'ltr',
  langName: 'العربية',
  navHome: 'Home',
  navAbout: 'About',
  navFeatures: 'Features',
  navScreenshots: 'Screenshots',
  navFaq: 'FAQ',
  navDownload: 'Download',
  switchLangLabel: 'العربية',
  heroBadge: 'An organized Fiqh library in your hands',
  heroTitle: 'Fiqh App',
  heroHighlight: 'Study Fiqh and creed in an organized way',
  heroSubtitle: 'An organized Fiqh library that puts Tawhid, Aqeedah, Tafsir and Hadith books at your fingertips, with a comfortable reading experience and content you can access offline.',
  heroDownload: 'Download the app',
  heroDiscover: 'Discover the features',
  statsBooks: 'Organized book library',
  statsOffline: 'Offline reading',
  statsProgress: 'Reading progress tracking',
  aboutAnchor: 'About the app',
  aboutEyebrow: 'About the app',
  aboutTitle: 'What is the Fiqh App?',
  aboutIntro: 'The Fiqh App is a complete Fiqh library designed to help you study the books of Tawhid, Aqeedah, Tafsir and Hadith in an organized and comfortable way.',
  aboutP1: 'The app brings a curated collection of religious books and references into one place, organized in a clear, easy-to-navigate library. Choose a book, find its parts, and start reading in a few steps.',
  aboutP2: 'It is designed for both beginners and seekers of knowledge: organized sections, leveled lessons, and reading progress that shows what you have completed and what remains.',
  aboutP3: 'The bundled content and the first volumes of multi-part books are accessible offline, so your reading continues wherever you are.',
  featuresAnchor: 'Features',
  featuresEyebrow: 'Features',
  featuresTitle: 'Why the Fiqh App?',
  featuresSubtitle: 'Features designed to turn reading into an organized and enjoyable study experience.',
  featureLibraryTitle: 'Organized book library',
  featureLibraryDesc: 'A clearly organized library of Tawhid, Aqeedah, Tafsir and Hadith books, with full details for each book.',
  featurePdfTitle: 'PDF reading',
  featurePdfDesc: 'A built-in reader displays books in PDF format with font-size and fit-to-width controls.',
  featureOfflineTitle: 'Offline reading',
  featureOfflineDesc: 'Bundled content and the first volumes of books are available even without an internet connection.',
  featureVolumesTitle: 'Multi-volume books',
  featureVolumesDesc: 'Smart organization of multi-part books, with additional volumes downloaded only when needed.',
  featureBilingualTitle: 'Arabic and English',
  featureBilingualDesc: 'An interface that supports Arabic and English, switching titles and details between the two languages.',
  featureProgressTitle: 'Reading progress',
  featureProgressDesc: 'Break books into lessons and sections, mark completion, and save your progress and favorites easily.',
  featureQuizTitle: 'Per-lesson quizzes',
  featureQuizDesc: 'Test your understanding after each lesson with short quizzes and answer review.',
  contentsAnchor: 'What it contains',
  contentsEyebrow: 'What it contains',
  contentsTitle: 'What does the app contain?',
  contentsSubtitle: 'A look at what you will find inside the app.',
  contentsBooksTitle: 'Books',
  contentsBooksDesc: 'A curated library of Tawhid, Aqeedah, Tafsir and Hadith books, with author, researcher and category details for each book.',
  contentsReadingTitle: 'Reading',
  contentsReadingDesc: 'A built-in PDF reader lets you read books directly inside the app with comfortable display controls.',
  contentsVolumesTitle: 'Volumes',
  contentsVolumesDesc: 'Multi-part books are divided into clear volumes, with the first volumes bundled with the app for offline reading.',
  contentsOfflineTitle: 'Offline content',
  contentsOfflineDesc: 'Content bundled with the app is available offline; additional volumes are downloaded once when needed.',
  contentsLanguagesTitle: 'Languages',
  contentsLanguagesDesc: 'The app supports Arabic and English with a smooth switch of the interface and titles.',
  screenshotsAnchor: 'Screenshots',
  screenshotsEyebrow: 'Screenshots',
  screenshotsTitle: 'A tour inside the app',
  screenshotsSubtitle: 'See what the app looks like inside through visuals based on the app’s real content.',
  shotLibraryTitle: 'Book library',
  shotLibraryDesc: 'Browse books in an organized library and choose what to read.',
  shotReaderTitle: 'PDF reader',
  shotReaderDesc: 'Read books in full screen with comfortable zoom and navigation controls.',
  shotDetailsTitle: 'Book details',
  shotDetailsDesc: 'View book information, volumes, and options to read or download.',
  shotVolumesTitle: 'Book volumes',
  shotVolumesDesc: 'Multi-part books are organized into clear volumes.',
  openFullscreen: 'View full size',
  volumeSectionAnchor: 'Multi-volume books',
  volumeSectionEyebrow: 'Multi-volume books',
  volumeSectionTitle: 'From one book to multiple volumes',
  volumeSectionDesc: 'The app presents a multi-part book as one unit, then opens it into clear volumes so each part reaches you in order.',
  oneBook: 'One book',
  firstVol: 'Volume 1',
  secondVol: 'Volume 2',
  convert: ({ first, second, third, fourth }) => [first, second, third, fourth],
  volumesNote: 'The first volumes are bundled with the app for offline reading, and the rest are downloaded when needed.',
  howAnchor: 'How to use',
  howEyebrow: 'How to use',
  howTitle: 'How do you use the app?',
  howSubtitle: 'Start within moments with a few simple steps.',
  howStep1Title: 'Download the app',
  howStep1Desc: 'Download the app file from this website using the download button.',
  howStep2Title: 'Open the app',
  howStep2Desc: 'Install the app and open it on your device.',
  howStep3Title: 'Choose a book',
  howStep3Desc: 'Pick a book from the organized library.',
  howStep4Title: 'Choose a volume',
  howStep4Desc: 'Select the part or volume you want to read.',
  howStep5Title: 'Start reading',
  howStep5Desc: 'Enjoy reading and keep track of your progress.',
  faqAnchor: 'FAQ',
  faqEyebrow: 'FAQ',
  faqTitle: 'Frequently asked questions',
  faqSubtitle: 'Answers to the most common questions about the app.',
  faq1Q: 'What is the Fiqh App?',
  faq1A: 'The Fiqh App is an organized Fiqh library of Tawhid, Aqeedah, Tafsir and Hadith books, designed to help you study and read in a comfortable, organized way.',
  faq2Q: 'What does the app contain?',
  faq2A: 'The app contains a curated library of religious books (in PDF format) organized into sections, with full details for each book, and sections and lessons you progress through.',
  faq3Q: 'Can I read books offline?',
  faq3A: 'Yes. The content bundled with the app and the first volumes of multi-part books are available for offline reading.',
  faq4Q: 'How are additional volumes downloaded?',
  faq4A: 'Additional volumes not bundled with the app are downloaded from inside the app when selected. This requires an internet connection during the download, and they stay saved on your device afterwards.',
  faq5Q: 'Are the books in PDF format?',
  faq5A: 'Yes, books are displayed inside the app in PDF format through a built-in reader that lets you control the display and font size.',
  faq6Q: 'Which languages does the app support?',
  faq6A: 'The app supports Arabic and English, and you can switch between them from the app settings.',
  faq7Q: 'How can I download the app?',
  faq7A: 'Press the Download app button on this website to download the app file directly, then install it on your device and open it.',
  faq8Q: 'Can I track my reading progress?',
  faq8A: 'Yes. The app lets you mark lessons as complete, save favorites, and track your reading progress.',
  ctaEyebrow: 'Start now',
  ctaTitle: 'Download the Fiqh App now',
  ctaSubtitle: 'Start your journey in studying Fiqh and creed with an organized library and a comfortable reading experience.',
  ctaButton: 'Download the app',
  ctaNote: 'The file downloads directly from this website.',
  footerTagline: 'An organized Fiqh library putting Tawhid, Aqeedah, Tafsir and Hadith books at your fingertips.',
  footerLinksTitle: 'Site sections',
  footerRights: 'All rights reserved.',
  installBtn: '📱 How to install the app',
  installTitle: 'Steps to disable Play Protect and download the app',
  installAcknowledge: 'Got it',
  downloadableNote: 'The file is ready to download directly from this website.',
  themeDarkLabel: 'Dark Mode',
  themeLightLabel: 'Light Mode',
  themeDarkTitle: 'Switch to dark mode',
  themeLightTitle: 'Switch to light mode',
  adLabel: 'Advertisement',
  warningTitle: 'Important notice: download the file safely',
  warningIntro: 'We are committed to performing all downloads exclusively within this page.',
  warningPoint1: 'All downloads happen exclusively within this page, and your download will never be taken to an external window or site.',
  warningPoint2: 'The download button on this site is the only button that downloads the real file; downloads never happen through ads.',
  warningPoint3: 'If you see any "Download" button or "Download Manager" in an ad or popup, know that it is a misleading ad — close that window and come back here to finish your download.',
  warningPoint4: 'Check the file name you receive: it must be "تطبيق-الفقه.apk". We never show "Download Manager" popups.',
}

export const translations: Record<Lang, Translation> = { ar, en }
export const defaultLang: Lang = 'ar'

export const bookLabels = {
  ar: {
    first: 'المجلد الأول',
    second: 'المجلد الثاني',
    third: 'المجلد الثالث',
    fourth: 'المجلد الرابع',
  },
  en: {
    first: 'Volume 1',
    second: 'Volume 2',
    third: 'Volume 3',
    fourth: 'Volume 4',
  },
} as const
