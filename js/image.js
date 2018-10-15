'use strict';
(function () {

  var adForm = document.querySelector('.ad-form');

  var avatarDropZone = adForm.querySelector('.ad-form-header__drop-zone');
  var avatarInput = adForm.querySelector('.ad-form-header__input');
  var avatarPreview = adForm.querySelector('.ad-form-header__preview > img');
  var avatarPreviewDefault = avatarPreview.src;

  var photoDropZone = adForm.querySelector('.ad-form__drop-zone');
  var photoInput = adForm.querySelector('.ad-form__input');
  var photoPreview = adForm.querySelector('.ad-form__photo');

  var setDefaultAvatar = function () {
    avatarPreview = avatarPreviewDefault;
  };

  var addAvatar = function (inputFile) {
    var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

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

  var addPhoto = function () {

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
        var files = dt.files[0];
        addPhoto(files);
      }
    }
  };

  var onClickInputPhoto = function () {
    addPhoto();
  };


  (function () {
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

  })();
  window.image = {
    setDefaultAvatar: setDefaultAvatar
  };
})();
