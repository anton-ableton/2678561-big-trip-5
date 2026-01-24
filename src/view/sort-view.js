import { createElement } from '../render.js';
import { SORT_TYPES } from '../constants.js';
import { getLabel } from '../utils.js';

function createSortItemTemplate({ type, isDisabled }, currentSortType) {
  return `
    <div class='trip-sort__item trip-sort__item--${type}'>
      <input
        id='sort-${type}'
        class='trip-sort__input visually-hidden'
        type='radio'
        name='trip-sort'
        value='${type}'
        ${currentSortType === type ? 'checked' : ''}
        ${isDisabled ? 'disabled' : ''}
      >
      <label class='trip-sort__btn' for='sort-${type}'>
        ${getLabel(type)}
      </label>
    </div>
  `;
}

function createSortTemplate(currentSortType) {
  return `
    <form class='trip-events__trip-sort trip-sort' action='#' method='get'>
      ${SORT_TYPES.map((sort) =>
    createSortItemTemplate(sort, currentSortType),
  ).join('')}
    </form>
  `;
}

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
