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
const uploadOverlayElement = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('#upload-select-image');
const uploadFormFileInput = uploadForm.querySelector('#upload-file');
const uploadFormCloseButton = uploadForm.querySelector('#upload-cancel');
const uploadFormHashtagInput = uploadForm.querySelector('.text__hashtags');
const uploadFormCommentTextarea = uploadForm.querySelector('.text__description');
const scaleSmallerButton = uploadForm.querySelector('.scale__control--smaller');
const scaleBiggerButton = uploadForm.querySelector('.scale__control--bigger');
const effectsListElement = uploadForm.querySelector('.effects__list');

const openUploadForm = () => {
  uploadOverlayElement.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
  uploadFormCloseButton.addEventListener('click', closeUploadForm);
  uploadForm.addEventListener('submit', onUploadFormSubmit);
  scaleSmallerButton.addEventListener('click', zoomIn);
  scaleBiggerButton.addEventListener('click', zoomOut);
  effectsListElement.addEventListener('change', applyEffect);
};

function closeUploadForm() {
  uploadOverlayElement.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  uploadFormCloseButton.removeEventListener('click', closeUploadForm);
  uploadForm.removeEventListener('submit', onUploadFormSubmit);
  scaleSmallerButton.removeEventListener('click', zoomIn);
  scaleBiggerButton.removeEventListener('click', zoomOut);
  effectsListElement.removeEventListener('change', applyEffect);
  uploadForm.reset();
  resetEffect();
}

function onPopupEscKeydown(evt) {
  const errorBlock = document.querySelector('.error');
  if (evt.key === 'Escape' && ![uploadFormCommentTextarea, uploadFormHashtagInput].includes(document.activeElement) && !errorBlock) {
    closeUploadForm();
  }
}

uploadFormFileInput.addEventListener('change', () => {
  openUploadForm();
});

export {
  closeUploadForm
};
