(function() {
  const form = document.getElementById('feedback-form');
  const statusEl = document.getElementById('status');
  const clearBtn = document.getElementById('clear-btn');
  const savedSection = document.getElementById('saved-feedback');
  const feedbackList = document.getElementById('feedback-list');

  // Load existing submissions from localStorage
  function loadSubmissions() {
    const raw = localStorage.getItem('collegeFeedbackSubmissions');
    try {
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  // Save submissions to localStorage
  function saveSubmissions(items) {
    localStorage.setItem('collegeFeedbackSubmissions', JSON.stringify(items));
  }

  function renderSubmissions() {
    const items = loadSubmissions();
    if (items.length === 0) {
      savedSection.hidden = true;
      feedbackList.innerHTML = '';
      return;
    }
    savedSection.hidden = false;
    feedbackList.innerHTML = '';
    items.forEach((it, idx) => {
      const li = document.createElement('li');
      li.textContent = `${idx + 1}. ${it.courseName} — ${it.instructorName} (Rating: ${it.courseRating || 'N/A'})`;
      feedbackList.appendChild(li);
    });
  }

  // Pre-fill with a sample if empty (optional)
  // renderSubmissions();

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Basic validation
    const formData = new FormData(form);
    const courseRating = form.querySelector('input[name="courseRating"]:checked');
    if (!courseRating) {
      showStatus('Please select a course rating.', 'warn');
      return;
    }

    const submission = {
      studentName: formData.get('studentName')?.trim(),
      studentId: formData.get('studentId')?.trim(),
      courseName: formData.get('courseName')?.trim(),
      instructorName: formData.get('instructorName')?.trim(),
      courseRating: courseRating.value,
      courseContent: formData.get('courseContent')?.trim(),
      instructorContent: formData.get('instructorContent')?.trim(),
      instructorSuggestions: formData.get('instructorSuggestions')?.trim(),
      additionalComments: formData.get('additionalComments')?.trim(),
      submittedAt: new Date().toISOString()
    };

    const items = loadSubmissions();
    items.unshift(submission); // newest first
    saveSubmissions(items);
    showStatus('Feedback submitted. Thank you!', 'ok');
    form.reset();
    renderSubmissions();
  });

  clearBtn.addEventListener('click', function() {
    if (confirm('Clear all saved submissions? This cannot be undone.')) {
      localStorage.removeItem('collegeFeedbackSubmissions');
      renderSubmissions();
      showStatus('Cleared all saved submissions.', 'ok');
    }
  });

  function showStatus(message, type = 'info') {
    statusEl.textContent = message;
    statusEl.hidden = false;
    statusEl.style.borderColor = '#e5e7eb';
    statusEl.style.background = '#fff';
    if (type === 'ok') {
      statusEl.style.color = '#065f46';
    } else if (type === 'warn') {
      statusEl.style.color = '#7c2d12';
    } else {
      statusEl.style.color = '';
    }
    setTimeout(() => { statusEl.hidden = true; }, 4000);
  }

  // Initialize
  renderSubmissions();
})();