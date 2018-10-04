'use strict';

window.KeyCode = {
  ENTER: 13,
  ESCAPE: 27
};

window.MainPin = {
  MIN_X: 0,
  MAX_X: 1200,
  MIN_Y: 130,
  MAX_Y: 630,
  HEIGHT: 81,
  WIDTH: 65,
  defaultX: 0,
  defaultY: 0,
  getCoordinateMainPin: function () {
    var mainPin = document.querySelector('.map__pin--main');
    var addressInput = document.querySelector('#address');
    addressInput.value = (Math.round(parseInt(mainPin.style.left, 10) + (this.WIDTH / 2))) + ', ' + Math.round(((parseInt(mainPin.style.top, 10)) + this.HEIGHT));
  },
  getCoordinateMainPinCenter: function () {
    var mainPin = document.querySelector('.map__pin--main');
    var addressInput = document.querySelector('#address');
    addressInput.value = (Math.round(parseInt(mainPin.style.left, 10) + (this.WIDTH / 2))) + ', ' + (Math.round((parseInt(mainPin.style.top, 10)) + (this.HEIGHT / 2)));
  },
};

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  window.MainPin.defaultX = mainPin.style.left;
  window.MainPin.defaultY = mainPin.style.top;
  window.MainPin.MAX_X -= window.MainPin.WIDTH;
})();
