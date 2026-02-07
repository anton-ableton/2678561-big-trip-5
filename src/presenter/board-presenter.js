import FilterPresenter from './filter-presenter.js';
import SortPresenter from './sort-presenter.js';
import PointsPresenter from './points-presenter.js';

import { FilterType } from '../const.js';

export default class BoardPresenter {
  #pointsModel = null;
  #filtersPresenter = null;
  #sortPresenter = null;
  #pointsPresenter = null;
  #currentFilter = FilterType.EVERYTHING;

  constructor({ sortContainer, filtersContainer, tripEventsContainer, pointsModel }) {
    this.#pointsModel = pointsModel;

    this.#filtersPresenter = new FilterPresenter({
      container: filtersContainer,
      pointsModel: this.#pointsModel,
      onFilterChange: this.#handleFilterChange,
      currentFilter: this.#currentFilter,
    });


    this.#sortPresenter = new SortPresenter({
      container: sortContainer,
      pointsModel: this.#pointsModel,
    });

    this.#pointsPresenter = new PointsPresenter({
      container: tripEventsContainer,
      pointsModel: this.#pointsModel,
      currentFilter: this.#currentFilter,
    });

  }

  init() {
    this.#filtersPresenter.init();
    this.#pointsPresenter.init();
    this.#sortPresenter.init();
  }

  #handleFilterChange = (filterType) => {
    this.#currentFilter = filterType;

    this.#pointsPresenter.setFilter(filterType);
    this.#pointsPresenter.destroy();
    this.#pointsPresenter.init();
  };

}
