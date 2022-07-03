import {
  generatePhotosData
} from './data.js';
import {
  generateThumbs
} from './thumbs.js';
import {
  getGallery
} from './gallery.js';

const pictures = generatePhotosData();
generateThumbs(pictures);

const picturesItems = document.querySelectorAll('.picture');
for (const pictureItem of picturesItems) {
  const pictureId = pictureItem.querySelector('.picture__img').dataset.id;
  const pictureData = pictures.find((picture) => picture.id === Number(pictureId));
  pictureItem.addEventListener('click', getGallery(pictureData));
}
