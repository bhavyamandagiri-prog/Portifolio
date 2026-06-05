/* ==========================================================================
   CERTIFICATES GALLERY LOGIC - Bhavya Mandagiri's Portfolio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const galleryGrid = document.getElementById('gallery-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxClose = document.getElementById('lightbox-close');

  // Certificate specifications (Verified contents only)
  const certificates = [
    {
      id: 1,
      title: 'Artificial Intelligence',
      issuer: 'NPTEL National Certification',
      category: 'coding',
      date: 'Dec 2025',
      badgeColor: '#7303c0'
    },
    {
      id: 2,
      title: 'Internet of Things (IoT)',
      issuer: 'NPTEL Certification',
      category: 'workshops',
      date: 'Oct 2024',
      badgeColor: '#ec38bc'
    },
    {
      id: 3,
      title: 'Python Fundamentals',
      issuer: 'Infosys Springboard',
      category: 'coding',
      date: 'Jul 2025',
      badgeColor: '#4361ee'
    },
    {
      id: 4,
      title: 'PCB Design Course',
      issuer: 'APSSDC Program',
      category: 'workshops',
      date: 'May 2024',
      badgeColor: '#00f5d4'
    },
    {
      id: 5,
      title: 'Drone Developer Programme',
      issuer: 'Reliance Foundation Skilling Academy',
      category: 'workshops',
      date: 'Nov 2025',
      badgeColor: '#ff007f'
    },
    {
      id: 6,
      title: 'Viksit Bharat Young Leaders Dialogue 2026',
      issuer: 'MYBharat (Min. of Youth Affairs & Sports)',
      category: 'hackathons',
      date: 'Feb 2026',
      badgeColor: '#9d4edd'
    },
    {
      id: 7,
      title: 'Industrial IIoT Two-Day Workshop',
      issuer: 'Andhra Loyola Institute (ALIET)',
      category: 'workshops',
      date: 'Feb 2025',
      badgeColor: '#00b4d8'
    },
    {
      id: 8,
      title: 'Project Expo EPISTEMICON 2025 (2nd Prize)',
      issuer: 'ALIET Technical Symposium',
      category: 'hackathons',
      date: 'Feb 2025',
      badgeColor: '#db2777'
    }
  ];

  // Helper function to draw beautiful Canvas mock certificates
  function generateCertificateImage(cert) {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');

    // 1. Background Gradient
    const gradient = ctx.createLinearGradient(0, 0, 800, 600);
    gradient.addColorStop(0, '#0c071b');
    gradient.addColorStop(0.5, '#130e26');
    gradient.addColorStop(1, '#080512');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);

    // 2. Borders & Tech grid lines
    ctx.strokeStyle = 'rgba(167, 139, 250, 0.2)';
    ctx.lineWidth = 15;
    ctx.strokeRect(20, 20, 760, 560);

    ctx.strokeStyle = cert.badgeColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(35, 35, 730, 530);

    // Corner crosshairs
    const drawCross = (x, y) => {
      ctx.beginPath();
      ctx.moveTo(x - 15, y);
      ctx.lineTo(x + 15, y);
      ctx.moveTo(x, y - 15);
      ctx.lineTo(x, y + 15);
      ctx.strokeStyle = 'rgba(0, 245, 212, 0.3)';
      ctx.stroke();
    };
    drawCross(40, 40);
    drawCross(760, 40);
    drawCross(40, 560);
    drawCross(760, 560);

    // 3. Header text
    ctx.font = 'bold 24px Poppins, sans-serif';
    ctx.fillStyle = '#00f5d4';
    ctx.textAlign = 'center';
    ctx.fillText('CERTIFICATE OF ACHIEVEMENT', 400, 100);

    ctx.font = '16px Inter, sans-serif';
    ctx.fillStyle = '#a78bfa';
    ctx.fillText('THIS IS PROUDLY PRESENTED TO', 400, 160);

    // 4. Recipient Name
    ctx.font = 'bold 38px Poppins, sans-serif';
    ctx.fillStyle = '#f5f3ff';
    ctx.fillText('Bhavya Mandagiri', 400, 230);

    // Underline
    ctx.strokeStyle = 'rgba(167, 139, 250, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.lineTo(550, 250);
    ctx.stroke();

    // 5. Course Details
    ctx.font = '16px Inter, sans-serif';
    ctx.fillStyle = '#7c7297';
    ctx.fillText('for successfully fulfilling the qualifications of', 400, 290);

    ctx.font = 'bold 28px Poppins, sans-serif';
    ctx.fillStyle = cert.badgeColor;
    ctx.fillText(cert.title, 400, 350);

    ctx.font = '18px Inter, sans-serif';
    ctx.fillStyle = '#f5f3ff';
    ctx.fillText(`Issued by: ${cert.issuer}`, 400, 400);

    // 6. Footer metadata
    ctx.font = '14px Inter, sans-serif';
    ctx.fillStyle = '#7c7297';
    ctx.fillText(`Date: ${cert.date}`, 200, 500);
    ctx.fillText('Verify online at: bhavya.dev/credentials', 600, 500);

    // Seal shape in the center-ish bottom
    ctx.beginPath();
    ctx.arc(400, 480, 25, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(0, 245, 212, 0.1)';
    ctx.fill();
    ctx.strokeStyle = '#00f5d4';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.fillStyle = '#00f5d4';
    ctx.fillText('VALID', 400, 484);

    return canvas.toDataURL();
  }

  // Generate cards on load
  function renderGallery(filter = 'all') {
    galleryGrid.innerHTML = '';
    
    const filtered = filter === 'all' 
      ? certificates 
      : certificates.filter(c => c.category === filter);

    filtered.forEach(cert => {
      const imgDataUrl = generateCertificateImage(cert);
      
      const card = document.createElement('div');
      card.className = 'glass-card certificate-card';
      card.dataset.category = cert.category;
      
      // Save canvas generated image in card object
      card.addEventListener('click', () => openLightbox(imgDataUrl, cert.title, cert.issuer));
      
      const container = document.createElement('div');
      container.className = 'certificate-img-container';
      
      const img = document.createElement('img');
      img.src = imgDataUrl;
      img.alt = cert.title;
      img.loading = 'lazy';
      
      const overlay = document.createElement('div');
      overlay.className = 'certificate-overlay';
      
      const icon = document.createElement('div');
      icon.className = 'cert-zoom-icon';
      icon.innerHTML = '<i data-lucide="zoom-in"></i>';
      
      const title = document.createElement('h3');
      title.className = 'cert-title';
      title.textContent = cert.title;
      
      const issuer = document.createElement('p');
      issuer.className = 'cert-issuer';
      issuer.textContent = cert.issuer;
      
      overlay.appendChild(icon);
      overlay.appendChild(title);
      overlay.appendChild(issuer);
      
      container.appendChild(img);
      container.appendChild(overlay);
      card.appendChild(container);
      galleryGrid.appendChild(card);
    });

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  // Filter Event Listeners
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const category = btn.dataset.filter;
      renderGallery(category);
    });
  });

  // Lightbox mechanics
  function openLightbox(imgSrc, title, issuer) {
    lightboxImg.src = imgSrc;
    lightboxTitle.textContent = `${title} - ${issuer}`;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock background scroll
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Unlock scroll
  }

  lightboxClose.addEventListener('click', closeLightbox);
  
  // Close on outer modal click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Initial render
  renderGallery();
});
