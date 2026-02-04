import { pointsMock } from '../mock/points-mock.js';
import { destinationsMock } from '../mock/destinations-mock.js';
import { offersMock } from '../mock/offers-mock.js';

import { POINT_COUNT_DEFAULT } from '../const.js';

export default class PointsModel {
  #points = [];
  #destinations = [];
  #offers = [];

  constructor() {
    this.#points = pointsMock;
    this.#destinations = destinationsMock;
    this.#offers = offersMock;
  }

  get destinations() {
    return this.#destinations;
  }

  get points() {
    return this.#getRandomPoints();
  }

  #getRandomPoints(count = POINT_COUNT_DEFAULT) {
    const shuffled = [...this.#points].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  getDestinationById(id) {
    return this.#destinations.find((d) => d.id === id);
  }

  getOffersByType(type) {
    const offerGroup = this.#offers.find((group) => group.type === type);
    return offerGroup ? offerGroup.offers : [];
  }

  getOfferById(type, offerId) {
    const offers = this.getOffersByType(type);
    return offers.find((offer) => offer.id === offerId);
  }
}
