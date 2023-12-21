/** @param {KeyboardEvent} event */
function closeByEsc(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".popup_is-opened");
    closeModal(openedModal);
  }
}

/** @param {HTMLElement} modal */
const openModal = (modal) => {
  document.addEventListener("keydown", closeByEsc);
  modal.classList.add("popup_is-opened");
};

/** @param {HTMLElement} modal */
const closeModal = (modal) => {
  document.removeEventListener("keydown", closeByEsc);
  modal.classList.remove("popup_is-opened");
};

/** @param {HTMLElement} modal */
const animateModal = (modal) => {
  modal.classList.add("popup_is-animated");
};

/** @param {PointerEvent} event */
const modalCloseCallback = (event) => {
  if (event.target.classList.contains("popup__close")) {
    closeModal(event.target.closest(".popup"));
  } else if (event.target.classList.contains("popup")) {
    closeModal(event.target);
  }
};

export { openModal, closeModal, animateModal, modalCloseCallback };
