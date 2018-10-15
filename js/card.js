'use strict';
(function () {

  var mainSection = document.querySelector('main');
  var mapClass = mainSection.querySelector('.map');
  var closeCard = function (notRemoveClassActivePin) {
    var mapCard = mainSection.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
    if (!notRemoveClassActivePin) {
      var currentActivePin = mainSection.querySelector('.map__pin--active');
      if (currentActivePin) {
        currentActivePin.classList.remove('map__pin--active');
      }
    }
  };

  var onCardClose = function (evt) {
    if (evt.keyCode === window.variable.KeyCode.ESCAPE) {
      document.removeEventListener('keydown', onCardClose);
      closeCard();
    }
  };

  var readFeaturesData = function (cardFeatures, arrayData) {
    var cardFeature = cardFeatures.querySelectorAll('.popup__feature');
    if (arrayData.offer.features.length > 0) {
      for (var n = 0; n < cardFeature.length; n++) {
        cardFeature[n].classList.add('visually-hidden');
      }
      arrayData.offer.features.forEach(function (itemName) {
        var currentFeature = cardFeatures.querySelector('.popup__feature--' + itemName);
        currentFeature.classList.remove('visually-hidden');
      });
    } else {
      cardFeatures.classList.add('hidden');
    }
  };

  var readPhotosData = function (cardPhotos, arrayData) {
    var cardPhoto = cardPhotos.querySelector('.popup__photo');
    if (arrayData.offer.photos.length === 0) {
      cardPhoto.remove();
    } else {
      for (var m = 0; m < arrayData.offer.photos.length; m++) {
        if (m === 0) {
          cardPhoto.src = arrayData.offer.photos[m];
        } else {
          var cloneCardPhoto = document.importNode(cardPhoto, true);
          cloneCardPhoto.src = arrayData.offer.photos[m];
          cardPhotos.appendChild(cloneCardPhoto);
        }
      }
    }
  };

  var createCardAds = function (inputAdsArray) {
    var mapFilters = mapClass.querySelector('.map__filters-container');
    var fragmentCard = document.createDocumentFragment();
    var templateCard = document.querySelector('#card');
    var cloneCard = document.importNode(templateCard.content, true);
    var activePin = mapClass.querySelector('.map__pin--active');
    var activePinAvatar = activePin.querySelector('img');

    for (var j = 0; j < inputAdsArray.length; j++) {
      if (activePinAvatar.alt === inputAdsArray[j].offer.title) {
        var cardImg = cloneCard.querySelector('.popup__avatar');
        var cardTitle = cloneCard.querySelector('.popup__title');
        var cardAddress = cloneCard.querySelector('.popup__text--address');
        var cardPrice = cloneCard.querySelector('.popup__text--price');
        var cardType = cloneCard.querySelector('.popup__type');
        var cardCapacity = cloneCard.querySelector('.popup__text--capacity');
        var cardFeatures = cloneCard.querySelector('.popup__features');
        var cardDescription = cloneCard.querySelector('.popup__description');
        var cardPhotos = cloneCard.querySelector('.popup__photos');
        cardImg.src = inputAdsArray[j].author.avatar;
        cardTitle.textContent = inputAdsArray[j].offer.title;
        cardAddress.textContent = inputAdsArray[j].offer.address;
        cardPrice.textContent = inputAdsArray[j].offer.price + '₽/ночь';
        cardType.textContent = inputAdsArray.type;
        cardCapacity.textContent = inputAdsArray[j].offer.rooms + ' комнаты для ' + inputAdsArray[j].offer.guests + ' гостей';
        cardDescription.textContent = inputAdsArray[j].offer.description;
        readFeaturesData(cardFeatures, inputAdsArray[j]);
        readPhotosData(cardPhotos, inputAdsArray[j]);
      }
    }

    fragmentCard.appendChild(cloneCard);

    mapClass.insertBefore(fragmentCard, mapFilters);

    var popucClose = mapClass.querySelector('.popup__close');
    popucClose.addEventListener('mouseup', function () {
      closeCard();
    });

    document.addEventListener('keydown', onCardClose);
  };
  window.card = {
    create: createCardAds,
    close: closeCard
  };
})();
