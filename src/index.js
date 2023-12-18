import "./pages/index.css";
import initialCards from "./components/cards/initialCards";
import {
  addCard,
  createCard,
  cardRemoveCallback,
} from "./components/cards/cards";

initialCards.forEach((cardData) => {
  addCard(createCard(cardData, cardRemoveCallback));
});
