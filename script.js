// Simple client-side validation and UX feedback
(function() {
  const form = document.getElementById('sponsorForm');
  const status = document.getElementById('formStatus');

  // Basic field error helper
  function showError(field, message) {
    const errorEl = field.parentElement.querySelector('.error');
    if (errorEl) errorEl.textContent = message;
    field.setAttribute('aria-invalid', 'true');
  }

  function clearError(field) {
    const errorEl = field.parentElement.querySelector('.error');
    if (errorEl) errorEl.textContent = '';
    field.removeAttribute('aria-invalid');
  }

  // Clear errors on input
  form.addEventListener('input', (e) => {
    if (e.target.closest('.field')) {
      clearError(e.target);
    }
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Reset status
    status.textContent = '';
    let valid = true;

    // Name
    const name = document.getElementById('name');
    if (!name.value.trim()) {
      showError(name, 'Please enter a sponsor name.');
      valid = false;
    }

    // Email
    const email = document.getElementById('email');
    if (!email.value.trim()) {
      showError(email, 'Please enter an email address.');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      showError(email, 'Please enter a valid email address.');
      valid = false;
    }

    // Level
    const level = document.getElementById('level');
    if (!level.value) {
      showError(level, 'Please select a sponsorship level.');
      valid = false;
    }

    // Agreement
    const agree = document.getElementById('agree');
    if (!agree.checked) {
      showError(agree, 'You must agree to the terms.');
      valid = false;
    } else {
      // Clear any lingering error style on the checkbox label
      const errorLabel = agree.parentElement.querySelector('.error');
      if (errorLabel) errorLabel.textContent = '';
    }

    if (!valid) {
      status.textContent = 'Please fix the highlighted fields and submit again.';
      status.style.color = '#ffb86c';
      return;
    }

    // If desired, here you would send data to a server with fetch/AJAX.
    // Example (pseudo):
    // const formData = new FormData(form);
    // fetch('/api/sponsorship', { method: 'POST', body: formData }).then(...);

    // Simulated successful submission
    status.style.color = '#4ade80';
    status.textContent = 'Thank you! Your sponsorship request has been submitted.';
    form.reset();
  });
})();