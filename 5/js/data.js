import {
  getRandomNumber
} from './functions.js';

// Блок 4, задание 1
// Я так понимаю, что весь написанный далее код является временным, поэтому функции не документирую.

// создаю массив с описаниями для фотографий, их просили придумать
const photosDescriptions = [
  'Пляж',
  'Указатель на пляж',
  'Море',
  'Девушка в купальнике',
  'Суповые ванны',
  'Черная машина',
  'Клубника',
  'Морс',
  'Самолет',
  'Обувь',
  'Забор на пляже',
  'Белая машина',
  'Салат',
  'Котогири суши',
  'Уги',
  'Вид из иллюминатора',
  'Оркестр',
  'Красная машина в стиле ретро',
  'Тапочки-фонарики',
  'Ночной город',
  'Еда в тарелке',
  'Закат в море',
  'Краб',
  'Концерт',
  'Шок-контент, бегемот хочет съесть туристов вместе с машиной'
];

// создаю массив с предложениями, из которых может состоять комментарий
const commentsMessages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// создаю массив с именами авторов комментариев
const commentsAuthorsNames = [
  'Петя',
  'Вася',
  'Света',
  'Таня',
  'Жорик',
  'Темный властелин',
  'Гоша',
  'Суровый ананас',
  'Т800',
  'Твоя бывшая',
  'Павлик Морозов',
  'Никита',
  'Мамина подруга',
  'Сын маминой подруги',
  'Джон Доу',
  'Микки',
  'Тайлер Дерден',
  'Жан Пьер',
  'Вавилонянин',
  'Малонемножков Константин Вениаминович'
];

// создаю массив, в который будут записываться использованные id комментариев, чтобы избежать повторений
const idForComments = [];

// функция, которая генерирует неповторяющиеся id для комментариев
function createIdForComments() {
  const idForCommentsLength = idForComments.length;
  let id;
  while (idForComments.length === idForCommentsLength) {
    id = getRandomNumber(1, 75); // 75 - максимально возможное число комментариев в текущих условиях, так как в каждом из 25 постов может быть максимум 3 комментария
    if (idForComments.includes(id)) {
      continue;
    }
    idForComments.push(id);
  }
  return id;
}

// функция, которая составляет текст комментария из заданных заранее предложений
function getCommentMessage(quantity) {
  let commentMessage = '';
  const tempCommentsMessages = commentsMessages.slice(0); // создаю копию массива с предложениями, так как в цикле буду удалять из неё использованные предложения во избежание дублирования
  for (let i = 0; i < quantity; i++) {
    commentMessage += tempCommentsMessages[getRandomNumber(0, tempCommentsMessages.length - 1)];
    const commentMessageIndex = tempCommentsMessages.indexOf(commentMessage);
    tempCommentsMessages.splice(commentMessageIndex, 1);
    commentMessage += ' ';
  }
  return commentMessage;
}

// функция, которая генерирует комментарии, согласно условиям
function getComments(quantity) {
  const comments = [];
  for (let i = 0; i < quantity; i++) {
    comments[i] = {
      id: createIdForComments(),
      avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
      message: getCommentMessage(getRandomNumber(1, 2)),
      name: commentsAuthorsNames[getRandomNumber(0, commentsAuthorsNames.length - 1)]
    };
  }
  return comments;
}

// наконец, функция, которая генерирует все необходимые данные для фотографий
function generatePhotosData() {
  const photosData = [];
  for (let i = 0; i < 25; i++) {
    photosData[i] = {
      id: i + 1,
      url: `photos/${i + 1}.jpg`,
      description: photosDescriptions[i],
      likes: getRandomNumber(15, 200),
      comments: getComments(getRandomNumber(1, 3))
    };
  }
  return photosData;
}

export {
  generatePhotosData
};
