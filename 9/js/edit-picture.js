const imageElement = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const scaleInputElement = document.querySelector('.scale__control--value');
const effectLevelInputElement = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');

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

const zoomIn = () => {
  let scaleValue = Number(scaleInputElement.value.replace('%', '')) / 100;
  if (scaleValue > MIN_SCALE_IMAGE) {
    scaleValue -= SCALE_IMAGE_STEP;
  }
  scaleInputElement.value = `${(scaleValue * 100).toFixed(0)}%`;
  imageElement.style.transform = `scale(${scaleValue})`;
};

const zoomOut = () => {
  let scaleValue = Number(scaleInputElement.value.replace('%', '')) / 100;
  if (scaleValue < MAX_SCALE_IMAGE) {
    scaleValue += SCALE_IMAGE_STEP;
  }
  scaleInputElement.value = `${(scaleValue * 100).toFixed(0)}%`;
  imageElement.style.transform = `scale(${scaleValue})`;
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

const applyEffect = (event) => {
  imageElement.removeAttribute('class');
  imageElement.removeAttribute('style');
  if (!event.target.matches('#effect-none')) {
    sliderContainer.classList.remove('hidden');
    const effectClass = `effects__preview--${event.target.value}`;
    imageElement.classList.add(effectClass);
    const activeEffect = effectsList.querySelector('[type="radio"]:checked').value;
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
    sliderContainer.classList.add('hidden');
    effectLevelInputElement.value = '';
  }
};

const changeEffect = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  const activeEffect = effectsList.querySelector('[type="radio"]:checked').value;
  if (activeEffect !== 'none') {
    const effect = EFFECTS[activeEffect];
    const filterValue = Number(sliderValue).toFixed(effect.decimal);
    const styleValue = `filter: ${effect.name}(${filterValue}${effect.units})`;
    imageElement.setAttribute('style', styleValue);
    effectLevelInputElement.value = filterValue;
  } else {
    effectLevelInputElement.value = '';
  }
};

sliderElement.noUiSlider.on('update', changeEffect);

export {
  zoomIn,
  zoomOut,
  applyEffect
};
