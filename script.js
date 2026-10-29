const modal = document.getElementById('enquiryModal');
const closeButton = document.getElementById('closeModal');
const form = document.getElementById('enquiryForm');
const formStatus = document.getElementById('formStatus');
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

function openEnquiry() {
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  formStatus.textContent = '';
  formStatus.className = 'form-status';
  window.setTimeout(() => document.getElementById('fullName').focus(), 180);
}
function closeEnquiry() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}
document.querySelectorAll('[data-enquire]').forEach(button => button.addEventListener('click', openEnquiry));
closeButton.addEventListener('click', closeEnquiry);
modal.querySelectorAll('[data-close]').forEach(element => element.addEventListener('click', closeEnquiry));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal.classList.contains('is-open')) closeEnquiry();
});
menuToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));
document.getElementById('year').textContent = new Date().getFullYear();

form.addEventListener('submit', async event => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const mobile = document.getElementById('mobile');
  if (!/^[6-9]\d{9}$/.test(mobile.value.trim())) {
    formStatus.textContent = 'Please enter a valid 10-digit Indian mobile number.';
    formStatus.className = 'form-status error';
    mobile.focus();
    return;
  }

  // Connect a form service before launch to deliver enquiries to your inbox.
  // Example: configure FormSubmit/Formspree and POST the FormData to its endpoint.
  formStatus.textContent = 'Form validated. To receive enquiries by email, connect this form to your preferred form endpoint before publishing.';
  formStatus.className = 'form-status success';
});
