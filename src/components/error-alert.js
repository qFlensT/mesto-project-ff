const errorAlertTemplateElement = document.querySelector(
  "#error-alert-template"
).content;

const page = document.body;

/**
 * @param {HTMLDivElement} errorAlertElement
 * @param {boolean} activeState
 */
const toggleErrorAlertActiveState = (errorAlertElement, activeState) =>
  activeState
    ? errorAlertElement.classList.add("error-alert_active")
    : errorAlertElement.classList.remove("error-alert_active");

/**
 * @param {any} errorCode
 * @returns {boolean}
 */
const isErrorCodeValid = (errorCode) =>
  typeof errorCode === "number" && !isNaN(errorCode);

/**
 * @param {string} text
 * @param {number} errorCode
 * @returns {HTMLDivElement}
 */
const createErrorAlert = (text, errorCode = null) => {
  const errorAlertElement = errorAlertTemplateElement
    .querySelector(".error-alert")
    .cloneNode(true);

  const errorCodeElement = errorAlertElement.querySelector(
    ".error-alert__error-code"
  );

  isErrorCodeValid(errorCode)
    ? (errorCodeElement.textContent = errorCode)
    : errorCodeElement.remove();

  const contentElement = errorAlertElement.querySelector(
    ".error-alert__content"
  );

  contentElement.textContent = text;

  return errorAlertElement;
};

/** @param {HTMLDivElement} errorAlertElement */
const removeErrorAlert = (errorAlertElement) => errorAlertElement.remove();

/** @param {TransitionEvent} event */
const handleTransitionEnd = (event) => {
  event.currentTarget.removeEventListener("transitionend", handleTransitionEnd);
  removeErrorAlert(event.currentTarget);
};
/**
 * @param {string} text
 * @param {string|number|null} errorCode
 * @param {number} displayTime
 */
const showErrorAlert = (text, errorCode = null, displayTime = 3500) => {
  const errorAlertElement = createErrorAlert(text, errorCode);
  page.append(errorAlertElement);

  // reflow trigger
  errorAlertElement.offsetWidth;

  requestAnimationFrame(() =>
    toggleErrorAlertActiveState(errorAlertElement, true)
  );

  setTimeout(() => {
    requestAnimationFrame(() =>
      toggleErrorAlertActiveState(errorAlertElement, false)
    );
    errorAlertElement.addEventListener("transitionend", handleTransitionEnd);
  }, displayTime);
};

export default showErrorAlert;
