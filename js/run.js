'use strict';
(function () {

  var autoStart = function () {
    var mainPin = document.querySelector('.map__pin--main');
    var addressInput = document.querySelector('#address');
    var mapFilters = document.querySelector('.map__filters');
    mapFilters.reset();
    window.filter.disable(true);
    mainPin.style.left = window.variable.MainPin.defaultX;
    mainPin.style.top = window.variable.MainPin.defaultY;
    mainPin.addEventListener('mousedown', window.map.onMouseDownMainPin);
    addressInput.setAttribute('readonly', '');
    window.variable.MainPin.getCoordinateMainPinCenter();
    window.backend.resultData = undefined;
    window.card.close();
  };
  autoStart();
  window.run = {
    autoStart: autoStart
  };
})();
