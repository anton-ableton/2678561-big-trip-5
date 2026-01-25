import { getLabel } from '../../../utils/utils.js';
import { createEventTypesTemplate } from './event-types-template.js';
import { createDestinationOptionsTemplate } from './destination-options-template.js';
import { createEventDetailsTemplate } from './event-details-template.js';

export function createEditFormTemplate(data = {}) {
  const {
    point = {},
    destinations = [],
    offersByType = []
  } = data;

  const {
    type = 'flight',
    destinationName = '',
    dateFrom = '18/03/19 12:25',
    dateTo = '18/03/19 13:35',
    price = '160',
    offers = []
  } = point;

  const currentDestination = destinations.find(d => d.name === destinationName) || null;
  const selectedOfferIds = offers.map(offer => offer.id);

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
          <input class='event__input event__input--destination' id='event-destination' type='text' name='event-destination' value='${destinationName}' list='destination-list'>
          ${createDestinationOptionsTemplate(destinations)}
        </div>

        <div class='event__field-group event__field-group--time'>
          <label class='visually-hidden' for='event-start-time'>From</label>
          <input class='event__input event__input--time' id='event-start-time' type='text' name='event-start-time' value='${dateFrom}'>
          &mdash;
          <label class='visually-hidden' for='event-end-time'>To</label>
          <input class='event__input event__input--time' id='event-end-time' type='text' name='event-end-time' value='${dateTo}'>
        </div>

        <div class='event__field-group event__field-group--price'>
          <label class='event__label' for='event-price'>
            <span class='visually-hidden'>Price</span>
            &euro;
          </label>
          <input class='event__input event__input--price' id='event-price' type='text' name='event-price' value='${price}'>
        </div>

        <button class='event__save-btn btn btn--blue' type='submit'>Save</button>
        <button class='event__reset-btn' type='reset'>Delete</button>
        <button class='event__rollup-btn' type='button'>
          <span class='visually-hidden'>Open event</span>
        </button>
      </header>
      
      ${createEventDetailsTemplate(offersByType, currentDestination, selectedOfferIds)}
    </form>
  `;
}
