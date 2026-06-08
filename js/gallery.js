/* ==========================================================================
   CREDENTIALS DASHBOARD LOGIC - Bhavya Mandagiri's Portfolio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const galleryGrid = document.getElementById('gallery-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxClose = document.getElementById('lightbox-close');

  // Certificate specifications (Real images integrated + canvas fallbacks)
  const certificates = [
    {
      id: 1,
      title: 'VLSI DFT Industrial Internship',
      issuer: 'BIST Technologies Pvt. Ltd.',
      category: 'workshops',
      date: 'May - Jul 2025',
      year: '2025',
      score: '2 Months DFT',
      accent: 'pink',
      icon: 'cpu',
      badgeText: 'VERIFIED',
      image: 'images/cert_bist_internship.png',
      badgeColor: '#ff007f'
    },
    {
      id: 2,
      title: 'Artificial Intelligence: Concepts and Techniques',
      issuer: 'NPTEL • IISc Bangalore',
      category: 'coding',
      date: 'Jul - Oct 2025',
      year: '2025',
      score: 'Elite (Score: 60%)',
      accent: 'purple',
      icon: 'brain',
      badgeText: 'VERIFIED',
      image: 'images/cert_ai.png',
      badgeColor: '#9d4edd'
    },
    {
      id: 3,
      title: 'Introduction to Internet of Things',
      issuer: 'NPTEL • IIT Kharagpur',
      category: 'workshops',
      date: 'Jan - Apr 2025',
      year: '2025',
      score: 'Elite (Score: 67%)',
      accent: 'cyan',
      icon: 'wifi',
      badgeText: 'VERIFIED',
      image: 'images/cert_iot.png',
      badgeColor: '#00f5d4'
    },
    {
      id: 4,
      title: 'Drone Developer Certification Programme',
      issuer: 'Reliance Foundation Skilling Academy',
      category: 'workshops',
      date: 'Feb 23, 2026',
      year: '2026',
      score: 'Completion',
      accent: 'purple',
      icon: 'compass',
      badgeText: 'VERIFIED',
      image: 'images/cert_drone_developer.png',
      badgeColor: '#9d4edd'
    },
    {
      id: 5,
      title: 'Python Fundamentals',
      issuer: 'Infosys Springboard',
      category: 'coding',
      date: 'Jul 28, 2024',
      year: '2024',
      score: 'Completion',
      accent: 'cyan',
      icon: 'code',
      badgeText: 'VERIFIED',
      image: 'images/cert_infosys_python.png',
      badgeColor: '#00b4d8'
    },
    {
      id: 6,
      title: 'Introduction to MATLAB',
      issuer: 'ALIET • APJ Abdul Kalam Research Forum',
      category: 'workshops',
      date: 'Apr 2024',
      year: '2024',
      score: 'Participation',
      accent: 'pink',
      icon: 'cpu',
      badgeText: 'SECURE',
      image: 'images/cert_matlab.png',
      badgeColor: '#ff007f'
    },
    {
      id: 7,
      title: 'PCB Design Course',
      issuer: 'APSSDC Program',
      category: 'workshops',
      date: 'Aug 2024',
      year: '2024',
      score: 'Participation',
      accent: 'pink',
      icon: 'layers',
      badgeText: 'VERIFIED',
      image: 'images/cert_apssdc_pcb.png',
      badgeColor: '#ff007f'
    },
    {
      id: 8,
      title: 'Industrial IIoT Workshop',
      issuer: 'Andhra Loyola Institute (ALIET)',
      category: 'workshops',
      date: 'Feb 2025',
      year: '2025',
      score: 'Participation',
      accent: 'cyan',
      icon: 'settings',
      badgeText: 'VERIFIED',
      image: 'images/cert_aliet_iiot.png',
      badgeColor: '#00f5d4'
    },
    {
      id: 9,
      title: 'VBYLD 2026 Quiz Certificate',
      issuer: 'MYBharat (Min. of Youth Affairs & Sports)',
      category: 'hackathons',
      date: 'Oct 2025',
      year: '2025',
      score: 'Participation',
      accent: 'purple',
      icon: 'award',
      badgeText: 'VERIFIED',
      image: 'images/cert_mybharat_quiz.png',
      badgeColor: '#9d4edd'
    },
    {
      id: 10,
      title: 'Internal Smart India Hackathon 2025',
      issuer: 'Andhra Loyola (IQAC & R&D Cell)',
      category: 'hackathons',
      date: 'Sep 2025',
      year: '2025',
      score: 'Participation',
      accent: 'pink',
      icon: 'trophy',
      badgeText: 'VERIFIED',
      image: 'images/cert_sih_2025.png',
      badgeColor: '#ff007f'
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

    ctx.strokeStyle = cert.badgeColor || '#00f5d4';
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
    ctx.fillStyle = cert.badgeColor || '#00f5d4';
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
      // Determine the image source (real image or canvas generated image)
      const imageSrc = cert.image ? cert.image : generateCertificateImage(cert);
      
      const card = document.createElement('div');
      card.className = `glass-card credential-card accent-${cert.accent}`;
      card.dataset.category = cert.category;
      
      // Large Background Year Watermark
      const watermark = document.createElement('div');
      watermark.className = 'credential-watermark';
      watermark.textContent = cert.year;
      card.appendChild(watermark);
      
      // Header: Icon + Verified Badge
      const header = document.createElement('div');
      header.className = 'credential-header';
      
      const iconWrap = document.createElement('div');
      iconWrap.className = 'credential-icon-wrap';
      iconWrap.innerHTML = `<i data-lucide="${cert.icon}"></i>`;
      
      const badge = document.createElement('div');
      badge.className = `credential-badge badge-${cert.accent}`;
      badge.innerHTML = `<i data-lucide="shield-check" style="width:13px; height:13px; vertical-align:middle; margin-right:4px;"></i>${cert.badgeText}`;
      
      header.appendChild(iconWrap);
      header.appendChild(badge);
      card.appendChild(header);
      
      // Body: Title + Issuer
      const body = document.createElement('div');
      body.className = 'credential-body';
      
      const title = document.createElement('h3');
      title.className = 'credential-title';
      title.textContent = cert.title;
      
      const issuer = document.createElement('p');
      issuer.className = 'credential-issuer';
      issuer.textContent = cert.issuer;
      
      body.appendChild(title);
      body.appendChild(issuer);
      
      // Date & Score line
      const metaLine = document.createElement('div');
      metaLine.className = 'credential-meta-line';
      
      const dateText = document.createElement('span');
      dateText.className = 'credential-date';
      dateText.textContent = cert.date;
      
      const scoreTag = document.createElement('span');
      scoreTag.className = `credential-score score-${cert.accent}`;
      scoreTag.textContent = cert.score;
      
      metaLine.appendChild(dateText);
      metaLine.appendChild(scoreTag);
      body.appendChild(metaLine);
      card.appendChild(body);
      
      // Footer: View Link CTA
      const footer = document.createElement('div');
      footer.className = 'credential-footer';
      
      const viewLink = document.createElement('span');
      viewLink.className = 'credential-view-link';
      viewLink.innerHTML = 'VIEW CREDENTIAL <i data-lucide="chevron-right" style="width:14px; height:14px; margin-left:3px; vertical-align:middle;"></i>';
      
      footer.appendChild(viewLink);
      card.appendChild(footer);
      
      // Event listener to trigger open lightbox
      card.addEventListener('click', () => openLightbox(imageSrc, cert.title, cert.issuer));
      
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

  // Achievements Showcase Logic
  const achievementsGrid = document.getElementById('achievements-grid');
  if (achievementsGrid) {
    const achievements = [
      {
        id: 1,
        title: 'EPISTEMICON 2025 (2nd Prize)',
        issuer: 'Andhra Loyola Institute (ALIET)',
        date: 'Sep 20, 2025',
        year: '2025',
        score: 'Project Expo (Certificate & Trophy)',
        accent: 'pink',
        icon: 'award',
        badgeText: 'WINNER',
        image: 'images/epistemicon_combined.png',
        badgeColor: '#ff007f'
      }
    ];

    achievements.forEach(ach => {
      const card = document.createElement('div');
      card.className = `glass-card credential-card accent-${ach.accent}`;
      
      const watermark = document.createElement('div');
      watermark.className = 'credential-watermark';
      watermark.textContent = ach.year;
      card.appendChild(watermark);
      
      const header = document.createElement('div');
      header.className = 'credential-header';
      
      const iconWrap = document.createElement('div');
      iconWrap.className = 'credential-icon-wrap';
      iconWrap.innerHTML = `<i data-lucide="${ach.icon}"></i>`;
      
      const badge = document.createElement('div');
      badge.className = `credential-badge badge-${ach.accent}`;
      badge.innerHTML = `<i data-lucide="shield-check" style="width:13px; height:13px; vertical-align:middle; margin-right:4px;"></i>${ach.badgeText}`;
      
      header.appendChild(iconWrap);
      header.appendChild(badge);
      card.appendChild(header);
      
      const body = document.createElement('div');
      body.className = 'credential-body';
      
      const title = document.createElement('h3');
      title.className = 'credential-title';
      title.textContent = ach.title;
      
      const issuer = document.createElement('p');
      issuer.className = 'credential-issuer';
      issuer.textContent = ach.issuer;
      
      body.appendChild(title);
      body.appendChild(issuer);
      
      const metaLine = document.createElement('div');
      metaLine.className = 'credential-meta-line';
      
      const dateText = document.createElement('span');
      dateText.className = 'credential-date';
      dateText.textContent = ach.date;
      
      const scoreTag = document.createElement('span');
      scoreTag.className = `credential-score score-${ach.accent}`;
      scoreTag.textContent = ach.score;
      
      metaLine.appendChild(dateText);
      metaLine.appendChild(scoreTag);
      body.appendChild(metaLine);
      card.appendChild(body);
      
      const footer = document.createElement('div');
      footer.className = 'credential-footer';
      
      const viewLink = document.createElement('span');
      viewLink.className = 'credential-view-link';
      viewLink.innerHTML = 'VIEW ACHIEVEMENT <i data-lucide="chevron-right" style="width:14px; height:14px; margin-left:3px; vertical-align:middle;"></i>';
      
      footer.appendChild(viewLink);
      card.appendChild(footer);
      
      card.addEventListener('click', () => openLightbox(ach.image, ach.title, ach.issuer));
      
      achievementsGrid.appendChild(card);
    });

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  // Initial render
  renderGallery();
});
