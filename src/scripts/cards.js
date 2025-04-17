import { openPopup, closePopup, popupNewCard } from './modal.js';

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card').cloneNode(true);

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard (name, imageSource, handler, likeHandler) {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__image').src = imageSource;
    cardElement.querySelector('.card__image').alt =  `Изображение места: ${name}`;
    cardElement.querySelector('.card__image').addEventListener('click', () => imageHandler(cardElement));
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

// Функционал добавления карточек
const formNewCard = document.querySelector('.popup__form[name=new-place]')

function newCardHandler(event) {
  event.preventDefault();

  const name = formNewCard.querySelector('.popup__input_type_card-name');
  const link = formNewCard.querySelector('.popup__input_type_url');

  // initialCards.push({name: name.value, link: link.value})
  cardList.prepend(createCard(name.value, link.value, deleteCard, cardLike))
  closePopup(popupNewCard);
}

// Увеличить картинку карточки при клике
const popupImage = document.querySelector('.popup_type_image');
function imageHandler (card) {
  openPopup(popupImage);
  popupImage.querySelector('.popup__image').src = card.querySelector('.card__image').src;
  popupImage.querySelector('.popup__image').alt = card.querySelector('.card__title').textContent;
  popupImage.querySelector('.popup__caption').textContent = card.querySelector('.card__title').textContent;
}

export { initialCards, createCard, deleteCard, cardList, cardLike, newCardHandler, formNewCard };