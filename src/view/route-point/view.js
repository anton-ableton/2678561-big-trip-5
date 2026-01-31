import AbstractView from '../../framework/view/abstract-view.js';
import { createRoutePointTemplate } from './templates/main-template.js';

export default class RoutePointView extends AbstractView {
  #data = {};
  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({ point, onEditClick, onFavoriteClick }) {
    super();
    
    this.#data = { point };
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
    
    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createRoutePointTemplate(this.#data.point);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick?.();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick?.();
  };
}
