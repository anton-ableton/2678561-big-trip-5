import { createElement } from '../../render.js';
import { createSortTemplate } from './templates/main-template.js';

export default class SortView {
  #currentSortType = null;
  #element = null;

  get template() {
    return createSortTemplate(this.#currentSortType);
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
