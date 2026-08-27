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


/* =========================================================
   SHIELD HOW IT WAS MADE
   A-B-C-D INTERACTIVE NAVIGATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const guideModal = document.getElementById("guideModal");

    if (!guideModal) return;

    const steps = guideModal.querySelectorAll(".progress-container .step");
    const cards = guideModal.querySelectorAll(".guide-content .guide-card");

    if (!steps.length || !cards.length) return;


    /* =====================================================
       CONTENT FOR A B C D
       ===================================================== */

    const shieldSections = [

        /* =================================================
           A — MODEL CONSTRUCTION
           ================================================= */

        {
            label: "STEP 01 • MODEL CONSTRUCTION",
            title: "HOW WE BUILT THE SHIELD MODEL",

            text:
                "The main SHIELD exhibition model was created as a physical landscape to show how rainwater moves through mountains, land and drainage areas. We first prepared a strong plywood base and then built the landform using thermocol. Cement was applied over the shaped areas to make the mountains stronger and give them a realistic surface. After the structure dried, colour and spray paint were used to create the final landscape appearance.",

            materials: [
                ["BASE", "Plywood was used as the main base so that the complete model remained stable."],
                ["MOUNTAINS", "Thermocol was shaped to form the mountains and raised land."],
                ["CEMENT", "Cement was added over the mountain structure to strengthen and texture the surface."],
                ["COLOUR", "Paint and spray colour were used to give the mountains and land a realistic appearance."],
                ["DRILLED HOLES", "Small holes were drilled in selected areas to represent openings and water-flow points."],
                ["LANDSCAPE", "Different raised and low areas were arranged to demonstrate how water can collect and move."]
            ],

            diagram: true
        },


        /* =================================================
           B — ASSAM FLOOD + COAL MINING MODEL
           ================================================= */

        {
            label: "STEP 02 • ASSAM + SECOND MODEL",
            title: "ASSAM FLOOD & COAL MINING MODEL",

            text:
                "The second base model represents a flood-affected landscape and a coal-mining area. Assam is highly vulnerable to flooding during the monsoon because of intense rainfall, overflowing rivers and the presence of the Brahmaputra and its tributaries. The model was designed to visually connect the landscape, water flow and human activities that can be affected during flooding.",

            materials: [
                ["PLYWOOD BASE", "A separate plywood base was prepared for the second demonstration model."],
                ["THERMOCOL", "Thermocol was used to create raised land, slopes and landscape features."],
                ["ALUMINIUM FOIL", "Aluminium foil was shaped to create reflective surfaces and parts of the landscape."],
                ["TISSUE", "Tissue was used to build and texture selected landscape structures."],
                ["COAL", "Real coal pieces were placed in the mining section to make the demonstration more realistic."],
                ["WATER", "Water was added to represent the river and floodwater moving through the model."],
                ["BRIDGE", "A small bridge was added to make the landscape more realistic and show infrastructure crossing the water."]
            ],

            diagram: true
        },


        /* =================================================
           C — EFFECTS
           ================================================= */

        {
            label: "STEP 03 • FLOOD IMPACT",
            title: "WHAT HAPPENS WHEN THE FLOOD ARRIVES",

            text:
                "When heavy rainfall continues, rivers and drainage channels can receive more water than they can carry. Water may rise above normal levels and spread over nearby land. In our model, the rising water represents the way floodwater can move into low-lying areas and affect people, infrastructure, agriculture, wildlife and other parts of the environment.",

            impacts: [
                "🏠 HOMES — Floodwater can enter houses and disrupt daily life.",
                "🛣️ ROADS — Roads and transport routes can become difficult or impossible to use.",
                "🌾 AGRICULTURE — Fields and crops may be damaged by prolonged flooding.",
                "🐘 WILDLIFE — Animals can lose habitat and move towards safer areas.",
                "🌉 BRIDGES — Bridges and other infrastructure can be affected by strong water flow.",
                "⛏️ MINING — Flooding can disrupt mining areas and surrounding land."
            ],

            diagram: true
        },


        /* =================================================
           D — PREVENTION
           ================================================= */

        {
            label: "STEP 04 • SOLUTION",
            title: "PREVENTION & PROTECTION",

            text:
                "The SHIELD model demonstrates that flood damage can be reduced through awareness, preparation and proper planning. Communities can use early-warning systems, maintain drainage channels, protect natural water bodies, avoid unsafe construction in flood-prone areas and prepare evacuation plans. The aim is not simply to stop water, but to reduce the danger it creates.",

            prevention: [
                "🌧️ MONITOR HEAVY RAINFALL",
                "📢 USE EARLY WARNING SYSTEMS",
                "🌊 KEEP DRAINAGE CHANNELS CLEAR",
                "🌿 PROTECT NATURAL WATER BODIES",
                "🏠 PLAN SAFE BUILDING AREAS",
                "🚨 PREPARE EVACUATION ROUTES",
                "🛟 KEEP EMERGENCY SUPPLIES READY",
                "🛡️ SPREAD FLOOD AWARENESS"
            ],

            diagram: true
        }

    ];


    /* =====================================================
       CREATE CARD CONTENT
       ===================================================== */

    function createCardContent(index) {

        const data = shieldSections[index];

        const card = cards[index];

        if (!card || !data) return;


        let extraHTML = "";


        /* MATERIALS */

        if (data.materials) {

            extraHTML += `
                <div class="model-details">

                    ${data.materials.map(function (item) {

                        return `
                            <div class="model-material">

                                <strong>${item[0]}</strong>

                                <span>
                                    ${item[1]}
                                </span>

                            </div>
                        `;

                    }).join("")}

                </div>
            `;
        }


        /* IMPACTS */

        if (data.impacts) {

            extraHTML += `
                <div class="impact-list">

                    ${data.impacts.map(function (item) {

                        return `
                            <span>${item}</span>
                        `;

                    }).join("")}

                </div>
            `;
        }


        /* PREVENTION */

        if (data.prevention) {

            extraHTML += `
                <div class="prevention-list">

                    ${data.prevention.map(function (item) {

                        return `
                            <span>${item}</span>
                        `;

                    }).join("")}

                </div>
            `;
        }


        /* DIAGRAM */

        if (data.diagram) {

            extraHTML += `

                <div class="flood-model-diagram">

                    <div class="diagram-title">
                        FLOOD FORMATION • MODEL DIAGRAM
                    </div>

                    <div class="diagram-mountain"></div>

                    <div class="diagram-mountain two"></div>

                    <div class="diagram-river"></div>

                    <div class="diagram-point"></div>

                    <div class="diagram-flood"></div>

                </div>

            `;
        }


        card.innerHTML = `

            <div class="card-number">
                ${String.fromCharCode(65 + index)}
            </div>

            <div>

                <span class="card-label">
                    ${data.label}
                </span>

                <h3>
                    ${data.title}
                </h3>

                <p>
                    ${data.text}
                </p>

                ${extraHTML}

            </div>

        `;

    }


    /* =====================================================
       LOAD ALL CONTENT
       ===================================================== */

    shieldSections.forEach(function (_, index) {
        createCardContent(index);
    });


    /* =====================================================
       A B C D SWITCHING
       ===================================================== */

    function activateStep(index) {

        if (index < 0 || index >= steps.length) return;


        /* remove active */

        steps.forEach(function (step) {
            step.classList.remove("active");
        });


        /* activate selected */

        steps[index].classList.add("active");


        /* animate selected card */

        cards.forEach(function (card, cardIndex) {

            card.classList.remove("shield-card-active");

            if (cardIndex === index) {

                /*
                 * Small timeout allows the animation
                 * to restart every time.
                 */

                void card.offsetWidth;

                card.classList.add("shield-card-active");
            }

        });


        /* scroll selected card into view on mobile */

        if (window.innerWidth <= 700) {

            setTimeout(function () {

                cards[index].scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }, 150);

        }

    }


    /* =====================================================
       CLICK A B C D
       ===================================================== */

    steps.forEach(function (step, index) {

        step.setAttribute("role", "button");
        step.setAttribute("tabindex", "0");

        step.addEventListener("click", function () {

            activateStep(index);

        });


        /* keyboard support */

        step.addEventListener("keydown", function (event) {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                activateStep(index);

            }

        });

    });


    /* =====================================================
       START WITH A
       ===================================================== */

    activateStep(0);


    /* =====================================================
       LITTLE GLOW EFFECT WHEN GUIDE OPENS
       ===================================================== */

    const guideButton = document.getElementById("guideButton");

    if (guideButton) {

        guideButton.addEventListener("click", function () {

            setTimeout(function () {

                activateStep(0);

            }, 100);

        });

    }

});
