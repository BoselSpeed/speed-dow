# VideoCut Studio
محرر فيديو احترافي يعمل داخل المتصفح

## الميزات
- تحرير فيديو متكامل داخل المتصفح
- Timeline احترافي متعدد المسارات
- معالجة محلية بدون رفع إلى خادم
- تصدير بعدة صيغ (MP4, WebM, GIF, MP3, WAV)
- دعم النصوص والترجمة
- مؤثرات صوتية وبصرية
- حفظ تلقائي في IndexedDB
- دعم كامل للعربية RTL
- PWA قابل للتثبيت

## التقنيات
- Next.js 14 + TypeScript + Tailwind CSS
- Zustand لإدارة الحالة
- WebCodecs و FFmpeg.wasm
- Web Workers للمعالجة الثقيلة
- IndexedDB للتخزين المحلي
- Canvas/OffscreenCanvas للمعاينة

## التشغيل محلياً
```bash
npm install
npm run dev
```

## البناء
```bash
npm run build
npm run export
```

## تحويل إلى PWA
```bash
npm run build
# الخدمة تعمل تلقائياً في الإنتاج
```

## المتطلبات
- متصفح حديث يدعم WebCodecs (Chrome 94+, Edge 94+)
- 4GB RAM على الأقل
- معالج يدعم تشفير الفيديو

## ملاحظات
- جميع العمليات تتم محلياً في المتصفح
- لا يتم رفع أي ملفات إلى خوادم
- يدعم WebCodecs مع احتياطي FFmpeg.wasm

## الترخيص
MIT
