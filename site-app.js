import { api } from './backend/api.js';

const form = document.querySelector('.form');
const submit = form?.querySelector('.submit');

function fieldValue(selector) {
  return form?.querySelector(selector)?.value?.trim() || '';
}

async function track(event, extra = {}) {
  try {
    await fetch('/api/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, ...extra })
    });
  } catch (_) {}
}

if (form) {
  form.addEventListener('focusin', () => track('enquiry_open', { section: 'contact' }), { once: true });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const original = submit?.textContent;
    if (submit) {
      submit.disabled = true;
      submit.textContent = 'Sending…';
    }

    const inputs = [...form.querySelectorAll('input,select,textarea')];
    const [name, phone, email, location, propertyType, budget, message] = inputs.map(el => el.value?.trim() || '');

    try {
      const response = await api.enquiry({ name, phone, email, location, propertyType, budget, message, project: '' });
      form.reset();
      if (submit) submit.textContent = 'Enquiry received';
      await track('enquiry_submit', { section: 'contact' });
      const status = document.createElement('p');
      status.className = 'form-status';
      status.setAttribute('role', 'status');
      status.textContent = response.message || 'Thank you. Your enquiry has been received.';
      form.append(status);
      setTimeout(() => status.remove(), 6000);
    } catch (error) {
      if (submit) submit.textContent = 'Try again';
      const status = document.createElement('p');
      status.className = 'form-status';
      status.setAttribute('role', 'alert');
      status.textContent = error.message || 'Unable to send your enquiry right now.';
      form.append(status);
      setTimeout(() => status.remove(), 6000);
    } finally {
      setTimeout(() => {
        if (submit) {
          submit.disabled = false;
          submit.textContent = original || 'Request a callback';
        }
      }, 1800);
    }
  });
}

document.querySelectorAll('.marker').forEach(marker => {
  marker.addEventListener('click', () => track('project_map_click', { project: marker.dataset.name || '' }));
});

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    const name = card.querySelector('h3')?.textContent?.trim() || '';
    track('project_view', { project: name, section: 'portfolio' });
  });
});

const observed = new Set();
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting || observed.has(entry.target)) return;
    observed.add(entry.target);
    if (entry.target.id === 'lifestyle') track('lifestyle_view', { section: 'lifestyle' });
    if (entry.target.id === 'redevelopment') track('redevelopment_view', { section: 'redevelopment' });
  });
}, { threshold: 0.45 });

['lifestyle','redevelopment'].forEach(id => {
  const node = document.getElementById(id);
  if (node) sectionObserver.observe(node);
});
