import { EVENT_TYPES } from '../../../const.js';
import { getLabel } from '../../../utils/utils.js';

function createEventTypeItemTemplate(type, isChecked) {
  return `
    <div class='event__type-item'>
      <input id='event-type-${type}-1' class='event__type-input  visually-hidden' type='radio' name='event-type' value='${type}' ${isChecked ? 'checked' : ''}>
      <label class='event__type-label  event__type-label--${type}' for='event-type-${type}-1'>${getLabel(type)}</label>
    </div>
  `;
}

export function createEventTypesTemplate(selectedType = 'flight') {
  return `
    <fieldset class='event__type-group'>
      <legend class='visually-hidden'>Event type</legend>
      ${EVENT_TYPES.map((type) => createEventTypeItemTemplate(type, type === selectedType)).join('')}
    </fieldset>
  `;
}
