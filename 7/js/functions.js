/**
 * Возвращает случайное целое число из заданного диапазона
 *
 * @param {number} startNumber - Начало диапазона
 * @param {number} finishNumber - Конец диапазона
 *
 * @return {number} Случайное число из заданного диапазона
 */
const getRandomNumber = (startNumber, finishNumber) => {
  const roundedStartNumber = Math.ceil(startNumber);
  const roundedFinishNumber = Math.floor(finishNumber);
  let randomNumber = Math.round(Math.random() * (roundedFinishNumber - roundedStartNumber) + roundedStartNumber);
  if (typeof startNumber !== 'number' || typeof finishNumber !== 'number' || startNumber < 0 || finishNumber < 0 || roundedStartNumber > roundedFinishNumber) {
    randomNumber = 0;
  }
  return randomNumber;
};

/**
 * Проверяет строку на соответствие максимальной длине
 *
 * @param {string} text - Проверяемая строка
 * @param {number} maxLength - Максимальная длина
 *
 * @return {bool} true, если длина строки не больше максимальной, false в противном случае
 */
const checkLength = (text, maxLength) => {
  if (typeof text !== 'string' || typeof maxLength !== 'number') {
    return false;
  }
  return text.length <= maxLength;
};

export {
  getRandomNumber,
  checkLength
};
