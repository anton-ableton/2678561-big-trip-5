import SortView from "../view/sort/view.js";
import FiltersView from "../view/filters/view.js";
import CreateFormView from "../view/create-form/view.js";
import EditFormView from "../view/edit-form/view.js";
import RoutePointView from "../view/route-point/view.js";

import { render, RenderPosition } from "../render.js";
import { adaptPointToView } from "../utils/point-adapter.js";

export default class MainPresenter {
  #sortContainer = null;
  #filtersContainer = null;
  #tripEventsContainer = null;
  #pointsModel = null;

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
    this.#renderSort();
    this.#renderTripEvents();
  }

  #renderFilters() {
    render(new FiltersView(), this.#filtersContainer);
  }

  #renderSort() {
    render(new SortView(), this.#sortContainer);
  }

  #renderTripEvents() {
    const points = this.#pointsModel.getRandomPoints();

    const [editPoint, ...routePoints] = points;

    const editDestination = this.#pointsModel.getDestinationById(
      editPoint.destination,
    );

    const editOffers = editPoint.offers
      .map((id) => this.#pointsModel.getOfferById(editPoint.type, id))
      .filter(Boolean);

    const editPointData = adaptPointToView(
      editPoint,
      editDestination,
      editOffers,
    );

    const destinations = this.#pointsModel.getDestinations();
    const offersByType = this.#pointsModel.getOffersByType(editPoint.type);

    render(
      new EditFormView({
        point: editPointData,
        destinations,
        offersByType,
      }),
      this.#tripEventsContainer,
      RenderPosition.AFTERBEGIN,
    );

    routePoints.forEach((point) => {
      const destination = this.#pointsModel.getDestinationById(
        point.destination,
      );

      const offers = point.offers
        .map((id) => this.#pointsModel.getOfferById(point.type, id))
        .filter(Boolean);

      const pointData = adaptPointToView(point, destination, offers);

      render(new RoutePointView(pointData), this.#tripEventsContainer);
    });

    const allDestinations = this.#pointsModel.getDestinations();
    const defaultOffers = this.#pointsModel.getOffersByType("flight"); // или другой тип по умолчанию

    render(
      new CreateFormView({
        destinations: allDestinations,
        offersByType: defaultOffers,
      }),
      this.#tripEventsContainer,
    );
  }
}
