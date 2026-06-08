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

  // 9. Code Viewer Modal Logic
  const codeModal = document.getElementById('code-modal');
  const codeModalClose = document.getElementById('code-modal-close');
  const viewCodeBtns = document.querySelectorAll('.view-code-btn');
  const codeCopyBtn = document.getElementById('code-copy-btn');
  const arduinoCodeBlock = document.getElementById('arduino-code-block');

  if (codeModal && codeModalClose) {
    const openCodeModal = () => {
      codeModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Lock background scroll
    };

    const closeCodeModal = () => {
      codeModal.classList.remove('active');
      document.body.style.overflow = ''; // Unlock background scroll
    };

    viewCodeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openCodeModal();
      });
    });

    codeModalClose.addEventListener('click', closeCodeModal);

    codeModal.addEventListener('click', (e) => {
      if (e.target === codeModal) {
        closeCodeModal();
      }
    });

    // Copy Code to Clipboard (raw text extraction)
    if (codeCopyBtn && arduinoCodeBlock) {
      codeCopyBtn.addEventListener('click', () => {
        const rawCode = arduinoCodeBlock.textContent;
        navigator.clipboard.writeText(rawCode).then(() => {
          // Visual Copied feedback state
          const originalHTML = codeCopyBtn.innerHTML;
          codeCopyBtn.innerHTML = '<i data-lucide="check"></i> Copied!';
          if (typeof lucide !== 'undefined') {
            lucide.createIcons();
          }
          codeCopyBtn.style.background = 'rgba(0, 245, 212, 0.2)';
          codeCopyBtn.style.borderColor = 'var(--accent-cyan)';
          codeCopyBtn.style.color = 'var(--accent-cyan)';

          setTimeout(() => {
            codeCopyBtn.innerHTML = originalHTML;
            if (typeof lucide !== 'undefined') {
              lucide.createIcons();
            }
            codeCopyBtn.style.background = '';
            codeCopyBtn.style.borderColor = '';
            codeCopyBtn.style.color = '';
          }, 2000);
        }).catch(err => {
          console.error('Failed to copy text: ', err);
        });
      });
    }
  }

  // 10. Project Details Modal Logic
  const detailsModal = document.getElementById('details-modal');
  const detailsModalClose = document.getElementById('details-modal-close');
  const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
  const detailsViewCodeBtn = document.getElementById('details-view-code-btn');
  const mainPreviewImg = document.getElementById('details-main-img');
  const previewContainer = document.getElementById('details-preview-container');

  if (detailsModal && detailsModalClose) {
    const openDetailsModal = () => {
      detailsModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Lock background scroll
    };

    const closeDetailsModal = () => {
      detailsModal.classList.remove('active');
      document.body.style.overflow = ''; // Unlock background scroll
    };

    viewDetailsBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openDetailsModal();
      });
    });

    detailsModalClose.addEventListener('click', closeDetailsModal);

    detailsModal.addEventListener('click', (e) => {
      if (e.target === detailsModal) {
        closeDetailsModal();
      }
    });

    // Image preview switcher
    window.switchPreview = function(thumbElement) {
      const mainImg = document.getElementById('details-main-img');
      const caption = document.getElementById('gallery-caption');
      const thumbs = document.querySelectorAll('.thumb-img');
      
      if (mainImg && caption) {
        mainImg.src = thumbElement.src;
        caption.textContent = thumbElement.dataset.alt;
        
        thumbs.forEach(t => t.classList.remove('active'));
        thumbElement.classList.add('active');
      }
    };

    // Transition from details modal to code modal
    if (detailsViewCodeBtn && codeModal) {
      detailsViewCodeBtn.addEventListener('click', () => {
        closeDetailsModal();
        setTimeout(() => {
          codeModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }, 150);
      });
    }

    // Zoom preview image inside Lightbox Modal
    if (previewContainer && mainPreviewImg) {
      previewContainer.addEventListener('click', () => {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxTitle = document.getElementById('lightbox-title');
        const caption = document.getElementById('gallery-caption').textContent;

        if (lightbox && lightboxImg && lightboxTitle) {
          lightboxImg.src = mainPreviewImg.src;
          lightboxTitle.textContent = `Patient Health Monitoring System - ${caption}`;
          lightbox.classList.add('active');
        }
      });
    }
  }

  // 11. Interactive Card Carousel
  const carousel = document.getElementById('patient-carousel');
  if (carousel) {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.dot');
    const prevBtn = carousel.querySelector('.prev-btn');
    const nextBtn = carousel.querySelector('.next-btn');
    let currentIndex = 0;

    const showSlide = (index) => {
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      slides[index].classList.add('active');
      dots[index].classList.add('active');
      currentIndex = index;
    };

    const nextSlide = () => {
      let next = (currentIndex + 1) % slides.length;
      showSlide(next);
    };

    const prevSlide = () => {
      let prev = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(prev);
    };

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        nextSlide();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        prevSlide();
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        showSlide(idx);
      });
    });

    // Auto-advance slides every 5 seconds
    let autoPlay = setInterval(nextSlide, 5000);

    carousel.addEventListener('mouseenter', () => clearInterval(autoPlay));
    carousel.addEventListener('mouseleave', () => {
      clearInterval(autoPlay);
      autoPlay = setInterval(nextSlide, 5000);
    });
  }

});
