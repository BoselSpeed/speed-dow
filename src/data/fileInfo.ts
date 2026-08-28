export interface FileInfo {
  name: string
  description: string
  version: string
  size: string
  fileType: string
  lastUpdated: string
  fileName: string
}

export const fileInfo: FileInfo = {
  name: 'My File',
  description: 'ملف يحتوي على المحتوى المطلوب للتحميل المباشر.',
  version: '2.0.0',
  size: '250 MB',
  fileType: 'ZIP',
  lastUpdated: '29 أغسطس 2026',
  fileName: 'my-file.zip',
}
