/* =========================================================
   DIGI NEXUZ
   BRUTAL INTERACTIVE SYSTEM
========================================================= */


/* =========================================================
   REDUCED MOTION
========================================================= */

const reduceMotion =
    window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;


/* =========================================================
   ELEMENTS
========================================================= */

const nav =
    document.querySelector(
        '.brutal-nav'
    );


const cursor =
    document.getElementById(
        'cursor'
    );


const content =
    document.getElementById(
        'scroll-content'
    );


/* =========================================================
   PRELOADER
========================================================= */

function startBootLoader() {

    const loader =
        document.getElementById(
            'boot-loader'
        );


    const progress =
        document.getElementById(
            'boot-progress'
        );


    if (
        !loader ||
        !progress
    ) {

        document.body.classList.remove(
            'booting'
        );

        return;

    }


    const duration =
        reduceMotion
            ? 300
            : 1500;


    const start =
        performance.now();


    function update(time) {

        const elapsed =
            time - start;


        const percentage =
            Math.min(
                elapsed / duration,
                1
            );


        progress.style.width =
            `${percentage * 100}%`;


        if (
            percentage < 1
        ) {

            requestAnimationFrame(
                update
            );

        } else {

            setTimeout(
                () => {

                    loader.classList.add(
                        'is-done'
                    );

                    document.body.classList.remove(
                        'booting'
                    );

                },
                250
            );

        }

    }


    requestAnimationFrame(
        update
    );

}


startBootLoader();


/* =========================================================
   MOBILE MENU
========================================================= */

const mobileButton =
    document.getElementById(
        'mobile-menu-button'
    );


const mobileMenu =
    document.getElementById(
        'mobile-menu'
    );


if (
    mobileButton &&
    mobileMenu
) {

    mobileButton.addEventListener(
        'click',
        () => {

            const isOpen =
                mobileMenu.classList.contains(
                    'open'
                );


            mobileMenu.classList.toggle(
                'open',
                !isOpen
            );


            mobileButton.setAttribute(
                'aria-expanded',
                String(!isOpen)
            );


            mobileButton.querySelector(
                'span'
            ).textContent =
                isOpen
                    ? '+'
                    : '×';

        }
    );


    mobileMenu
        .querySelectorAll('a')
        .forEach(
            link => {

                link.addEventListener(
                    'click',
                    () => {

                        mobileMenu.classList.remove(
                            'open'
                        );


                        mobileButton.setAttribute(
                            'aria-expanded',
                            'false'
                        );


                        mobileButton.querySelector(
                            'span'
                        ).textContent =
                            '+';

                    }
                );

            }
        );

}


/* =========================================================
   CLOCK
========================================================= */

function updateClock() {

    const clock =
        document.getElementById(
            'clock'
        );


    if (!clock) {
        return;
    }


    clock.textContent =
        new Date().toLocaleTimeString(
            'en-IN',
            {
                timeZone:
                    'Asia/Kolkata',

                hour12:
                    false
            }
        );

}


updateClock();


setInterval(
    updateClock,
    1000
);


/* =========================================================
   HERO LETTER SPLIT
========================================================= */

const words =
    document.querySelectorAll(
        '.hero h1 .word'
    );


words.forEach(
    word => {

        const text =
            word.dataset.word ||
            word.innerText;


        word.innerHTML =
            '';


        text.split('').forEach(
            char => {

                const span =
                    document.createElement(
                        'span'
                    );


                span.classList.add(
                    'char'
                );


                span.innerText =
                    char;


                word.appendChild(
                    span
                );

            }
        );

    }
);


/* =========================================================
   MAGNETIC CURSOR
========================================================= */

let mouseX =
    window.innerWidth / 2;


let mouseY =
    window.innerHeight / 2;


let cursorX =
    mouseX;


let cursorY =
    mouseY;


window.addEventListener(
    'mousemove',
    event => {

        mouseX =
            event.clientX;

        mouseY =
            event.clientY;

    }
);


function lerp(
    start,
    end,
    factor
) {

    return (
        start +
        (
            end -
            start
        ) *
        factor
    );

}


function animateCursor() {

    if (
        cursor &&
        !reduceMotion &&
        window.innerWidth > 700
    ) {

        cursorX =
            lerp(
                cursorX,
                mouseX,
                .15
            );


        cursorY =
            lerp(
                cursorY,
                mouseY,
                .15
            );


        cursor.style.transform =
            `
            translate(
                ${cursorX}px,
                ${cursorY}px
            )
            translate(-50%, -50%)
            `;

    }


    requestAnimationFrame(
        animateCursor
    );

}


animateCursor();


/* =========================================================
   MAGNETIC ELEMENTS
========================================================= */

const magneticElements =
    document.querySelectorAll(
        '.magnetic'
    );


magneticElements.forEach(
    element => {

        element.addEventListener(
            'mousemove',
            event => {

                if (
                    reduceMotion ||
                    window.innerWidth <= 700
                ) {

                    return;

                }


                const rect =
                    element.getBoundingClientRect();


                const centerX =
                    rect.left +
                    rect.width / 2;


                const centerY =
                    rect.top +
                    rect.height / 2;


                const strength =
                    .35;


                const moveX =
                    (
                        event.clientX -
                        centerX
                    ) *
                    strength;


                const moveY =
                    (
                        event.clientY -
                        centerY
                    ) *
                    strength;


                element.style.transform =
                    `
                    translate(
                        ${moveX}px,
                        ${moveY}px
                    )
                    `;


                if (cursor) {

                    cursor.classList.add(
                        'magnet'
                    );

                }

            }
        );


        element.addEventListener(
            'mouseleave',
            () => {

                element.style.transform =
                    '';


                if (cursor) {

                    cursor.classList.remove(
                        'magnet'
                    );

                }

            }
        );

    }
);


/* =========================================================
   NAVBAR SCROLL STATE
========================================================= */

let isScrolled =
    false;


window.addEventListener(
    'scroll',
    () => {

        if (
            window.scrollY > 100
        ) {

            if (!isScrolled) {

                nav.classList.add(
                    'scrolled'
                );

                isScrolled =
                    true;

            }

        } else {

            if (isScrolled) {

                nav.classList.remove(
                    'scrolled'
                );

                nav.style.transform =
                    '';

                isScrolled =
                    false;

            }

        }

    },
    {
        passive:
            true
    }
);


/* =========================================================
   NAVBAR 3D TILT
========================================================= */

document.addEventListener(
    'mousemove',
    event => {

        if (
            !nav ||
            !isScrolled ||
            reduceMotion ||
            window.innerWidth <= 700
        ) {

            return;

        }


        const centerX =
            window.innerWidth / 2;


        const centerY =
            100;


        const rotateX =
            (
                event.clientY -
                centerY
            ) *
            .018;


        const rotateY =
            (
                event.clientX -
                centerX
            ) *
            .018;


        const clamp =
            (
                value,
                min,
                max
            ) => {

                return Math.min(
                    Math.max(
                        value,
                        min
                    ),
                    max
                );

            };


        const rx =
            clamp(
                rotateX,
                -5,
                5
            );


        const ry =
            clamp(
                rotateY,
                -5,
                5
            );


        nav.style.transform =
            `
            translateX(-50%)
            perspective(1000px)
            rotateX(${-rx}deg)
            rotateY(${ry}deg)
            `;

    }
);


/* =========================================================
   SCROLL VELOCITY / PAGE SKEW
========================================================= */

let lastScrollTop =
    window.scrollY;


let currentSkew =
    0;


let targetSkew =
    0;


function scrollLoop() {

    if (
        content &&
        !reduceMotion &&
        !window.matchMedia('(max-width: 700px)').matches
    ) {

        const scrollTop =
            window.scrollY;


        const velocity =
            scrollTop -
            lastScrollTop;


        lastScrollTop =
            scrollTop;


        const maxSkew =
            3.5;


        targetSkew =
            Math.min(
                Math.max(
                    velocity * .08,
                    -maxSkew
                ),
                maxSkew
            );


        currentSkew =
            lerp(
                currentSkew,
                targetSkew,
                .08
            );


        content.style.transform =
            `
            skewY(
                ${currentSkew}deg
            )
            `;


        targetSkew *=
            .82;

    }


    requestAnimationFrame(
        scrollLoop
    );

}


scrollLoop();


/* =========================================================
   HERO VELOCITY
========================================================= */

let heroVelocity =
    0;


let smoothHeroVelocity =
    0;


let lastHeroScroll =
    window.scrollY;


function heroVelocityLoop() {

    if (
        !reduceMotion &&
        !window.matchMedia('(max-width: 700px)').matches &&
        words.length
    ) {

        const current =
            window.scrollY;


        const difference =
            current -
            lastHeroScroll;


        lastHeroScroll =
            current;


        heroVelocity =
            difference *
            .45;


        heroVelocity =
            Math.max(
                -12,
                Math.min(
                    12,
                    heroVelocity
                )
            );


        smoothHeroVelocity =
            lerp(
                smoothHeroVelocity,
                heroVelocity,
                .1
            );


        if (words[0]) {

            words[0].style.transform =
                `
                translateX(
                    ${smoothHeroVelocity}px
                )
                `;

        }


        if (words[1]) {

            words[1].style.transform =
                `
                translateX(
                    ${smoothHeroVelocity * -0.65}px
                )
                `;

        }


        heroVelocity *=
            .85;

    }


    requestAnimationFrame(
        heroVelocityLoop
    );

}


heroVelocityLoop();


/* =========================================================
   HACKER TEXT
========================================================= */

const alpha =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ';


document
    .querySelectorAll(
        '[data-text]'
    )
    .forEach(
        link => {

            link.addEventListener(
                'mouseenter',
                event => {

                    if (
                        reduceMotion
                    ) {

                        return;

                    }


                    let iteration =
                        0;


                    const original =
                        event.currentTarget.dataset.text;


                    clearInterval(
                        event.currentTarget.interval
                    );


                    event.currentTarget.interval =
                        setInterval(
                            () => {

                                event.currentTarget.innerText =
                                    original
                                        .split('')
                                        .map(
                                            (
                                                character,
                                                index
                                            ) => {

                                                if (
                                                    index <
                                                    iteration
                                                ) {

                                                    return character;

                                                }


                                                return alpha[
                                                    Math.floor(
                                                        Math.random() *
                                                        alpha.length
                                                    )
                                                ];

                                            }
                                        )
                                        .join('');


                                if (
                                    iteration >=
                                    original.length
                                ) {

                                    clearInterval(
                                        event.currentTarget.interval
                                    );

                                }


                                iteration +=
                                    1 / 3;

                            },
                            30
                        );

                }
            );


            link.addEventListener(
                'mouseleave',
                event => {

                    clearInterval(
                        event.currentTarget.interval
                    );


                    event.currentTarget.innerText =
                        event.currentTarget.dataset.text;

                }
            );

        }
    );


/* =========================================================
   TESTIMONIALS
========================================================= */

const testimonials = [

    [
        'Philips Jhonathan',
        'Micromass Enterprises',
        'I’m Philips from Micromass Enterprises. Digi Nexuz has delivered excellent, professional work, and I highly recommend them.'
    ],

    [
        'Kasturi Lakshmanan',
        'Power of Mind',
        'Great work, Santhosh! Your video editing skills are truly impressive. We look forward to working with you consistently.'
    ],

    [
        'Saranya',
        'Covai Designs',
        'Excellent work! Your shooting and video editing skills are truly outstanding.'
    ],

    [
        'Immanuel Manoj',
        'Sam Media Events',
        'Outstanding work! Your filming and editing skills are truly exceptional.'
    ],

    [
        'AnbuRaj',
        'Iyndhinai Organics',
        'Great shooting, excellent editing, and well-written script.'
    ]

];


let quoteIndex =
    0;


function renderQuote() {

    const quote =
        document.getElementById(
            'quote'
        );


    const progress =
        document.getElementById(
            'progress-bar'
        );


    if (
        !quote ||
        !progress
    ) {

        return;

    }


    const [
        name,
        company,
        text
    ] =
        testimonials[
            quoteIndex
        ];


    quote.querySelector(
        'blockquote'
    ).textContent =
        text;


    quote.querySelector(
        'strong'
    ).textContent =
        name;


    quote.querySelector(
        'small'
    ).textContent =
        company;


    progress.style.width =
        `
        ${
            (
                (quoteIndex + 1) /
                testimonials.length
            ) * 100
        }%
        `;

}


document
    .getElementById('prev')
    ?.addEventListener(
        'click',
        () => {

            quoteIndex =
                (
                    quoteIndex -
                    1 +
                    testimonials.length
                ) %
                testimonials.length;


            renderQuote();

        }
    );


document
    .getElementById('next')
    ?.addEventListener(
        'click',
        () => {

            quoteIndex =
                (
                    quoteIndex +
                    1
                ) %
                testimonials.length;


            renderQuote();

        }
    );


renderQuote();


/* =========================================================
   MEDIA CAROUSELS
========================================================= */

document
    .querySelectorAll('.asset-carousel')
    .forEach(
        carousel => {

            const slides =
                Array.from(
                    carousel.children
                );

            if (
                slides.length < 2
            ) {

                return;

            }

            let activeIndex =
                slides.findIndex(
                    slide => slide.classList.contains('is-active')
                );

            if (
                activeIndex < 0
            ) {

                activeIndex = 0;
                slides[0].classList.add('is-active');

            }

            const isVideoCarousel =
                carousel.dataset.carousel === 'slide';

            window.setInterval(
                () => {

                    const currentSlide =
                        slides[activeIndex];

                    activeIndex =
                        (activeIndex + 1) % slides.length;

                    const nextSlide =
                        slides[activeIndex];

                    if (
                        isVideoCarousel
                    ) {

                        currentSlide.classList.remove('is-active');
                        currentSlide.classList.add('is-exiting');
                        nextSlide.classList.add('is-active');

                        if (
                            typeof nextSlide.play === 'function'
                        ) {

                            nextSlide.currentTime = 0;
                            nextSlide.play().catch(() => {});

                        }

                        window.setTimeout(
                            () => {
                                currentSlide.classList.remove('is-exiting');
                            },
                            900
                        );

                    } else {

                        currentSlide.classList.remove('is-active');
                        nextSlide.classList.add('is-active');

                    }

                },
                Number(carousel.dataset.interval) || 1500
            );

        }
    );


/* =========================================================
   IMAGE LIGHTBOX
========================================================= */

const lightbox =
    document.getElementById(
        'lightbox'
    );


const lightboxImage =
    document.getElementById(
        'lightbox-image'
    );


const lightboxClose =
    document.getElementById(
        'lightbox-close'
    );


document
    .querySelectorAll(
        '.studio-carousel img, .poster-carousel img'
    )
    .forEach(
        image => {

            image.addEventListener(
                'click',
                () => {

                    if (
                        !lightbox ||
                        !lightboxImage
                    ) {

                        return;

                    }


                    lightboxImage.src =
                        image.src;


                    lightboxImage.alt =
                        image.alt;


                    lightbox.showModal();

                }
            );

        }
    );


lightboxClose?.addEventListener(
    'click',
    () => {

        lightbox.close();

    }
);


lightbox?.addEventListener(
    'click',
    event => {

        if (
            event.target ===
            lightbox
        ) {

            lightbox.close();

        }

    }
);


/* =========================================================
   BACK TO TOP
========================================================= */

const backToTop =
    document.getElementById(
        'back-to-top'
    );


window.addEventListener(
    'scroll',
    () => {

        if (
            window.scrollY > 600
        ) {

            backToTop.classList.add(
                'show'
            );

        } else {

            backToTop.classList.remove(
                'show'
            );

        }

    },
    {
        passive:
            true
    }
);


backToTop?.addEventListener(
    'click',
    () => {

        window.scrollTo({

            top:
                0,

            behavior:
                reduceMotion
                    ? 'auto'
                    : 'smooth'

        });

    }
);