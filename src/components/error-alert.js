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
 * @param {string} text
 * @param {string|number|null} errorCode
 * @returns {HTMLDivElement}
 */
const createErrorAlert = (text, errorCode = null) => {
  const errorAlertElement = errorAlertTemplateElement
    .querySelector(".error-alert")
    .cloneNode(true);

  const errorCodeElement = errorAlertElement.querySelector(
    ".error-alert__error-code"
  );

  errorCode
    ? (errorCodeElement.textContent = errorCode)
    : errorCodeElement.remove();

  const contentElement = errorAlertElement.querySelector(
    ".error-alert__content"
  );

  contentElement.textContent = text;

  return errorAlertElement;
};

/**
 * @param {HTMLDivElement} errorAlertElement
 */
const removeErrorAlert = (errorAlertElement) => errorAlertElement.remove();

/**
 * @param {string} text
 * @param {string|number|null} errorCode
 */
const showErrorAlert = (text, errorCode = null) => {
  const errorAlertElement = createErrorAlert(text, errorCode);
  page.append(errorAlertElement);

  setTimeout(
    () =>
      requestAnimationFrame(() =>
        toggleErrorAlertActiveState(errorAlertElement, true)
      ),
    1
  );

  setTimeout(() => {
    toggleErrorAlertActiveState(errorAlertElement, false);
    errorAlertElement.addEventListener("animationend", () =>
      removeErrorAlert(errorAlertElement)
    );
  }, 5000);
};

export default showErrorAlert;
