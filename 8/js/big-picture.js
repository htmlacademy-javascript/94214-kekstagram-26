const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = document.querySelector('.big-picture__img img');
const bigPictureLikes = document.querySelector('.big-picture .likes-count');
const bigPictureComments = document.querySelector('.big-picture .social__comments');
const bigPictureDescription = document.querySelector('.big-picture .social__caption');
const bigPictureClose = document.querySelector('.big-picture__cancel');
const bigPictureAllComments = document.querySelector('.big-picture .comments-count');
const bigPictureVisibleComments = document.querySelector('.big-picture .visible-comments');
const bigPictureCommentsLoaderButton = document.querySelector('.big-picture .comments-loader');

const openBigPicture = (pictureData) => {
  bigPicture.classList.remove('hidden');
  bigPictureImage.src = pictureData.url;
  bigPictureLikes.textContent = pictureData.likes;
  bigPictureDescription.textContent = pictureData.description;

  bigPictureComments.innerHTML = '';
  bigPictureCommentsLoaderButton.classList.remove('hidden');
  const NUMBER_OF_VISIBLE_COMMENTS = 5;
  const COMMENTS = pictureData.comments;
  let startCommentsIndex = 0;
  const getComments = () => {
    const allComments = COMMENTS.slice();
    const visibleComments = allComments.splice(startCommentsIndex, NUMBER_OF_VISIBLE_COMMENTS);
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
    let visibleCommentsCount = startCommentsIndex + NUMBER_OF_VISIBLE_COMMENTS;
    if (startCommentsIndex + NUMBER_OF_VISIBLE_COMMENTS >= COMMENTS.length) {
      visibleCommentsCount = COMMENTS.length;
      bigPictureCommentsLoaderButton.classList.add('hidden');
    }
    bigPictureVisibleComments.textContent = visibleCommentsCount;
    startCommentsIndex += NUMBER_OF_VISIBLE_COMMENTS;
  };
  getComments();
  bigPictureAllComments.textContent = COMMENTS.length;
  bigPictureCommentsLoaderButton.addEventListener('click', getComments);

  body.classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);

  const closeBigPicture = () => {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscKeydown);
    bigPictureCommentsLoaderButton.removeEventListener('click', getComments);
    startCommentsIndex = 0;
  };

  bigPictureClose.addEventListener('click', () => {
    closeBigPicture();
  });

  function onPopupEscKeydown(event) {
    if (event.key === 'Escape') {
      closeBigPicture();
    }
  }
};

export {
  openBigPicture
};
