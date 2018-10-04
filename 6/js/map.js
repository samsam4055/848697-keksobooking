'use strict';

window.KeyCode = {
  ENTER: 13,
  ESCAPE: 27
};

var MainPin = {
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
  MainPin.defaultX = mainPin.style.left;
  MainPin.defaultY = mainPin.style.top;
  MainPin.MAX_X -= MainPin.WIDTH;
})();

var adsData = {
  avatarNames: ['01', '02', '03', '04', '05', '06', '07', '08'],
  offerTitles: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
  locationMinX: MainPin.MIN_X,
  locationMinY: MainPin.MIN_Y,
  locationMaxX: MainPin.MAX_X,
  locationMaxY: MainPin.MAX_Y,
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

var onMouseDownMainPin = function (evt) {
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
    if (newX < MainPin.MIN_X) {
      newX = MainPin.MIN_X;
    } else if (newX > MainPin.MAX_X) {
      newX = MainPin.MAX_X;
    }
    if (newY < MainPin.MIN_Y) {
      newY = MainPin.MIN_Y;
    } else if (newY > MainPin.MAX_Y) {
      newY = MainPin.MAX_Y;
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
      mainPin.style.top = (Math.round((parseInt(mainPin.style.top, 10)) - (MainPin.HEIGHT / 2))) + 'px';
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

    MainPin.getCoordinateMainPin();
  };


  document.addEventListener('mousemove', onMoveMainPin);
  document.addEventListener('mouseup', onMouseUpMainPin);
};

window.autoStart = function () {
  var mainPin = document.querySelector('.map__pin--main');
  mainPin.style.left = MainPin.defaultX;
  mainPin.style.top = MainPin.defaultY;
  mainPin.addEventListener('mousedown', onMouseDownMainPin);
  var addressInput = document.querySelector('#address');
  addressInput.setAttribute('readonly', '');
  MainPin.getCoordinateMainPinCenter();
};
window.autoStart();
