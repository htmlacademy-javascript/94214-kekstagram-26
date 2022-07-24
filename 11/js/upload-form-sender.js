import {
  sendData
} from './api.js';
import {
  showError
} from './functions.js';
import {
  closeUploadForm
} from './upload-form-toggle.js';
import {
  showResultMessage
} from './upload-form-result.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadFormHashtag = uploadForm.querySelector('.text__hashtags');
const uploadFormButton = uploadForm.querySelector('.img-upload__submit');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'error-text'
});

const validationHashtag = (value) => {
  let isValid = true;
  if (value.length) {
    const hashtags = value.toLowerCase().split(' ');
    if (hashtags.length > 5) {
      isValid = false;
    }
    const uniqueHashtags = [];
    hashtags.forEach((hashtag) => {
      const correctValue = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
      if (!correctValue.test(hashtag)) {
        isValid = false;
      }
      if (uniqueHashtags.includes(hashtag)) {
        isValid = false;
      }
      uniqueHashtags.push(hashtag);
    });
  }
  return isValid;
};

pristine.addValidator(
  uploadFormHashtag,
  validationHashtag,
  'Некорректный формат. Хэштег должен начинаться с символа #, не содержать пробелы и спецсимволы, длина хэштега должна быть от 2 до 20 символов. Не более 5 хэштегов, разделенных пробелом.'
);

const disableFormButton = () => {
  uploadFormButton.disabled = false;
  uploadFormButton.textContent = 'Идет публикация...';
};

const enableFormButton = () => {
  uploadFormButton.disabled = false;
  uploadFormButton.textContent = 'Опубликовать';
};

const onUploadFormSubmit = (event) => {
  event.preventDefault();
  if (pristine.validate()) {
    disableFormButton();
    sendData(
      () => {
        showResultMessage('success');
        enableFormButton();
        closeUploadForm();
        uploadForm.reset();
      },
      () => {
        showResultMessage('error');
        enableFormButton();
      },
      new FormData(event.target),
    );
  } else {
    showError('Форма заполнена некорректно!');
  }
};

export {
  onUploadFormSubmit
};
