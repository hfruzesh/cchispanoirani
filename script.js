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
    updateHeroMenuText(currentIndex);
  });
  
  /* Hamburger Menu Toggle & Animation */
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobile-nav");
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    mobileNav.classList.toggle("open");
  });
  
  /* 3D CAROUSEL EFFECT (Manual Navigation Only) */
  const carouselImages = document.querySelectorAll(".carousel-images img");
  const pinkBg = document.querySelector(".pink-bg");
  const heroMenuText = document.querySelector(".hero-menu-text");
  let currentIndex = 0;
  const totalImages = carouselImages.length;
  
  // Define menu options per slide (including text and link) for Spanish and Farsi
  const menuOptions = [
    { es: "Sobre Nosotros", fa: "درباره ما", link: "sobre-nosotros.html" },
    { es: "Recursos",       fa: "منابع",     link: "recursos.html" },
    { es: "Eventos",        fa: "رویدادها",  link: "eventos.html" },
    { es: "Comunidad",      fa: "جامعه",     link: "comunidad.html" },
    { es: "Contáctanos",    fa: "تماس با ما", link: "contacto.html" },
    { es: "Blog",           fa: "وبلاگ",     link: "blog.html" }
  ];
  
  function updateHeroMenuText(index) {
    if (heroMenuText) {
      const option = menuOptions[index % menuOptions.length];
      heroMenuText.innerHTML = currentLang === "es" ? option.es : option.fa;
      heroMenuText.setAttribute("href", option.link);
      // Animate using same scale/opacity transition as hero images:
      heroMenuText.style.transition = "transform 0.5s ease, opacity 0.5s ease";
      heroMenuText.style.transform = "scale(0.8)";
      heroMenuText.style.opacity = "0";
      setTimeout(() => {
        heroMenuText.style.transform = "scale(1)";
        heroMenuText.style.opacity = "1";
      }, 100);
    }
  }
  updateHeroMenuText(0);
  
  function goToSlide(newIndex, direction = "next") {
    let nextIndex = newIndex;
    if (newIndex >= totalImages) nextIndex = 0;
    if (newIndex < 0) nextIndex = totalImages - 1;
    
    const currentSlide = carouselImages[currentIndex];
    const nextSlide = carouselImages[nextIndex];
    
    if (direction === "next") {
      nextSlide.style.transform = "scale(0.8) translateX(50px) rotateY(-15deg)";
    } else {
      nextSlide.style.transform = "scale(0.8) translateX(-50px) rotateY(15deg)";
    }
    nextSlide.style.opacity = "0";
    nextSlide.classList.add("active");
    
    void nextSlide.offsetWidth;
    
    if (direction === "next") {
      currentSlide.style.transform = "scale(0.8) translateX(-50px) rotateY(15deg)";
    } else {
      currentSlide.style.transform = "scale(0.8) translateX(50px) rotateY(-15deg)";
    }
    currentSlide.style.opacity = "0";
    
    pinkBg.classList.add("flash-white");
    setTimeout(() => {
      pinkBg.classList.remove("flash-white");
    }, 200);
    
    setTimeout(() => {
      nextSlide.style.transform = "scale(1) translateX(0) rotateY(0deg)";
      nextSlide.style.opacity = "1";
      setTimeout(() => {
        currentSlide.classList.remove("active");
        currentSlide.style.transform = "";
        currentSlide.style.opacity = "";
        currentIndex = nextIndex;
        updateHeroMenuText(currentIndex);
      }, 500);
    }, 50);
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