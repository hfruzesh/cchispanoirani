document.addEventListener("DOMContentLoaded", function () {
  /* LANGUAGE SWITCHER */
  const langSwitchBtn = document.getElementById("lang-switch");
  let currentLang = "es";
  
  function updateLanguage(lang) {
    const translateElements = document.querySelectorAll(".translate");
    translateElements.forEach((el) => {
      el.innerHTML = lang === "es"
        ? el.getAttribute("data-es")
        : el.getAttribute("data-fa");
    });
  }
  updateLanguage(currentLang);
  
  langSwitchBtn.addEventListener("click", function () {
    currentLang = currentLang === "es" ? "fa" : "es";
    langSwitchBtn.innerHTML = currentLang === "es" ? "Switch to Farsi" : "Switch to Spanish";
    updateLanguage(currentLang);
    updateHeroOverlayButton(realIndex - 1);
  });
  
  /* Hamburger Menu Toggle & Animation */
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobile-nav");
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    mobileNav.classList.toggle("open");
  });
  
  /* HERO CAROUSEL: Infinite Swipe & Smooth Slide Transition */
  const carouselImagesContainer = document.querySelector(".carousel-images");
  let images = carouselImagesContainer.querySelectorAll("img");
  
  // Clone first and last images for infinite effect
  const firstClone = images[0].cloneNode(true);
  const lastClone = images[images.length - 1].cloneNode(true);
  carouselImagesContainer.appendChild(firstClone);
  carouselImagesContainer.insertBefore(lastClone, images[0]);
  
  // Update images NodeList and total count (including clones)
  images = carouselImagesContainer.querySelectorAll("img");
  const totalImages = images.length;
  
  // Set container width so that each image is 100vw wide
  carouselImagesContainer.style.width = `${totalImages * 100}vw`;
  
  // Set initial index to 1 (first real image) WITHOUT animation
  let currentIndex = 1;
  let realIndex = 1; // for dynamic overlay button text
  carouselImagesContainer.style.transition = "none";
  carouselImagesContainer.style.transform = `translateX(-${currentIndex * 100}vw)`;
  void carouselImagesContainer.offsetWidth;
  carouselImagesContainer.style.transition = "transform 0.5s ease-in-out";
  
  // Swipe detection variables
  const heroCarousel = document.querySelector(".hero-carousel");
  let touchStartX = 0;
  let touchEndX = 0;
  const swipeThreshold = 50;
  
  heroCarousel.addEventListener("touchstart", function(e) {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  heroCarousel.addEventListener("touchend", function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    if (touchEndX < touchStartX - swipeThreshold) {
      goToSlide(currentIndex + 1, "next");
    } else if (touchEndX > touchStartX + swipeThreshold) {
      goToSlide(currentIndex - 1, "prev");
    }
  }
  
  // Define menu options for dynamic overlay button (for real images)
  const menuOptions = [
    { es: "Sobre Nosotros", fa: "درباره ما", link: "sobre-nosotros.html" },
    { es: "Recursos",       fa: "منابع",     link: "recursos.html" },
    { es: "Eventos",        fa: "رویدادها",  link: "eventos.html" },
    { es: "Comunidad",      fa: "جامعه",     link: "comunidad.html" },
    { es: "Contáctanos",    fa: "تماس با ما", link: "contacto.html" },
    { es: "Blog",           fa: "وبلاگ",     link: "blog.html" }
  ];
  
  const heroOverlayButton = document.querySelector(".hero-overlay-button");
  
  function updateHeroOverlayButton(realIdx) {
    if (heroOverlayButton) {
      const option = menuOptions[realIdx % menuOptions.length];
      heroOverlayButton.setAttribute("href", option.link);
      const textSpan = heroOverlayButton.querySelector(".hero-btn-text");
      textSpan.innerHTML = currentLang === "es" ? option.es : option.fa;
      heroOverlayButton.style.transition = "opacity 0.5s ease";
      heroOverlayButton.style.opacity = "1";
    }
  }
  updateHeroOverlayButton(realIndex - 1);
  
  // Smooth slide transition for the carousel using container transform
  function goToSlide(newIndex, direction = "next") {
    heroOverlayButton.style.opacity = "0";
    currentIndex = newIndex;
    carouselImagesContainer.style.transition = "transform 0.5s ease-in-out";
    carouselImagesContainer.style.transform = `translateX(-${currentIndex * 100}vw)`;
    
    carouselImagesContainer.addEventListener("transitionend", function handler() {
      if (currentIndex === 0) {
        carouselImagesContainer.style.transition = "none";
        currentIndex = totalImages - 2;
        carouselImagesContainer.style.transform = `translateX(-${currentIndex * 100}vw)`;
      }
      if (currentIndex === totalImages - 1) {
        carouselImagesContainer.style.transition = "none";
        currentIndex = 1;
        carouselImagesContainer.style.transform = `translateX(-${currentIndex * 100}vw)`;
      }
      realIndex = currentIndex;
      if (currentIndex === 0) realIndex = totalImages - 2;
      if (currentIndex === totalImages - 1) realIndex = 1;
      updateHeroOverlayButton(realIndex - 1);
      carouselImagesContainer.removeEventListener("transitionend", handler);
    });
  }
  
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");
  
  nextBtn.addEventListener("click", () => {
    goToSlide(currentIndex + 1, "next");
  });
  prevBtn.addEventListener("click", () => {
    goToSlide(currentIndex - 1, "prev");
  });
});