/* ==========================================================================
   ACADEMIC DASHBOARD LOGIC - Bhavya Mandagiri's Portfolio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const cgpaInput = document.getElementById('cgpa-input');
  const cgpaGauge = document.getElementById('cgpa-gauge');
  const semesterList = document.getElementById('semester-list');

  // Semester data store (5 semesters completed, matching the user's CGPA record of 8.00)
  const semesters = [
    { name: 'Semester 1', desc: 'Basics of ECE & Applied Physics', gpa: 7.90 },
    { name: 'Semester 2', desc: 'Network Analysis & Logic Design', gpa: 8.00 },
    { name: 'Semester 3', desc: 'Electronic Devices & Signals', gpa: 8.00 },
    { name: 'Semester 4', desc: 'Analog Circuits & EM Waves', gpa: 8.00 },
    { name: 'Semester 5', desc: 'Microcontrollers & Control Systems', gpa: 8.10 },
    { name: 'Semester 6', desc: 'VLSI Design & Digital Signal Processing (Planned)', gpa: 0.00, active: false },
    { name: 'Semester 7', desc: 'AI/ML Applications & IoT (Planned)', gpa: 0.00, active: false },
    { name: 'Semester 8', desc: 'Project Work & Technical Seminars (Planned)', gpa: 0.00, active: false }
  ];

  // Circle path circumference: 2 * Math.PI * 84 = ~527.7
  const circumference = 527.7;

  // Render Semester Cards
  function renderSemesters() {
    semesterList.innerHTML = '';
    semesters.forEach(sem => {
      const card = document.createElement('div');
      card.className = 'semester-card';
      
      const details = document.createElement('div');
      const title = document.createElement('span');
      title.className = 'sem-title';
      title.textContent = sem.name;
      
      const desc = document.createElement('div');
      desc.className = 'sem-desc';
      desc.textContent = sem.desc;
      
      details.appendChild(title);
      details.appendChild(desc);
      
      const gpa = document.createElement('span');
      gpa.className = 'sem-gpa';
      gpa.textContent = sem.gpa > 0 ? sem.gpa.toFixed(2) : 'N/A';
      
      card.appendChild(details);
      card.appendChild(gpa);
      semesterList.appendChild(card);
    });
  }

  // Update SVG Gauge
  function updateGauge(cgpa) {
    // Keep between bounds
    let val = Math.max(0, Math.min(10, cgpa));
    
    // Calculate offset percentage
    const offset = circumference - (val / 10) * circumference;
    cgpaGauge.style.strokeDashoffset = offset;
  }

  // Handle Input Changes
  cgpaInput.addEventListener('input', (e) => {
    let value = parseFloat(e.target.value);
    
    if (isNaN(value)) {
      return;
    }
 
    if (value > 10) {
      value = 10;
      cgpaInput.value = 10;
    } else if (value < 0) {
      value = 0;
      cgpaInput.value = 0;
    }

    updateGauge(value);
    
    // 5 semesters are completed. Let's adjust them.
    const activeSemestersCount = 5;
    const currentSum = value * activeSemestersCount;
    
    // Distribute with slight randomized variation
    let accumulated = 0;
    for (let i = 0; i < activeSemestersCount - 1; i++) {
      // Calculate a randomized weight
      const variance = (Math.random() - 0.5) * 0.4;
      let semGpa = value + variance;
      semGpa = Math.max(5.0, Math.min(10.0, semGpa));
      semesters[i].gpa = parseFloat(semGpa.toFixed(2));
      accumulated += semesters[i].gpa;
    }
    // Set the last semester to make the average perfectly correct
    let lastSemGpa = currentSum - accumulated;
    lastSemGpa = Math.max(5.0, Math.min(10.0, lastSemGpa));
    semesters[activeSemestersCount - 1].gpa = parseFloat(lastSemGpa.toFixed(2));

    renderSemesters();

    // Dynamically update Core Subject Progress bars relative to CGPA changes
    const subjects = document.querySelectorAll('.subject-item');
    subjects.forEach((subject, index) => {
      const bar = subject.querySelector('.subject-progress-bar');
      // Scaled factor depending on GPA value
      const factor = Math.min(100, Math.max(50, (value / 10) * 100 + (index * 2 - 3)));
      bar.style.width = `${factor}%`;
    });
  });

  // Handle blur validation
  cgpaInput.addEventListener('blur', () => {
    if (cgpaInput.value === '') {
      cgpaInput.value = "8.00";
      updateGauge(8.00);
      // Reset values
      semesters[0].gpa = 7.90;
      semesters[1].gpa = 8.00;
      semesters[2].gpa = 8.00;
      semesters[3].gpa = 8.00;
      semesters[4].gpa = 8.10;
      renderSemesters();
    }
  });

  // Initial Run
  renderSemesters();
  updateGauge(8.00);
});
