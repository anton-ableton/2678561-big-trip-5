import { createElement } from '../render.js';
import {
  EVENT_TYPES,
  DESTINATIONS,
  CREATE_OFFERS,
  DESTINATION_DESCRIPTIONS,
  DESTINATION_PHOTOS,
} from '../const.js';
import { getLabel } from '../utils/utils.js';

function createEventTypeItemTemplate(type, isChecked) {
  return `
    <div class='event__type-item'>
      <input id='event-type-${type}-1' class='event__type-input  visually-hidden' type='radio' name='event-type' value='${type}' ${isChecked ? 'checked' : ''}>
      <label class='event__type-label  event__type-label--${type}' for='event-type-${type}-1'>${getLabel(type)}</label>
    </div>
  `;
}

function createEventTypesTemplate(selectedType = 'flight') {
  return `
    <fieldset class='event__type-group'>
      <legend class='visually-hidden'>Event type</legend>
      ${EVENT_TYPES.map((type) => createEventTypeItemTemplate(type, type === selectedType)).join('')}
    </fieldset>
  `;
}

function createDestinationOptionsTemplate() {
  return `
    <datalist id='destination-list-1'>
      ${DESTINATIONS.map((destination) => `<option value='${destination}'></option>`).join('')}
    </datalist>
  `;
}

function createOfferTemplate({ id, title, price, isSelected }) {
  return `
    <div class='event__offer-selector'>
      <input class='event__offer-checkbox  visually-hidden' id='event-offer-${id}' type='checkbox' name='event-offer-${id}' ${isSelected ? 'checked' : ''}>
      <label class='event__offer-label' for='event-offer-${id}'>
        <span class='event__offer-title'>${title}</span>
        &plus;&euro;&nbsp;
        <span class='event__offer-price'>${price}</span>
      </label>
    </div>
  `;
}

function createOffersTemplate() {
  if (!CREATE_OFFERS.length) {
    return '';
  }

  return `
    <section class='event__section  event__section--offers'>
      <h3 class='event__section-title  event__section-title--offers'>Offers</h3>
      <div class='event__available-offers'>
        ${CREATE_OFFERS.map((offer) => createOfferTemplate(offer)).join('')}
      </div>
    </section>
  `;
}

function createDestinationPhotosTemplate(photos) {
  if (!photos || !photos.length) {
    return '';
  }

  return `
    <div class='event__photos-container'>
      <div class='event__photos-tape'>
        ${photos.map((photo) => `<img class='event__photo' src='img/photos/${photo}' alt='Event photo'>`).join('')}
      </div>
    </div>
  `;
}

function createDestinationDetailsTemplate(destination) {
  if (!destination) {
    return '';
  }

  const description = DESTINATION_DESCRIPTIONS[destination] || '';
  const photos = DESTINATION_PHOTOS[destination] || [];

  return `
    <section class='event__section  event__section--destination'>
      <h3 class='event__section-title  event__section-title--destination'>Destination</h3>
      ${description ? `<p class='event__destination-description'>${description}</p>` : ''}
      ${photos.length ? createDestinationPhotosTemplate(photos) : ''}
    </section>
  `;
}

function createEventDetailsTemplate(destination) {
  return `
    <section class='event__details'>
      ${createOffersTemplate()}
      ${createDestinationDetailsTemplate(destination)}
    </section>
  `;
}

function createCreateFormTemplate(data = {}) {
  const {
    type = 'flight',
    destination = 'Geneva',
    startTime = '19/03/19 00:00',
    endTime = '19/03/19 00:00',
    price = ''
  } = data;

  return `
    <form class='event event--edit' action='#' method='post'>
      <header class='event__header'>
        <div class='event__type-wrapper'>
          <label class='event__type event__type-btn' for='event-type-toggle'>
            <span class='visually-hidden'>Choose event type</span>
            <img class='event__type-icon' width='17' height='17' src='img/icons/${type}.png' alt='Event type icon'>
          </label>
          <input class='event__type-toggle visually-hidden' id='event-type-toggle' type='checkbox'>
          <div class='event__type-list'>
            ${createEventTypesTemplate(type)}
          </div>
        </div>

        <div class='event__field-group event__field-group--destination'>
          <label class='event__label event__type-output' for='event-destination'>
            ${getLabel(type)}
          </label>
          <input class='event__input event__input--destination' id='event-destination' type='text' name='event-destination' value='${destination}' list='destination-list'>
          ${createDestinationOptionsTemplate()}
        </div>

        <div class='event__field-group event__field-group--time'>
          <label class='visually-hidden' for='event-start-time'>From</label>
          <input class='event__input event__input--time' id='event-start-time' type='text' name='event-start-time' value='${startTime}'>
          &mdash;
          <label class='visually-hidden' for='event-end-time'>To</label>
          <input class='event__input event__input--time' id='event-end-time' type='text' name='event-end-time' value='${endTime}'>
        </div>

        <div class='event__field-group event__field-group--price'>
          <label class='event__label' for='event-price'>
            <span class='visually-hidden'>Price</span>
            &euro;
          </label>
          <input class='event__input event__input--price' id='event-price' type='text' name='event-price' value='${price}'>
        </div>

        <button class='event__save-btn btn btn--blue' type='submit'>Save</button>
        <button class='event__reset-btn' type='reset'>Cancel</button>
      </header>
      
      ${createEventDetailsTemplate(destination)}
    </form>
  `;
}

export default class CreateFormView {
  #element = null;
  #data = {};

  constructor(data = {}) {
    this.#data = data;
  }

  get template() {
    return createCreateFormTemplate(this.#data);
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
