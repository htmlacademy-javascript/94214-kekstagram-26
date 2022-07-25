import {
  getData
} from './api.js';
import {
  getFilterData
} from './filter.js';
import {
  showError
} from './functions.js';
import {
  generateThumbs
} from './thumbs.js';
import {
  renderBigPicture
} from './big-picture.js';
import './upload-form-toggle.js';
import './preview-photo.js';

const filterElement = document.querySelector('.img-filters');
const picturesElement = document.querySelector('.pictures');

getData(
  (posts) => {
    generateThumbs(posts);
    getFilterData(posts);
    filterElement.classList.remove('img-filters--inactive');
    picturesElement.addEventListener('click', renderBigPicture(posts));
  },
  (errorText) => {
    showError(errorText);
  }
);
