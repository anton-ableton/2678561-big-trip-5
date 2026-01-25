import { getLabel } from '../../../utils/utils.js';

export function createSortItemTemplate({ type, isDisabled }, currentSortType) {
  return `
    <div class='trip-sort__item trip-sort__item--${type}'>
      <input
        id='sort-${type}'
        class='trip-sort__input visually-hidden'
        type='radio'
        name='trip-sort'
        value='${type}'
        ${currentSortType === type ? "checked" : ""}
        ${isDisabled ? "disabled" : ""}
      >
      <label class='trip-sort__btn' for='sort-${type}'>
        ${getLabel(type)}
      </label>
    </div>
  `;
}
