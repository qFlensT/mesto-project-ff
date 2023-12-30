/** @param {KeyboardEvent} event */
function closeByEsc(event) {
  if (event.key === "Escape") {
    const openedModalElement = document.querySelector(".popup_is-opened");
    closeModal(openedModalElement);
  }
}

/** @param {HTMLDivElement} modalElement */
const openModal = (modalElement) => {
  document.addEventListener("keydown", closeByEsc);
  modalElement.classList.add("popup_is-opened");
};

/** @param {HTMLDivElement} modalElement */
const closeModal = (modalElement) => {
  document.removeEventListener("keydown", closeByEsc);
  modalElement.classList.remove("popup_is-opened");
};

/** @param {HTMLDivElement} modalElement */
const animateModal = (modalElement) => {
  modalElement.classList.add("popup_is-animated");
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
