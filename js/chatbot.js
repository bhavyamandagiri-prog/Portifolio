/* ==========================================================================
   AI CHATBOT LOGIC - Bhavya Mandagiri's Portfolio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('chatbot-toggle');
  const chatBox = document.getElementById('chatbot-box');
  const closeBtn = document.getElementById('chatbot-close-btn');
  const messagesLog = document.getElementById('chatbot-messages-log');
  const chatForm = document.getElementById('chatbot-form');
  const inputField = document.getElementById('chatbot-input-field');
  const suggestionBtns = document.querySelectorAll('.suggest-btn');

  let hasGreeted = false;

  // Toggle Chat Box
  toggleBtn.addEventListener('click', () => {
    chatBox.classList.toggle('active');
    if (chatBox.classList.contains('active') && !hasGreeted) {
      triggerInitialGreeting();
    }
  });

  // Toggle Chat Box from System Card COMMS button
  const systemCommsBtn = document.getElementById('system-comms-btn');
  if (systemCommsBtn) {
    systemCommsBtn.addEventListener('click', () => {
      chatBox.classList.add('active');
      if (!hasGreeted) {
        triggerInitialGreeting();
      }
    });
  }

  closeBtn.addEventListener('click', () => {
    chatBox.classList.remove('active');
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && chatBox.classList.contains('active')) {
      chatBox.classList.remove('active');
    }
  });

  // Initial greeting message
  function triggerInitialGreeting() {
    hasGreeted = true;
    showTypingIndicator();
    
    setTimeout(() => {
      removeTypingIndicator();
      addMessage('bot', "Hello! I'm Bhavya's Portfolio Assistant. Feel free to ask me questions regarding his ECE background, technical project competencies, academic score indices, or contact links. Select a suggestion button below or write in the chat bar!");
    }, 1200);
  }

  // Suggestion buttons click handler
  suggestionBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const query = e.target.dataset.query;
      const text = e.target.textContent;
      
      // Post user message
      addMessage('user', text);
      
      // Process query
      respondToQuery(query);
    });
  });

  // Text Form Submission
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const queryText = inputField.value.trim();
    if (!queryText) return;

    addMessage('user', queryText);
    inputField.value = '';

    // Match keywords to decide answer
    respondToText(queryText.toLowerCase());
  });

  // Answer matching logic for custom text
  function respondToText(text) {
    showTypingIndicator();

    let reply = "";

    if (text.includes('skills') || text.includes('tech') || text.includes('language') || text.includes('code') || text.includes('framework')) {
      reply = "Bhavya is skilled in:\n- **VLSI Design:** Verilog HDL, Xilinx Vivado, VLSI DFT (Design for Testability), LTSpice, protocols (UART/SPI/I2C).\n- **Full Stack Development:** JavaScript (ES6+), React.js, Node.js, Express, MongoDB, SQL, HTML5/CSS3, Next.js.\n- **AI & ML:** Python, TensorFlow, Flask, OpenCV, CNN models, and Data Analysis.\n- **Database & App Dev:** Firebase, Firestore, React Native, Expo.";
    } else if (text.includes('project') || text.includes('healthcare') || text.includes('system') || text.includes('patient') || text.includes('attendance') || text.includes('curriculum') || text.includes('sign') || text.includes('signnovate')) {
      reply = "Key projects include:\n1. **Green Tech AI Healthcare & Monitoring System:** Python/OpenCV/CNN system providing medicine alerts and vitals tracking.\n2. **Smart Curriculum & Attendance App (EduVino):** Face recognition attendance & student analytics.\n3. **Patient Health Monitoring System:** Arduino-based remote vital telemetry unit.\n4. **Signnovate:** SIH 2024 Indian Sign Language translation prototype using deep learning.";
    } else if (text.includes('timeline') || text.includes('activities') || text.includes('milestone') || text.includes('history')) {
      reply = "Key milestones on Bhavya's timeline include:\n- **2023 - Present:** B.Tech, Electronics & Communication Engineering at Andhra Loyola Institute of Engineering and Technology (ALIET).\n- **May - July 2025:** VLSI DFT Intern at BIST Technologies Pvt. Ltd.\n- **May - June 2026:** Embedded Systems Intern at TechLogic IT Solutions Pvt. Ltd.\n- **Certifications:** NPTEL AI & IoT, Infosys Python, APSSDC PCB Design, Reliance Drone Developer.";
    } else if (text.includes('experience') || text.includes('internship') || text.includes('work') || text.includes('job') || text.includes('career')) {
      reply = "Bhavya has completed two key internships:\n1. **VLSI DFT Intern** at BIST Technologies Pvt. Ltd. (May - July 2025)\n2. **Embedded Systems Intern** at TechLogic IT Solutions Pvt. Ltd. (May - June 2026)\n\nFor Placements/Internships, you can contact her directly at **bhavyamandagiri@gmail.com**.";
    } else if (text.includes('gpa') || text.includes('cgpa') || text.includes('grade') || text.includes('academics') || text.includes('marks') || text.includes('college') || text.includes('education') || text.includes('study') || text.includes('degree')) {
      reply = "Bhavya is currently studying B.Tech ECE at **Andhra Loyola Institute of Engineering and Technology (ALIET)** (JNTUK affiliated) with a cumulative score of **8.0/10.0 CGPA** and zero backlogs.";
    } else if (text.includes('hire') || text.includes('contact') || text.includes('email') || text.includes('linkedin') || text.includes('resume')) {
      reply = "You can contact Bhavya directly at **bhavyamandagiri@gmail.com**. Her LinkedIn profile is linkedin.com/in/bhavya-mandagiri-106ba02b5 and GitHub is github.com/bhavyamandagiri.";
    } else if (text.includes('hi') || text.includes('hello') || text.includes('hey')) {
      reply = "Hello there! How can I assist you with evaluating Bhavya's profile today?";
    } else {
      reply = "That's an interesting question! I am best optimized to answer queries regarding Bhavya's ECE training, verified projects, skills, or contact channels. Feel free to try another query or click the quick suggestions!";
    }

    setTimeout(() => {
      removeTypingIndicator();
      addMessage('bot', reply);
    }, 1000);
  }

  // Answer matching logic for pre-made queries
  function respondToQuery(query) {
    showTypingIndicator();
    let reply = "";

    switch(query) {
      case 'skills':
        reply = "Bhavya's engineering skillset includes:\n- **VLSI Design:** Verilog HDL, Xilinx Vivado, VLSI DFT, LTSpice, SPI/I2C/UART protocols.\n- **Full Stack Development:** JavaScript (ES6+), React.js, Node.js, Express, MongoDB, SQL, HTML5/CSS3, Next.js.\n- **AI & ML:** Python, TensorFlow, Flask, OpenCV, CNN models, and Data Analysis.\n- **Database & App Dev:** Firebase, Firestore, React Native, Expo.";
        break;
      case 'projects':
        reply = "Bhavya's verified projects include:\n- **Green Tech AI Healthcare & Monitoring System** (Python, CNN, OpenCV, Telemetry)\n- **Smart Curriculum & Attendance App (EduVino)** (Face recognition & analytics)\n- **Patient Health Monitoring System** (Arduino, ECG/Temp telemetry)\n- **Signnovate** (Indian Sign Language SIH 2024 deep learning translator)";
        break;
      case 'contact':
        reply = "Here are Bhavya's contact details:\n- **Email:** bhavyamandagiri@gmail.com\n- **LinkedIn:** linkedin.com/in/bhavya-mandagiri-106ba02b5\n- **GitHub:** github.com/bhavyamandagiri\nShe is open to tech internships and placements!";
        break;
      case 'timeline':
        reply = "Key milestones on Bhavya's timeline include:\n- **2023 - Present:** B.Tech, Electronics & Communication Engineering at Andhra Loyola Institute of Engineering and Technology (ALIET).\n- **May - July 2025:** VLSI DFT Intern at BIST Technologies Pvt. Ltd.\n- **May - June 2026:** Embedded Systems Intern at TechLogic IT Solutions Pvt. Ltd.\n- **Certifications:** NPTEL AI & IoT, Infosys Python, APSSDC PCB Design, Reliance Drone Developer.";
        break;
      default:
        reply = "How can I help you learn more about Bhavya's academic background?";
    }

    setTimeout(() => {
      removeTypingIndicator();
      addMessage('bot', reply);
    }, 1000);
  }

  // Helper: Append chat bubble
  function addMessage(sender, text) {
    const msgElement = document.createElement('div');
    msgElement.className = `chat-msg ${sender}`;
    
    // Parse markdown-like bullets if present
    if (text.includes('\n')) {
      const parsedText = text.split('\n').map(line => {
        if (line.startsWith('- ') || line.startsWith('* ')) {
          return `<li>${line.slice(2)}</li>`;
        }
        return `<p>${line}</p>`;
      }).join('');
      msgElement.innerHTML = parsedText;
    } else {
      msgElement.textContent = text;
    }
    
    messagesLog.appendChild(msgElement);
    scrollToBottom();
  }

  // Helper: Show typing bubble
  function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'chat-msg bot chat-typing';
    indicator.id = 'chat-typing-indicator';
    indicator.innerHTML = '<span></span><span></span><span></span>';
    messagesLog.appendChild(indicator);
    scrollToBottom();
  }

  // Helper: Remove typing bubble
  function removeTypingIndicator() {
    const indicator = document.getElementById('chat-typing-indicator');
    if (indicator) {
      messagesLog.removeChild(indicator);
    }
  }

  // Helper: Auto Scroll Message view
  function scrollToBottom() {
    messagesLog.scrollTop = messagesLog.scrollHeight;
  }
});
