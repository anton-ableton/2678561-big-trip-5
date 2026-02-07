import { render } from '../framework/render.js';
import EmptyPointsView from '../view/empty-points/view.js';
import PointPresenter from './point-presenter.js';

export default class PointsPresenter {
  #container = null;
  #pointsModel = null;
  #pointPresenters = new Map();
  #currentFilter = null;

  constructor({ container, pointsModel, currentFilter }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#currentFilter = currentFilter;
  }

  init() {
    const points = this.#pointsModel.points;
    if (points.length === 0) {
      render(new EmptyPointsView({ filterType: this.#currentFilter }), this.#container);
      return;
    }

    points.forEach((point) => this.#renderPoint(point));
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#pointsModel.updatePoint(updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

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

  setFilter(filterType) {
    this.#currentFilter = filterType;
  }

  destroy() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

}
