import { render, replace, remove } from '../framework/render.js';
import SortView from '../view/sort/view.js';
import FiltersView from '../view/filters/view.js';
import EditFormView from '../view/edit-form/view.js';
import RoutePointView from '../view/route-point/view.js';
import EmptyPointsView from '../view/empty-points/view.js';

import { getAdaptedPointData } from '../utils/point-adapter.js';
import { isFuture, isPresent, isPast } from '../utils/filters.js';

import { FilterType, SortType, Mode } from '../const.js';


export default class MainPresenter {
  #sortContainer = null;
  #filtersContainer = null;
  #tripEventsContainer = null;
  #pointsModel = null;

  #mode = Mode.DEFAULT;
  #currentFilter = FilterType.EVERYTHING;
  #currentSortType = SortType.DAY;
  #currentRoutePoint = null;
  #currentEditForm = null;

  constructor({
    sortContainer,
    filtersContainer,
    tripEventsContainer,
    pointsModel,
  }) {
    this.#sortContainer = sortContainer;
    this.#filtersContainer = filtersContainer;
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#renderFilters();
    this.#renderTripEvents();
  }

  #renderFilters() {
    const points = this.#pointsModel.points;
    const filters = this.#getFiltersData(points);

    render(
      new FiltersView({
        filters,
        currentFilter: this.#currentFilter,
      }),
      this.#filtersContainer
    );
  }

  #renderSort() {
    render(
      new SortView({ currentSortType: this.#currentSortType }),
      this.#sortContainer
    );
  }


  #renderTripEvents() {
    const points = this.#pointsModel.points;

    if (points.length === 0) {
      render(
        new EmptyPointsView({ filterType: this.#currentFilter }),
        this.#tripEventsContainer
      );
      return;
    }

    this.#renderSort();

    points.forEach((point) => {
      this.#renderPoint(point);
    });
  }


  #renderPoint(point) {
    const pointData = getAdaptedPointData(point, this.#pointsModel);

    let routePointComponent = null;
    let editFormComponent = null;

    routePointComponent = new RoutePointView({
      point: pointData,
      onEditClick: () => this.#handleEditClick(routePointComponent, editFormComponent),
      onFavoriteClick: () => this.#handleFavoriteClick()
    });

    editFormComponent = new EditFormView({
      point: pointData,
      destinations: this.#pointsModel.destinations,
      offersByType: this.#pointsModel.getOffersByType(point.type),
      onFormSubmit: () => this.#handleFormSubmit(),
      onCloseClick: () => this.#replaceFormToCard(),
      onDeleteClick: () => this.#handleDelete(editFormComponent, routePointComponent),
    });

    render(routePointComponent, this.#tripEventsContainer);
  }

  #handleEditClick(routePointComponent, editFormComponent) {
    if (this.#mode === Mode.EDITING) {
      this.#replaceFormToCard();
    }

    this.#currentRoutePoint = routePointComponent;
    this.#currentEditForm = editFormComponent;
    this.#replaceCardToForm();
  }

  #handleFavoriteClick = () => {
  };

  #replaceCardToForm() {
    replace(this.#currentEditForm, this.#currentRoutePoint);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.EDITING;
  }

  #replaceFormToCard() {
    replace(this.#currentRoutePoint, this.#currentEditForm);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #handleDelete(editFormComponent, routePointComponent) {
    remove(editFormComponent);
    remove(routePointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #handleFormSubmit = () => {
    this.#replaceFormToCard();
  };

  #getFiltersData(points) {
    return [
      { type: FilterType.EVERYTHING, count: points.length },
      { type: FilterType.FUTURE, count: points.filter(isFuture).length },
      { type: FilterType.PRESENT, count: points.filter(isPresent).length },
      { type: FilterType.PAST, count: points.filter(isPast).length },
    ];
  }

}
