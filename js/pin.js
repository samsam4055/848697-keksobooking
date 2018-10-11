'use strict';
(function () {
  var MAX_PIN_ON_MAP = 5;
  var mainSection = document.querySelector('main');
  var mapClass = mainSection.querySelector('.map');

  var removePins = function () {
    var mapPins = mapClass.querySelector('.map__pins');
    var mapPin = mapPins.querySelectorAll('.map__pin');
    mapPin.forEach(function (item) {
      if (!item.classList.contains('map__pin--main')) {
        item.remove();
      }
    });
  };

  var activatePin = function (evt) {
    if (!evt.currentTarget.classList.contains('map__pin--main')) {
      var currentActivePin = mapClass.querySelector('.map__pin--active');
      if (currentActivePin) {
        currentActivePin.classList.remove('map__pin--active');
      }
      window.card.close(true);
      evt.currentTarget.classList.add('map__pin--active');
      window.card.create(window.form.resultData);
    }
  };

  var renderPinAdsOnPage = function (data) {
    var adsArray = [];
    var pins = mapClass.querySelector('.map__pins');
    var fragmentPin = document.createDocumentFragment();
    var templatePin = document.querySelector('#pin');
    for (var i = 0; (i < MAX_PIN_ON_MAP) && (i < data.length); i++) {
      adsArray.push(data[i]);
      var clonePin = document.importNode(templatePin.content, true);
      var pinButton = clonePin.querySelector('button');
      var pinImg = clonePin.querySelector('img');
      pinButton.style = 'left: ' + data[i].location.x + 'px; top: ' + data[i].location.y + 'px';
      pinImg.src = data[i].author.avatar;
      pinImg.alt = data[i].offer.title;
      fragmentPin.appendChild(clonePin);
    }

    var onClickPin = function (evt) {
      activatePin(evt);
    };

    var onKeydownPin = function (evt) {
      activatePin(evt);
    };

    pins.appendChild(fragmentPin);
    var mapPins = mapClass.querySelector('.map__pins');
    var mapPin = mapPins.querySelectorAll('.map__pin');
    mapPin.forEach(function (item) {
      item.addEventListener('mouseup', function (evtPin) {
        onClickPin(evtPin);
      });
      item.addEventListener('keydown', function (evtPin) {
        if (evtPin.keyCode === window.variable.KeyCode.ENTER) {
          onKeydownPin(evtPin);
        }
      });
    });

    return adsArray;
  };

  window.pin = {
    render: renderPinAdsOnPage,
    remove: removePins
  };
})();
