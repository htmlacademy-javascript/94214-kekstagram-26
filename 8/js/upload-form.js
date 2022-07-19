const body = document.querySelector('body');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('#upload-select-image');
const uploadFormClose = uploadForm.querySelector('#upload-cancel');
const uploadFormHashtag = uploadForm.querySelector('.text__hashtags');
const uploadFormComment = uploadForm.querySelector('.text__description');

const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);

  const closeUploadForm = () => {
    uploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscKeydown);
    uploadForm.reset();
  };

  uploadFormClose.addEventListener('click', () => {
    closeUploadForm();
  });

  function onPopupEscKeydown(event) {
    if (event.key === 'Escape' && ![uploadFormComment, uploadFormHashtag].includes(document.activeElement)) {
      closeUploadForm();
    }
  }
};

export {
  openUploadForm
};
