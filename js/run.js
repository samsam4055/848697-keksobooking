'use strict';
(function () {

  var autoStart = function () {
    var mainPin = document.querySelector('.map__pin--main');
    mainPin.style.left = window.variable.MainPin.defaultX;
    mainPin.style.top = window.variable.MainPin.defaultY;
    mainPin.addEventListener('mousedown', window.map.onMouseDownMainPin);
    var addressInput = document.querySelector('#address');
    addressInput.setAttribute('readonly', '');
    window.variable.MainPin.getCoordinateMainPinCenter();
  };
  autoStart();
  window.run = {
    autoStart: autoStart
  };
})();
