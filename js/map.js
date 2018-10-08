'use strict';
(function () {

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
        window.backend.request(window.form.getLoad, window.form.showError);

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
