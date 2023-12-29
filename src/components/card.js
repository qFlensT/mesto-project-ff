// To use this component HTML must have `card` template
const cardTemplate = document.querySelector("#card-template").content;

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
  const card = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = card.querySelector(".card__image");
  const deleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardImage.addEventListener("click", () => {
    //giving only necessary fields
    cardEventsHandlers.imageClickHandler({
      link: cardData.link,
      name: cardData.name,
    });
  });

  deleteButton.addEventListener("click", () =>
    cardEventsHandlers.deleteButtonClickHandler(card)
  );
  likeButton.addEventListener("click", () =>
    cardEventsHandlers.likeButtonClickHandler(likeButton)
  );

  card.querySelector(".card__title").textContent = cardData.name;

  return card;
};

/** @param {HTMLDivElement} card */
const deleteCard = (card) => {
  card.remove();
};

/** @param {HTMLButtonElement} likeButton */
const likeCard = (likeButton) => {
  likeButton.classList.toggle("card__like-button_is-active");
};

export { createCard, deleteCard, likeCard };
