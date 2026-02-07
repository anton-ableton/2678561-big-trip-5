import { render, replace, remove } from '../framework/render.js';
import RoutePointView from '../view/route-point/view.js';
import EditFormView from '../view/edit-form/view.js';
import { getAdaptedPointData } from '../utils/point-adapter.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #container = null;
  #pointsModel = null;
  #handleModeChange = null;
  #handleDataChange = null;
  #point = null;

  #routePointComponent = null;
  #editFormComponent = null;
  #mode = Mode.DEFAULT;

  constructor({ container, pointsModel, onModeChange, onDataChange }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#handleModeChange = onModeChange;
    this.#handleDataChange = onDataChange;
  }

  init(point) {
    this.#point = point;
    const pointData = getAdaptedPointData(point, this.#pointsModel);

    const prevRoutePoint = this.#routePointComponent;
    const prevEditForm = this.#editFormComponent;

    this.#routePointComponent = new RoutePointView({
      point: pointData,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#editFormComponent = new EditFormView({
      point: pointData,
      destinations: this.#pointsModel.destinations,
      offersByType: this.#pointsModel.getOffersByType(point.type),
      onCloseClick: this.#replaceFormToCard,
      onDeleteClick: this.#handleDelete,
      onFormSubmit: this.#replaceFormToCard,
    });

    if (!prevRoutePoint || !prevEditForm) {
      render(this.#routePointComponent, this.#container);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#routePointComponent, prevRoutePoint);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editFormComponent, prevEditForm);
    }

    remove(prevRoutePoint);
    remove(prevEditForm);
  }

  destroy() {
    remove(this.#routePointComponent);
    remove(this.#editFormComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  }

  #replaceCardToForm = () => {
    replace(this.#editFormComponent, this.#routePointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToCard = () => {
    replace(this.#routePointComponent, this.#editFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({
      ...this.#point,
      isFavorite: !this.#point.isFavorite,
    });
  };

  #handleDelete = () => {
    this.destroy();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };
}
