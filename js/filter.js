'use strict';
(function () {

  var mapFilters = document.querySelector('.map__filters');
  var DEBOUNCE_INTERVAL = 500;
  var PRICE = {
    low: 10000,
    height: 50000
  };

  var lastTimeout = null;

  var disableForm = function (bool) {
    var mapFiltersElement = mapFilters.querySelectorAll('.map__filter, .map__features');
    if (mapFiltersElement.length !== null) {
      mapFiltersElement.forEach(function (item) {
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
    var similarAds = window.backend.resultData.slice();
    var mapFilterSelect = mapFilters.querySelectorAll('select');
    var mapFilterFeatures = mapFilters.querySelectorAll('input[type=checkbox]:checked');

    var filtredElement = {
      'housing-type': 'type',
      'housing-price': 'price',
      'housing-rooms': 'rooms',
      'housing-guests': 'guests'
    };

    var checkingSelect = function (element, property) {
      if (property !== 'price') {
        // проверяю select'ы кроме price
        return similarAds.filter(function (offerData) {
          if (offerData.offer[property].toString() === element.value) {
            console.log(offerData.offer[property].toString());
          }
          return offerData.offer[property].toString() === element.value;
        });
      } else {
        // тут проверяю price
        return similarAds.filter(function (offerData) {
          var priceFilterValues = {
            'middle': offerData.offer.price >= PRICE.low && offerData.offer.price < PRICE.high,
            'low': offerData.offer.price < PRICE.low,
            'high': offerData.offer.price >= PRICE.high
          };
          if (priceFilterValues[element.value]) {
            console.log(element.value);
          }
          return priceFilterValues[element.value];
        });
      }
    };
    var checkingFeature = function (item) {
      // тут проверка выбранных feature
    };

    if (mapFilterSelect.length !== 0) {
      mapFilterSelect.forEach(function (item) {
        if (item.value !== 'any') {
          checkingSelect(item, filtredElement[item.id]);
        }
      });
    }

    if (mapFilterFeatures.length !== 0) {
      mapFilterFeatures.forEach(function (item) {

        checkingFeature(item);
      });
    }
    console.log(similarAds);
    window.pin.render(similarAds);
  };

  mapFilters.addEventListener('change', function () {
    window.pin.remove();
    window.card.close();
    debounce(onChangeFilter);
  });

  var qwe = [1, 2, 3, 4, 5, 1, 23, 4, 5, 6, 7, 8, 9, 0];
  console.log(qwe);
  qwe.filter(function (item) {
    return item > 4;
  });
  console.log(qwe);

  window.filter = {
    disable: disableForm
  };
})();
