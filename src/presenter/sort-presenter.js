import { render, replace, remove } from '../framework/render.js';
import SortView from '../view/sort/view.js';
import { SortType } from '../const.js';

export default class SortPresenter {
  #container = null;
  #pointsModel = null;
  #currentSortType = SortType.DAY;
  #sortComponent = null;
  #handleSortChange = null;

  constructor({ container, pointsModel, onSortChange }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#handleSortChange = onSortChange;
  }

  init() {
    const points = this.#pointsModel.points;

    if (points.length === 0) {
      this.destroy();
      return;
    }

    const prevComponent = this.#sortComponent;

    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });

    if (prevComponent === null) {
      render(this.#sortComponent, this.#container);
      return;
    }

    replace(this.#sortComponent, prevComponent);
    remove(prevComponent);
  }

  destroy() {
    if (this.#sortComponent) {
      remove(this.#sortComponent);
      this.#sortComponent = null;
    }
  }

  setSort(sortType) {
    this.#currentSortType = sortType;
    this.init();
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#handleSortChange(sortType);
    this.init();
  };
}
