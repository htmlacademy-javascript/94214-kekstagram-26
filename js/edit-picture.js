const imageElement = document.querySelector('.img-upload__preview img');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const scaleInputElement = document.querySelector('.scale__control--value');
const effectLevelInputElement = document.querySelector('.effect-level__value');
const effectsListElement = document.querySelector('.effects__list');

const MIN_SCALE_IMAGE = 0.25;
const MAX_SCALE_IMAGE = 1;
const SCALE_IMAGE_STEP = 0.25;
const EFFECTS = {
  chrome: {
    name: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    units: '',
    decimal: 1
  },
  sepia: {
    name: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    units: '',
    decimal: 1
  },
  marvin: {
    name: 'invert',
    min: 0,
    max: 100,
    step: 1,
    units: '%',
    decimal: 0
  },
  phobos: {
    name: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    units: 'px',
    decimal: 1
  },
  heat: {
    name: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    units: '',
    decimal: 1
  }
};

let scale = '';

const zoomIn = () => {
  let scaleValue = Number(scaleInputElement.value.replace('%', '')) / 100;
  if (scaleValue > MIN_SCALE_IMAGE) {
    scaleValue -= SCALE_IMAGE_STEP;
  }
  scaleInputElement.value = `${(scaleValue * 100).toFixed(0)}%`;
  scale = `scale(${scaleValue})`;
  imageElement.style.transform = scale;
};

const zoomOut = () => {
  let scaleValue = Number(scaleInputElement.value.replace('%', '')) / 100;
  if (scaleValue < MAX_SCALE_IMAGE) {
    scaleValue += SCALE_IMAGE_STEP;
  }
  scaleInputElement.value = `${(scaleValue * 100).toFixed(0)}%`;
  scale = `scale(${scaleValue})`;
  imageElement.style.transform = scale;
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

const applyEffect = (evt) => {
  imageElement.removeAttribute('class');
  imageElement.removeAttribute('style');
  if (scale) {
    imageElement.setAttribute('style', `transform: ${scale};`);
  }
  if (!evt.target.matches('#effect-none')) {
    sliderContainerElement.classList.remove('hidden');
    const effectClass = `effects__preview--${evt.target.value}`;
    imageElement.classList.add(effectClass);
    const activeEffect = effectsListElement.querySelector('[type="radio"]:checked').value;
    const effect = EFFECTS[activeEffect];
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: effect.min,
        max: effect.max,
      },
      start: effect.max,
      step: effect.step,
    });
    effectLevelInputElement.value = effect.max;
  } else {
    sliderContainerElement.classList.add('hidden');
    effectLevelInputElement.value = '';
  }
};

const changeEffect = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  const activeEffect = effectsListElement.querySelector('[type="radio"]:checked').value;
  if (activeEffect !== 'none') {
    const effect = EFFECTS[activeEffect];
    const filterValue = Number(sliderValue).toFixed(effect.decimal);
    const scaleStyle = scale ? `transform: ${scale}; ` : '';
    const filterStyle = `filter: ${effect.name}(${filterValue}${effect.units})`;
    const styleValue = scaleStyle + filterStyle;
    imageElement.setAttribute('style', styleValue);
    effectLevelInputElement.value = filterValue;
  } else {
    effectLevelInputElement.value = '';
  }
};

const resetEffect = () => {
  imageElement.removeAttribute('class');
  sliderContainerElement.classList.add('hidden');
  effectLevelInputElement.value = '';
  imageElement.removeAttribute('style');
  scaleInputElement.value = '100%';
  scale = '';
};

sliderElement.noUiSlider.on('update', changeEffect);

export {
  zoomIn,
  zoomOut,
  applyEffect,
  resetEffect
};
