function enableValidation (config) {
    const forms = Array.from(document.querySelectorAll(config.formSelector));
    forms.forEach((form) => {
        setEventListeners(form, config);
    })
}

function setEventListeners (form, config) {
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    const formButton = form.querySelector(config.submitButtonSelector);
    inputs.forEach((input) => {
        input.addEventListener('input', () => {
            isValid(input, form, config);
            toggleButtonState(inputs, formButton, config);
        })
    })
    toggleButtonState(inputs, formButton, config);
}

function showInputError(input, form, config) {
    input.classList.add(config.inputErrorClass);
    const errorField = form.querySelector(`.${input.id}-error`);
    errorField.classList.add(config.errorClass);
    errorField.textContent = input.validationMessage;
}

function hideInputError(input, form, config) {
    input.classList.remove(config.inputErrorClass);
    const errorField = form.querySelector(`.${input.id}-error`);
    errorField.classList.remove(config.errorClass);
    errorField.textContent = '';
}

function isValid(input, form, config) {
    if (input.validity.patternMismatch) {
        input.setCustomValidity(input.dataset.error);
    } else {
        input.setCustomValidity('');
    }

    if (!input.validity.valid) {
        showInputError(input, form, config);
    } else {
        hideInputError(input, form, config);
    }
}

function toggleButtonState(inputs, button, config) {
    const isFormValid = inputs.every((input) => input.validity.valid);
    if (isFormValid) {
        button.classList.remove(config.inactiveButtonClass);
        button.disabled = false;
    } else {
        button.classList.add(config.inactiveButtonClass);
        button.disabled = true;
    }
}

function clearValidation (form, config) {
    const inputs = form.querySelectorAll(config.inputSelector);
    const button = form.querySelector(config.submitButtonSelector); 
    inputs.forEach((input) => {
        hideInputError(input, form, config);
    })
    button.classList.add(config.inactiveButtonClass);   
}

export { enableValidation, clearValidation }