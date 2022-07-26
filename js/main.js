import {
  getData
} from './api.js';
import {
  showError,
  debounce
} from './functions.js';
import {
  generateThumbs
} from './thumbs.js';
import {
  onFilterButtonsClick
} from './filter.js';
import {
  renderBigPicture
} from './big-picture.js';
import './upload-form-toggle.js';
import './preview-photo.js';

const filterElement = document.querySelector('.img-filters');
const picturesElement = document.querySelector('.pictures');

const DELAY = 500;

getData(
  (posts) => {
    generateThumbs(posts);
    filterElement.classList.remove('img-filters--inactive');
    filterElement.addEventListener('click', debounce(onFilterButtonsClick(posts), DELAY));
    picturesElement.addEventListener('click', renderBigPicture(posts));
  },
  (errorText) => {
    showError(errorText);
  }
);
