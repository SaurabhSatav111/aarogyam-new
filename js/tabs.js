document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-pill');
  const cards = document.querySelectorAll('.svc-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetCategory = tab.getAttribute('data-target');
      const isActive = tab.classList.contains('active');

      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('active'));

      if (isActive) {
        // If clicking the already active tab, deactivate it and show all cards
        cards.forEach(card => {
          card.style.display = 'flex'; // Use flex since the grid items will display normally
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        });
      } else {
        // Activate clicked tab
        tab.classList.add('active');

        // Filter cards
        cards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          if (cardCategory === targetCategory) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            // Delay setting display none to allow opacity fade out transition if any
            setTimeout(() => {
              if (card.style.opacity === '0') {
                card.style.display = 'none';
              }
            }, 300);
          }
        });
      }
    });
  });
});
