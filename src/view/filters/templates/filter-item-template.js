import { getLabel } from '../../../utils/utils.js';

export function createFilterItemTemplate({ type, isChecked }) {
  return `
    <div class='trip-filters__filter'>
      <input 
        id='filter-${type}' 
        class='trip-filters__filter-input  visually-hidden' 
        type='radio' 
        name='trip-filter' 
        value='${type}'
        ${isChecked ? "checked" : ""}
      >
      <label class='trip-filters__filter-label' for='filter-${type}'>
        ${getLabel(type)}
      </label>
    </div>
  `;
}
