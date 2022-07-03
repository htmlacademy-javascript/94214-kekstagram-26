const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = document.querySelector('.big-picture__img img');
const bigPictureLikes = document.querySelector('.big-picture .likes-count');
const bigPictureComments = document.querySelector('.big-picture .social__comments');
const bigPictureCommentsCount = document.querySelector('.big-picture .social__comment-count');
const bigPictureCommentsLoader = document.querySelector('.big-picture .comments-loader');
const bigPictureDescription = document.querySelector('.big-picture .social__caption');
const bigPictureClose = document.querySelector('.big-picture__cancel');

const getGallery = (pictureData) => (event) => {
  event.preventDefault();

  bigPicture.classList.remove('hidden');
  bigPictureImage.src = pictureData.url;
  bigPictureLikes.textContent = pictureData.likes;
  bigPictureDescription.textContent = pictureData.description;

  bigPictureComments.innerHTML = '';
  const comments = pictureData.comments;
  comments.forEach((comment) => {
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

  bigPictureCommentsCount.classList.add('hidden');
  bigPictureCommentsLoader.classList.add('hidden');
  body.classList.add('modal-open');
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
};

bigPictureClose.addEventListener('click', () => {
  closeBigPicture();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeBigPicture();
  }
});

export {
  getGallery
};
