'use strict';
(function () {
  var MAX_PIN_ON_MAP = 5;

  var removePins = function () {
    var mapPins = document.querySelector('.map__pins');
    var mapPin = mapPins.querySelectorAll('.map__pin');
    mapPin.forEach(function (item) {
      if (!item.classList.contains('map__pin--main')) {
        item.remove();
      }
    });
  };

  var onClickPin = function (evt) {
    var currentActivePin = document.querySelector('.map__pin--active');
    if (currentActivePin) {
      currentActivePin.classList.remove('map__pin--active');
    }
    window.card.close(true);
    evt.currentTarget.classList.add('map__pin--active');
    window.card.create(window.backend.resultData);
  };

  var renderPinAdsOnPage = function (data) {
    var adsArray = [];
    var pins = document.querySelector('.map__pins');
    var fragmentPin = document.createDocumentFragment();
    var templatePin = document.querySelector('#pin');

    for (var j = 0; (j < MAX_PIN_ON_MAP) && (j < data.length); j++) {
      adsArray.push(data[j]);
      var clonePin = document.importNode(templatePin.content, true);
      var pinButton = clonePin.querySelector('button');
      var pinImg = clonePin.querySelector('img');
      pinButton.style = 'left: ' + data[j].location.x + 'px; top: ' + data[j].location.y + 'px';
      pinImg.src = data[j].author.avatar;
      pinImg.alt = data[j].offer.title;
      fragmentPin.appendChild(clonePin);
    }

    pins.appendChild(fragmentPin);
    var mapPins = document.querySelector('.map__pins');
    var mapPin = mapPins.querySelectorAll('.map__pin');
    for (var i = 0; i < mapPin.length; i++) {
      mapPin[i].addEventListener('mouseup', function (evtPin) {
        if (!evtPin.currentTarget.classList.contains('map__pin--main')) {
          onClickPin(evtPin);
        }
      });
      mapPin[i].addEventListener('keydown', function (evtPin) {
        if (evtPin.keyCode === window.variable.KeyCode.ENTER) {
          if (!evtPin.currentTarget.classList.contains('map__pin--main')) {
            onClickPin(evtPin);
          }
        }
      });
    }
    return adsArray;
  };

  window.pin = {
    render: renderPinAdsOnPage,
    remove: removePins
  };
})();
