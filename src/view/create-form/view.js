import AbstractView from '../../framework/view/abstract-view.js';
import { createCreateFormTemplate } from './templates/main-template.js';

export default class CreateFormView extends AbstractView {
  #data = {};

  constructor(data = {}) {
    super();
    this.#data = data;
  }

  get template() {
    return createCreateFormTemplate(this.#data);
  }
}
