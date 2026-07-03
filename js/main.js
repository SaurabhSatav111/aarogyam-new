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

  // Inject Sticky Social Media Bar dynamically
  const injectStickySocials = () => {
    const socialBar = document.createElement('div');
    socialBar.className = 'sticky-social-bar';
    socialBar.innerHTML = `
      <a href="https://www.facebook.com/aarogyam.aurangabad" class="sticky-social-link fb" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <i class="ti ti-brand-facebook"></i>
      </a>
      <a href="https://www.instagram.com/arogyam_hospital_sambhajinagar/?hl=en" class="sticky-social-link ig" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <i class="ti ti-brand-instagram"></i>
      </a>
      <a href="https://www.youtube.com" class="sticky-social-link yt" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
        <i class="ti ti-brand-youtube"></i>
      </a>
      <a href="https://wa.me/918007070308" class="sticky-social-link wa" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <i class="ti ti-brand-whatsapp"></i>
      </a>
    `;
    document.body.appendChild(socialBar);
  };
  injectStickySocials();
});
