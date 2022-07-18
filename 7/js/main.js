import {
  generatePhotosData
} from './data.js';
import {
  generateThumbs
} from './thumbs.js';
import {
  openBigPicture
} from './gallery.js';
import {
  openUploadForm
} from './upload-form.js';
import './upload-form-validate.js';

const pictures = generatePhotosData();
generateThumbs(pictures);

const picturesContainer = document.querySelector('.pictures');
picturesContainer.addEventListener('click', (event) => {
  if (event.target.matches('.picture__img')) {
    event.preventDefault();
    const pictureId = event.target.dataset.id;
    const pictureData = pictures.find((picture) => picture.id === Number(pictureId));
    openBigPicture(pictureData);
  }
});

const uploadFormFileInput = document.querySelector('#upload-file');
uploadFormFileInput.addEventListener('change', () => {
  openUploadForm();
});
