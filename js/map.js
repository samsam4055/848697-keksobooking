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
var GUESTS_MAX = 1000;
var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


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
    outputArray.push(cloneArray.splice(getRandomOfRangeNumbers(0, cloneArray.length - 1), 1));
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

var Ads = window.getRandomAds();

// Это временное решение, этот класс переключает карту из неактивного состояния в активное.
var mapClass = document.querySelector('.map');
mapClass.classList.remove('map--faded');

var pins = document.querySelector('.map__pins');
var fragmentPin = document.createDocumentFragment();
var templatePin = document.querySelector('#pin');

for (var i = 0; i < Ads.length; i++) {
  var clonePin = document.importNode(templatePin.content, true);
  var pinButton = clonePin.querySelector('button');
  var pinImg = clonePin.querySelector('img');

  pinButton.style = 'left: ' + Ads[i].location.x + 'px; top: ' + Ads[i].location.y + 'px';
  pinImg.src = Ads[i].author.avatar;
  pinImg.alt = Ads[i].offer.title;

  fragmentPin.appendChild(clonePin);
}

pins.appendChild(fragmentPin);

var mapFilters = document.querySelector('.map__filters-container');
var fragmentCard = document.createDocumentFragment();
var templateCard = document.querySelector('#card');

var cloneCard = document.importNode(templateCard.content, true);


fragmentCard.appendChild(cloneCard);

mapClass.insertBefore(fragmentCard, mapFilters);

/*
<!-- Модальное окно с информацией об объявлении -->
  <template id="card">
    <article class="map__card popup">
      <img src="img/avatars/user01.png" class="popup__avatar" width="70" height="70" alt="Аватар пользователя">
      <button type="button" class="popup__close">Закрыть</button>
      <h3 class="popup__title">Уютное гнездышко для молодоженов</h3>
      <p class="popup__text popup__text--address">102-0082 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3</p>
      <p class="popup__text popup__text--price">5200&#x20bd;<span>/ночь</span></p>
      <h4 class="popup__type">Квартира</h4>
      <p class="popup__text popup__text--capacity">2 комнаты для 3 гостей</p>
      <p class="popup__text popup__text--time">Заезд после 14:00, выезд до 10:00</p>
      <ul class="popup__features">
        <li class="popup__feature popup__feature--wifi"></li>
        <li class="popup__feature popup__feature--dishwasher"></li>
        <li class="popup__feature popup__feature--parking"></li>
        <li class="popup__feature popup__feature--washer"></li>
        <li class="popup__feature popup__feature--elevator"></li>
        <li class="popup__feature popup__feature--conditioner"></li>
      </ul>
      <p class="popup__description">Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.</p>
      <div class="popup__photos">
        <img src="" class="popup__photo" width="45" height="40" alt="Фотография жилья">
      </div>
    </article>
  </template>
  */
