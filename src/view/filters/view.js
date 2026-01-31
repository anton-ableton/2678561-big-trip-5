import AbstractView from '../../framework/view/abstract-view.js';
import { createFiltersTemplate } from './templates/main-template.js';

export default class FiltersView extends AbstractView {

  get template() {
    return createFiltersTemplate();
  }
}
