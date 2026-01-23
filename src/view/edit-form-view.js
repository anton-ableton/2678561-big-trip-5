import { createElement } from "../render.js";
import {
  EVENT_TYPES,
  DESTINATIONS,
  EDIT_OFFERS,
  DESTINATION_DESCRIPTIONS,
  DESTINATION_PHOTOS,
} from "../constants.js";
import { getLabel } from "../utils.js";

function createEventTypeItemTemplate(type, isChecked) {
  return `
    <div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${isChecked ? "checked" : ""}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${getLabel(type)}</label>
    </div>
  `;
}

function createEventTypesTemplate(selectedType = "flight") {
  return `
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>
      ${EVENT_TYPES.map((type) => createEventTypeItemTemplate(type, type === selectedType)).join("")}
    </fieldset>
  `;
}

function createDestinationOptionsTemplate(index = 1) {
  return `
    <datalist id="destination-list-${index}">
      ${DESTINATIONS.map((destination) => `<option value="${destination}"></option>`).join("")}
    </datalist>
  `;
}

function createOfferTemplate({ id, title, price, isSelected }, index = 1) {
  return `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-${index}" type="checkbox" name="event-offer-${id}" ${isSelected ? "checked" : ""}>
      <label class="event__offer-label" for="event-offer-${id}-${index}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>
  `;
}

function createOffersTemplate(index = 1) {
  if (!EDIT_OFFERS.length) return "";

  return `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${EDIT_OFFERS.map((offer) => createOfferTemplate(offer, index)).join("")}
      </div>
    </section>
  `;
}

function createDestinationPhotosTemplate(photos, index = 1) {
  if (!photos || !photos.length) return "";

  return `
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${photos.map((photo) => `<img class="event__photo" src="img/photos/${photo}" alt="Event photo">`).join("")}
      </div>
    </div>
  `;
}

function createDestinationDetailsTemplate(destination, index = 1) {
  if (!destination) return "";

  const description = DESTINATION_DESCRIPTIONS[destination] || "";

  return `
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      ${description ? `<p class="event__destination-description">${description}</p>` : ""}
    </section>
  `;
}

function createEventDetailsTemplate(destination, index = 1) {
  return `
    <section class="event__details">
      ${createOffersTemplate(index)}
      ${createDestinationDetailsTemplate(destination, index)}
    </section>
  `;
}

function createEditFormTemplate(data = {}) {
  const {
    type = "flight",
    destination = "Chamonix",
    startTime = "18/03/19 12:25",
    endTime = "18/03/19 13:35",
    price = "160",
    index = 1,
  } = data;

  return `
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-${index}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${index}" type="checkbox">
          <div class="event__type-list">
            ${createEventTypesTemplate(type)}
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${index}">
            ${getLabel(type)}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-${index}" type="text" name="event-destination" value="${destination}" list="destination-list-${index}">
          ${createDestinationOptionsTemplate(index)}
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-${index}">From</label>
          <input class="event__input  event__input--time" id="event-start-time-${index}" type="text" name="event-start-time" value="${startTime}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-${index}">To</label>
          <input class="event__input  event__input--time" id="event-end-time-${index}" type="text" name="event-end-time" value="${endTime}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${index}">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-${index}" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      
      ${createEventDetailsTemplate(destination, index)}
    </form>
  `;
}

export default class EditFormView {
  #element = null;
  #data = {};

  constructor(data = {}) {
    this.#data = data;
  }

  get template() {
    return createEditFormTemplate(this.#data);
  }

  getElement() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
