import {
  getRandomNumber
} from './functions.js';

const PHOTOS_DESCRIPTIONS = [
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
const COMMENTS_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const COMMENTS_AUTHORS_NAMES = [
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
const NUMBER_OF_POSTS = 25;
const NUMBER_OF_AVATAR_PICTURES = 6;
const MAX_MESSAGES_PER_COMMENT = 2;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 3;
const MAX_COMMENTS = 30;

const getCommentMessage = (quantity) => {
  let commentMessage = '';
  const tempCommentsMessages = COMMENTS_MESSAGES.slice(0);
  for (let i = 0; i < quantity; i++) {
    commentMessage += tempCommentsMessages[getRandomNumber(0, tempCommentsMessages.length - 1)];
    const commentMessageIndex = tempCommentsMessages.indexOf(commentMessage);
    tempCommentsMessages.splice(commentMessageIndex, 1);
    commentMessage += ' ';
  }
  return commentMessage;
};

let commentId = 1;
const createIdForComments = () => commentId++;

const getComments = (quantity) => {
  const comments = [];
  for (let i = 0; i < quantity; i++) {
    comments[i] = {
      id: createIdForComments(),
      avatar: `img/avatar-${getRandomNumber(1, NUMBER_OF_AVATAR_PICTURES)}.svg`,
      message: getCommentMessage(getRandomNumber(1, MAX_MESSAGES_PER_COMMENT)),
      name: COMMENTS_AUTHORS_NAMES[getRandomNumber(0, COMMENTS_AUTHORS_NAMES.length - 1)]
    };
  }
  return comments;
};

const generatePhotosData = () => {
  const photosData = [];
  for (let i = 0; i < NUMBER_OF_POSTS; i++) {
    photosData[i] = {
      id: i + 1,
      url: `photos/${i + 1}.jpg`,
      description: PHOTOS_DESCRIPTIONS[i],
      likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: getComments(getRandomNumber(MIN_COMMENTS, MAX_COMMENTS))
    };
  }
  return photosData;
};

const data = generatePhotosData();

export {
  data
};
