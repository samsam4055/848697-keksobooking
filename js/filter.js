'use strict';
(function () {

  var mapFilters = document.querySelector('.map__filters');
  var mapFilterSelect = mapFilters.querySelectorAll('select');
  var DEBOUNCE_INTERVAL = 500;
  var PRICE = {
    low: 10000,
    high: 50000
  };

  var lastTimeout = null;

  var disableForm = function (bool) {
    var mapFilter = mapFilters.querySelectorAll('.map__filter, .map__features');
    if (mapFilter.length !== null) {
      mapFilter.forEach(function (item) {
        item.disabled = bool;
      });
    }
  };

  var debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      fun();
    }, DEBOUNCE_INTERVAL);
  };


  var onChangeFilter = function () {
    var similarAds = window.form.resultData.slice();
    var mapFilterFeatures = mapFilters.querySelectorAll('input[type=checkbox]:checked');

    var filtredElement = {
      'housing-type': 'type',
      'housing-price': 'price',
      'housing-rooms': 'rooms',
      'housing-guests': 'guests'
    };

    var checkingSelect = function (element, property) {

      if (property !== 'price') {
        return similarAds.filter(function (offerData) {
          return offerData.offer[property].toString() === element.value;
        });

      } else {

        return similarAds.filter(function (offerData) {
          var priceFilterValues = {
            'middle': (offerData.offer.price >= PRICE.low) && (offerData.offer.price < PRICE.high),
            'low': offerData.offer.price < PRICE.low,
            'high': offerData.offer.price >= PRICE.high
          };
          return priceFilterValues[element.value];
        });
      }
    };
    var checkingFeature = function (item) {
      return similarAds.filter(function (offerData) {
        return offerData.offer.features.indexOf(item.value) >= 0;
      });
    };

    if (mapFilterSelect.length !== 0) {
      mapFilterSelect.forEach(function (item) {
        if (item.value !== 'any') {
          similarAds = checkingSelect(item, filtredElement[item.id]);
        }
      });
    }

    if (mapFilterFeatures.length !== 0) {
      mapFilterFeatures.forEach(function (item) {
        similarAds = checkingFeature(item);
      });
    }
    if (similarAds.length) {
      window.pin.render(similarAds);
    }
  };

  mapFilters.addEventListener('change', function () {
    window.pin.remove();
    window.card.close();
    debounce(onChangeFilter);
  });

  window.filter = {
    disable: disableForm
  };
})();
