const DOWNLOAD_ERROR = 'При загрузке данных с сервера произошла ошибка!';
const UPLOAD_ERROR = 'Ошибка сервера. Не удалось отправить данные!';

const getData = (onSuccess, onFail) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((posts) => {
      onSuccess(posts);
    })
    .catch(() => {
      onFail(DOWNLOAD_ERROR);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail(UPLOAD_ERROR);
      }
    })
    .catch(() => {
      onFail(UPLOAD_ERROR);
    });
};

export {
  getData,
  sendData
};
