'use strict';
(function () {

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

    data.forEach(function (item, i) {
      if (i < window.variable.maxPinOnMap) {
        adsArray.push(item);
        var clonePin = document.importNode(templatePin.content, true);
        var pinButton = clonePin.querySelector('button');
        var pinImg = clonePin.querySelector('img');
        pinButton.style = 'left: ' + item.location.x + 'px; top: ' + item.location.y + 'px';
        pinImg.src = item.author.avatar;
        pinImg.alt = item.offer.title;
        fragmentPin.appendChild(clonePin);
      }
    });

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
