'use strict';
(function () {

  var mapFilters = document.querySelector('.map__filters');
  var DEBOUNCE_INTERVAL = 500;
  var PRICE = {
    low: 10000,
    height: 50000
  };

  var disableForm = function (bool) {
    var mapFiltersElement = mapFilters.querySelectorAll('.map__filter, .map__features');
    if (mapFiltersElement.length !== null) {
      mapFiltersElement.forEach(function (item) {
        item.disabled = bool;
      });
    }
  };

  var debounce = function (fun) {
    var lastTimeout = null;

    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fun.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  };


  var onChangeFilter = function () {
    var similarAds = window.backend.resultData;
    var filtredElement = {
      'housing-type': 'type',
      'housing-price': 'price',
      'housing-rooms': 'rooms',
      'housing-guests': 'guests'
    };

    var proverka = function (item) {
      similarAds.filter(function (filtredItem) {
        if (item.id === 'housing-type') {
          // return filtredItem.offer.filtredElement[item.id];
        }
      });
    };
    window.card.close();
  };

  mapFilters.addEventListener('change', onChangeFilter);

  window.filter = {
    debounce: debounce,
    disable: disableForm
  };
})();
