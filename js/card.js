'use strict';

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

window.createCardAds = function (inputAdsArray) {
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
