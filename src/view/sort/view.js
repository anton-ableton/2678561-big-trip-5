import AbstractView from '../../framework/view/abstract-view.js';
import { createSortTemplate } from './templates/main-template.js';

export default class SortVie extends AbstractView {
  #currentSortType = null;

  get template() {
    return createSortTemplate(this.#currentSortType);
  }
}
