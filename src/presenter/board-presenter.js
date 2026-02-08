import FilterPresenter from './filter-presenter.js';
import PointsPresenter from './points-presenter.js';
import { FilterType } from '../const.js';

export default class BoardPresenter {
  #pointsModel = null;
  #filtersPresenter = null;
  #pointsPresenter = null;
  #currentFilter = FilterType.EVERYTHING;
  #sortContainer = null;

  constructor({ sortContainer, filtersContainer, tripEventsContainer, pointsModel }) {
    this.#pointsModel = pointsModel;

    this.#filtersPresenter = new FilterPresenter({
      container: filtersContainer,
      pointsModel: this.#pointsModel,
      onFilterChange: this.#handleFilterChange,
      currentFilter: this.#currentFilter,
    });

    this.#pointsPresenter = new PointsPresenter({
      container: tripEventsContainer,
      pointsModel: this.#pointsModel,
      currentFilter: this.#currentFilter,
    });

    this.#sortContainer = sortContainer;
  }

  init() {
    this.#filtersPresenter.init();
    this.#pointsPresenter.init(this.#sortContainer);
  }

  #handleFilterChange = (filterType) => {
    this.#currentFilter = filterType;
    this.#pointsPresenter.setFilter(filterType);
    this.#pointsPresenter.destroy();
    this.#pointsPresenter.init(this.#sortContainer);
  };
}
