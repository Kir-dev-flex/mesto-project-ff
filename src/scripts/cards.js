// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card').cloneNode(true);

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard (name, imageSource, handler, likeHandler, imageEvent) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__title').textContent = name;
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = imageSource;
  cardImage.alt =  `Изображение места: ${name}`;
  cardImage.addEventListener('click', () => imageEvent(cardElement));
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => handler(cardElement));
  cardElement.querySelector('.card__like-button').addEventListener('click', () => likeHandler(cardElement));
  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard (card) {
  card.remove()
}

// Лайк карточки
function cardLike (card) {
  card.querySelector('.card__like-button').classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, cardList, cardLike };