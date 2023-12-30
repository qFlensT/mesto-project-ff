// To use this component HTML must have `card` template
const cardTemplateElement = document.querySelector("#card-template").content;

/**
 * @param {{link: string, name: string}} cardData
 * @param {{
 *  imageClickHandler: function({link: string, name: string}),
 *  deleteButtonClickHandler: function(HTMLDivElement),
 *  likeButtonClickHandler: function(HTMLButtonElement)
 * }} cardEventsHandlers
 * @returns {HTMLDivElement}
 */
const createCard = (cardData, cardEventsHandlers) => {
  const cardElement = cardTemplateElement
    .querySelector(".card")
    .cloneNode(true);

  const cardImageElement = cardElement.querySelector(".card__image");
  const deleteButtonElement = cardElement.querySelector(".card__delete-button");
  const likeButtonElement = cardElement.querySelector(".card__like-button");

  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  cardImageElement.addEventListener("click", () => {
    //giving only necessary fields
    cardEventsHandlers.imageClickHandler({
      link: cardData.link,
      name: cardData.name,
    });
  });

  deleteButtonElement.addEventListener("click", () =>
    cardEventsHandlers.deleteButtonClickHandler(cardElement)
  );
  likeButtonElement.addEventListener("click", () =>
    cardEventsHandlers.likeButtonClickHandler(likeButtonElement)
  );

  cardElement.querySelector(".card__title").textContent = cardData.name;

  return cardElement;
};

/** @param {HTMLDivElement} cardElement */
const deleteCard = (cardElement) => {
  cardElement.remove();
};

/** @param {HTMLButtonElement} likeButtonElement */
const likeCard = (likeButtonElement) => {
  likeButtonElement.classList.toggle("card__like-button_is-active");
};

export { createCard, deleteCard, likeCard };
