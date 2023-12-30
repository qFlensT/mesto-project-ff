/**
 * @param {HTMLElement} element
 * @param {string} className
 * @param {boolean} condition
 */
const toggleClass = (element, className, condition) => {
  condition
    ? element.classList.add(className)
    : element.classList.remove(className);
};

/**
 * @param {HTMLFormElement} formElement
 * @param {string} inputId
 * @returns {HTMLSpanElement}
 */
const getErrorElement = (formElement, inputId) =>
  formElement.querySelector(`#${inputId}-error`);

/**
 * @param {HTMLInputElement} inputElement
 * @returns {boolean}
 */
const checkInputValidity = (inputElement) => inputElement.validity.valid;

/**
 * @param {HTMLInputElement} inputElement
 * @returns {string}
 */
const getErrorMessage = (inputElement) =>
  inputElement.validity.patternMismatch
    ? inputElement.dataset.errorMessage
    : inputElement.validationMessage;

/**
 * Ошибка не будет отображаться если в аргумент `message` была подана пустая строка
 *
 * @param {HTMLFormElement} formElement
 * @param {HTMLInputElement} inputElement
 * @param {string} errorClass
 * @param {string} message
 */
const toggleErrorActiveState = (
  formElement,
  inputElement,
  errorClass,
  message
) => {
  const errorElement = getErrorElement(formElement, inputElement.id);
  errorElement.textContent = message;
  toggleClass(errorElement, errorClass, !!message);
};

/**
 * @param {HTMLButtonElement} buttonElement
 * @param {string} inactiveClass
 * @param {boolean} activeState
 */
const toggleButtonActiveState = (buttonElement, inactiveClass, activeState) => {
  toggleClass(buttonElement, inactiveClass, !activeState);
  buttonElement.disabled = activeState;
};

/**
 * @param {HTMLInputElement} inputElement
 * @param {string} errorClass
 * @param {boolean} errorState
 */
const toggleInputErrorState = (inputElement, errorClass, errorState) =>
  toggleClass(inputElement, errorClass, errorState);

/**
 * @param {HTMLInputElement} inputElement
 * @param {string} errorClass
 */
const updateInputErrorState = (inputElement, errorClass) =>
  toggleInputErrorState(
    inputElement,
    errorClass,
    !checkInputValidity(inputElement)
  );

/**
 * @param {HTMLFormElement} formElement
 * @param {HTMLInputElement} inputElement
 * @param {string} errorClass
 */
const updateErrorActiveState = (formElement, inputElement, errorClass) =>
  toggleErrorActiveState(
    formElement,
    inputElement,
    errorClass,
    getErrorMessage(inputElement)
  );

/**
 *
 * @param {HTMLButtonElement} buttonElement
 * @param {Array<HTMLInputElement>} inputElements
 * @param {string} inactiveClass
 */
const updateButtonActiveState = (buttonElement, inputElements, inactiveClass) =>
  toggleButtonActiveState(
    buttonElement,
    inactiveClass,
    inputElements.every(checkInputValidity)
  );

/**
 * @param {HTMLFormElement} formElement
 * @param {{
 *  formSelector: string,
 *  inputSelector: string,
 *  submitButtonSelector: string,
 *  inactiveButtonClass: string,
 *  inputErrorClass: string,
 *  errorClass: string
 * }} validationConfig
 */
const setFormEventListeners = (formElement, validationConfig) => {
  const inputElements = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const submitButtonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      updateInputErrorState(inputElement, validationConfig.inputErrorClass);
      updateErrorActiveState(
        formElement,
        inputElement,
        validationConfig.errorClass
      );
      updateButtonActiveState(
        submitButtonElement,
        inputElements,
        validationConfig.inactiveButtonClass
      );
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
  forms.forEach((form) => setFormEventListeners(form, validationConfig));
};

/**
 *
 * @param {HTMLFormElement} formElement
 * @param {{
 *  formSelector: string,
 *  inputSelector: string,
 *  submitButtonSelector: string,
 *  inactiveButtonClass: string,
 *  inputErrorClass: string,
 *  errorClass: string
 * }} validationConfig
 */
const clearValidation = (formElement, validationConfig) => {
  const inputElements = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const submitButtonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  inputElements.forEach((inputElement) => {
    toggleInputErrorState(
      inputElement,
      validationConfig.inputErrorClass,
      false
    );
    toggleErrorActiveState(
      formElement,
      inputElement,
      validationConfig.errorClass,
      ""
    );
  });

  toggleButtonActiveState(
    submitButtonElement,
    validationConfig.inactiveButtonClass,
    false
  );
};

export { enableValidation, clearValidation };
