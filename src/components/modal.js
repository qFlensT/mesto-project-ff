// import * as ModalTypes from "./ModalTypes";

// const modalEdit = document.querySelector(".popup_type_edit");
// const modalNewCard = document.querySelector(".popup_type_new-card");

// const modalImage = document.querySelector(".popup_type_image");
// const modalImageContent = modalImage.querySelector(".popup__image");

// let activeModal = null;

// function showModal(modalType, payload) {
//   switch (modalType) {
//     case ModalTypes.MODAL_EDIT:
//       modalEdit.classList.add("popup_is-opened");
//       activeModal = modalEdit;
//       break;
//     case ModalTypes.MODAL_NEW_CARD:
//       modalNewCard.classList.add("popup_is-opened");
//       activeModal = modalNewCard;
//       break;
//     case ModalTypes.MODAL_IMAGE:
//       modalImageContent.src = payload;
//       modalImage.classList.add("popup_is-opened");
//       activeModal = modalImage;
//       break;
//   }
// }

// function closeModal() {
//   if (!activeModal) {
//     return;
//   }

//   activeModal.classList.remove("popup_is-opened");
//   activeModal = null;
// }

// export { showModal, closeModal };

/**
 *
 * @param {HTMLElement} element
 */
function openModal(element) {
  element.classList.add("popup_is-opened");
}

/**
 *
 * @param {HTMLElement} element
 */
function closeModal(element) {
  element.classList.remove("popup_is-opened");
}

export { openModal, closeModal };