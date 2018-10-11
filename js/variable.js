'use strict';
(function () {

  var KeyCode = {
    ENTER: 13,
    ESCAPE: 27
  };

  var mainSection = document.querySelector('main');
  var mainPin = mainSection.querySelector('.map__pin--main');

  var MainPin = {
    MIN_X: 0,
    MAX_X: 1200,
    MIN_Y: 130,
    MAX_Y: 630,
    HEIGHT: 81,
    WIDTH: 65,
    defaultX: 0,
    defaultY: 0,
    getCoordinateMainPin: function (center) {
      var addressInput = mainSection.querySelector('#address');
      addressInput.value = (Math.round(parseInt(mainPin.style.left, 10) + (this.WIDTH / 2))) + ', ' + Math.round(((parseInt(mainPin.style.top, 10)) + ((center === 'center') ? (this.HEIGHT / 2) : this.HEIGHT)));
    }
  };

  (function () {
    MainPin.defaultX = mainPin.style.left;
    MainPin.defaultY = mainPin.style.top;
    MainPin.MAX_X -= MainPin.WIDTH;
  })();
  window.variable = {
    KeyCode: KeyCode,
    MainPin: MainPin
  };
})();
