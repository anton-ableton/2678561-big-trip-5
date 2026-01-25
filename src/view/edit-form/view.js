import { createElement } from '../../render.js';
import { createEditFormTemplate } from './templates/main-template.js';

export default class EditFormView {
  #element = null;
  #data = {};

  constructor(data = {}) {
    this.#data = data;
  }

  get template() {
    return createEditFormTemplate(this.#data);
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
