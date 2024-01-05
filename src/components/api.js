import * as Types from "./types.js";

/** @type {Types.UserInfo} */
/** @type {Types.CardInfo} */

/**
 * @typedef {("GET"|"POST"|"PATCH"|"DELETE"|"PUT")} HttpMethod
 */

const API_BASE_URL = "https://mesto.nomoreparties.co/v1/";
const API_TOKEN = "8dcdb091-dcb1-4f08-a740-41d3b0988175";
const API_COHORT_ID = "wff-cohort-4";

/**
 * @param {{ method: HttpMethod, path: string[], body?: Object }} params
 * @returns {Promise<Object>}
 */
const sendRequest = ({ method, path, body }) => {
  const options = {
    method,
    headers: {
      authorization: API_TOKEN,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
    options.headers["Content-Type"] = "application/json";
  }

  return fetch(API_BASE_URL + path.join("/"), options).then((res) =>
    res.ok ? res.json() : Promise.reject(res.status)
  );
};

/**
 * Получает информацию о пользователе
 * @returns {Promise<UserInfo>}
 * */
export const getUserInfo = () =>
  sendRequest({ method: "GET", path: [API_COHORT_ID, "users", "me"] });

/**
 * Получает начальные карточки
 * @returns {Promise<Array<CardInfo>>}
 */
export const getInitialCards = () =>
  sendRequest({ method: "GET", path: [API_COHORT_ID, "cards"] });

/**
 * Редактирует профиль
 * @param {{name: string, about: string}} body,
 * @returns {Promise<UserInfo>}
 */
export const editProfile = (body) =>
  sendRequest({
    method: "PATCH",
    path: [API_COHORT_ID, "users", "me"],
    body,
  });

/**
 * Добавляет карточку
 * @param {{name: string, link: string}} body,
 * @returns {Promise<CardInfo>}
 */
export const addCard = (body) =>
  sendRequest({
    method: "POST",
    path: [API_COHORT_ID, "cards"],
    body,
  });

/**
 * Удаляет карточку
 * @param {{cardId: string}} body
 * @returns {Promise<{message: string}>}
 */
export const removeCard = (body) =>
  sendRequest({
    method: "DELETE",
    path: [API_COHORT_ID, "cards", body.cardId],
  });

/**
 * Лайкает карточку
 * @param {{cardId: string}} body
 * @returns {Promise<CardInfo>}
 */
export const likeCard = (body) =>
  sendRequest({
    method: "PUT",
    path: [API_COHORT_ID, "cards", "likes", body.cardId],
  });

/**
 * Удаляет лайк с карточки
 * @param {{cardId: string}} body
 * @returns {Promise<CardInfo>}
 */
export const removeCardLike = (body) =>
  sendRequest({
    method: "DELETE",
    path: [API_COHORT_ID, "cards", "likes", body.cardId],
  });

/**
 * Обновляет аватар
 * @param {{avatar: string}} body
 * @returns {Promise<UserInfo>}
 */
export const updateAvatar = (body) =>
  sendRequest({
    method: "PATCH",
    path: [API_COHORT_ID, "users", "me", "avatar"],
    body,
  });
