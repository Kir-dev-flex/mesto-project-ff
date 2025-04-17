
// Функционал модальных окон
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');

// Закрытие любого попапа на Esc
function escapeHandler(event) {
    if (event.key === 'Escape') {
        const openPopup = document.querySelector('.popup_is-opened');
        if (openPopup) {
            closePopup(openPopup);
        }
}}

// Закрытие по кнопке "Закрыть"
function closeButtonHandler(event) {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
}

// Закрытие любого попапа по клику вне формы
function overlayClosePopup(event) {
    const openedPopup = document.querySelector('.popup_is-opened');
    const popupContent = openedPopup.querySelector('.popup__content');
        if (!popupContent.contains(event.target)) {
        closePopup(openedPopup);
        }
}

function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    
    popup.addEventListener('click', overlayClosePopup)
    document.addEventListener('keydown', escapeHandler);

    const popupCloseButton = popup.querySelector('.popup__close');
    popupCloseButton.addEventListener('click', closeButtonHandler);
    }

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');

    // Не сохраняю значения инпутов по закрытию
    const inputs = popup.querySelectorAll('input');
    inputs.forEach(function(input) {
        input.value = '';
    })

    // Удаляю все обработчики событий
    document.removeEventListener('keydown', escapeHandler);
    popup.removeEventListener('click', overlayClosePopup)
    const popupCloseButton = popup.querySelector('.popup__close');
    popupCloseButton.removeEventListener('click', closeButtonHandler);

}

// Функционал добавления информации
// Находим форму в DOM
const editForm = document.querySelector('.popup__form[name="edit-profile"]');
// Находим поля формы в DOM
const nameInput = editForm.querySelector('.popup__input_type_name');
const jobInput = editForm.querySelector('.popup__input_type_description');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function EditFormHandler(event) {
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                          // Так мы можем определить свою логику отправки.
                          // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    const name = nameInput.value;
    const description = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    const profileName = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');
    // Вставьте новые значения с помощью textContent
    profileName.textContent = name;
    profileDescription.textContent = description;

    closePopup(popupEditProfile);
}

export { openPopup, closePopup, popupNewCard, popupEditProfile, editForm, EditFormHandler };
