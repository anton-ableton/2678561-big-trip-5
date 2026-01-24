import { createElement } from '../render.js';
import { FILTER_TYPES } from '../constants.js';
import { getLabel } from '../utils.js';

function createFilterItemTemplate({ type, isChecked }) {
  return `
    <div class='trip-filters__filter'>
      <input 
        id='filter-${type}' 
        class='trip-filters__filter-input  visually-hidden' 
        type='radio' 
        name='trip-filter' 
        value='${type}'
        ${isChecked ? 'checked' : ''}
      >
      <label class='trip-filters__filter-label' for='filter-${type}'>
        ${getLabel(type)}
      </label>
    </div>
  `;
}

function createFiltersTemplate() {
  return `
    <form class='trip-filters' action='#' method='get'>
      ${FILTER_TYPES.map(createFilterItemTemplate).join('')}
      <button class='visually-hidden' type='submit'>Accept filter</button>
    </form>
  `;
}

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
