/**
 * @param {HTMLElement} modal
 */
const openModal = (modal) => {
  modal.classList.add("popup_is-opened");
};

/**
 * @param {HTMLElement} modal
 */
const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
};

/**
 * @param {HTMLElement} modal
 */
const animateModal = (modal) => {
  modal.classList.add("popup_is-animated");
};

export { openModal, closeModal, animateModal };
