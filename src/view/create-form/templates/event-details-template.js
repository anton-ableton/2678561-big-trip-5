import { createOffersTemplate } from './offers-template.js';
import { createDestinationDetailsTemplate } from './destination-details-template.js';

export function createEventDetailsTemplate(offers = [], destination = null) {
  return `
    <section class='event__details'>
      ${createOffersTemplate(offers)}
      ${createDestinationDetailsTemplate(destination)}
    </section>
  `;
}
