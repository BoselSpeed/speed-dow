# تطبيق الفقه - Fiqh App Landing Page

Static landing page for the Fiqh App - an Islamic library app with 23 books on monotheism, creed, hadith, and tafsir.

## 📁 Project Structure

```
fiqh-app/
├── index.html          # Arabic version (RTL)
├── en.html             # English version (LTR)
├── css/
│   ├── style.css       # Main design system & styles
│   ├── animations.css  # All animations & effects
│   ├── islamic-patterns.css  # Islamic geometric patterns
│   └── responsive.css  # Mobile-first responsive design
├── js/
│   ├── main.js         # Core interactions
│   ├── animations.js   # GSAP + ScrollTrigger
│   ├── counters.js     # Counter animations
│   ├── library.js      # Library modal logic
│   └── lang-switch.js  # Language toggle
├── assets/
│   ├── images/         # App mockups & screenshots
│   ├── books/covers/    # Book cover images
│   ├── patterns/       # Islamic pattern SVGs
│   ├── icons/          # SVG icons
│   └── favicon.ico     # Site favicon
├── robots.txt
├── 200.html
└── README.md
```

## 🚀 Deployment

### Deploy to Surge.sh

```bash
# Install surge if not already installed
npm install -g surge

# Deploy from the fiqh-app directory
cd fiqh-app
surge ./ speed-dow.surge.sh
```

### Deploy to Netlify

```bash
# Using Netlify CLI
npm install -g netlify-cli
cd fiqh-app
netlify deploy --prod
```

### Deploy to Vercel

```bash
# Using Vercel CLI
npm install -g vercel
cd fiqh-app
vercel --prod
```

## 🎨 Features

- **15 Sections**: Hero, Problem-Solution, Library, Features, Reader, Learning, Tracking, How It Works, Screenshots, Testimonials, Stats, FAQ, Requirements, Final CTA, Footer
- **23 Books**: 8 loaded + 15 downloadable with detailed modal information
- **8 Core Features**: PDF Reader, Learning & Quizzes, Smart Search, Tracking, Personal Tools, Bilingual, Offline, B&W Design
- **Interactive Elements**: Carousel, FAQ accordion, counters, progress bars, modal dialogs
- **Animations**: GSAP ScrollTrigger, parallax, counter animations, magnetic buttons, golden particles
- **Bilingual**: Full Arabic (RTL) and English (LTR) support
- **Responsive**: Mobile-first design with breakpoints at 320px, 768px, 992px, 1200px, 1440px

## 🛠️ Tech Stack

- **HTML5** + **CSS3** + **Vanilla JavaScript**
- **GSAP** (GreenSock) for animations
- **Google Fonts**: Cairo, Amiri, Scheherazade New, IBM Plex Sans Arabic
- **No frameworks** (no React, Vue, or Tailwind)

## 📝 Notes

- All content is in Arabic with full RTL support
- English version available at `en.html`
- Islamic design principles: no human images, respectful icons only
- Black & white design with gold accents
- Optimized for performance (Total Size < 500KB target)
- SEO optimized with meta tags, Open Graph, and Schema.org markup

## 📱 App Information

- **Name**: تطبيق الفقه (Fiqh App)
- **Platform**: Android
- **Books**: 23 Islamic books (8 offline + 15 downloadable)
- **Languages**: Arabic & English
- **Price**: Free (no ads)

## 🙏 Dua

"اللهم انفع به، واجعله في ميزان حسناتنا"

(O Allah, benefit through it, and place it in the scale of our good deeds)

## 📄 License

© 2024 Fiqh App. All rights reserved.
