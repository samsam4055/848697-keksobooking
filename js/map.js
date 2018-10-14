'use strict';
(function () {

  var mapClass = document.querySelector('.map');
  var mainPinHalfHeight = window.variable.MainPin.HEIGHT / 2;

  window.form.disabled(true);

  var onMouseDownMainPin = function (evt) {
    evt.preventDefault();
    var mainPin = mapClass.querySelector('.map__pin--main');
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

      if (mapClass.classList.contains('map--faded')) {
        window.form.disabled(false);
        window.backend.request(window.form.getLoad, window.form.showError);

        mainPin.style.top = (Math.round((parseInt(mainPin.style.top, 10)) - mainPinHalfHeight)) + 'px';
      }

      window.variable.MainPin.getCoordinateMainPin();
    };


    document.addEventListener('mousemove', onMoveMainPin);
    document.addEventListener('mouseup', onMouseUpMainPin);
  };
  window.map = {
    onMouseDownMainPin: onMouseDownMainPin
  };
})();
