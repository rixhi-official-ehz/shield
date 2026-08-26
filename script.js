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

        document.body.classList.add(
            "intro-active"
        );


        protectButton.addEventListener(
            "click",
            () => {

                if (
                    introScreen.classList.contains(
                        "intro-exit"
                    )
                ) {
                    return;
                }


                protectButton.classList.add(
                    "protect-clicked"
                );


                introScreen.classList.add(
                    "intro-exit"
                );


                document.body.classList.remove(
                    "intro-active"
                );

                document.body.classList.add(
                    "main-open"
                );


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


        /* OPEN GUIDE */

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


        /* CLOSE GUIDE */

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


        /* CLOSE OUTSIDE */

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


        /* GUIDE BUTTON RIPPLE */

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
                        easing: "ease-out"
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


        /* RESIZE */

        function resizeCanvas() {

            canvas.width =
                window.innerWidth;

            canvas.height =
                window.innerHeight;

            createParticles();

        }


        /* CREATE PARTICLES */

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


        /* INITIALIZE */

        resizeCanvas();


        window.addEventListener(
            "resize",
            resizeCanvas
        );


        /* MOUSE */

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


        /* DRAW */

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


                    /* SCREEN BOUNDARIES */

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


                    /* MOUSE INTERACTION */

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


                    /* DRAW PARTICLE */

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
                    ) * 12;


                const y =
                    (
                        event.clientY /
                        window.innerHeight
                        - 0.5
                    ) * 12;


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



    /* =====================================================
       SHIELD NAVIGATOR
    ===================================================== */

    const trigger =
        document.getElementById(
            "snTrigger"
        );

    const modal =
        document.getElementById(
            "snModal"
        );

    const close =
        document.getElementById(
            "snClose"
        );

    const backdrop =
        document.getElementById(
            "snBackdrop"
        );

    const nameInput =
        document.getElementById(
            "snName"
        );

    const status =
        document.getElementById(
            "snStatus"
        );

    const edition =
        document.getElementById(
            "snEdition"
        );


    /* -----------------------------------------------------
       SAFETY CHECK
    ----------------------------------------------------- */

    if (
        trigger &&
        modal &&
        close &&
        backdrop &&
        nameInput &&
        status &&
        edition
    ) {


        /* -------------------------------------------------
           PDF FILES
        ------------------------------------------------- */

        const pdfFiles = [

            "PDFs/001%20SHIELD.pdf",

            "PDFs/002%20NAGALAND.pdf",

            "PDFs/003%20SIVASAGAR.pdf"

        ];


        /* -------------------------------------------------
           OPEN NAVIGATOR
        ------------------------------------------------- */

        function openNavigator() {

            modal.classList.add(
                "sn-open"
            );

            modal.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.classList.add(
                "sn-modal-open"
            );


            setTimeout(
                () => {
                    nameInput.focus();
                },
                180
            );

        }


        /* -------------------------------------------------
           CLOSE NAVIGATOR
        ------------------------------------------------- */

        function closeNavigator() {

            modal.classList.remove(
                "sn-open"
            );

            modal.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.classList.remove(
                "sn-modal-open"
            );

        }


        /* OPEN */

        trigger.addEventListener(
            "click",
            openNavigator
        );


        /* CLOSE */

        close.addEventListener(
            "click",
            closeNavigator
        );


        backdrop.addEventListener(
            "click",
            closeNavigator
        );


        /* ESCAPE */

        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Escape" &&
                    modal.classList.contains(
                        "sn-open"
                    )
                ) {

                    closeNavigator();

                }

            }
        );


        /* -------------------------------------------------
           NAME VALIDATION
        ------------------------------------------------- */

        nameInput.addEventListener(
            "input",
            () => {

                const name =
                    nameInput.value.trim();

                const eligible =
                    name.length >= 2;


                edition.disabled =
                    !eligible;


                edition.classList.toggle(
                    "sn-eligible",
                    eligible
                );


                status.classList.toggle(
                    "sn-ready",
                    eligible
                );


                status.textContent =
                    eligible
                        ? "NAME VERIFIED • ACCESS ELIGIBLE"
                        : "ENTER YOUR NAME TO CONTINUE";

            }
        );


        /* -------------------------------------------------
           DOWNLOAD ONE PDF
        ------------------------------------------------- */

        function downloadPDF(
            file
        ) {

            const link =
                document.createElement(
                    "a"
                );


            link.href =
                file;


            link.download =
                decodeURIComponent(
                    file.substring(
                        file.lastIndexOf("/") + 1
                    )
                );


            link.style.display =
                "none";


            document.body.appendChild(
                link
            );


            link.click();


            document.body.removeChild(
                link
            );

        }


        /* -------------------------------------------------
           GET THE EDITION
           
           IMPORTANT:
           This does NOT:
           - open the PDF
           - navigate to the PDF
           - open a PDF viewer
           - close the website
           - use window.open()
           - use location.href
           
           It ONLY starts downloads.
        ------------------------------------------------- */

        edition.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                event.stopPropagation();


                if (edition.disabled) {
                    return;
                }


                const name =
                    nameInput.value.trim();


                if (!name) {
                    return;
                }


                /* STATUS */

                status.textContent =
                    "DOWNLOADING 3 PDF GUIDES...";


                /* PREVENT REPEATED CLICK */

                edition.disabled =
                    true;


                /*
                 * Download all 3 files.
                 *
                 * Small delay between each download
                 * helps browsers process separate files.
                 */

                pdfFiles.forEach(
                    (
                        file,
                        index
                    ) => {

                        setTimeout(
                            () => {

                                downloadPDF(
                                    file
                                );

                            },
                            index * 900
                        );

                    }
                );


                /* FINISHED MESSAGE */

                setTimeout(
                    () => {

                        status.textContent =
                            "3 PDF GUIDES SENT TO YOUR DOWNLOADS";


                        edition.disabled =
                            false;


                    },
                    3500
                );

            }
        );


        /* -------------------------------------------------
           NAVIGATOR RIPPLE
        ------------------------------------------------- */

        function createButtonRipple(
            button,
            event
        ) {

            const rect =
                button.getBoundingClientRect();


            const ripple =
                document.createElement(
                    "span"
                );


            ripple.className =
                "button-ripple";


            ripple.style.left =
                `${event.clientX - rect.left}px`;


            ripple.style.top =
                `${event.clientY - rect.top}px`;


            button.appendChild(
                ripple
            );


            ripple.animate(
                [
                    {
                        transform:
                            "translate(-50%, -50%) scale(1)",

                        opacity: 0.65
                    },

                    {
                        transform:
                            "translate(-50%, -50%) scale(35)",

                        opacity: 0
                    }
                ],
                {
                    duration: 700,
                    easing: "ease-out"
                }
            );


            setTimeout(
                () => {

                    ripple.remove();

                },
                700
            );

        }


        /* -------------------------------------------------
           GLASS BUTTON RIPPLE
        ------------------------------------------------- */

        const actionButtons =
            document.querySelectorAll(
                ".action-buttons .glass-button"
            );


        actionButtons.forEach(
            (button) => {

                button.addEventListener(
                    "click",
                    (event) => {

                        createButtonRipple(
                            button,
                            event
                        );

                    }
                );

            }
        );

    }



    /* =====================================================
       LIVE FLOOD STATUS
    ===================================================== */

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



    /* =====================================================
       FLOOD MONITORING
    ===================================================== */

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


    updateFloodStatus();


    setInterval(
        updateFloodStatus,
        8000
    );



    /* =====================================================
       SHIELD PROTECTION MODE
    ===================================================== */

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


    if (
        activateShield &&
        shieldProtection &&
        activateText &&
        protectionText
    ) {

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



    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal-section, .reveal-card"
        );


    if (
        "IntersectionObserver" in window
    ) {

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

    }



    /* =====================================================
       INTERACTIVE FLOATING ELEMENTS
    ===================================================== */

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



    /* =====================================================
       WATER PARALLAX
    ===================================================== */

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



    /* =====================================================
       HOME PAGE OPEN / REFRESH COUNTER
    ===================================================== */

    const STORAGE_KEY =
        "shield_home_open_count";


    let count =
        Number(
            localStorage.getItem(
                STORAGE_KEY
            )
        ) || 0;


    count++;


    localStorage.setItem(
        STORAGE_KEY,
        count
    );


    console.log(
        "SHIELD Home Page Opens:",
        count
    );

});
