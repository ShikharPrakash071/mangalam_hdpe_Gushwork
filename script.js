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