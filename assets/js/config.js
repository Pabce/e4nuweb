(function (app) {
  'use strict';

  app.config = {
    PARTICLE_COUNT: 40,
    NAVBAR_SCROLL_THRESHOLD: 50,
    CAROUSEL_AUTOPLAY_MS: 5500,
    MEC_AUTOPLAY_MS: 1900,
    MEC_PHASES: ['pair', 'exchange', 'knockout'],
    RES_AUTOPLAY_MS: 1900,
    RES_PHASES: ['approach', 'resonance', 'decay'],
    DIS_AUTOPLAY_MS: 1900,
    DIS_PHASES: ['approach', 'scatter', 'hadronize'],
    KONAMI_SEQUENCE: [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a',
    ],
  };
})(window.e4nu);
