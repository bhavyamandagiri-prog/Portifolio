/* ==========================================================================
   MAIN APPLICATION JS - Bhavya Mandagiri's Portfolio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 1. Theme Toggler (Dark/Light mode)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const bodyElement = document.body;

  // Retrieve stored theme or set to default (dark)
  const currentTheme = localStorage.getItem('theme') || 'dark';
  bodyElement.setAttribute('data-theme', currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    const isDark = bodyElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    bodyElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // 2. Scroll Progress Bar
  const scrollBar = document.getElementById('scroll-bar');
  window.addEventListener('scroll', () => {
    const windowScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (windowScroll / height) * 100;
    scrollBar.style.width = scrolled + '%';
  });

  // 3. Floating Quick-Access Resume Button visibility
  const floatingResume = document.getElementById('floating-resume');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      floatingResume.classList.add('visible');
    } else {
      floatingResume.classList.remove('visible');
    }
  });

  // 4. Typewriter Effect
  const typewriterElement = document.getElementById('typewriter');
  const phrases = [
    "B.Tech ECE Student",
    "VLSI & Full Stack Developer",
    "AI Enthusiast"
  ];
  let phraseIndex = 0;
  let characterIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
      typewriterElement.textContent = currentPhrase.substring(0, characterIndex - 1);
      characterIndex--;
      typingSpeed = 50;
    } else {
      typewriterElement.textContent = currentPhrase.substring(0, characterIndex + 1);
      characterIndex++;
      typingSpeed = 150;
    }

    if (!isDeleting && characterIndex === currentPhrase.length) {
      // Pause at full phrase
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && characterIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  // Launch Typewriter
  setTimeout(type, 1000);

  // 5. Active Link Highlight on Scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // 6. Mobile Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navLinksList = document.getElementById('nav-links');

  menuToggle.addEventListener('click', () => {
    navLinksList.classList.toggle('active');
    const isOpened = navLinksList.classList.contains('active');
    menuToggle.innerHTML = isOpened ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
    lucide.createIcons();
  });

  // Close Mobile Menu on Click of a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinksList.classList.remove('active');
      menuToggle.innerHTML = '<i data-lucide="menu"></i>';
      lucide.createIcons();
    });
  });

  // 7. Interactive Cursor glowing hover effect for project cards
  const glowContainers = document.querySelectorAll('.glow-card-container');
  glowContainers.forEach(container => {
    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      container.style.setProperty('--mouse-x', `${x}px`);
      container.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 8. Intersection Observer for slide/fade in transitions
  const revealElements = document.querySelectorAll('.reveal');
  const observerOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Make the section header visible
        const header = entry.target.querySelector('.section-header');
        if (header) {
          header.classList.add('visible');
        }

        // If it's the timeline, animate child nodes too
        if (entry.target.id === 'extracurriculars') {
          const items = entry.target.querySelectorAll('.timeline-item');
          items.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('visible');
            }, index * 200);
          });
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(element => {
    observer.observe(element);
  });

});
