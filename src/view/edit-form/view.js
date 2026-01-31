import AbstractView from '../../framework/view/abstract-view.js';
import { createEditFormTemplate } from './templates/main-template.js';

export default class EditFormView extends AbstractView {
  #data = null;
  #handleFormSubmit = null;
  #handleCloseClick = null;
  #handleDeleteClick = null;

  constructor({
    point,
    destinations,
    offersByType,
    onFormSubmit,
    onCloseClick,
    onDeleteClick,
  }) {
    super();

    this.#data = {
      point,
      destinations,
      offersByType,
    };

    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseClick = onCloseClick;
    this.#handleDeleteClick = onDeleteClick;

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#closeClickHandler);

    this.element
      .addEventListener('submit', this.#submitHandler);

    this.element
      .querySelector('.event__reset-btn')
      .addEventListener('click', this.#deleteClickHandler);
  }

  get template() {
    return createEditFormTemplate(this.#data);
  }

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseClick();
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick();
  };

  #submitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };
}
