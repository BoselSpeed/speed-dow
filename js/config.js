/* ============================================================
   نادي متعدد المجالات - تكوين الروابط البديلة
   Centralized configuration for placeholder links
   عدل القيم هنا فقط - يتم استخدامها عبر جميع صفحات الموقع
   ============================================================ */

const PLACEHOLDER_LINKS = {
  PLACEHOLDER_LINK_1: '#',
  PLACEHOLDER_LINK_2: '#',
  PLACEHOLDER_LINK_3: '#',
  PLACEHOLDER_LINK_4: '#'
};

// دالة لإدراج الروابط في العناصر التي تحمل data-placeholder
function initPlaceholderLinks() {
  document.querySelectorAll('[data-placeholder]').forEach(el => {
    const key = el.getAttribute('data-placeholder');
    if (PLACEHOLDER_LINKS[key]) {
      el.href = PLACEHOLDER_LINKS[key];
    }
  });
}

document.addEventListener('DOMContentLoaded', initPlaceholderLinks);
