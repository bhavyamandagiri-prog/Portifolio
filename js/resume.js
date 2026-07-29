/* ==========================================================================
   RESUME PANEL LOGIC - Bhavya Mandagiri's Portfolio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const dropzone = document.getElementById('resume-dropzone');
  const fileInput = document.getElementById('resume-file-input');
  const historyList = document.getElementById('resume-history-list');
  const previewBody = document.getElementById('resume-preview-body');
  const printBtn = document.getElementById('print-resume-btn');
  const downloadBtn = document.getElementById('download-resume-btn');

  // Resume versions dataset
  let resumeVersions = [
    { version: 'v3.0', date: 'Jul 2026', label: 'Latest CV', filename: 'Bhavya_Mandagiri_CV_v3.0.pdf', active: true },
    { version: 'v2.1', date: 'Jun 2026', label: 'Previous Draft', filename: 'Bhavya_Mandagiri_Resume_v2.1.pdf', active: false },
    { version: 'v2.0', date: 'Jan 2026', label: 'Placement Ready', filename: 'Bhavya_Mandagiri_Resume_v2.0.pdf', active: false }
  ];

  // Resume Details Map (Verified Contents Only)
  const resumeDetails = {
    name: 'MANDAGIRI BHAVYA',
    tagline: 'B.Tech ECE Student | VLSI & Full Stack Developer | AI Enthusiast',
    email: 'bhavyamandagiri@gmail.com',
    phone: '9493332533',
    location: 'Andhra Pradesh, India',
    github: 'github.com/bhavyamandagiri',
    linkedin: 'linkedin.com/in/bhavya-mandagiri-106ba02b5',
    portfolio: 'https://portifolio-virid-theta.vercel.app/',
    summary: 'Electronics and Communication Engineering student with hands-on experience in VLSI Design for Testability (DFT), Full-Stack Development, and AI-based application development. Proficient in developing intelligent applications, web solutions, and technology-driven projects, with a passion for innovation, problem-solving, and continuous learning.',
    education: [
      { degree: 'Bachelor of Technology', inst: 'Andhra Loyola Institute of Engineering and Technology, Vijayawada', duration: 'Sep 2023 – Present', score: '8.0 CGPA (2023-2027)' },
      { degree: 'Intermediate - MPC', inst: 'Sri Chaitanya Junior College, Chuttugunta', duration: 'Sep 2021 – Feb 2023', score: '7.84 CGPA' },
      { degree: 'Secondary Education - SSC', inst: "St. Joseph's High School, Nunna", duration: '2021', score: '93.5 CGPA' }
    ],
    skills: [
      { category: 'Programming', items: 'Python, C' },
      { category: 'AI & Machine Learning', items: 'Machine Learning, CNN, OpenCV' },
      { category: 'Electronics & Hardware', items: 'Arduino, ESP32, ESP8266, Sensors & Actuators' },
      { category: 'Tools & Software', items: 'MATLAB, LabVIEW, GitHub, VS Code' },
      { category: 'Domains', items: 'VLSI, IoT, Embedded Systems, Full Stack Development' },
      { category: 'Embedded Systems', items: 'Microcontroller, Microcontroller Programming, Sensor Interfacing, Hardware Prototyping, IoT System Design, Cloud Integration, Real-Time Monitoring' },
      { category: 'Web Development', items: 'HTML, CSS, JavaScript, React.js, Next.js' },
      { category: 'Database & Backend', items: 'Firebase, Firestore' },
      { category: 'Mobile App Development', items: 'React Native, Expo' }
    ],
    projects: [
      { title: 'GREEN TECHNOLOGY BASED- AI VIRTUAL HEALTHCARE SUPPORTS & MONITORING ROBOT', duration: 'Mar- Present', bullets: [
        'Developed an AI-powered healthcare assistant with medicine reminders and patient monitoring.',
        'Implemented CNN-based medicine recognition using Python and OpenCV.',
        'Integrated health analytics dashboard and family notification system.'
      ]},
      { title: 'Smart Curriculum Activity & Attendance App (EduVino)', duration: 'Aug 2025 - Present', bullets: [
        'Technologies: Python, OpenCV, CNN, Flask, HTML, CSS, JavaScript, SQLite/MySQL, Pandas, Matplotlib, Anaconda',
        'Developed an AI-powered smart education platform to automate attendance using face recognition.',
        'Implemented emotion detection to analyze students\' classroom engagement and generate reports.',
        'Built separate login portals for Admin, Faculty, Student, and Counselor.',
        'Enabled teachers to upload study materials, assignments, and academic resources.',
        'Developed student performance dashboards with marks analysis and graphical reports.',
        'Integrated attendance reports, academic progress tracking, and personalized career guidance. Generated alerts for students with low attendance or negative emotional patterns to assist counselors.'
      ]},
      { title: 'Patient Health Monitoring System', duration: 'Jan 2025 - Apr 2025', bullets: [
        'Technologies: Arduino Uno | Embedded C | Biomedical Sensors | LCD',
        'Developed an embedded health monitoring system using Arduino Uno and biomedical sensors.',
        'Interfaced sensors with the microcontroller to acquire and process real-time patient data.',
        'Programmed the system in Embedded C for data processing and LCD display.',
        'Implemented ADC-based sensor interfacing and real-time monitoring.',
        'Gained hands-on experience in Embedded Systems, Sensor Interfacing, and Serial Communication.'
      ]},
      { title: 'Signnovate – Indian Sign Language Translation System (SIH 2024)', duration: 'Dec 2024 - Apr 2025', bullets: [
        'Developed a prototype for Smart India Hackathon 2024 to convert Indian Sign Language (ISL) gestures into text using CNN-based deep learning.',
        'Proposed multilingual translation, error detection, and text-to-sign conversion to improve accessibility for the hearing and speech impaired.',
        'Technologies: Python, OpenCV, CNN, TensorFlow/Keras, Anaconda.'
      ]}
    ],
    internships: [
      { company: 'BIST Technologies Pvt. Ltd. – Offline Short-Term Industrial Internship', duration: 'May–July 2025', role: 'Domain: VLSI DFT', bullets: [
        'Completed a 2-month industrial internship focused on Design for Testability (DFT) in VLSI.',
        'Gained practical exposure to industry workflows and testing methodologies.'
      ]},
      { company: 'Summer Industrial Internship – Embedded Systems (TechLogic IT Solutions Pvt. Ltd.)', duration: '18 May 2026 – 12 June 2026', role: 'Intern', bullets: [
        'Completed a 1-month Summer Industrial Internship in Embedded Systems, gaining practical knowledge of embedded system design and development.',
        'Enhanced my skills in microcontrollers, Embedded C, IoT basics, sensor interfacing, and problem-solving through hands-on learning.'
      ]}
    ],
    certifications: [
      'Artificial Intelligence – NPTEL',
      'Internet of Things – NPTEL',
      'Python Fundamentals – Infosys Springboard',
      'PCB Design – APSSDC',
      'Drone Developer Programme – Reliance Foundation'
    ],
    leadership: [
      'Euphonious Voice Club',
      'Cultural Coordinator',
      'YESJ Volunteer (Youth Empowerment Service Journey)',
      'MAGIC Youth Volunteer',
      'Program Development & Event Planning'
    ],
    achievements: [
      'Epistimicon 2K25 Project Expo – Second Prize Winner: Developed "Smart Curriculum Activity and Attendance App", an innovative application designed to digitally track student activities and attendance, improving academic monitoring and management.'
    ]
  };

  // Render mock resume preview in HTML
  function renderResumePreview(selectedFilename = resumeVersions[0].filename) {
    previewBody.innerHTML = `
      <div class="resume-mock">
        <div class="resume-mock-header">
          <h1 class="resume-mock-name" style="text-transform: uppercase; font-size: 1.8rem; font-weight: 800; text-align: center; margin-bottom: 8px; letter-spacing: 1px;">${resumeDetails.name}</h1>
          <p class="resume-mock-contact" style="text-align: center; font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 12px;">
            Email: ${resumeDetails.email} | Mobile: ${resumeDetails.phone} | <a href="https://${resumeDetails.linkedin}" target="_blank" style="color: var(--accent-cyan);">LinkedIn</a> | Portfolio: <a href="${resumeDetails.portfolio}" target="_blank" style="color: var(--accent-cyan);">${resumeDetails.portfolio.replace('https://', '')}</a>
          </p>
          <p style="font-size:0.7rem; color:var(--accent-pink); font-weight:600; margin-top:5px; font-family:monospace; text-align: center; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 10px;">
            Selected File: ${selectedFilename}
          </p>
        </div>

        <div class="resume-mock-section" style="margin-top: 15px;">
          <h2 class="resume-mock-section-title" style="font-size: 0.95rem; font-weight: 700; text-transform: uppercase; border-bottom: 1px solid rgba(255, 255, 255, 0.2); padding-bottom: 4px; margin-bottom: 8px; color: var(--accent-cyan);">Professional Summary</h2>
          <p style="font-size: 0.8rem; line-height:1.4; color: var(--text-primary);">
            ${resumeDetails.summary}
          </p>
        </div>

        <div class="resume-mock-section" style="margin-top: 15px;">
          <h2 class="resume-mock-section-title" style="font-size: 0.95rem; font-weight: 700; text-transform: uppercase; border-bottom: 1px solid rgba(255, 255, 255, 0.2); padding-bottom: 4px; margin-bottom: 8px; color: var(--accent-cyan);">Education</h2>
          ${resumeDetails.education.map(edu => `
            <div class="resume-mock-item" style="margin-bottom: 10px;">
              <div class="resume-mock-item-header" style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 600;">
                <span style="color: var(--text-primary);">${edu.degree}</span>
                <span style="color: var(--text-muted); font-size: 0.8rem;">${edu.duration}</span>
              </div>
              <div class="resume-mock-item-sub" style="font-size: 0.8rem; color: var(--text-secondary);">${edu.inst}</div>
              <div style="font-size:0.75rem; font-weight:600; color: var(--accent-pink); margin-top:2px;">${edu.score}</div>
            </div>
          `).join('')}
        </div>

        <div class="resume-mock-section" style="margin-top: 15px;">
          <h2 class="resume-mock-section-title" style="font-size: 0.95rem; font-weight: 700; text-transform: uppercase; border-bottom: 1px solid rgba(255, 255, 255, 0.2); padding-bottom: 4px; margin-bottom: 8px; color: var(--accent-cyan);">Skills</h2>
          <ul style="padding-left:15px; margin:0; font-size: 0.8rem; line-height: 1.4; color: var(--text-primary);">
            ${resumeDetails.skills.map(s => `
              <li style="margin-bottom: 4px;"><strong>${s.category}:</strong> ${s.items}</li>
            `).join('')}
          </ul>
        </div>

        <div class="resume-mock-section" style="margin-top: 15px;">
          <h2 class="resume-mock-section-title" style="font-size: 0.95rem; font-weight: 700; text-transform: uppercase; border-bottom: 1px solid rgba(255, 255, 255, 0.2); padding-bottom: 4px; margin-bottom: 8px; color: var(--accent-cyan);">Projects</h2>
          ${resumeDetails.projects.map(proj => `
            <div class="resume-mock-item" style="margin-bottom: 12px;">
              <div class="resume-mock-item-header" style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 600;">
                <span style="color: var(--text-primary); text-transform: uppercase;">${proj.title}</span>
                <span style="color: var(--text-muted); font-size: 0.8rem;">${proj.duration}</span>
              </div>
              <ul style="padding-left:15px; margin-top:4px; font-size: 0.78rem; line-height: 1.4; color: var(--text-secondary);">
                ${proj.bullets.map(b => `<li class="resume-mock-bullet" style="margin-bottom: 3px;">${b}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>

        <div class="resume-mock-section" style="margin-top: 15px;">
          <h2 class="resume-mock-section-title" style="font-size: 0.95rem; font-weight: 700; text-transform: uppercase; border-bottom: 1px solid rgba(255, 255, 255, 0.2); padding-bottom: 4px; margin-bottom: 8px; color: var(--accent-cyan);">Internships</h2>
          ${resumeDetails.internships.map(intern => `
            <div class="resume-mock-item" style="margin-bottom: 10px;">
              <div class="resume-mock-item-header" style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 600;">
                <span style="color: var(--text-primary);">${intern.company}</span>
                <span style="color: var(--text-muted); font-size: 0.8rem;">${intern.duration}</span>
              </div>
              <div class="resume-mock-item-sub" style="font-size: 0.8rem; color: var(--accent-pink); font-weight: 500;">${intern.role}</div>
              <ul style="padding-left:15px; margin-top:4px; font-size: 0.78rem; line-height: 1.4; color: var(--text-secondary);">
                ${intern.bullets.map(b => `<li class="resume-mock-bullet" style="margin-bottom: 3px;">${b}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>

        <div class="resume-mock-section" style="margin-top: 15px;">
          <h2 class="resume-mock-section-title" style="font-size: 0.95rem; font-weight: 700; text-transform: uppercase; border-bottom: 1px solid rgba(255, 255, 255, 0.2); padding-bottom: 4px; margin-bottom: 8px; color: var(--accent-cyan);">Certifications</h2>
          <ul style="padding-left:15px; margin:0; font-size: 0.8rem; line-height: 1.4; color: var(--text-primary);">
            ${resumeDetails.certifications.map(cert => `
              <li style="margin-bottom: 3px;">${cert}</li>
            `).join('')}
          </ul>
        </div>

        <div class="resume-mock-section" style="margin-top: 15px;">
          <h2 class="resume-mock-section-title" style="font-size: 0.95rem; font-weight: 700; text-transform: uppercase; border-bottom: 1px solid rgba(255, 255, 255, 0.2); padding-bottom: 4px; margin-bottom: 8px; color: var(--accent-cyan);">Leadership & Volunteering</h2>
          <ul style="padding-left:15px; margin:0; font-size: 0.8rem; line-height: 1.4; color: var(--text-primary);">
            ${resumeDetails.leadership.map(lead => `
              <li style="margin-bottom: 3px;">${lead}</li>
            `).join('')}
          </ul>
        </div>

        <div class="resume-mock-section" style="margin-top: 15px;">
          <h2 class="resume-mock-section-title" style="font-size: 0.95rem; font-weight: 700; text-transform: uppercase; border-bottom: 1px solid rgba(255, 255, 255, 0.2); padding-bottom: 4px; margin-bottom: 8px; color: var(--accent-cyan);">Achievements</h2>
          <ul style="padding-left:15px; margin:0; font-size: 0.8rem; line-height: 1.4; color: var(--text-primary);">
            ${resumeDetails.achievements.map(ach => `
              <li style="margin-bottom: 3px;">${ach}</li>
            `).join('')}
          </ul>
        </div>

        <div class="resume-mock-section" style="margin-top: 15px; border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 10px;">
          <h2 class="resume-mock-section-title" style="font-size: 0.95rem; font-weight: 700; text-transform: uppercase; padding-bottom: 4px; margin-bottom: 8px; color: var(--accent-cyan);">Declaration</h2>
          <p style="font-size: 0.78rem; line-height:1.4; font-style: italic; color: var(--text-secondary);">
            I hereby declare that the above information is true and correct to the best of my knowledge and belief.
          </p>
          <p style="font-size: 0.8rem; font-weight: 600; text-align: right; margin-top: 5px; color: var(--text-primary);">
            (Mandagiri.Bhavya)
          </p>
        </div>
      </div>
    `;
  }

  // Render Version list panel
  function renderHistory() {
    historyList.innerHTML = '';
    resumeVersions.forEach(v => {
      const item = document.createElement('div');
      item.className = `history-item ${v.active ? 'active' : ''}`;
      item.style.cursor = 'pointer';
      
      const leftCol = document.createElement('div');
      const verTitle = document.createElement('strong');
      verTitle.textContent = `${v.version} (${v.date})`;
      verTitle.style.display = 'block';
      const label = document.createElement('span');
      label.style.fontSize = '0.75rem';
      label.style.color = 'var(--text-muted)';
      label.textContent = v.label;
      
      leftCol.appendChild(verTitle);
      leftCol.appendChild(label);
      
      const rightCol = document.createElement('div');
      if (v.active) {
        const activeBadge = document.createElement('span');
        activeBadge.className = 'history-tag';
        activeBadge.textContent = 'ACTIVE';
        rightCol.appendChild(activeBadge);
      }
      
      item.appendChild(leftCol);
      item.appendChild(rightCol);

      item.addEventListener('click', () => {
        resumeVersions.forEach(rv => rv.active = false);
        v.active = true;
        renderHistory();
        renderResumePreview(v.filename);
      });
      
      historyList.appendChild(item);
    });
  }

  // File Upload Event Listeners
  dropzone.addEventListener('click', () => {
    fileInput.click();
  });

  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('dragover');
  });

  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('dragover');
  });

  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) {
      handleUploadedFile(e.dataTransfer.files[0]);
    }
  });

  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handleUploadedFile(e.target.files[0]);
    }
  });

  function handleUploadedFile(file) {
    if (file.type !== 'application/pdf') {
      alert('Simulation Error: Please upload a valid PDF file.');
      return;
    }

    // Insert new version into database list
    const newVersion = {
      version: `v3.1-Draft`,
      date: 'Today',
      label: `Uploaded: ${file.name}`,
      filename: file.name,
      active: true
    };

    // Set other versions inactive
    resumeVersions.forEach(v => v.active = false);
    resumeVersions.unshift(newVersion);

    renderHistory();
    renderResumePreview(file.name);

    // Prompt Toast feedback
    const toast = document.getElementById('submit-toast');
    const toastText = document.getElementById('toast-text');
    toastText.textContent = `Simulation: Resume "${file.name}" uploaded successfully!`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }

  // Print Mechanics (Opens neat print-ready layout)
  printBtn.addEventListener('click', () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>${resumeDetails.name} - Resume</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.4; padding: 30px; color: #111; max-width: 800px; margin: 0 auto; }
            h1 { font-size: 26px; text-align: center; margin-bottom: 5px; text-transform: uppercase; }
            .contact { text-align: center; font-size: 13px; margin-bottom: 20px; border-bottom: 2px solid #333; padding-bottom: 10px; }
            .section { margin-bottom: 20px; }
            .section-title { font-size: 16px; border-bottom: 1px solid #333; font-weight: bold; text-transform: uppercase; margin-bottom: 8px; padding-bottom: 2px; }
            .item { margin-bottom: 10px; }
            .item-header { display: flex; justify-content: space-between; font-weight: bold; font-size: 14px; }
            .item-sub { font-style: italic; color: #444; font-size: 13px; }
            .item-score { font-weight: bold; font-size: 12px; margin-top: 2px; color: #555; }
            ul { margin-top: 4px; padding-left: 20px; margin-bottom: 0; }
            li { font-size: 13px; margin-bottom: 2px; }
            p { font-size: 13px; margin: 0 0 6px 0; }
            .declaration-sig { text-align: right; font-weight: bold; margin-top: 15px; font-size: 13px; }
          </style>
        </head>
        <body>
          <h1>${resumeDetails.name}</h1>
          <div class="contact">
            Email: ${resumeDetails.email} | Mobile: ${resumeDetails.phone} | LinkedIn: ${resumeDetails.linkedin} | Portfolio: ${resumeDetails.portfolio}
          </div>
          
          <div class="section">
            <div class="section-title">Professional Summary</div>
            <p>${resumeDetails.summary}</p>
          </div>

          <div class="section">
            <div class="section-title">Education</div>
            ${resumeDetails.education.map(edu => `
              <div class="item">
                <div class="item-header">
                  <span>${edu.degree}</span>
                  <span>${edu.duration}</span>
                </div>
                <div class="item-sub">${edu.inst}</div>
                <div class="item-score">${edu.score}</div>
              </div>
            `).join('')}
          </div>
          
          <div class="section">
            <div class="section-title">Skills</div>
            <ul>
              ${resumeDetails.skills.map(s => `
                <li><strong>${s.category}:</strong> ${s.items}</li>
              `).join('')}
            </ul>
          </div>

          <div class="section">
            <div class="section-title">Projects</div>
            ${resumeDetails.projects.map(proj => `
              <div class="item">
                <div class="item-header">
                  <span>${proj.title}</span>
                  <span>${proj.duration}</span>
                </div>
                <ul>
                  ${proj.bullets.map(b => `<li>${b}</li>`).join('')}
                </ul>
              </div>
            `).join('')}
          </div>

          <div class="section">
            <div class="section-title">Internships</div>
            ${resumeDetails.internships.map(intern => `
              <div class="item">
                <div class="item-header">
                  <span>${intern.company}</span>
                  <span>${intern.duration}</span>
                </div>
                <div class="item-sub" style="font-weight: bold;">${intern.role}</div>
                <ul>
                  ${intern.bullets.map(b => `<li>${b}</li>`).join('')}
                </ul>
              </div>
            `).join('')}
          </div>

          <div class="section">
            <div class="section-title">Certifications</div>
            <ul>
              ${resumeDetails.certifications.map(cert => `
                <li>${cert}</li>
              `).join('')}
            </ul>
          </div>

          <div class="section">
            <div class="section-title">Leadership & Volunteering</div>
            <ul>
              ${resumeDetails.leadership.map(lead => `
                <li>${lead}</li>
              `).join('')}
            </ul>
          </div>

          <div class="section">
            <div class="section-title">Achievements</div>
            <ul>
              ${resumeDetails.achievements.map(ach => `
                <li>${ach}</li>
              `).join('')}
            </ul>
          </div>

          <div class="section" style="margin-top: 25px;">
            <div class="section-title">Declaration</div>
            <p style="font-style: italic;">I hereby declare that the above information is true and correct to the best of my knowledge and belief.</p>
            <div class="declaration-sig">(Mandagiri.Bhavya)</div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  });

  // Download logic (Triggers static text blob generation representing the CV)
  downloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const activeVersion = resumeVersions.find(v => v.active) || resumeVersions[0];
    const resumeText = `
${resumeDetails.name}
Email: ${resumeDetails.email}
Mobile: ${resumeDetails.phone}
LinkedIn: ${resumeDetails.linkedin}
Portfolio: ${resumeDetails.portfolio}

=========================================
PROFESSIONAL SUMMARY
=========================================
${resumeDetails.summary}

=========================================
EDUCATION
=========================================
${resumeDetails.education.map(edu => `
* ${edu.degree} | ${edu.duration}
  Institution: ${edu.inst}
  Score: ${edu.score}
`).join('\n')}

=========================================
TECHNICAL SKILLS
=========================================
${resumeDetails.skills.map(s => `- ${s.category}: ${s.items}`).join('\n')}

=========================================
PROJECTS
=========================================
${resumeDetails.projects.map(proj => `
* ${proj.title} (${proj.duration})
  ${proj.bullets.map(b => `  - ${b}`).join('\n  ')}
`).join('\n')}

=========================================
INTERNSHIPS
=========================================
${resumeDetails.internships.map(intern => `
* ${intern.company} (${intern.duration})
  Role/Domain: ${intern.role}
  ${intern.bullets.map(b => `  - ${b}`).join('\n  ')}
`).join('\n')}

=========================================
CERTIFICATIONS
=========================================
${resumeDetails.certifications.map(cert => `- ${cert}`).join('\n')}

=========================================
LEADERSHIP & VOLUNTEERING
=========================================
${resumeDetails.leadership.map(lead => `- ${lead}`).join('\n')}

=========================================
ACHIEVEMENTS
=========================================
${resumeDetails.achievements.map(ach => `- ${ach}`).join('\n')}

=========================================
DECLARATION
=========================================
I hereby declare that the above information is true and correct to the best of my knowledge and belief.

(Mandagiri.Bhavya)

Generated via Portfolio Download Engine. Version: ${activeVersion.version}
`;

    const blob = new Blob([resumeText.trim()], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeVersion.filename.replace('.pdf', '.txt');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  // Observe CGPA update event triggers to update resume page values
  const cgpaInputRef = document.getElementById('cgpa-input');
  if (cgpaInputRef) {
    cgpaInputRef.addEventListener('input', () => {
      const activeVersion = resumeVersions.find(v => v.active) || resumeVersions[0];
      renderResumePreview(activeVersion.filename);
    });
  }

  // Initial runs
  renderHistory();
  renderResumePreview();
});
