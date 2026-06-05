/* ==========================================================================
   CONTACT FORM VALIDATION - Bhavya Mandagiri's Portfolio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const subjectInput = document.getElementById('form-subject');
  const messageInput = document.getElementById('form-message');
  const toast = document.getElementById('submit-toast');
  const toastText = document.getElementById('toast-text');

  // Input Validation Rules
  function validateName() {
    const value = nameInput.value.trim();
    const isValid = value.length >= 3;
    toggleError(nameInput, isValid);
    return isValid;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    // Standard email expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(value);
    toggleError(emailInput, isValid);
    return isValid;
  }

  function validateSubject() {
    const value = subjectInput.value.trim();
    const isValid = value.length > 0;
    toggleError(subjectInput, isValid);
    return isValid;
  }

  function validateMessage() {
    const value = messageInput.value.trim();
    const isValid = value.length >= 10;
    toggleError(messageInput, isValid);
    return isValid;
  }

  function toggleError(inputElement, isValid) {
    const group = inputElement.closest('.form-group');
    if (isValid) {
      group.classList.remove('invalid');
    } else {
      group.classList.add('invalid');
    }
  }

  // Real-time Validation Triggers
  nameInput.addEventListener('input', validateName);
  emailInput.addEventListener('input', validateEmail);
  subjectInput.addEventListener('input', validateSubject);
  messageInput.addEventListener('input', validateMessage);

  // Form Submission
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Trigger all validations
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isSubjectValid = validateSubject();
    const isMessageValid = validateMessage();

    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalContent = submitBtn.innerHTML;
      
      // Simulate network request loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i data-lucide="loader" class="animate-spin" style="animation: spin 1s linear infinite;"></i> Processing Secure Packet...';
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }

      setTimeout(() => {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }

        // Display success Toast
        toastText.textContent = `Thank you, ${nameInput.value.split(' ')[0]}! Your message has been sent.`;
        toast.classList.add('show');

        // Clear Form inputs
        contactForm.reset();
        
        // Clear success toast after 4s
        setTimeout(() => {
          toast.classList.remove('show');
        }, 4000);

      }, 1500);
    }
  });

  // Adding css keyframes for spin dynamically if not present
  if (!document.getElementById('spin-style-block')) {
    const style = document.createElement('style');
    style.id = 'spin-style-block';
    style.innerHTML = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .animate-spin {
        display: inline-block;
        vertical-align: middle;
      }
    `;
    document.head.appendChild(style);
  }
});
