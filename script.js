const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const nav = document.querySelector('#site-nav');
const cursor = document.querySelector('.cursor');

function startBootLoader() {
	const loader = document.querySelector('#boot-loader');
	const percent = document.querySelector('#boot-percent');
	const progress = document.querySelector('#boot-progress');
	const status = document.querySelector('#boot-status');
	const duration = reduceMotion ? 350 : 1800;
	const started = performance.now();
	let finished = false;
	const finish = () => {
		if (finished) return;
		finished = true;
		percent.textContent = '100%';
		progress.style.width = '100%';
		status.textContent = 'READY';
		loader.classList.add('is-done');
		document.body.classList.remove('booting');
	};
	const tick = (time) => {
		const value = Math.min((time - started) / duration, 1);
		const number = Math.round(value * 100);
		percent.textContent = `${String(number).padStart(3, '0')}%`;
		progress.style.width = `${number}%`;
		if (value < 1) requestAnimationFrame(tick);
		else finish();
	};
	requestAnimationFrame(tick);
	window.setTimeout(finish, duration + 700);
}
startBootLoader();

function updateClock() {
	const now = new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false });
	document.querySelector('#clock').textContent = now;
}
updateClock();
setInterval(updateClock, 1000);

const revealObserver = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('visible');
			revealObserver.unobserve(entry.target);
		}
	});
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

document.querySelectorAll('.hero-title .word').forEach((word) => {
	const text = word.dataset.word;
	word.textContent = '';
	[...text].forEach((character, index) => {
		const span = document.createElement('span');
		span.textContent = character;
		span.style.display = 'inline-block';
		span.style.opacity = reduceMotion ? '1' : '0';
		span.style.transform = reduceMotion ? 'none' : 'translateY(80px)';
		span.style.filter = reduceMotion ? 'none' : 'blur(10px)';
		span.style.transition = `opacity .7s ${index * .06}s, transform .7s ${index * .06}s, filter .7s ${index * .06}s, color .25s`;
		word.append(span);
		requestAnimationFrame(() => { span.style.opacity = '1'; span.style.transform = 'none'; span.style.filter = 'none'; });
	});
});

window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 80), { passive: true });

if (!reduceMotion && cursor) {
	let cursorX = innerWidth / 2; let cursorY = innerHeight / 2; let targetX = cursorX; let targetY = cursorY;
	window.addEventListener('pointermove', (event) => { targetX = event.clientX; targetY = event.clientY; });
	const moveCursor = () => { cursorX += (targetX - cursorX) * .2; cursorY += (targetY - cursorY) * .2; cursor.style.left = `${cursorX}px`; cursor.style.top = `${cursorY}px`; requestAnimationFrame(moveCursor); };
	moveCursor();
	document.querySelectorAll('a, button, .work img, .studio-grid img, .poster-grid img').forEach((element) => {
		element.addEventListener('mouseenter', () => cursor.classList.add('active'));
		element.addEventListener('mouseleave', () => cursor.classList.remove('active'));
	});
}

document.querySelectorAll('.magnetic').forEach((element) => {
	element.addEventListener('pointermove', (event) => { if (reduceMotion) return; const box = element.getBoundingClientRect(); element.style.transform = `translate(${(event.clientX - (box.left + box.width / 2)) * .12}px, ${(event.clientY - (box.top + box.height / 2)) * .12}px)`; });
	element.addEventListener('pointerleave', () => { element.style.transform = ''; });
});

const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
document.querySelectorAll('.scramble').forEach((link) => {
	const original = link.textContent;
	link.addEventListener('mouseenter', () => { let frame = 0; const animate = () => { link.textContent = [...original].map((character, index) => index < frame / 2 ? character : alpha[Math.floor(Math.random() * alpha.length)]).join(''); if (frame++ < original.length * 2) requestAnimationFrame(animate); else link.textContent = original; }; animate(); });
});

let lastScroll = window.scrollY; let skew = 0;
function velocitySkew() { const velocity = Math.min(Math.abs(window.scrollY - lastScroll) * .035, 1.2); skew += (velocity - skew) * .16; document.querySelector('#page-content').style.transform = reduceMotion ? '' : `skewY(${skew * (window.scrollY > lastScroll ? -1 : 1)}deg)`; lastScroll = window.scrollY; requestAnimationFrame(velocitySkew); }
if (!reduceMotion) velocitySkew();

const testimonials = [
	['Philips Jhonathan', 'Micromass Enterprises', 'I’m Philips from Micromass Enterprises. Digi Nexuz has delivered excellent, professional work, and I highly recommend them.'],
	['Kasturi Lakshmanan', 'Power of Mind', 'Great work, Santhosh! Your video editing skills are truly impressive. We look forward to working with you consistently.'],
	['Saranya', 'Covai Designs', 'Excellent work! Your shooting and video editing skills are truly outstanding.'],
	['Immanuel Manoj', 'Sam Media Events', 'Outstanding work! Your filming and editing skills are truly exceptional.'],
	['AnbuRaj', 'Iyndhinai Organics', 'Great shooting, excellent editing, and well-written script.']
];
let quoteIndex = 0;
function renderQuote() { const [name, company, text] = testimonials[quoteIndex]; document.querySelector('#quote blockquote').textContent = text; document.querySelector('#quote strong').textContent = name; document.querySelector('#quote small').textContent = company; document.querySelector('#progress-bar').style.width = `${((quoteIndex + 1) / testimonials.length) * 100}%`; }
document.querySelector('#prev').addEventListener('click', () => { quoteIndex = (quoteIndex - 1 + testimonials.length) % testimonials.length; renderQuote(); });
document.querySelector('#next').addEventListener('click', () => { quoteIndex = (quoteIndex + 1) % testimonials.length; renderQuote(); });
renderQuote();

const lightbox = document.querySelector('#lightbox');
document.querySelectorAll('.studio-grid img, .poster-grid img').forEach((image) => image.addEventListener('click', () => { lightbox.querySelector('img').src = image.src; lightbox.querySelector('img').alt = image.alt; lightbox.showModal(); }));
lightbox.querySelector('button').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close(); });
