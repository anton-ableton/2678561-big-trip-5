import { render, replace, remove } from '../framework/render.js';
import FiltersView from '../view/filters/view.js';
import { FilterType } from '../const.js';
import { isFuture, isPresent, isPast } from '../utils/filters.js';

export default class FilterPresenter {
  #container = null;
  #pointsModel = null;
  #currentFilter = null;
  #filterComponent = null;
  #handleFilterChange = null;

  constructor({ container, pointsModel, onFilterChange, currentFilter }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#handleFilterChange = onFilterChange;
    this.#currentFilter = currentFilter;
  }

  init() {
    const filters = this.#getFiltersData();

    const prevComponent = this.#filterComponent;

    this.#filterComponent = new FiltersView({
      filters,
      currentFilter: this.#currentFilter,
      onFilterChange: this.#handleFilterTypeChange,
    });

    if (prevComponent === null) {
      render(this.#filterComponent, this.#container);
      return;
    }

    replace(this.#filterComponent, prevComponent);
    remove(prevComponent);
  }

  setFilter(filterType) {
    this.#currentFilter = filterType;
    this.init();
  }

  #handleFilterTypeChange = (filterType) => {
    if (this.#currentFilter === filterType) {
      return;
    }

    this.#currentFilter = filterType;
    this.#handleFilterChange(filterType);
    this.init();
  };

  #getFiltersData() {
    const points = this.#pointsModel.points;

    return [
      {
        type: FilterType.EVERYTHING,
        count: points.length,
        isDisabled: points.length === 0,
      },
      {
        type: FilterType.FUTURE,
        count: points.filter(isFuture).length,
        isDisabled: points.filter(isFuture).length === 0,
      },
      {
        type: FilterType.PRESENT,
        count: points.filter(isPresent).length,
        isDisabled: points.filter(isPresent).length === 0,
      },
      {
        type: FilterType.PAST,
        count: points.filter(isPast).length,
        isDisabled: points.filter(isPast).length === 0,
      },
    ];
  }
}
