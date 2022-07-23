import {
  onUploadFormSubmit
} from './upload-form-sender.js';
import {
  zoomIn,
  zoomOut,
  applyEffect,
  resetEffect
} from './edit-picture.js';

const body = document.querySelector('body');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('#upload-select-image');
const uploadFormFileInput = uploadForm.querySelector('#upload-file');
const uploadFormClose = uploadForm.querySelector('#upload-cancel');
const uploadFormHashtag = uploadForm.querySelector('.text__hashtags');
const uploadFormComment = uploadForm.querySelector('.text__description');
const scaleSmaller = uploadForm.querySelector('.scale__control--smaller');
const scaleBigger = uploadForm.querySelector('.scale__control--bigger');
const effectsList = uploadForm.querySelector('.effects__list');

const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
  uploadFormClose.addEventListener('click', closeUploadForm);
  uploadForm.addEventListener('submit', onUploadFormSubmit);
  scaleSmaller.addEventListener('click', zoomIn);
  scaleBigger.addEventListener('click', zoomOut);
  effectsList.addEventListener('change', applyEffect);
};

function closeUploadForm() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  uploadFormClose.removeEventListener('click', closeUploadForm);
  uploadForm.removeEventListener('submit', onUploadFormSubmit);
  scaleSmaller.removeEventListener('click', zoomIn);
  scaleBigger.removeEventListener('click', zoomOut);
  effectsList.removeEventListener('change', applyEffect);
  uploadForm.reset();
  resetEffect();
}

function onPopupEscKeydown(event) {
  if (event.key === 'Escape' && ![uploadFormComment, uploadFormHashtag].includes(document.activeElement) && !document.includes('.error')) {
    closeUploadForm();
  }
}

uploadFormFileInput.addEventListener('change', () => {
  openUploadForm();
});

export {
  closeUploadForm
};
