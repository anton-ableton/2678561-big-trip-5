import { render } from '../framework/render.js';
import EmptyPointsView from '../view/empty-points/view.js';
import SortPresenter from './sort-presenter.js';
import PointPresenter from './point-presenter.js';
import { sortPointsBy } from '../utils/sort.js';
import { SortType } from '../const.js';

export default class PointsPresenter {
  #container = null;
  #pointsModel = null;
  #pointPresenters = new Map();
  #currentFilter = null;
  #currentSortType = SortType.DAY;
  #sortPresenter = null;

  constructor({ container, pointsModel, currentFilter }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#currentFilter = currentFilter;
  }

  init(sortContainer) {
    this.#renderSort(sortContainer);
    this.#renderPoints();
  }

  #renderSort(sortContainer) {
    const points = this.#pointsModel.points;

    if (points.length === 0) {
      if (this.#sortPresenter) {
        this.#sortPresenter.destroy();
        this.#sortPresenter = null;
      }
      return;
    }

    if (this.#sortPresenter) {
      this.#sortPresenter.setSort(this.#currentSortType);
    } else {
      this.#sortPresenter = new SortPresenter({
        container: sortContainer,
        pointsModel: this.#pointsModel,
        onSortChange: this.#handleSortChange,
      });
      this.#sortPresenter.init();
    }
  }

  #renderPoints() {
    const points = this.#getSortedPoints();

    if (points.length === 0) {
      render(new EmptyPointsView({ filterType: this.#currentFilter }), this.#container);
      return;
    }

    this.#clearPoints();
    points.forEach((point) => this.#renderPoint(point));
  }

  #getSortedPoints() {
    const points = this.#pointsModel.points;
    return sortPointsBy(points, this.#currentSortType);
  }

  #renderPoint(point) {
    const presenter = new PointPresenter({
      container: this.#container,
      pointsModel: this.#pointsModel,
      onModeChange: this.#handleModeChange,
      onDataChange: this.#handlePointChange
    });

    presenter.init(point);
    this.#pointPresenters.set(point.id, presenter);
  }

  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#pointsModel.updatePoint(updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleSortChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#reRenderPoints();
  };

  #reRenderPoints() {
    this.#clearPoints();
    this.#renderPoints();
  }

  setFilter(filterType) {
    this.#currentFilter = filterType;
  }

  destroy() {
    if (this.#sortPresenter) {
      this.#sortPresenter.destroy();
      this.#sortPresenter = null;
    }

    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

}
