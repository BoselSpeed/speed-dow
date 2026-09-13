export interface Book {
  ar: string
  en: string
  cat: string
  cover?: string
  multi?: boolean
  author?: string
  description?: string
}

export const BOOKS: Book[] = [
  { ar: 'كتاب التوحيد', en: 'Kitab at-Tawhid', cat: 'Tawhid', cover: '/assets/screens/kitab-al-tawhid.jpg' },
  { ar: 'ثلاثة الأصول', en: 'The Three Fundamental Principles', cat: 'Aqeedah' },
  { ar: 'العقيدة الواسطية', en: 'Al-Aqidah al-Wasitiyyah', cat: 'Aqeedah', cover: '/assets/screens/al-aqidah-al-wasitiyyah.jpg' },
  { ar: 'كشف الشبهات', en: 'Kashf ash-Shubuhat', cat: 'Aqeedah', cover: '/assets/screens/kashf-al-shubuhat.jpg' },
  { ar: 'تفسير البغوي', en: 'Tafsir al-Baghawi', cat: 'Tafsir', multi: true, cover: '/assets/screens/tafsir-al-baghawi.jpg' },
  { ar: 'مسند أبي داود', en: 'Musnad Abi Dawud', cat: 'Hadith', cover: '/assets/screens/musnad-abi-dawud.jpg' },
  { ar: 'صحيح البخاري', en: 'Sahih al-Bukhari', cat: 'Hadith', cover: '/assets/screens/sahih-al-bukhari.jpg', multi: true },
  { ar: 'صحيح مسلم', en: 'Sahih Muslim', cat: 'Hadith', multi: true, cover: '/assets/screens/sahih-muslim.jpg' },
  { ar: 'سنن النسائي', en: "Sunan an-Nasa'i", cat: 'Hadith', cover: '/assets/screens/sunan-al-nasai.jpg' },
  { ar: 'سنن الترمذي', en: "Sunan at-Tirmidhi", cat: 'Hadith', cover: '/assets/screens/sunan-al-tirmidhi.jpg' },
  { ar: 'تفسير القرطبي', en: 'Tafsir al-Qurtubi', cat: 'Tafsir', multi: true, cover: '/assets/screens/tafsir-al-qurtubi.jpg' },
  { ar: 'تفسير الطبري', en: 'Tafsir at-Tabari', cat: 'Tafsir', multi: true, cover: '/assets/screens/tafsir-al-tabari.jpg' },
  { ar: 'تفسير الشوكاني', en: 'Tafsir ash-Shawkani', cat: 'Tafsir', multi: true, cover: '/assets/screens/tafsir-al-shawkani.jpg' },
  { ar: 'تفسير ابن كثير', en: 'Tafsir Ibn Kathir', cat: 'Tafsir', multi: true, cover: '/assets/screens/tafsir-ibn-kathir.jpg' },
  { ar: '50 قصة من صحيح البخاري', en: '50 Stories from Sahih al-Bukhari', cat: 'Stories', cover: '/assets/screens/qisas-min-sahih-al-bukhari.jpg' },
]

export const CAT_TRANSLATION: Record<string, { ar: string; en: string }> = {
  Tawhid: { ar: 'التوحيد', en: 'Tawhid' },
  Aqeedah: { ar: 'العقيدة', en: 'Aqeedah' },
  Tafsir: { ar: 'التفسير', en: 'Tafsir' },
  Hadith: { ar: 'الحديث', en: 'Hadith' },
  Stories: { ar: 'قصص', en: 'Stories' },
}
