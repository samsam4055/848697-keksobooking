'use strict';

var adsData = {
  avatarNames: ['01', '02', '03', '04', '05', '06', '07', '08'],
  offerTitles: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
  locationMinX: window.MainPin.MIN_X,
  locationMinY: window.MainPin.MIN_Y,
  locationMaxX: window.MainPin.MAX_X,
  locationMaxY: window.MainPin.MAX_Y,
  priceMin: 1000,
  priceMax: 1000000,
  types: {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  },
  roomsMin: 1,
  roomsMax: 5,
  guestsMax: 5,
  checkIn: ['12:00', '13:00', '14:00'],
  checkOut: ['12:00', '13:00', '14:00'],
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  qtyAds: 8,
  pinSize: {
    width: 50,
    height: 70
  }
};


window.getRandomNumbers = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

window.getUniqueElementOfArray = function (targetArray) {
  var result = (targetArray.splice(window.getRandomNumbers(0, targetArray.length - 1), 1)).toString();
  return result;
};

window.getUniqueArrayOfArray = function (inputArray, notNull) {
  var cloneArray = inputArray.slice();
  var arrayResult = [];
  var start = 0;
  if (notNull) {
    start = 1;
  }
  for (var i = 0; i < window.getRandomNumbers(start, inputArray.length); i++) {
    arrayResult.push(window.getUniqueElementOfArray(cloneArray));
  }
  return arrayResult;
};

window.disabledFormElements = function (disabledForm) {
  var adForm = document.querySelector('.ad-form');
  var fieldsetElements = adForm.querySelectorAll('fieldset');
  var mapClass = document.querySelector('.map');
  if (!disabledForm) {
    adForm.classList.remove('ad-form--disabled');
    mapClass.classList.remove('map--faded');
  } else {
    adForm.classList.add('ad-form--disabled');
    mapClass.classList.add('map--faded');
  }

  for (var i = 0; i < fieldsetElements.length; i++) {
    if (!disabledForm) {
      fieldsetElements[i].disabled = false;
    } else {
      fieldsetElements[i].disabled = true;
    }
  }
  window.closeCard();
};
window.disabledFormElements(true);

var onClickPin = function (evt) {
  var currentActivePin = document.querySelector('.map__pin--active');
  if (currentActivePin) {
    currentActivePin.classList.remove('map__pin--active');
  }
  window.closeCard(true);
  evt.currentTarget.classList.add('map__pin--active');
  window.createCardAds(window.adsArray);
};

window.onMouseDownMainPin = function (evt) {
  evt.preventDefault();
  var mainPin = document.querySelector('.map__pin--main');
  var startDrag = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMoveMainPin = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = {
      x: startDrag.x - moveEvt.clientX,
      y: startDrag.y - moveEvt.clientY
    };
    startDrag = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };
    var newY = mainPin.offsetTop - shift.y;
    var newX = mainPin.offsetLeft - shift.x;
    if (newX < window.MainPin.MIN_X) {
      newX = window.MainPin.MIN_X;
    } else if (newX > window.MainPin.MAX_X) {
      newX = window.MainPin.MAX_X;
    }
    if (newY < window.MainPin.MIN_Y) {
      newY = window.MainPin.MIN_Y;
    } else if (newY > window.MainPin.MAX_Y) {
      newY = window.MainPin.MAX_Y;
    }
    mainPin.style.top = newY + 'px';
    mainPin.style.left = newX + 'px';

  };

  var onMouseUpMainPin = function (mouseUpEvt) {
    mouseUpEvt.preventDefault();
    document.removeEventListener('mousemove', onMoveMainPin);
    document.removeEventListener('mouseup', onMouseUpMainPin);

    var map = document.querySelector('.map');
    if (map.classList.contains('map--faded')) {
      window.disabledFormElements(false);
      window.adsArray = window.renderPinAdsOnPage(adsData);
      mainPin.style.top = (Math.round((parseInt(mainPin.style.top, 10)) - (window.MainPin.HEIGHT / 2))) + 'px';
    }

    var mapPins = document.querySelector('.map__pins');
    var mapPin = mapPins.querySelectorAll('.map__pin');
    for (var i = 0; i < mapPin.length; i++) {
      mapPin[i].addEventListener('mouseup', function (evtPin) {
        if (!evtPin.currentTarget.classList.contains('map__pin--main')) {
          onClickPin(evtPin);
        }
      });
    }

    window.MainPin.getCoordinateMainPin();
  };


  document.addEventListener('mousemove', onMoveMainPin);
  document.addEventListener('mouseup', onMouseUpMainPin);
};
