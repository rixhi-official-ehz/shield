/* =========================================================
   SHIELD EXHIBITION WEBSITE
   COMPLETE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       GET ALL ELEMENTS
    ===================================================== */

    const guideButton =
        document.getElementById("guideButton");

    const guideModal =
        document.getElementById("guideModal");

    const closeGuide =
        document.getElementById("closeGuide");

    const introScreen =
        document.getElementById("introScreen");

    const protectButton =
        document.getElementById("protectButton");

    const canvas =
        document.getElementById("particles");



    /* =====================================================
       CINEMATIC INTRO
    ===================================================== */

    if (introScreen && protectButton) {


        /*
        The website starts blurred behind the intro.
        The button stays clickable.
        */

        document.body.classList.add(
            "intro-active"
        );


        /* -----------------------------------------------
           PROTECT THE SHIELD BUTTON
        ------------------------------------------------ */

        protectButton.addEventListener(
            "click",
            () => {


                /*
                Prevent multiple clicks
                */

                if (
                    introScreen.classList.contains(
                        "intro-exit"
                    )
                ) {

                    return;

                }


                /*
                Button press effect
                */

                protectButton.classList.add(
                    "protect-clicked"
                );


                /*
                Start black fade animation
                */

                introScreen.classList.add(
                    "intro-exit"
                );


                /*
                Reveal main website
                */

                document.body.classList.remove(
                    "intro-active"
                );

                document.body.classList.add(
                    "main-open"
                );


                /*
                Remove intro completely
                */

                setTimeout(() => {

                    introScreen.classList.add(
                        "intro-hidden"
                    );

                }, 1500);


            }
        );

    }



    /* =====================================================
       HOW TO MAKE GUIDE
    ===================================================== */

    if (
        guideButton &&
        guideModal &&
        closeGuide
    ) {


        /* -----------------------------------------------
           OPEN GUIDE
        ------------------------------------------------ */

        guideButton.addEventListener(
            "click",
            () => {

                guideModal.classList.add(
                    "active"
                );

                document.body.classList.add(
                    "guide-open"
                );

            }
        );


        /* -----------------------------------------------
           CLOSE GUIDE BUTTON
        ------------------------------------------------ */

        closeGuide.addEventListener(
            "click",
            () => {

                guideModal.classList.remove(
                    "active"
                );

                document.body.classList.remove(
                    "guide-open"
                );

            }
        );


        /* -----------------------------------------------
           CLOSE WHEN CLICKING OUTSIDE
        ------------------------------------------------ */

        guideModal.addEventListener(
            "click",
            (event) => {

                if (
                    event.target === guideModal
                ) {

                    guideModal.classList.remove(
                        "active"
                    );

                    document.body.classList.remove(
                        "guide-open"
                    );

                }

            }
        );


        /* -----------------------------------------------
           BUTTON RIPPLE
        ------------------------------------------------ */

        guideButton.addEventListener(
            "click",
            function (event) {


                const ripple =
                    document.createElement(
                        "span"
                    );


                ripple.style.position =
                    "absolute";

                ripple.style.width =
                    "10px";

                ripple.style.height =
                    "10px";

                ripple.style.borderRadius =
                    "50%";

                ripple.style.background =
                    "rgba(120,210,255,0.45)";

                ripple.style.left =
                    `${event.offsetX}px`;

                ripple.style.top =
                    `${event.offsetY}px`;

                ripple.style.transform =
                    "translate(-50%, -50%) scale(1)";

                ripple.style.pointerEvents =
                    "none";


                this.appendChild(
                    ripple
                );


                ripple.animate(
                    [
                        {
                            transform:
                                "translate(-50%, -50%) scale(1)",

                            opacity: 0.7
                        },

                        {
                            transform:
                                "translate(-50%, -50%) scale(35)",

                            opacity: 0
                        }
                    ],

                    {
                        duration: 700,

                        easing:
                            "ease-out"
                    }
                );


                setTimeout(
                    () => {

                        ripple.remove();

                    },
                    700
                );


            }
        );

    }



    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {


            if (
                event.key === "Escape" &&
                guideModal &&
                guideModal.classList.contains(
                    "active"
                )
            ) {

                guideModal.classList.remove(
                    "active"
                );

                document.body.classList.remove(
                    "guide-open"
                );

            }


        }
    );



    /* =====================================================
       PARTICLE SYSTEM
    ===================================================== */

    if (canvas) {


        const ctx =
            canvas.getContext("2d");


        let particles = [];


        let mouse = {

            x: null,

            y: null,

            radius: 130

        };



        /* -----------------------------------------------
           RESIZE CANVAS
        ------------------------------------------------ */

        function resizeCanvas() {

            canvas.width =
                window.innerWidth;

            canvas.height =
                window.innerHeight;


            createParticles();

        }



        /* -----------------------------------------------
           CREATE PARTICLES
        ------------------------------------------------ */

        function createParticles() {


            particles = [];


            const particleCount =
                Math.min(
                    100,

                    Math.floor(
                        window.innerWidth / 12
                    )
                );


            for (
                let i = 0;

                i < particleCount;

                i++
            ) {


                particles.push({

                    x:

                        Math.random()
                        * canvas.width,


                    y:

                        Math.random()
                        * canvas.height,


                    size:

                        Math.random()
                        * 1.8 + 0.4,


                    speedX:

                        (
                            Math.random() - 0.5
                        )
                        * 0.25,


                    speedY:

                        (
                            Math.random() - 0.5
                        )
                        * 0.25,


                    opacity:

                        Math.random()
                        * 0.6 + 0.1

                });


            }


        }



        /* -----------------------------------------------
           INITIALIZE
        ------------------------------------------------ */

        resizeCanvas();


        window.addEventListener(
            "resize",
            resizeCanvas
        );



        /* -----------------------------------------------
           MOUSE TRACKING
        ------------------------------------------------ */

        window.addEventListener(
            "mousemove",
            (event) => {

                mouse.x =
                    event.clientX;

                mouse.y =
                    event.clientY;

            }
        );


        window.addEventListener(
            "mouseleave",
            () => {

                mouse.x = null;

                mouse.y = null;

            }
        );



        /* -----------------------------------------------
           DRAW PARTICLES
        ------------------------------------------------ */

        function drawParticles() {


            ctx.clearRect(

                0,

                0,

                canvas.width,

                canvas.height

            );


            particles.forEach(
                (particle) => {


                    particle.x +=
                        particle.speedX;

                    particle.y +=
                        particle.speedY;



                    /* Screen boundaries */

                    if (

                        particle.x < 0 ||

                        particle.x > canvas.width

                    ) {

                        particle.speedX *= -1;

                    }


                    if (

                        particle.y < 0 ||

                        particle.y > canvas.height

                    ) {

                        particle.speedY *= -1;

                    }



                    /* Mouse interaction */

                    if (

                        mouse.x !== null &&

                        mouse.y !== null

                    ) {


                        const dx =
                            particle.x - mouse.x;


                        const dy =
                            particle.y - mouse.y;


                        const distance =
                            Math.sqrt(

                                dx * dx +

                                dy * dy

                            );


                        if (

                            distance < mouse.radius

                        ) {


                            const force =

                                (
                                    mouse.radius -
                                    distance
                                )

                                / mouse.radius;


                            particle.x +=

                                dx *
                                force *
                                0.015;


                            particle.y +=

                                dy *
                                force *
                                0.015;

                        }

                    }



                    /* Draw particle */

                    ctx.beginPath();


                    ctx.arc(

                        particle.x,

                        particle.y,

                        particle.size,

                        0,

                        Math.PI * 2

                    );


                    ctx.fillStyle =

                        `rgba(
                            80,
                            175,
                            255,
                            ${particle.opacity}
                        )`;


                    ctx.fill();


                }
            );


            requestAnimationFrame(
                drawParticles
            );


        }


        drawParticles();


    }



    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    const heroVisual =
        document.querySelector(
            ".hero-visual"
        );


    if (heroVisual) {


        window.addEventListener(
            "mousemove",
            (event) => {


                const x =

                    (
                        event.clientX /
                        window.innerWidth

                        - 0.5
                    )

                    * 12;


                const y =

                    (
                        event.clientY /
                        window.innerHeight

                        - 0.5
                    )

                    * 12;


                heroVisual.style.transform =

                    `translate(
                        ${x}px,
                        ${y}px
                    )`;


            }
        );


        window.addEventListener(
            "mouseleave",
            () => {

                heroVisual.style.transform =
                    "";

            }
        );


    }



    /* =====================================================
       PREVENT NORMAL COPYING
    ===================================================== */

    document.addEventListener(
        "contextmenu",
        (event) => {

            event.preventDefault();

        }
    );


    document.addEventListener(
        "copy",
        (event) => {

            event.preventDefault();

        }
    );


    document.addEventListener(
        "cut",
        (event) => {

            event.preventDefault();

        }
    );


    document.addEventListener(
        "selectstart",
        (event) => {

            event.preventDefault();

        }
    );


    document.addEventListener(
        "dragstart",
        (event) => {

            event.preventDefault();

        }
    );



    /* =====================================================
       BLOCK COMMON SHORTCUTS
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {


            const key =
                event.key.toLowerCase();


            if (

                (
                    event.ctrlKey ||
                    event.metaKey
                )

                &&

                (

                    key === "c" ||

                    key === "x" ||

                    key === "u" ||

                    key === "s"

                )

            ) {

                event.preventDefault();

            }


        }
    );


});

/* =========================================================
   CREATIVE SHIELD FLOOD EXPERIENCE
========================================================= */


/* =========================================================
   LIVE FLOOD STATUS SYSTEM
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const rainBar =
            document.getElementById(
                "rainBar"
            );

        const riverBar =
            document.getElementById(
                "riverBar"
            );


        if (rainBar) {

            setTimeout(
                () => {

                    rainBar.style.width =
                        "68%";

                },
                500
            );

        }


        if (riverBar) {

            setTimeout(
                () => {

                    riverBar.style.width =
                        "54%";

                },
                700
            );

        }

    }
);


/* =========================================================
   RANDOM LIVE MONITORING DATA
========================================================= */

const rainLevel =
    document.getElementById(
        "rainLevel"
    );

const riverLevel =
    document.getElementById(
        "riverLevel"
    );

const riskLevel =
    document.getElementById(
        "riskLevel"
    );

const rainBarLive =
    document.getElementById(
        "rainBar"
    );

const riverBarLive =
    document.getElementById(
        "riverBar"
    );


function updateFloodStatus() {

    if (
        !rainLevel ||
        !riverLevel ||
        !riskLevel
    ) {

        return;

    }


    const rain =
        Math.floor(
            Math.random() * 25
        ) + 60;


    const river =
        Math.floor(
            Math.random() * 30
        ) + 45;


    rainLevel.textContent =
        rain + "%";


    riverLevel.textContent =
        river + "%";


    if (rainBarLive) {

        rainBarLive.style.width =
            rain + "%";

    }


    if (riverBarLive) {

        riverBarLive.style.width =
            river + "%";

    }


    if (
        river > 70 ||
        rain > 80
    ) {

        riskLevel.textContent =
            "HIGH ALERT";

    }

    else if (
        river > 55
    ) {

        riskLevel.textContent =
            "MONITORING";

    }

    else {

        riskLevel.textContent =
            "STABLE";

    }

}


/* Update every 8 seconds */

setInterval(
    updateFloodStatus,
    8000
);


/* =========================================================
   SHIELD PROTECTION MODE
========================================================= */

const activateShield =
    document.getElementById(
        "activateShield"
    );

const activateText =
    document.getElementById(
        "activateText"
    );

const protectionText =
    document.getElementById(
        "protectionText"
    );

const shieldProtection =
    document.querySelector(
        ".shield-protection"
    );


if (activateShield) {

    activateShield.addEventListener(
        "click",
        () => {


            shieldProtection.classList.add(
                "shield-active"
            );


            activateText.textContent =
                "SHIELD MODE ACTIVATED";


            protectionText.textContent =
                "SHIELD protection protocol is active. Stay aware, follow safety instructions and prepare before floodwater rises.";


            activateShield.disabled =
                true;


            setTimeout(
                () => {

                    shieldProtection.classList.remove(
                        "shield-active"
                    );


                    activateText.textContent =
                        "SHIELD PROTECTION ACTIVE";

                },
                1800
            );

        }
    );

}


/* =========================================================
   SCROLL REVEAL SYSTEM
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal-section, .reveal-card"
    );


const revealObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "revealed"
                        );


                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },

        {

            threshold: 0.12

        }

    );


revealElements.forEach(
    (element) => {

        revealObserver.observe(
            element
        );

    }
);


/* =========================================================
   INTERACTIVE FLOATING ELEMENTS
========================================================= */

const floatingElements =
    document.querySelectorAll(
        ".floating-element"
    );


window.addEventListener(
    "mousemove",
    (event) => {

        floatingElements.forEach(
            (element) => {

                const rect =
                    element.getBoundingClientRect();


                const centerX =
                    rect.left +
                    rect.width / 2;


                const centerY =
                    rect.top +
                    rect.height / 2;


                const distanceX =
                    event.clientX -
                    centerX;


                const distanceY =
                    event.clientY -
                    centerY;


                const distance =
                    Math.sqrt(

                        distanceX *
                        distanceX +

                        distanceY *
                        distanceY

                    );


                if (
                    distance < 180
                ) {

                    const force =
                        (
                            180 -
                            distance
                        ) / 180;


                    const moveX =
                        distanceX *
                        force *
                        0.12;


                    const moveY =
                        distanceY *
                        force *
                        0.12;


                    element.style.transform =
                        `translate(
                            ${moveX}px,
                            ${moveY}px
                        ) scale(1.08)`;


                    element.style.boxShadow =
                        `0 0 40px
                        rgba(0,140,255,0.45)`;

                }

                else {

                    element.style.transform =
                        "";


                    element.style.boxShadow =
                        "";

                }

            }
        );

    }
);


/* =========================================================
   WATER PARALLAX EFFECT
========================================================= */

const waterScene =
    document.querySelector(
        ".water-scene"
    );


if (waterScene) {

    window.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                waterScene.getBoundingClientRect();


            const mouseX =
                event.clientX -
                rect.left;


            if (
                mouseX >= 0 &&
                mouseX <= rect.width
            ) {

                const percentage =
                    mouseX /
                    rect.width;


                const waves =
                    waterScene.querySelectorAll(
                        ".water-wave"
                    );


                waves.forEach(
                    (
                        wave,
                        index
                    ) => {

                        const movement =
                            (
                                percentage -
                                0.5
                            )
                            *
                            (
                                index + 1
                            )
                            *
                            15;


                        wave.style.marginLeft =
                            `${movement}px`;

                    }
                );

            }

        }
    );

}