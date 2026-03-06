(function (app) {
  'use strict';

  const { normalizeLoopIndex, prefersReducedMotion } = app.lib.dom;
  const { createIntervalController } = app.lib.timers;

  function initPhotoCarousel() {
    const carouselTrack = document.querySelector('[data-carousel-track]');
    if (!carouselTrack) {
      return;
    }

    const carousel = carouselTrack.closest('.photo-carousel');
    if (!carousel) {
      return;
    }

    const slides = Array.from(carouselTrack.children);
    const dots = Array.from(carousel.querySelectorAll('[data-carousel-dot]'));
    const prevButton = carousel.querySelector('[data-carousel-prev]');
    const nextButton = carousel.querySelector('[data-carousel-next]');
    const reducedMotion = prefersReducedMotion();

    if (!slides.length || !prevButton || !nextButton || !dots.length) {
      return;
    }

    let currentSlide = 0;

    const autoPlay = createIntervalController(() => {
      showSlide(currentSlide + 1);
    }, app.config.CAROUSEL_AUTOPLAY_MS);

    function showSlide(index) {
      currentSlide = normalizeLoopIndex(index, slides.length);
      carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

      dots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === currentSlide;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-current', String(isActive));
      });
    }

    function restartAutoPlay() {
      autoPlay.stop();
      if (!reducedMotion) {
        autoPlay.start();
      }
    }

    prevButton.addEventListener('click', () => {
      showSlide(currentSlide - 1);
      restartAutoPlay();
    });

    nextButton.addEventListener('click', () => {
      showSlide(currentSlide + 1);
      restartAutoPlay();
    });

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
        restartAutoPlay();
      });
    });

    carousel.addEventListener('mouseenter', autoPlay.stop);
    carousel.addEventListener('mouseleave', restartAutoPlay);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        autoPlay.stop();
        return;
      }

      restartAutoPlay();
    });

    showSlide(0);
    restartAutoPlay();
  }

  app.features.carousel = {
    initPhotoCarousel,
  };
})(window.e4nu);
