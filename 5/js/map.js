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

var temporaryVariables = {
  clones: {
    avatar: [],
    title: []
  }
};

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


var generateAds = function (data) {
  var address = {
    x: getRandomNumbers(data.locationMinX, data.locationMaxX),
    y: getRandomNumbers(data.locationMinY, data.locationMaxY)
  };
  var ads = {
    author: {
      avatar: 'img/avatars/user' + getUniqueElementOfArray(data.avatarNames) + '.png'
    },
    offer: {
      title: getUniqueElementOfArray(data.offerTitles),
      address: address.x + ', ' + address.y,
      price: getRandomNumbers(data.priceMin, data.priceMax),
      type: Object.getOwnPropertyNames(data.types)[(getRandomNumbers(1, Object.getOwnPropertyNames(data.types).length)) - 1],
      rooms: getRandomNumbers(data.roomsMin, data.roomsMax),
      guests: getRandomNumbers(1, data.guestsMax),
      checkin: data.checkIn[getRandomNumbers(0, data.checkIn.length - 1)],
      checkout: data.checkOut[getRandomNumbers(0, data.checkOut.length - 1)],
      features: getUniqueArrayOfArray(data.features),
      description: '',
      photos: getUniqueArrayOfArray(data.photos, 'notNull')
    },
    location: {
      x: address.x - (data.pinSize.width / 2),
      y: address.y - data.pinSize.height
    }
  };
  return ads;
};


var renderPinAdsOnPage = function (data) {
  var adsArray = [];
  var pins = document.querySelector('.map__pins');
  var fragmentPin = document.createDocumentFragment();
  var templatePin = document.querySelector('#pin');

  temporaryVariables.clones.avatar = data.avatarNames.slice();
  temporaryVariables.clones.title = data.offerTitles.slice();
  for (var i = 0; i < data['qtyAds']; i++) {
    var currentAds = generateAds(data);
    adsArray.push(currentAds);
    var clonePin = document.importNode(templatePin.content, true);
    var pinButton = clonePin.querySelector('button');
    var pinImg = clonePin.querySelector('img');
    pinButton.style = 'left: ' + currentAds.location.x + 'px; top: ' + currentAds.location.y + 'px';
    pinImg.src = currentAds.author.avatar;
    pinImg.alt = currentAds.offer.title;
    fragmentPin.appendChild(clonePin);
  }
  data.avatarNames = temporaryVariables.clones.avatar.slice();
  data.offerTitles = temporaryVariables.clones.title.slice();
  temporaryVariables.clones.avatar = [];
  temporaryVariables.clones.title = [];

  pins.appendChild(fragmentPin);
  return adsArray;
};


var closeCard = function (notRemoveClassActivePin) {
  var mapCard = document.querySelector('.map__card');
  if (mapCard) {
    mapCard.remove();
  }
  if (!notRemoveClassActivePin) {
    var currentActivePin = document.querySelector('.map__pin--active');
    if (currentActivePin) {
      currentActivePin.classList.remove('map__pin--active');
    }
  }
};

var onCardClose = function (evt) {
  if (evt.keyCode === window.KeyCode.ESCAPE) {
    document.removeEventListener('keydown', onCardClose);
    closeCard();
  }
};

var createCardAds = function (inputAdsArray) {
  var mapClass = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters-container');
  var fragmentCard = document.createDocumentFragment();
  var templateCard = document.querySelector('#card');
  var cloneCard = document.importNode(templateCard.content, true);

  var activePin = document.querySelector('.map__pin--active');
  var activePinAvatar = activePin.querySelector('img');

  for (var j = 0; j < inputAdsArray.length; j++) {
    if (activePinAvatar.alt === inputAdsArray[j].offer.title) {

      var cardImg = cloneCard.querySelector('.popup__avatar');
      cardImg.src = inputAdsArray[j].author.avatar;

      var cardTitle = cloneCard.querySelector('.popup__title');
      cardTitle.textContent = inputAdsArray[j].offer.title;

      var cardAddress = cloneCard.querySelector('.popup__text--address');
      cardAddress.textContent = inputAdsArray[j].offer.address;

      var cardPrice = cloneCard.querySelector('.popup__text--price');
      cardPrice.textContent = inputAdsArray[j].offer.price + '₽/ночь';

      var cardType = cloneCard.querySelector('.popup__type');
      cardType.textContent = inputAdsArray.type;

      var cardCapacity = cloneCard.querySelector('.popup__text--capacity');
      cardCapacity.textContent = inputAdsArray[j].offer.rooms + ' комнаты для ' + inputAdsArray[j].offer.guests + ' гостей';

      var cardFeatures = cloneCard.querySelector('.popup__features');
      var cardFeature = cardFeatures.querySelectorAll('.popup__feature');
      if (inputAdsArray[j].offer.features.length > 0) {
        for (var n = 0; n < cardFeature.length; n++) {
          cardFeature[n].classList.add('visually-hidden');
        }
        inputAdsArray[j].offer.features.forEach(function (itemName) {
          var currentFeature = cardFeatures.querySelector('.popup__feature--' + itemName);
          currentFeature.classList.remove('visually-hidden');
        });
      } else {
        cardFeatures.classList.add('hidden');
      }

      var cardDescription = cloneCard.querySelector('.popup__description');
      cardDescription.textContent = inputAdsArray[j].offer.description;

      var cardPhotos = cloneCard.querySelector('.popup__photos');
      var cardPhoto = cardPhotos.querySelector('.popup__photo');
      for (var m = 0; m < inputAdsArray[j].offer.photos.length; m++) {
        if (m === 0) {
          cardPhoto.src = inputAdsArray[j].offer.photos[m];
        } else {
          var cloneCardPhoto = document.importNode(cardPhoto, true);
          cloneCardPhoto.src = inputAdsArray[j].offer.photos[m];
          cardPhotos.appendChild(cloneCardPhoto);
        }
      }
    }
  }

  fragmentCard.appendChild(cloneCard);

  mapClass.insertBefore(fragmentCard, mapFilters);

  var popucClose = document.querySelector('.popup__close');
  popucClose.addEventListener('mouseup', function () {
    closeCard();
  });

  document.addEventListener('keydown', onCardClose);
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
  closeCard();
};
window.disabledFormElements(true);

var onClickPin = function (evt) {
  var currentActivePin = document.querySelector('.map__pin--active');
  if (currentActivePin) {
    currentActivePin.classList.remove('map__pin--active');
  }
  closeCard(true);
  evt.currentTarget.classList.add('map__pin--active');
  createCardAds(window.adsArray);
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
      window.adsArray = renderPinAdsOnPage(adsData);
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
