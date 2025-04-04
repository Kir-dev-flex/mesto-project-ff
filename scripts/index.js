// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card').cloneNode(true);

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard (name, imageSource, handler) {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__image').src = imageSource;
    cardElement.querySelector('.card__image').alt =  `Изображение места: ${name}`;
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => handler(cardElement));
    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard (card) {
    card.remove()
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
    cardList.append(createCard(item.name, item.link, deleteCard));
})