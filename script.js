document.addEventListener("DOMContentLoaded", () => {
    const topbar = document.getElementById("stickyTopbar");
    const firstFold = document.querySelector(".fold-one");
    const carouselTrack = document.getElementById("carouselTrack");
    const prevSlideButton = document.getElementById("prevSlide");
    const nextSlideButton = document.getElementById("nextSlide");
    const heroThumbs = Array.from(document.querySelectorAll(".hero-thumb"));
    const slides = Array.from(document.querySelectorAll(".carousel-card"));
    const processTabs = Array.from(document.querySelectorAll(".process-tab"));
    const processTitle = document.getElementById("processTitle");
    const processDescription = document.getElementById("processDescription");
    const processPoints = document.getElementById("processPoints");
    const processMediaTrack = document.getElementById("processMediaTrack");
    const processPrevButton = document.getElementById("processPrev");
    const processNextButton = document.getElementById("processNext");
    const processImages = Array.from(document.querySelectorAll("#processMediaTrack img"));
    const applicationsTrack = document.getElementById("applicationsTrack");
    const applicationsPrevButton = document.getElementById("appsPrev");
    const applicationsNextButton = document.getElementById("appsNext");
    const applicationCards = Array.from(document.querySelectorAll(".application-card"));
    const faqRows = Array.from(document.querySelectorAll(".faq-row"));

    let activeIndex = 0;
    let processImageIndex = 0;
    let applicationsIndex = 0;

    function updateCarousel(index) {
        if (!carouselTrack || slides.length === 0) {
            return;
        }

        activeIndex = (index + slides.length) % slides.length;
        carouselTrack.style.transform = `translateX(-${activeIndex * 100}%)`;

        heroThumbs.forEach((thumb) => {
            const thumbIndex = Number(thumb.dataset.index);
            thumb.classList.toggle("is-active", thumbIndex === activeIndex);
        });
    }

    
    // Sticky top bar appears only after user scrolls beyond first fold.
    function handleScroll() {
        if (!firstFold || !topbar) {
            return;
        }

        const showTopbar = window.scrollY > firstFold.offsetHeight;
        topbar.classList.toggle("show", showTopbar);
    }

    prevSlideButton?.addEventListener("click", () => {
        updateCarousel(activeIndex - 1);
    });

    nextSlideButton?.addEventListener("click", () => {
        updateCarousel(activeIndex + 1);
    });

    heroThumbs.forEach((thumb) => {
        thumb.addEventListener("click", () => {
            const index = Number(thumb.dataset.index);
            if (!Number.isNaN(index)) {
                updateCarousel(index);
            }
        });
    });

    function updateProcessImage(index) {
        if (!processMediaTrack || processImages.length === 0) {
            return;
        }
        processImageIndex = (index + processImages.length) % processImages.length;
        processMediaTrack.style.transform = `translateX(-${processImageIndex * 100}%)`;
    }

    processPrevButton?.addEventListener("click", () => {
        updateProcessImage(processImageIndex - 1);
    });

    processNextButton?.addEventListener("click", () => {
        updateProcessImage(processImageIndex + 1);
    });

    processTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            processTabs.forEach((item) => item.classList.remove("is-active"));
            tab.classList.add("is-active");

            if (processTitle) {
                processTitle.textContent = tab.dataset.title || "";
            }
            if (processDescription) {
                processDescription.textContent = tab.dataset.description || "";
            }
            if (processPoints) {
                const pointOne = tab.dataset.pointOne || "";
                const pointTwo = tab.dataset.pointTwo || "";
                processPoints.innerHTML = `<li>${pointOne}</li><li>${pointTwo}</li>`;
            }
        });
    }); 

    function getApplicationsPerView() {
        if (window.innerWidth <= 768) {
            return 1;
        }
        if (window.innerWidth <= 1024) {
            return 2;
        }
        return 3;
    }

    function updateApplicationsCarousel(index) {
        if (!applicationsTrack || applicationCards.length === 0) {
            return;
        }

        const cardsPerView = getApplicationsPerView();
        const maxIndex = Math.max(0, applicationCards.length - cardsPerView);
        applicationsIndex = Math.min(Math.max(index, 0), maxIndex);

        const firstCard = applicationCards[0];
        const cardWidth = firstCard.getBoundingClientRect().width;
        const computedStyle = window.getComputedStyle(applicationsTrack);
        const gap = Number.parseFloat(computedStyle.columnGap || computedStyle.gap || "0");
        const offset = applicationsIndex * (cardWidth + gap);
        applicationsTrack.style.transform = `translateX(-${offset}px)`;
    }

    applicationsPrevButton?.addEventListener("click", () => {
        updateApplicationsCarousel(applicationsIndex - 1);
    });

    applicationsNextButton?.addEventListener("click", () => {
        updateApplicationsCarousel(applicationsIndex + 1);
    });
faqRows.forEach((row) => {
    const button = row.querySelector(".faq-q-btn");

    button?.addEventListener("click", () => {
        const isOpen = row.classList.contains("is-open");

        faqRows.forEach((item) => {
            item.classList.remove("is-open");
        });

        if (!isOpen) {
            row.classList.add("is-open");
        }
    });
});

    window.addEventListener("resize", () => {
        updateApplicationsCarousel(applicationsIndex);
    });

    window.addEventListener("scroll", handleScroll);
    updateCarousel(0);
    handleScroll();
    updateProcessImage(0);
    updateApplicationsCarousel(0);

    // ---- Mobile process stepper ----
    const mobileSteps = [
        { badge: "Step 1/8: Raw Material",     title: "High-Grade Raw Material Selection",   desc: "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.", p1: "PE100 grade material", p2: "Optimal molecular weight distribution" },
        { badge: "Step 2/8: Extrusion",         title: "Precision Extrusion Control",          desc: "Automated extruders maintain stable melt flow and pressure control for high dimensional consistency.", p1: "Uniform wall thickness", p2: "Automated process control" },
        { badge: "Step 3/8: Cooling",           title: "Controlled Cooling System",            desc: "Advanced cooling channels stabilize product geometry while preventing internal stress.", p1: "Consistent roundness", p2: "Improved product stability" },
        { badge: "Step 4/8: Sizing",            title: "Accurate Sizing & Calibration",        desc: "Sizing units fine-tune diameter tolerance to ensure seamless fit and dependable performance.", p1: "Tight tolerance control", p2: "Superior dimensional accuracy" },
        { badge: "Step 5/8: Quality Control",   title: "Strict Quality Control Checks",        desc: "Each production batch is tested for strength, durability, and compliance with required standards.", p1: "Pressure and burst tests", p2: "Material traceability" },
        { badge: "Step 6/8: Marking",           title: "Batch Marking & Identification",       desc: "Every pipe is marked with technical specifications for complete traceability and field verification.", p1: "Clear product coding", p2: "Standards-compliant labeling" },
        { badge: "Step 7/8: Cutting",           title: "Precision Cutting Process",            desc: "Automated cutting units produce consistent pipe lengths with clean edges for installation.", p1: "Accurate cut lengths", p2: "Reduced installation waste" },
        { badge: "Step 8/8: Packaging",         title: "Secure Packaging & Dispatch",          desc: "Products are bundled and dispatched with protective handling to preserve quality in transit.", p1: "Damage-resistant bundling", p2: "On-time delivery readiness" },
    ];

    let mobileStepIndex = 0;

    const mobileBadge      = document.getElementById("mobileBadge");
    const mobileProcTitle  = document.getElementById("mobileProcTitle");
    const mobileProcDesc   = document.getElementById("mobileProcDesc");
    const mobileProcPoints = document.getElementById("mobileProcPoints");
    const mobileProcPrev   = document.getElementById("mobileProcPrev");
    const mobileProcNext   = document.getElementById("mobileProcNext");

    function updateMobileStep(index) {
        mobileStepIndex = (index + mobileSteps.length) % mobileSteps.length;
        const step = mobileSteps[mobileStepIndex];
        if (mobileBadge)      mobileBadge.textContent = step.badge;
        if (mobileProcTitle)  mobileProcTitle.textContent = step.title;
        if (mobileProcDesc)   mobileProcDesc.textContent = step.desc;
        if (mobileProcPoints) {
            mobileProcPoints.innerHTML =
                \`<div class="feature-item"><img src="assets/images/CheckCircle.png" alt="check"><p>\${step.p1}</p></div>
                 <div class="feature-item"><img src="assets/images/CheckCircle.png" alt="check"><p>\${step.p2}</p></div>\`;
        }
    }

    mobileProcPrev?.addEventListener("click", () => updateMobileStep(mobileStepIndex - 1));
    mobileProcNext?.addEventListener("click", () => updateMobileStep(mobileStepIndex + 1));

    updateMobileStep(0);

});
