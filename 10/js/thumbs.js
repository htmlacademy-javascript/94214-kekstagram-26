const picturesContainer = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content;
const picturesFragment = document.createDocumentFragment();

const generateThumbs = (pictures) => {
  pictures.forEach((picture) => {
    const picturesItem = picturesTemplate.cloneNode(true);
    picturesItem.querySelector('.picture__img').src = picture.url;
    picturesItem.querySelector('.picture__img').dataset.id = picture.id;
    picturesItem.querySelector('.picture__likes').textContent = picture.likes;
    picturesItem.querySelector('.picture__comments').textContent = picture.comments.length;
    picturesFragment.append(picturesItem);
  });
  picturesContainer.append(picturesFragment);
};

export {
  generateThumbs
};
