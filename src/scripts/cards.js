// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card').cloneNode(true);

// DOM узлы
const cardList = document.querySelector('.places__list');

// Функция создания карточки
function createCard (name, imageSource, cardLikes, deleteHandler, likeHandler, imageEvent, userId, ownerId) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__title').textContent = name;
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = imageSource;
  cardImage.alt =  `Изображение места: ${name}`;
  cardImage.addEventListener('click', () => imageEvent(name, imageSource));

  const deleteButton = cardElement.querySelector('.card__delete-button');
  if (userId !== ownerId) {
    deleteButton.remove(); // Удаляем кнопку, если пользователь не владелец карточки
  } else {
    deleteButton.addEventListener('click', () => deleteHandler(cardElement));
  }

  cardElement.querySelector('.card__like-button').addEventListener('click', () => likeHandler(cardElement));
  const cardLikesCount = cardElement.querySelector('.card__like-number');
  cardLikesCount.textContent = cardLikes.length;

  // Проверка на наличие лайка от юзера
  cardLikes.forEach((like) => {
    if (like._id === userId) {
      cardElement.querySelector('.card__like-button').classList.add('card__like-button_is-active');
    }
  });

  return cardElement;
}

// Лайк карточки
function cardLike (card) {
  if (card.querySelector('.card__like-button').classList.contains('card__like-button_is-active')) {
    card.querySelector('.card__like-button').classList.toggle('card__like-button_is-active');
  } else {
    card.querySelector('.card__like-button').classList.toggle('card__like-button_is-active');
  }
}

export { createCard, cardList, cardLike };