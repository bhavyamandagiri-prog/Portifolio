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
    { version: 'v2.1', date: 'Jun 2026', label: 'Latest Draft', filename: 'Bhavya_Mandagiri_Resume_v2.1.pdf', active: true },
    { version: 'v2.0', date: 'Jan 2026', label: 'Placement Ready', filename: 'Bhavya_Mandagiri_Resume_v2.0.pdf', active: false },
    { version: 'v1.2', date: 'Aug 2025', label: 'Internship Core', filename: 'Bhavya_Mandagiri_Resume_v1.2.pdf', active: false }
  ];

  // Resume Details Map (Verified Contents Only)
  const resumeDetails = {
    name: 'Bhavya Mandagiri',
    tagline: 'VLSI Developer | Full Webstack Developer | AI Enthusiast',
    email: 'bhavya.mandagiri.ece@gmail.com',
    phone: '+91 XXXXX XXXXX',
    location: 'Andhra Pradesh, India',
    github: 'github.com/bhavyamandagiri',
    linkedin: 'linkedin.com/in/bhavya-mandagiri-106ba02b5',
    education: [
      { degree: 'B.Tech in Electronics & Communication Engineering', inst: 'Andhra Loyola Institute of Engineering and Technology (ALIET)', duration: '2023 - 2027', cgpa: '8.06 / 10.0' }
    ],
    skills: {
      languages: 'Verilog HDL, Python, JavaScript, SQL, HTML5, CSS3, C/C++',
      frameworks: 'React.js, Node.js, Express, TensorFlow, Flask, OpenCV',
      protocols: 'VLSI DFT, UART, SPI, I2C',
      tools: 'Xilinx Vivado, LTSpice, Git, VS Code, MongoDB'
    },
    experience: [
      { role: 'VLSI DFT (Design for Testability) Intern', company: 'BIST Technologies Pvt. Ltd. (Offline Industrial Internship)', duration: 'May 2025 - July 2025', bullets: [
        'Completed a 2-month industrial internship focused on Design for Testability (DFT) in VLSI.',
        'Gained practical exposure to industry workflows and testing methodologies.',
        'Understood real-time semiconductor testing concepts and verification processes.'
      ]}
    ]
  };

  // Render mock resume preview in HTML
  function renderResumePreview(selectedFilename = resumeVersions[0].filename) {
    const cgpaVal = document.getElementById('cgpa-input')?.value || '8.06';
    
    previewBody.innerHTML = `
      <div class="resume-mock">
        <div class="resume-mock-header">
          <h1 class="resume-mock-name">${resumeDetails.name}</h1>
          <p class="resume-mock-contact">
            ${resumeDetails.location} | ${resumeDetails.email} | ${resumeDetails.linkedin} | ${resumeDetails.github}
          </p>
          <p style="font-size:0.75rem; color:var(--accent-cyan); font-weight:600; margin-top:5px; font-family:monospace;">
            Selected File: ${selectedFilename}
          </p>
        </div>

        <div class="resume-mock-section">
          <h2 class="resume-mock-section-title">Professional Summary</h2>
          <p style="font-size: 0.85rem; line-height:1.4;">
            Highly motivated B.Tech Electronics & Communication Engineering student with practical design insights spanning both microcircuit level architectures and scalable web frameworks. Adept at interfacing hardware telemetry layers with premium responsive applications.
          </p>
        </div>

        <div class="resume-mock-section">
          <h2 class="resume-mock-section-title">Education</h2>
          ${resumeDetails.education.map(edu => `
            <div class="resume-mock-item">
              <div class="resume-mock-item-header">
                <span>${edu.degree}</span>
                <span>${edu.duration}</span>
              </div>
              <div class="resume-mock-item-sub">${edu.inst}</div>
              <div style="font-size:0.8rem; font-weight:600; color: var(--accent-cyan); margin-top:2px;">Cumulative Score: ${cgpaVal} / 10.00 CGPA</div>
            </div>
          `).join('')}
        </div>

        <div class="resume-mock-section">
          <h2 class="resume-mock-section-title">Technical Competence</h2>
          <p style="font-size:0.8rem; margin-bottom:5px;"><strong>Languages:</strong> ${resumeDetails.skills.languages}</p>
          <p style="font-size:0.8rem; margin-bottom:5px;"><strong>Frameworks & Libs:</strong> ${resumeDetails.skills.frameworks}</p>
          <p style="font-size:0.8rem; margin-bottom:5px;"><strong>Hardware Interfaces:</strong> ${resumeDetails.skills.protocols}</p>
          <p style="font-size:0.8rem;"><strong>EDA & Tools:</strong> ${resumeDetails.skills.tools}</p>
        </div>

        <div class="resume-mock-section">
          <h2 class="resume-mock-section-title">Experience & Internships</h2>
          ${resumeDetails.experience.map(exp => `
            <div class="resume-mock-item">
              <div class="resume-mock-item-header">
                <span>${exp.role}</span>
                <span>${exp.duration}</span>
              </div>
              <div class="resume-mock-item-sub">${exp.company}</div>
              <ul style="padding-left:15px; margin-top:5px;">
                ${exp.bullets.map(b => `<li class="resume-mock-bullet">${b}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
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
      version: `v2.2-Draft`,
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
    const cgpaVal = document.getElementById('cgpa-input')?.value || '8.06';
    printWindow.document.write(`
      <html>
        <head>
          <title>Bhavya Mandagiri - Resume</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.5; padding: 40px; color: #333; }
            h1 { font-size: 28px; text-align: center; margin-bottom: 5px; }
            .contact { text-align: center; font-size: 14px; margin-bottom: 30px; border-bottom: 2px solid #555; padding-bottom: 10px; }
            .section { margin-bottom: 25px; }
            .section-title { font-size: 18px; border-bottom: 1px solid #ccc; font-weight: bold; text-transform: uppercase; margin-bottom: 10px; padding-bottom: 3px; }
            .item { margin-bottom: 12px; }
            .item-header { display: flex; justify-content: space-between; font-weight: bold; }
            .item-sub { font-style: italic; color: #555; }
            ul { margin-top: 5px; padding-left: 20px; }
            li { font-size: 14px; }
            p { font-size: 14px; }
          </style>
        </head>
        <body>
          <h1>${resumeDetails.name}</h1>
          <div class="contact">
            ${resumeDetails.location} | ${resumeDetails.email} | ${resumeDetails.linkedin} | ${resumeDetails.github}
          </div>
          
          <div class="section">
            <div class="section-title">Education</div>
            <div class="item">
              <div class="item-header">
                <span>B.Tech in Electronics & Communication Engineering</span>
                <span>2023 - 2027</span>
              </div>
              <div class="item-sub">Andhra Loyola Institute of Engineering and Technology (ALIET)</div>
              <div style="font-weight:bold; margin-top:2px;">Cumulative Score: ${cgpaVal} / 10.00 CGPA</div>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Skills</div>
            <p><strong>Languages:</strong> ${resumeDetails.skills.languages}</p>
            <p><strong>Frameworks:</strong> ${resumeDetails.skills.frameworks}</p>
            <p><strong>Protocols:</strong> ${resumeDetails.skills.protocols}</p>
            <p><strong>Tools:</strong> ${resumeDetails.skills.tools}</p>
          </div>

          <div class="section">
            <div class="section-title">Projects & Experience</div>
            ${resumeDetails.experience.map(exp => `
              <div class="item">
                <div class="item-header">
                  <span>${exp.role}</span>
                  <span>${exp.duration}</span>
                </div>
                <div class="item-sub">${exp.company}</div>
                <ul>
                  ${exp.bullets.map(b => `<li>${b}</li>`).join('')}
                </ul>
              </div>
            `).join('')}
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
    const cgpaVal = document.getElementById('cgpa-input')?.value || '8.06';
    const activeVersion = resumeVersions.find(v => v.active) || resumeVersions[0];
    const resumeText = `
BHAVYA MANDAGIRI
Email: ${resumeDetails.email}
LinkedIn: ${resumeDetails.linkedin}
GitHub: ${resumeDetails.github}

EDUCATION:
B.Tech in Electronics & Communication Engineering
Andhra Loyola Institute of Engineering and Technology (ALIET) | 2023 - 2027
Cumulative GPA: ${cgpaVal} / 10.00 CGPA

TECHNICAL SKILLS:
- Languages: ${resumeDetails.skills.languages}
- Frameworks: ${resumeDetails.skills.frameworks}
- Core Protocols: ${resumeDetails.skills.protocols}
- Tools: ${resumeDetails.skills.tools}

PROJECTS & EXPERIENCE:
${resumeDetails.experience.map(exp => `
* ${exp.role} | ${exp.company} | ${exp.duration}
  ${exp.bullets.map(b => `- ${b}`).join('\n  ')}
`).join('\n')}

Generated via Portfolio Download Engine. Version: ${activeVersion.version}
`;

    const blob = new Blob([resumeText], { type: 'text/plain' });
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
