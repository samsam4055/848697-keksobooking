'use strict';
(function () {

  /*
  var adsArray;
  var adsData = {
    avatarNames: ['01', '02', '03', '04', '05', '06', '07', '08'],
    offerTitles: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
    locationMinX: window.variable.MainPin.MIN_X,
    locationMinY: window.variable.MainPin.MIN_Y,
    locationMaxX: window.variable.MainPin.MAX_X,
    locationMaxY: window.variable.MainPin.MAX_Y,
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
*/

  var getRandomNumbers = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  var getUniqueElementOfArray = function (targetArray) {
    var result = (targetArray.splice(getRandomNumbers(0, targetArray.length - 1), 1)).toString();
    return result;
  };

  var getUniqueArrayOfArray = function (inputArray, notNull) {
    var cloneArray = inputArray.slice();
    var arrayResult = [];
    var start = 0;
    if (notNull) {
      start = 1;
    }
    for (var i = 0; i < getRandomNumbers(start, inputArray.length); i++) {
      arrayResult.push(getUniqueElementOfArray(cloneArray));
    }
    return arrayResult;
  };

  window.form.disabled(true);

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
      if (newX < window.variable.MainPin.MIN_X) {
        newX = window.variable.MainPin.MIN_X;
      } else if (newX > window.variable.MainPin.MAX_X) {
        newX = window.variable.MainPin.MAX_X;
      }
      if (newY < window.variable.MainPin.MIN_Y) {
        newY = window.variable.MainPin.MIN_Y;
      } else if (newY > window.variable.MainPin.MAX_Y) {
        newY = window.variable.MainPin.MAX_Y;
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
        window.form.disabled(false);

        window.backend.loadedCheck = true;
        if (window.backend.resultData) {
          window.pin.render(window.backend.resultData);
        }

        mainPin.style.top = (Math.round((parseInt(mainPin.style.top, 10)) - (window.variable.MainPin.HEIGHT / 2))) + 'px';
      }

      window.variable.MainPin.getCoordinateMainPin();
    };


    document.addEventListener('mousemove', onMoveMainPin);
    document.addEventListener('mouseup', onMouseUpMainPin);
  };
  window.map = {
    onMouseDownMainPin: onMouseDownMainPin,
    getRandomNumbers: getRandomNumbers,
    getUniqueElementOfArray: getUniqueElementOfArray,
    getUniqueArrayOfArray: getUniqueArrayOfArray
  };
})();
