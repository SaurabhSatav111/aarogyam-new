document.addEventListener('DOMContentLoaded', () => {
  // Sticky Header Scroll Effect
  const headerWrapper = document.querySelector('.header-wrapper');
  
  const handleScroll = () => {
    if (window.scrollY > 10) {
      headerWrapper.classList.add('scrolled');
    } else {
      headerWrapper.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  // Run once in case user refreshes partway down the page
  handleScroll();

  // Mobile Hamburger Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navbar = document.querySelector('.navbar');
  const menuIcon = mobileToggle ? mobileToggle.querySelector('i') : null;

  if (mobileToggle && navbar) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navbar.classList.toggle('active');
      
      // Toggle menu icon between burger and X
      if (menuIcon) {
        if (navbar.classList.contains('active')) {
          menuIcon.className = 'ti ti-x';
        } else {
          menuIcon.className = 'ti ti-menu-2';
        }
      }
    });
  }

  // Close mobile menu when clicking outside of it
  document.addEventListener('click', (e) => {
    if (navbar && navbar.classList.contains('active')) {
      const isClickInside = navbar.contains(e.target) || (mobileToggle && mobileToggle.contains(e.target));
      if (!isClickInside) {
        navbar.classList.remove('active');
        if (menuIcon) {
          menuIcon.className = 'ti ti-menu-2';
        }
      }
    }
  });

  // Handle Dropdown Toggles in Mobile Navigation
  const dropdownToggle = document.querySelector('.nav-item-dropdown > .nav-link');
  const dropdownParent = document.querySelector('.nav-item-dropdown');

  if (dropdownToggle && dropdownParent) {
    dropdownToggle.addEventListener('click', (e) => {
      // Toggle only on screens smaller/equal to 1024px
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        e.stopPropagation();
        dropdownParent.classList.toggle('active');
      }
    });
  }

  // Scroll Reveal Animations using Intersection Observer
  const sections = document.querySelectorAll('section');
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        observer.unobserve(entry.target);
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  sections.forEach(section => {
    section.classList.add('reveal-hidden');
    revealObserver.observe(section);
  });
});
