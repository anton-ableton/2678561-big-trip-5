import { pointsMock } from '../mock/points-mock.js';
import { destinationsMock } from '../mock/destinations-mock.js';
import { offersMock } from '../mock/offers-mock.js';

import { POINT_COUNT_DEFAULT } from '../const.js';

export default class PointsModel {
  #points = [];
  #destinations = [];
  #offers = [];

  constructor() {
    this.#points = this.#getRandomPoints(POINT_COUNT_DEFAULT);
    this.#destinations = destinationsMock;
    this.#offers = offersMock;
  }

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  #getRandomPoints(count) {
    return [...pointsMock]
      .sort(() => 0.5 - Math.random())
      .slice(0, count);
  }

  getDestinationById(id) {
    return this.#destinations.find((d) => d.id === id);
  }

  getOffersByType(type) {
    const offerGroup = this.#offers.find((group) => group.type === type);
    return offerGroup ? offerGroup.offers : [];
  }

  getOfferById(type, offerId) {
    return this.getOffersByType(type).find((offer) => offer.id === offerId);
  }

  updatePoint(updatedPoint) {
    this.#points = this.#points.map((point) =>
      point.id === updatedPoint.id ? updatedPoint : point
    );
  }

}
