const getData = (onSuccess, onFail) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((posts) => {
      onSuccess(posts);
    })
    .catch(() => {
      onFail('При загрузке данных с сервера произошла ошибка!');
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
        onFail('Ошибка сервера. Не удалось отправить данные!');
      }
    })
    .catch(() => {
      onFail('Ошибка сервера. Не удалось отправить данные!');
    });
};

export {
  getData,
  sendData
};
