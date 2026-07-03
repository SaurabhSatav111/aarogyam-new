document.addEventListener('DOMContentLoaded', () => {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const content = item.querySelector('.accordion-content');
      const isOpen = item.classList.contains('active');

      // Close all other items
      const allItems = document.querySelectorAll('.accordion-item');
      allItems.forEach(i => {
        i.classList.remove('active');
        const c = i.querySelector('.accordion-content');
        if (c) {
          c.style.maxHeight = null;
        }
      });

      // Toggle current item
      if (!isOpen) {
        item.classList.add('active');
        if (content) {
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      }
    });
  });
});
