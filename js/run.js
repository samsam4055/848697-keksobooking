'use strict';
(function () {

  var autoStart = function () {
    var mainSection = document.querySelector('main');
    var mainPin = mainSection.querySelector('.map__pin--main');
    var addressInput = mainSection.querySelector('#address');
    var mapFilters = mainSection.querySelector('.map__filters');
    mapFilters.reset();
    window.filter.disable(true);
    mainPin.style.left = window.variable.MainPin.defaultX;
    mainPin.style.top = window.variable.MainPin.defaultY;
    mainPin.addEventListener('mousedown', window.map.onMouseDownMainPin);
    addressInput.setAttribute('readonly', '');
    window.variable.MainPin.getCoordinateMainPin('center');
    window.card.close();
  };
  autoStart();
  window.run = {
    autoStart: autoStart
  };
})();
