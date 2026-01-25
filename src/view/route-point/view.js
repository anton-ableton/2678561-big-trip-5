import { createElement } from '../../render.js';
import { createRoutePointTemplate } from './templates/main-template.js';

export default class RoutePointView {
  #element = null;
  #point = {};

  constructor(point = {}) {
    this.#point = point;
  }

  get template() {
    return createRoutePointTemplate(this.#point);
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
