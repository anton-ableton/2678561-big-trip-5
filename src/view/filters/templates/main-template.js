import { FILTER_TYPES } from '../../../const.js';
import { createFilterItemTemplate } from './filter-item-template.js';

export function createFiltersTemplate() {
  return `
    <form class='trip-filters' action='#' method='get'>
      ${FILTER_TYPES.map(createFilterItemTemplate).join("")}
      <button class='visually-hidden' type='submit'>Accept filter</button>
    </form>
  `;
}
