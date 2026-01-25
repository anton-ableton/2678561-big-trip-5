import { SORT_TYPES } from '../../../const.js';
import { createSortItemTemplate } from './sort-item-template.js';

export function createSortTemplate(currentSortType) {
  return `
    <form class='trip-events__trip-sort trip-sort' action='#' method='get'>
      ${SORT_TYPES.map((sort) =>
        createSortItemTemplate(sort, currentSortType),
      ).join("")}
    </form>
  `;
}
