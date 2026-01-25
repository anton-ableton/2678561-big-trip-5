import { createElement } from '../../render.js';
import { createCreateFormTemplate } from './templates/main-template.js';

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
