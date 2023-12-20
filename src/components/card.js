// To use this component HTML must have `card` template
const cardTemplate = document.querySelector("#card-template").content;

/**
 * @param {{link: string, name: string}} cardData
 * @param {function(PointerEvent): void} imageClickHandler
 * @returns {HTMLElement}
 */
const createCard = (cardData, imageClickHandler) => {
  const link = cardData.link;
  const name = cardData.name;
  const alt = name;

  const card = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = card.querySelector(".card__image");
  const deleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");

  cardImage.src = link;
  cardImage.alt = alt;
  cardImage.addEventListener("click", imageClickHandler);

  deleteButton.addEventListener("click", () => deleteCard(card));
  likeButton.addEventListener("click", () => likeCard(likeButton));

  card.querySelector(".card__title").textContent = name;

  return card;
};

/**
 * @param {HTMLElement} card
 */
const deleteCard = (card) => {
  card.remove();
};

/**
 * @param {HTMLElement} likeButton
 */
const likeCard = (likeButton) => {
  likeButton.classList.toggle("card__like-button_is-active");
};

export { createCard, deleteCard, likeCard };
