// ===== Mobile nav toggle =====
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  // ===== Contact form validation =====
  const form = document.getElementById('contact-form');
  if (form) {
    const status = document.getElementById('form-status');

    const validators = {
      name: (v) => v.trim().length >= 2 || 'Please enter your name.',
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Please enter a valid email address.',
      service: (v) => v !== '' || 'Please select a service.',
      message: (v) => v.trim().length >= 10 || 'Please enter at least 10 characters.',
    };

    const showError = (field, msg) => {
      const wrapper = field.closest('.field');
      wrapper.classList.add('error');
      wrapper.querySelector('.error-msg').textContent = msg;
    };
    const clearError = (field) => {
      const wrapper = field.closest('.field');
      wrapper.classList.remove('error');
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      let valid = true;

      Object.keys(validators).forEach((name) => {
        const field = form.elements[name];
        if (!field) return;
        const result = validators[name](field.value);
        if (result !== true) {
          showError(field, result);
          valid = false;
        } else {
          clearError(field);
        }
      });

      status.className = 'form-status';
      if (!valid) {
        status.textContent = 'Please fix the highlighted fields and try again.';
        status.classList.add('error');
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });

        if (response.ok) {
          status.textContent = "Thanks! Your message has been received. We'll be in touch shortly.";
          status.classList.add('success');
          form.reset();
        } else {
          status.textContent = 'Something went wrong sending your message. Please try again or email us directly.';
          status.classList.add('error');
        }
      } catch (err) {
        status.textContent = 'Something went wrong sending your message. Please try again or email us directly.';
        status.classList.add('error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }
    });

    Object.keys(validators).forEach((name) => {
      const field = form.elements[name];
      if (field) field.addEventListener('input', () => clearError(field));
    });
  }

  // ===== Footer year =====
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
