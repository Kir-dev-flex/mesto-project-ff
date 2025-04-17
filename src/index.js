import './pages/index.css'; // добавлю импорт главного файла стилей для вебпака
import { initialCards, createCard, deleteCard, cardList, cardLike, newCardHandler, formNewCard } from './scripts/cards.js'; 
import { openPopup, popupEditProfile, popupNewCard, editForm, EditFormHandler } from './scripts/modal.js'; 

// Вывожу начальные карточки на страницу
initialCards.forEach(function (item) {
  cardList.append(createCard(item.name, item.link, deleteCard, cardLike));
})

// Прикрепляем обработчик к форме:
editForm.addEventListener('submit', EditFormHandler);
formNewCard.addEventListener('submit', newCardHandler);

// Обработчики событий открытия попапов
const popupEditProfileButton = document.querySelector('.profile__edit-button');
const popupNewCardButton = document.querySelector('.profile__add-button');

popupEditProfileButton.addEventListener('click', function() {
  openPopup(popupEditProfile)
  const name = popupEditProfile.querySelector('.popup__input_type_name');
  const description = popupEditProfile.querySelector('.popup__input_type_description');

  name.value = document.querySelector('.profile__title').textContent;
  description.value = document.querySelector('.profile__description').textContent;
  });

popupNewCardButton.addEventListener('click', function() {
  openPopup(popupNewCard)
})