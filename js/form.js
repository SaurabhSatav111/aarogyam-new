document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.appt-form');
  const successBanner = document.querySelector('.success-banner');

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
        
        // Construct mailto link data as fallback/submission option
        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        const dept = deptInput.value;
        const doc = docInput.value;
        const msgInput = form.querySelector('#appt-msg');
        const msg = msgInput ? msgInput.value.trim() : '';

        console.log('Form Submitted successfully:', { name, phone, dept, doc, msg });

        // Show Success Banner
        if (successBanner) {
          successBanner.textContent = 'Appointment request submitted successfully! We will contact you shortly to confirm.';
          successBanner.style.display = 'block';
          
          // Scroll form card into view if needed
          successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Reset the form
        form.reset();
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
