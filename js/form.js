'use strict';
(function () {

  var Form = {
    ELEMENT_VALIDATION: '1px solid #d9d9d3',
    ELEMENT_NON_VALIDATION: '4px solid #ff6d51',
    CAPACITY_VALIDATION: 'none',
    CAPACITY_NON_VALIDATION: '0 0 0 4px #ff6d51',
    TITLE_MIN_LENGTH: 30,
    TITLE_MAX_LENGTH: 100,
    PRICE_MIN: 0,
    PRICE_MAX: 1000000
  };

  var typePrices = {
    palace: {
      title: 'Дворец',
      price: 10000,
    },
    flat: {
      title: 'Квартира',
      price: 1000,
    },
    house: {
      title: 'Дом',
      price: 5000,
    },
    bungalo: {
      title: 'Бунгало',
      price: 0
    }
  };

  var resultData;

  var mainSection = document.querySelector('main');
  var mapClass = mainSection.querySelector('.map');
  var adForm = mainSection.querySelector('.ad-form');
  var formCapacity = adForm.querySelector('#capacity');
  var formCapacityOptions = formCapacity.querySelectorAll('option');

  var disabledFormElements = function (disabledForm) {
    var fieldsetElements = adForm.querySelectorAll('fieldset');
    if (!disabledForm) {
      adForm.classList.remove('ad-form--disabled');
      mapClass.classList.remove('map--faded');
    } else {
      adForm.classList.add('ad-form--disabled');
      mapClass.classList.add('map--faded');
    }

    for (var i = 0; i < fieldsetElements.length; i++) {
      fieldsetElements[i].disabled = disabledForm ? true : false;
    }
  };

  var temporaryFormInfo = {
    type: adForm.querySelector('#type').value,
    roomNumber: 1,
    capacity: 1,
    timein: adForm.querySelector('#timein').value,
    timeout: adForm.querySelector('#timeout').value
  };

  var resetPage = function () {
    window.pin.remove();
    window.form.resultData = undefined;
    disabledFormElements(true);
    window.run.autoStart();

  };

  var onFormElementValidation = function (evt, element) {
    evt = evt === 'not-event' ? element : evt.target;
    evt.style.border = evt.checkValidity() ? Form.ELEMENT_VALIDATION : Form.ELEMENT_NON_VALIDATION;
  };

  var onFormTypeChange = function (validation) {
    var formType = adForm.querySelector('#type');
    var formPrice = adForm.querySelector('#price');
    formPrice.min = typePrices[formType.value].price;
    formPrice.placeholder = typePrices[formType.value].price;
    if (validation !== 'withoutValidation') {
      onFormElementValidation('not-event', formPrice);
    }
  };

  var onFormCapacityValidation = function () {
    formCapacityOptions.forEach(function (item) {
      if (item.selected) {
        if (item.disabled) {
          formCapacity.setCustomValidity('Выберете другое количество мест');
          formCapacity.style.boxShadow = Form.CAPACITY_NON_VALIDATION;
        } else {
          formCapacity.setCustomValidity('');
          formCapacity.style.boxShadow = Form.CAPACITY_VALIDATION;
        }
      }
    });
  };

  var onFormRoomChange = function () {
    var formRoom = adForm.querySelector('#room_number');
    formCapacityOptions.forEach(function (item) {
      switch (formRoom.value) {
        case '100':
          item.disabled = (item.value === '0') ? false : true;
          break;
        case '1':
          item.disabled = (item.value === '1') ? false : true;
          break;
        case '2':
          item.disabled = (item.value >= '1' && item.value <= '2') ? false : true;
          break;
        case '3':
          item.disabled = (item.value >= '1' && item.value <= '3') ? false : true;
          break;
      }
    });

    onFormCapacityValidation();
  };

  var onSelectTimeChacge = function (evt) {
    var selectTimein = adForm.querySelector('#timein');
    var selectTimeout = adForm.querySelector('#timeout');
    if (selectTimein === evt.target) {
      selectTimeout.value = selectTimein.value;
    } else {
      selectTimein.value = selectTimeout.value;
    }

  };

  var setFormConstraints = function () {
    var formTitle = adForm.querySelector('#title');
    var formPrice = adForm.querySelector('#price');
    var formType = adForm.querySelector('#type');
    var formRoom = adForm.querySelector('#room_number');
    var selectTimein = adForm.querySelector('#timein');
    var selectTimeout = adForm.querySelector('#timeout');

    formRoom.value = temporaryFormInfo.roomNumber;
    formCapacity.value = temporaryFormInfo.capacity;

    formTitle.required = true;
    formTitle.setAttribute('minlength', Form.TITLE_MIN_LENGTH);
    formTitle.setAttribute('maxlength', Form.TITLE_MAX_LENGTH);
    formTitle.addEventListener('input', onFormElementValidation);

    formPrice.required = true;
    formPrice.setAttribute('min', Form.PRICE_MIN);
    formPrice.setAttribute('max', Form.PRICE_MAX);
    formPrice.addEventListener('input', onFormElementValidation);

    formType.addEventListener('change', onFormTypeChange);
    formRoom.addEventListener('change', onFormRoomChange);
    formCapacity.addEventListener('change', onFormCapacityValidation);
    selectTimein.addEventListener('change', onSelectTimeChacge);
    selectTimeout.addEventListener('change', onSelectTimeChacge);
    onFormTypeChange('withoutValidation');
    onFormRoomChange();
  };
  setFormConstraints();

  var closeSuccess = function (evt) {
    if ((evt.keyCode === window.variable.KeyCode.ESCAPE) || (evt.type === 'click')) {
      document.removeEventListener('keydown', onKeydownCloseSuccess, true);
      document.removeEventListener('click', onCkickCloseSuccess, true);
      var messageSuccess = mainSection.querySelector('.success');
      messageSuccess.remove();
      resetPage();
    }
  };

  var onCkickCloseSuccess = function (evt) {
    closeSuccess(evt);
  };

  var onKeydownCloseSuccess = function (evt) {
    closeSuccess(evt);
  };

  var closeError = function (evt) {
    if ((evt.keyCode === window.variable.KeyCode.ESCAPE) || ((evt.type === 'click') && (evt.target.classList.contains('error__button')))) {
      document.removeEventListener('keydown', onKeydownCloseError, true);
      var messageError = mainSection.querySelector('.error');
      messageError.remove();
      resetPage();
    }
  };

  var onClickCloseError = function (evt) {
    closeError(evt);
  };

  var onKeydownCloseError = function (evt) {
    closeError(evt);
  };

  var showResult = function (error) {
    var fragmentResult = document.createDocumentFragment();
    var templateResult;
    var cloneResult;
    var messageError;
    var mainErrorClass;
    if (!error) {
      templateResult = document.querySelector('#success');
      cloneResult = document.importNode(templateResult.content, true);
      fragmentResult.appendChild(cloneResult);
      mainSection.appendChild(fragmentResult);

      document.addEventListener('keydown', onKeydownCloseSuccess, true);
      document.addEventListener('click', onCkickCloseSuccess, true);

    } else {
      templateResult = document.querySelector('#error');
      cloneResult = document.importNode(templateResult.content, true);
      messageError = cloneResult.querySelector('.error__message');
      mainErrorClass = cloneResult.querySelector('.error');
      messageError.innerHTML += '<br>' + error;
      fragmentResult.appendChild(cloneResult);
      mainSection.appendChild(fragmentResult);

      document.addEventListener('keydown', onKeydownCloseError, true);
      mainErrorClass.addEventListener('click', onClickCloseError);
    }
  };


  var onReset = function (evt) {
    if (evt) {
      evt.preventDefault();
    }
    var formTitle = adForm.querySelector('#title');
    var formPrice = adForm.querySelector('#price');
    var formType = adForm.querySelector('#type');
    var formRoom = adForm.querySelector('#room_number');
    var formAvatarFile = adForm.querySelector('.ad-form-header__input');
    var formPhotoFile = adForm.querySelector('.ad-form__input');
    var formDescription = adForm.querySelector('#description');
    var formfeature = adForm.querySelector('.features');
    var formElementInput = formfeature.querySelectorAll('input');
    var formTimein = adForm.querySelector('#timein');
    var formTimeout = adForm.querySelector('#timeout');

    formTitle.style.border = Form.ELEMENT_VALIDATION;
    formPrice.style.border = Form.ELEMENT_VALIDATION;
    formCapacity.style.boxShadow = Form.CAPACITY_VALIDATION;

    formType.value = temporaryFormInfo.type;
    formRoom.value = temporaryFormInfo.roomNumber;
    formPrice.value = '';
    formCapacity.value = temporaryFormInfo.capacity;
    formTimein.value = temporaryFormInfo.timein;
    formTimeout.value = temporaryFormInfo.timeout;
    formTitle.value = '';
    formAvatarFile.value = '';
    formPhotoFile.value = '';
    formDescription.value = '';
    formElementInput.forEach(function (item) {
      item.checked = false;
    });
    onFormTypeChange('withoutValidation');
    onFormRoomChange();
    resetPage();
  };

  var onLoad = function (data) {
    window.form.resultData = data.slice();
    window.pin.render(window.form.resultData);
    window.filter.disable(false);
  };

  var onSuccess = function () {
    showResult();
  };

  var onError = function (error) {
    showResult(error);
  };

  var onSubmit = function (evt) {
    evt.preventDefault();
    evt.target.blur();
    var formTitle = adForm.querySelector('#title');
    var formPrice = adForm.querySelector('#price');

    if (formTitle.validity.valid && formPrice.validity.valid && formCapacity.validity.valid) {
      var formData = new FormData(adForm);
      window.backend.request(onSuccess, onError, formData);
      onReset();
    } else {
      onFormTypeChange();
      onFormRoomChange();
      onFormElementValidation('not-event', formTitle);
    }
  };

  var addButtonAction = function () {
    var buttonReset = adForm.querySelector('.ad-form__reset');
    var buttonSubmit = adForm.querySelector('.ad-form__submit');
    buttonReset.addEventListener('click', onReset);
    buttonSubmit.addEventListener('click', onSubmit);

  };
  addButtonAction();


  window.form = {
    disabled: disabledFormElements,
    showResult: showResult,
    getLoad: onLoad,
    showSuccess: onSuccess,
    showError: onError,
    resultData: resultData
  };
})();
