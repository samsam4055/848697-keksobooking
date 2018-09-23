'use strict';

var QUANTITY_SIMILARS_ADS = 8;
var AVATAR_NAMES = ['01', '02', '03', '04', '05', '06', '07', '08'];
var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var LOCATION_X_MIN = 100;
var LOCATION_X_MAX = 1000;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS_MIN = 1;
var ROOMS_MAX = 5;
var GUESTS_MAX = 15;
var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var POPUP_TYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var getRandomOfRangeNumbers = function (min, max) {
  return (Math.floor(Math.random() * (max - min + 1) + min));
};

var getNonRepetitionOfArray = function (targetArray) {
  var result = (targetArray.splice(getRandomOfRangeNumbers(0, targetArray.length - 1), 1)).toString();
  return result;
};

var gerGroupNonRepetitionOfArray = function (inputArray) {
  var outputArray = [];
  var cloneArray = inputArray.slice();
  for (var i = 0; i < getRandomOfRangeNumbers(1, inputArray.length); i++) {
    outputArray.push(cloneArray.splice(getRandomOfRangeNumbers(0, cloneArray.length - 1), 1).toString());
  }
  return outputArray;
};

window.getRandomAds = function () {
  var similarsAds = []; // массив, состоящий из 8 сгенерированных JS объектов, которые будут описывать похожие объявления неподалёку
  for (var i = 0; i < QUANTITY_SIMILARS_ADS; i++) {
    var locations = {
      x: getRandomOfRangeNumbers(LOCATION_X_MIN, LOCATION_X_MAX),
      y: getRandomOfRangeNumbers(LOCATION_Y_MIN, LOCATION_Y_MAX)
    };
    similarsAds.push({
      author: {
        avatar: 'img/avatars/user' + getNonRepetitionOfArray(AVATAR_NAMES) + '.png'
      },
      offer: {
        title: getNonRepetitionOfArray(OFFER_TITLES),
        address: locations.x + ', ' + locations.y,
        price: getRandomOfRangeNumbers(PRICE_MIN, PRICE_MAX),
        type: TYPES[getRandomOfRangeNumbers(0, TYPES.length)],
        rooms: getRandomOfRangeNumbers(ROOMS_MIN, ROOMS_MAX),
        guests: getRandomOfRangeNumbers(0, GUESTS_MAX),
        checkin: CHECKIN_TIMES[getRandomOfRangeNumbers(0, CHECKIN_TIMES.length - 1)],
        checkout: CHECKOUT_TIMES[getRandomOfRangeNumbers(0, CHECKOUT_TIMES.length - 1)],
        features: gerGroupNonRepetitionOfArray(FEATURES),
        description: '',
        photos: gerGroupNonRepetitionOfArray(PHOTOS)
      },
      location: {
        x: locations.x,
        y: locations.y
      }
    });
  }
  return similarsAds;
};

var ads = window.getRandomAds();


var mapClass = document.querySelector('.map');
mapClass.classList.remove('map--faded');


var pins = document.querySelector('.map__pins');
var mapPin = pins.querySelector('.map__pin');
var fragmentPin = document.createDocumentFragment();
var templatePin = document.querySelector('#pin');

for (var i = 0; i < ads.length; i++) {
  var clonePin = document.importNode(templatePin.content, true);
  var pinButton = clonePin.querySelector('button');
  var pinImg = clonePin.querySelector('img');

  pinButton.style = 'left: ' + (ads[i].location.x - (pinImg.width / 2)) + 'px; top: ' + (ads[i].location.y - pinImg.height - parseInt(window.getComputedStyle(mapPin, '::after').height, 10)) + 'px';
  pinImg.src = ads[i].author.avatar;
  pinImg.alt = ads[i].offer.title;

  fragmentPin.appendChild(clonePin);
}

pins.appendChild(fragmentPin);

var showCard = function (arr) {
  var mapFilters = document.querySelector('.map__filters-container');
  var fragmentCard = document.createDocumentFragment();
  var templateCard = document.querySelector('#card');
  var cloneCard = document.importNode(templateCard.content, true);

  var activePin = document.querySelector('.map__pin--active');
  var activePinAvatar = activePin.querySelector('img');

  for (var j = 0; j < arr.length; j++) {
    if (activePinAvatar.alt === arr[j].offer.title) {

      var cardImg = cloneCard.querySelector('.popup__avatar');
      cardImg.src = arr[j].author.avatar;

      var cardTitle = cloneCard.querySelector('.popup__title');
      cardTitle.textContent = arr[j].offer.title;

      var cardAddress = cloneCard.querySelector('.popup__text--address');
      cardAddress.textContent = arr[j].offer.address;

      var cardPrice = cloneCard.querySelector('.popup__text--price');
      cardPrice.textContent = arr[j].offer.price + '₽/ночь';

      var cardType = cloneCard.querySelector('.popup__type');
      cardType.textContent = POPUP_TYPES[arr[j].offer.type];

      var cardCapacity = cloneCard.querySelector('.popup__text--capacity');
      cardCapacity.textContent = arr[j].offer.rooms + ' комнаты для ' + arr[j].offer.guests + ' гостей';

      var cardFeatures = cloneCard.querySelector('.popup__features');
      var cardFeature = cardFeatures.querySelectorAll('.popup__feature');

      if (arr[j].offer.features.length > 0) {
        for (var n = 0; n < cardFeature.length; n++) {
          cardFeature[n].classList.add('visually-hidden');
        }
        for (var k = 0; k < cardFeature.length; k++) {
          for (var l = 0; l < arr[j].offer.features.length; l++) {
            if (FEATURES[k] === arr[j].offer.features[l]) {
              cardFeature[k].classList.remove('visually-hidden');
            }
          }
        }
      } else {
        cardFeatures.classList.add('hidden');
      }

      var cardDescription = cloneCard.querySelector('.popup__description');
      cardDescription.textContent = arr[j].offer.description;

      var cardPhotos = cloneCard.querySelector('.popup__photos');
      var cardPhoto = cardPhotos.querySelector('.popup__photo');
      for (var m = 0; m < arr[j].offer.photos.length; m++) {
        if (m === 0) {
          cardPhoto.src = arr[j].offer.photos[m];
        } else {
          var cloneCardPhoto = document.importNode(cardPhoto, true);
          cloneCardPhoto.src = arr[j].offer.photos[m];
          cardPhotos.appendChild(cloneCardPhoto);
        }
      }
    }
  }

  fragmentCard.appendChild(cloneCard);

  mapClass.insertBefore(fragmentCard, mapFilters);
};

var pinActive = document.querySelector('.map__pin:last-of-type');
pinActive.classList.add('map__pin--active');

showCard(ads);
