/**
 * @param {HTMLElement} element
 */
const openModal = (element) => {
  element.classList.add("popup_is-animated");
  setTimeout(() => element.classList.add("popup_is-opened"), 0);
};

/**
 * @param {HTMLElement} element
 */
const closeModal = (element) => {
  element.classList.remove("popup_is-opened");
  setTimeout(() => element.classList.remove("popup_is-animated"), 0);
};

export { openModal, closeModal };
