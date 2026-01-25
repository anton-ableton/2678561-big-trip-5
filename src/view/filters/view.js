import { createElement } from '../../render.js';
import { createFiltersTemplate } from './templates/main-template.js';

export default class FiltersView {
  #element = null;

  get template() {
    return createFiltersTemplate();
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
