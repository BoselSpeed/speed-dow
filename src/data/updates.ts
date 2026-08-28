export interface Update {
  version: string
  description: string
  date: string
}

export const updates: Update[] = [
  {
    version: '2.0.0',
    description: 'تم تحديث الملف وإضافة تحسينات جديدة.',
    date: '29 أغسطس 2026',
  },
  {
    version: '1.5.0',
    description: 'إضافة محتوى وتحسينات.',
    date: '10 أغسطس 2026',
  },
  {
    version: '1.0.0',
    description: 'الإصدار الأولي.',
    date: '1 أغسطس 2026',
  },
]
