'use strict';

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

var adForm = document.querySelector('.ad-form');

var onFormElementValidation = function (evt, element) {
  evt = evt === 'not-event' ? element : evt.target;
  if (evt.checkValidity()) {
    evt.style.border = '1px solid #d9d9d3';
  } else {
    evt.style.border = '4px solid #ff6d51';
  }
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
  var formCapacity = adForm.querySelector('#capacity');
  var formCapacityOptions = formCapacity.querySelectorAll('option');
  formCapacityOptions.forEach(function (item) {
    if (item.selected) {
      item.validity.valid = false;
    }

  });
};

var onFormRoomChange = function (validation) {
  var formRoom = adForm.querySelector('#room_number');
  var formCapacity = adForm.querySelector('#capacity');
  var formCapacityOptions = formCapacity.querySelectorAll('option');
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

  if (validation !== 'withoutValidation') {
    onFormCapacityValidation();
  }
};


var setFormConstraints = function () {
  var formTitle = adForm.querySelector('#title');
  var formPrice = adForm.querySelector('#price');
  var formType = adForm.querySelector('#type');
  var formRoom = adForm.querySelector('#room_number');

  formTitle.required = true;
  formTitle.setAttribute('min', 30);
  formTitle.setAttribute('max', 100);
  formTitle.addEventListener('keyup', onFormElementValidation);
  formTitle.addEventListener('blur', onFormElementValidation);

  formPrice.required = true;
  formPrice.setAttribute('min', 0);
  formPrice.setAttribute('max', 1000000);
  formPrice.addEventListener('keyup', onFormElementValidation);
  formPrice.addEventListener('blur', onFormElementValidation);
  formPrice.addEventListener('click', onFormElementValidation);

  formType.addEventListener('change', onFormTypeChange);

  formRoom.addEventListener('change', onFormRoomChange);
  onFormTypeChange('withoutValidation');
  onFormRoomChange('withoutValidation');
};
setFormConstraints();


var onSubmit = function (evt) {
  evt.preventDefault();
};

var buttonSubmit = adForm.querySelector('.ad-form__submit');
buttonSubmit.addEventListener('click', onSubmit);
