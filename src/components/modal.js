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

/**
 * @param {PointerEvent} event
 */
const modalCloseCallback = (event) => {
  if (event.target.classList.contains("popup__close")) {
    closeModal(event.target.closest(".popup"));
  } else if (event.target.classList.contains("popup")) {
    closeModal(event.target);
  }
};

/**
 * @param {HTMLElement} modal
 */
const applyModalHotkeyCloseListener = (modal) => {
  /**
   * @param {KeyboardEvent} event
   */
  const modalHotkeyCloseCallback = (event) => {
    if (event.key.toLowerCase() === "escape") {
      closeModal(modal);
    }
    document.removeEventListener("keydown", modalHotkeyCloseCallback);
  };

  document.addEventListener("keydown", modalHotkeyCloseCallback);
};

export {
  openModal,
  closeModal,
  animateModal,
  modalCloseCallback,
  applyModalHotkeyCloseListener,
};
