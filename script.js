const timeElement = document.querySelector('#local-time');
function updateLocalTime() { timeElement.textContent = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(new Date()); }
updateLocalTime(); setInterval(updateLocalTime, 1000);

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => { const isOpen = navLinks.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', isOpen); });
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { navLinks.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); }));

const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); } }), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { const target = entry.target; const end = Number(target.dataset.count); let value = 0; const step = () => { value += Math.max(1, Math.ceil(end / 35)); target.textContent = `${Math.min(value, end)}+`; if (value < end) requestAnimationFrame(step); }; step(); counterObserver.unobserve(target); } }), { threshold: .8 });
counters.forEach(counter => counterObserver.observe(counter));

const slides = [...document.querySelectorAll('.testimonial')]; let currentSlide = 0;
function showSlide(index) { currentSlide = (index + slides.length) % slides.length; slides.forEach((slide, i) => slide.classList.toggle('active', i === currentSlide)); document.querySelector('#slide-number').textContent = `0${currentSlide + 1} / 0${slides.length}`; }
document.querySelector('#prev-testimonial').addEventListener('click', () => showSlide(currentSlide - 1));
document.querySelector('#next-testimonial').addEventListener('click', () => showSlide(currentSlide + 1));

const lightbox = document.querySelector('.lightbox'); const lightboxImage = lightbox.querySelector('img');
document.querySelectorAll('[data-image]').forEach(item => item.addEventListener('click', () => { lightboxImage.src = item.dataset.image; lightboxImage.alt = item.querySelector('img').alt; lightbox.classList.add('open'); document.body.style.overflow = 'hidden'; }));
function closeLightbox() { lightbox.classList.remove('open'); document.body.style.overflow = ''; lightboxImage.src = ''; }
lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox); lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); }); document.addEventListener('keydown', event => { if (event.key === 'Escape') closeLightbox(); });

const cursorDot = document.querySelector('.cursor-dot'); const cursorRing = document.querySelector('.cursor-ring');
if (window.matchMedia('(pointer: fine)').matches) { document.addEventListener('pointermove', event => { cursorDot.style.opacity = '1'; cursorRing.style.opacity = '1'; cursorDot.style.left = `${event.clientX - 2}px`; cursorDot.style.top = `${event.clientY - 2}px`; cursorRing.style.left = `${event.clientX - 16}px`; cursorRing.style.top = `${event.clientY - 16}px`; }); document.querySelectorAll('a,button').forEach(item => { item.addEventListener('mouseenter', () => cursorRing.classList.add('hover')); item.addEventListener('mouseleave', () => cursorRing.classList.remove('hover')); }); }

const heroArt = document.querySelector('.hero-art'); document.addEventListener('pointermove', event => { if (window.innerWidth > 800) { const x = (event.clientX / window.innerWidth - .5) * 10; const y = (event.clientY / window.innerHeight - .5) * 10; heroArt.style.transform = `translate(${x}px, ${y}px)`; } });
