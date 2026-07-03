document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.appt-form');
  const successBanner = document.querySelector('.success-banner');

  // Enforce 10-digit limit on phone input
  const phoneInputs = document.querySelectorAll('#appt-phone');
  phoneInputs.forEach(phoneInput => {
    phoneInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
    });
  });

  // Urgency button toggling logic (if present on the page)
  const urgencyButtons = document.querySelectorAll('.urgency-btn');
  const urgencyInput = document.querySelector('#appt-urgency');
  if (urgencyButtons.length > 0 && urgencyInput) {
    urgencyButtons.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        urgencyButtons.forEach(b => b.classList.remove('sel'));
        this.classList.add('sel');
        urgencyInput.value = this.getAttribute('data-value');
      });
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Clear previous success banner and error states
      if (successBanner) {
        successBanner.style.display = 'none';
      }
      
      const errorMsgs = form.querySelectorAll('.error-message');
      errorMsgs.forEach(msg => msg.remove());
      
      const formControls = form.querySelectorAll('.form-control');
      formControls.forEach(ctrl => ctrl.classList.remove('error'));

      let hasErrors = false;

      // Validate Name
      const nameInput = form.querySelector('#appt-name');
      if (nameInput && nameInput.value.trim() === '') {
        showError(nameInput, 'Name is required');
        hasErrors = true;
      }

      // Validate Phone (Exactly 10 digits)
      const phoneInput = form.querySelector('#appt-phone');
      if (phoneInput) {
        const phoneVal = phoneInput.value.trim();
        if (phoneVal === '') {
          showError(phoneInput, 'Phone number is required');
          hasErrors = true;
        } else if (!/^\d{10}$/.test(phoneVal)) {
          showError(phoneInput, 'Phone number must be exactly 10 digits');
          hasErrors = true;
        }
      }

      // Validate Email (if present)
      const emailInput = form.querySelector('#appt-email');
      if (emailInput) {
        const emailVal = emailInput.value.trim();
        if (emailVal === '') {
          showError(emailInput, 'Email address is required');
          hasErrors = true;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
          showError(emailInput, 'Please enter a valid email address');
          hasErrors = true;
        }
      }

      // Validate Department
      const deptInput = form.querySelector('#appt-dept');
      if (deptInput && deptInput.value === '') {
        showError(deptInput, 'Please select a department');
        hasErrors = true;
      }

      // Validate Doctor
      const docInput = form.querySelector('#appt-doctor');
      if (docInput && docInput.value === '') {
        showError(docInput, 'Please select a preferred doctor');
        hasErrors = true;
      }

      if (!hasErrors) {
        // Form is valid!
        
        // Construct submission data
        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        const email = emailInput ? emailInput.value.trim() : 'N/A';
        const dept = deptInput.value;
        const doc = docInput.value;
        const urgency = urgencyInput ? urgencyInput.value : 'Routine';
        const msgInput = form.querySelector('#appt-msg');
        const msg = msgInput ? msgInput.value.trim() : '';

        console.log('Form Submitted successfully:', { name, phone, email, dept, doc, urgency, msg });

        // Show Success Banner
        if (successBanner) {
          successBanner.textContent = 'Appointment request submitted successfully! We will contact you shortly to confirm.';
          successBanner.style.display = 'block';
          
          // Scroll form card into view if needed
          successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Reset the form
        form.reset();
        
        // Restore default urgency selection after reset
        if (urgencyButtons.length > 0 && urgencyInput) {
          urgencyButtons.forEach(b => b.classList.remove('sel'));
          const defaultBtn = document.querySelector('.urgency-btn[data-value="Routine"]');
          if (defaultBtn) {
            defaultBtn.classList.add('sel');
          }
          urgencyInput.value = 'Routine';
        }
      }
    });
  }

  // Helper function to render error message below inputs
  function showError(inputElement, message) {
    inputElement.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    // Insert error message after the input field
    inputElement.parentNode.appendChild(errorDiv);
  }
});
