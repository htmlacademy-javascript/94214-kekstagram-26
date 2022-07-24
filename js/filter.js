import {
  generateThumbs
} from './thumbs.js';

const filterButtonsElements = document.querySelectorAll('.img-filters__button');
const filterDefaultElement = document.querySelector('#filter-default');
const filterRandomElement = document.querySelector('#filter-random');
const filterDiscussedElement = document.querySelector('#filter-discussed');

const NUMBER_OF_RANDOM_PHOTOS = 10;

let filterData = '';

const clearThumbs = () => {
  const picturesElements = document.querySelectorAll('.picture');
  picturesElements.forEach((picture) => {
    picture.remove();
  });
};

const clearFilterButtonClass = () => {
  filterButtonsElements.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
};

const viewDefaultPhotos = () => {
  clearFilterButtonClass();
  filterDefaultElement.classList.add('img-filters__button--active');
  clearThumbs();
  generateThumbs(filterData);
};

const viewRandomPhotos = () => {
  clearFilterButtonClass();
  filterRandomElement.classList.add('img-filters__button--active');
  clearThumbs();
  const randomPhotos = filterData.slice().sort(() => Math.random() - 0.5).slice(0, NUMBER_OF_RANDOM_PHOTOS);
  generateThumbs(randomPhotos);
};

const viewDiscussedPhotos = () => {
  clearFilterButtonClass();
  filterDiscussedElement.classList.add('img-filters__button--active');
  clearThumbs();
  const discussedPhotos = filterData.slice().sort((a, b) => b.comments.length - a.comments.length);
  generateThumbs(discussedPhotos);
};

const getFilterData = (posts) => {
  filterData = posts;
};

filterDiscussedElement.addEventListener('click', viewDiscussedPhotos);
filterDefaultElement.addEventListener('click', viewDefaultPhotos);
filterRandomElement.addEventListener('click', viewRandomPhotos);

export {
  getFilterData
};
