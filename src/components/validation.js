const showInputError = (input, errorClass) => {
  input.classList.add(errorClass);
};

const hideInputError = (input, errorClass) => {
  input.classList.remove(errorClass);
};

const showErrorElement = (
  formElement,
  inputElement,
  errorMessage,
  errorClass
) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideErrorElement = (formElement, inputElement, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
};

const isInputPatternMismatch = (input) => {
  return input.validity.patternMismatch;
};

const isInputValid = (input) => {
  return input.validity.valid;
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (inputList.every((input) => isInputValid(input))) {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  } else {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  }
};

const toggleError = (form, input, validationConfig) => {
  if (!isInputValid(input)) {
    const errorMessage = isInputPatternMismatch(input)
      ? input.dataset.errorMessage
      : input.validationMessage;

    showInputError(input, validationConfig.inputErrorClass);
    showErrorElement(form, input, errorMessage, validationConfig.errorClass);
  } else {
    hideErrorElement(form, input, validationConfig.errorClass);
    hideInputError(input, validationConfig.inputErrorClass);
  }
};

const setEventListeners = (form, validationConfig) => {
  const inputList = Array.from(
    form.querySelectorAll(validationConfig.inputSelector)
  );

  const submitButton = form.querySelector(
    validationConfig.submitButtonSelector
  );

  toggleButtonState(
    inputList,
    submitButton,
    validationConfig.inactiveButtonClass
  );

  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      toggleButtonState(
        inputList,
        submitButton,
        validationConfig.inactiveButtonClass
      );
      toggleError(form, input, validationConfig);
    });
  });
};

/**
 * @param {{
 *  formSelector: string,
 *  inputSelector: string,
 *  submitButtonSelector: string,
 *  inactiveButtonClass: string,
 *  inputErrorClass: string,
 *  errorClass: string
 * }} validationConfig
 */
const enableValidation = (validationConfig) => {
  const forms = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );

  forms.forEach((form) => {
    setEventListeners(form, validationConfig);
  });
};

const clearValidation = () => {};

export { enableValidation, clearValidation };
