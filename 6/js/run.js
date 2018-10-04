'use strict';

window.autoStart = function () {
  var mainPin = document.querySelector('.map__pin--main');
  mainPin.style.left = window.MainPin.defaultX;
  mainPin.style.top = window.MainPin.defaultY;
  mainPin.addEventListener('mousedown', window.onMouseDownMainPin);
  var addressInput = document.querySelector('#address');
  addressInput.setAttribute('readonly', '');
  window.MainPin.getCoordinateMainPinCenter();
};
window.autoStart();
