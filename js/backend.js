'use strict';
(function () {

  var HttpStatus = {
    OK: 200,
    MULTIPLE_CHOICES: 300,
    MOVED_PERMANENTLY: 301,
    BAD_REQUEST: 400,
    PAGE_NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
  };
  var REQUEST_TIME_OUT = 10000;
  var DATA_URL = 'https://js.dump.academy/keksobooking/data';
  var SEND_URL = 'https://js.dump.academy/keksobooking';

  var load = function (onSuccess, onError, FormData) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case HttpStatus.OK:
          return FormData ? onSuccess(xhr.status) : onSuccess(xhr.response);
        case HttpStatus.MULTIPLE_CHOICES:
          return onError('Cтатус ответа: ' + xhr.status + ' Множественный выбор');
        case HttpStatus.MOVED_PERMANENTLY:
          return onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText + ' Ресурс перемещен навсегда');
        case HttpStatus.BAD_REQUEST:
          return onError('Cтатус ответа: ' + xhr.status + ' Неверный запрос');
        case HttpStatus.PAGE_NOT_FOUND:
          return onError('Cтатус ответа: ' + xhr.status + ' Ресурс не найден');
        case HttpStatus.INTERNAL_SERVER_ERROR:
          return onError('Cтатус ответа: ' + xhr.status + ' Внутренняя ошибка сервера');
        default:
          return onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = REQUEST_TIME_OUT;

    if (FormData === undefined) {
      xhr.open('GET', DATA_URL);
      xhr.send();
    } else if (FormData instanceof Object) {
      xhr.open('POST', SEND_URL);
      xhr.send(FormData);
    }
  };

  window.backend = {
    request: load
  };
})();
