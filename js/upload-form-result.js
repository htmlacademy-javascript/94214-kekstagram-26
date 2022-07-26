const body = document.querySelector('body');

const showResultMessage = (status) => {
  const statusTemplate = document.querySelector(`#${status}`).content;
  const message = statusTemplate.cloneNode(true);
  body.append(message);

  const statusBlock = document.querySelector(`.${status}`);
  document.addEventListener('keydown', onStatusMessageEscKeydown);
  statusBlock.addEventListener('click', onStatusBlockClick);

  const closeStatusMessage = () => {
    document.querySelector(`.${status}`).remove();
    document.removeEventListener('keydown', onStatusMessageEscKeydown);
    statusBlock.removeEventListener('click', closeStatusMessage);
  };

  function onStatusBlockClick(evt) {
    if (evt.target.matches(`.${status}__button`) || evt.target.matches(`.${status}`)) {
      closeStatusMessage();
    }
  }

  function onStatusMessageEscKeydown(evt) {
    if (evt.key === 'Escape') {
      closeStatusMessage();
    }
  }
};

export {
  showResultMessage
};
