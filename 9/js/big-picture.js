import {
  data
} from './demo-data.js';

const body = document.querySelector('body');
const picturesContainer = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = document.querySelector('.big-picture__img img');
const bigPictureLikes = document.querySelector('.big-picture .likes-count');
const bigPictureComments = document.querySelector('.big-picture .social__comments');
const bigPictureDescription = document.querySelector('.big-picture .social__caption');
const bigPictureClose = document.querySelector('.big-picture__cancel');
const bigPictureAllComments = document.querySelector('.big-picture .comments-count');
const bigPictureVisibleComments = document.querySelector('.big-picture .visible-comments');
const bigPictureCommentsLoaderButton = document.querySelector('.big-picture .comments-loader');

const NUMBER_OF_VISIBLE_COMMENTS = 5;

let startCommentsIndex = 0;
let pictureData = [];
let dataComments = [];

const renderVisibleComments = (visibleComments) => {
  visibleComments.forEach((comment) => {
    const newComment = document.createElement('li');
    newComment.classList.add('social__comment');
    const newCommentImage = document.createElement('img');
    newCommentImage.classList.add('social__picture');
    newCommentImage.src = comment.avatar;
    newCommentImage.alt = comment.name;
    newCommentImage.width = 35;
    newCommentImage.height = 35;
    newComment.append(newCommentImage);
    const newCommentText = document.createElement('p');
    newCommentText.classList.add('social__text');
    newCommentText.textContent = comment.message;
    newComment.append(newCommentText);
    bigPictureComments.append(newComment);
  });
};

const getComments = () => {
  const allComments = dataComments.slice();
  const visibleComments = allComments.splice(startCommentsIndex, NUMBER_OF_VISIBLE_COMMENTS);
  renderVisibleComments(visibleComments);
  let visibleCommentsCount = startCommentsIndex + NUMBER_OF_VISIBLE_COMMENTS;
  if (startCommentsIndex + NUMBER_OF_VISIBLE_COMMENTS >= dataComments.length) {
    visibleCommentsCount = dataComments.length;
    bigPictureCommentsLoaderButton.classList.add('hidden');
  }
  bigPictureVisibleComments.textContent = visibleCommentsCount;
  startCommentsIndex += NUMBER_OF_VISIBLE_COMMENTS;
};

const renderBigPictureData = () => {
  bigPictureImage.src = pictureData.url;
  bigPictureLikes.textContent = pictureData.likes;
  bigPictureDescription.textContent = pictureData.description;
  bigPictureComments.innerHTML = '';
  bigPictureCommentsLoaderButton.classList.remove('hidden');
  bigPictureAllComments.textContent = dataComments.length;
  getComments();
};

const openBigPicture = () => {
  renderBigPictureData();
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
  bigPictureCommentsLoaderButton.addEventListener('click', getComments);
  bigPictureClose.addEventListener('click', closeBigPicture);
};

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  bigPictureCommentsLoaderButton.removeEventListener('click', getComments);
  bigPictureClose.removeEventListener('click', closeBigPicture);
  startCommentsIndex = 0;
}

function onPopupEscKeydown(event) {
  if (event.key === 'Escape') {
    closeBigPicture();
  }
}

picturesContainer.addEventListener('click', (event) => {
  if (event.target.matches('.picture__img')) {
    event.preventDefault();
    const pictureId = event.target.dataset.id;
    pictureData = data.find((picture) => picture.id === Number(pictureId));
    dataComments = pictureData.comments;
    openBigPicture();
  }
});
