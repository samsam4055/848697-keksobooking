'use strict';
(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var adForm = document.querySelector('.ad-form');

  var avatarDropZone = adForm.querySelector('.ad-form-header__drop-zone');
  var avatarInput = adForm.querySelector('.ad-form-header__input');
  var avatarPreview = adForm.querySelector('.ad-form-header__preview > img');
  var avatarPreviewDefault = avatarPreview.src;

  var photoDropZone = adForm.querySelector('.ad-form__drop-zone');
  var photoInput = adForm.querySelector('.ad-form__input');
  var photoContainer = adForm.querySelector('.ad-form__photo-container');

  var clearImages = function () {
    avatarPreview = avatarPreviewDefault;
  };

  var addAvatar = function (inputFile) {
    var file = inputFile ? inputFile : avatarInput.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var onClickInputAvatar = function () {
    addAvatar();
  };

  var renderPhoto = function (source) {
    var newElement = document.createElement('div');
    newElement.classList.add('ad-form__photo');
    var newPhoto = document.createElement('img');
    newPhoto.alt = 'Фотографии жилья';
    newPhoto.style.width = '70px';
    newPhoto.style.height = '70px';
    newPhoto.src = source;
    newElement.append(newPhoto);
    photoContainer.append(newElement);
  };

  var addPhoto = function (inputFile) {
    var file = inputFile ? inputFile : photoInput.files;
    var fileName;
    for (var i = 0; i < file.length; i++) {
      fileName = file[i].name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });
      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function (evt) {
          renderPhoto(evt.target.result);
        });
        reader.readAsDataURL(file[i]);
      }
    }
  };

  var onImageDrop = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    if (evt.type === 'drop') {
      var dt = evt.dataTransfer;
      if (evt.target.classList.contains('ad-form-header__drop-zone')) {
        var file = dt.files[0];
        addAvatar(file);
      } else {
        var files = dt.files;
        addPhoto(files);
      }
    }
  };

  var onClickInputPhoto = function () {
    addPhoto();
  };


  var addevent = function () {
    avatarInput.addEventListener('change', onClickInputAvatar);
    avatarDropZone.addEventListener('dragenter', onImageDrop);
    avatarDropZone.addEventListener('dragleave', onImageDrop);
    avatarDropZone.addEventListener('dragover', onImageDrop);
    avatarDropZone.addEventListener('drop', onImageDrop);

    photoInput.addEventListener('change', onClickInputPhoto);
    photoDropZone.addEventListener('dragenter', onImageDrop);
    photoDropZone.addEventListener('dragleave', onImageDrop);
    photoDropZone.addEventListener('dragover', onImageDrop);
    photoDropZone.addEventListener('drop', onImageDrop);
  };

  var removeEvent = function () {
    avatarInput.removeEventListener('change', onClickInputAvatar);
    avatarDropZone.removeEventListener('dragenter', onImageDrop);
    avatarDropZone.removeEventListener('dragleave', onImageDrop);
    avatarDropZone.removeEventListener('dragover', onImageDrop);
    avatarDropZone.removeEventListener('drop', onImageDrop);

    photoInput.removeEventListener('change', onClickInputPhoto);
    photoDropZone.removeEventListener('dragenter', onImageDrop);
    photoDropZone.removeEventListener('dragleave', onImageDrop);
    photoDropZone.removeEventListener('dragover', onImageDrop);
    photoDropZone.removeEventListener('drop', onImageDrop);
  };
  window.image = {
    addEvent: addevent,
    removeEvent: removeEvent,
    clear: clearImages
  };
})();
