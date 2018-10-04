'use strict';

var temporaryVariables = {
  clones: {
    avatar: [],
    title: []
  }
};

var generateAds = function (data) {
  var address = {
    x: window.getRandomNumbers(data.locationMinX, data.locationMaxX),
    y: window.getRandomNumbers(data.locationMinY, data.locationMaxY)
  };
  var ads = {
    author: {
      avatar: 'img/avatars/user' + window.getUniqueElementOfArray(data.avatarNames) + '.png'
    },
    offer: {
      title: window.getUniqueElementOfArray(data.offerTitles),
      address: address.x + ', ' + address.y,
      price: window.getRandomNumbers(data.priceMin, data.priceMax),
      type: Object.getOwnPropertyNames(data.types)[(window.getRandomNumbers(1, Object.getOwnPropertyNames(data.types).length)) - 1],
      rooms: window.getRandomNumbers(data.roomsMin, data.roomsMax),
      guests: window.getRandomNumbers(1, data.guestsMax),
      checkin: data.checkIn[window.getRandomNumbers(0, data.checkIn.length - 1)],
      checkout: data.checkOut[window.getRandomNumbers(0, data.checkOut.length - 1)],
      features: window.getUniqueArrayOfArray(data.features),
      description: '',
      photos: window.getUniqueArrayOfArray(data.photos, 'notNull')
    },
    location: {
      x: address.x - (data.pinSize.width / 2),
      y: address.y - data.pinSize.height
    }
  };
  return ads;
};

window.renderPinAdsOnPage = function (data) {
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
