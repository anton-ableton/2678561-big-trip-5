import { createOffersTemplate } from './offers-template.js';
import { createDestinationDetailsTemplate } from './destination-details-template.js';

export function createEventDetailsTemplate(offers = [], destination = null, selectedOfferIds = []) {
  return `
    <section class='event__details'>
      ${createOffersTemplate(offers, selectedOfferIds)}
      ${createDestinationDetailsTemplate(destination)}
    </section>
  `;
}
