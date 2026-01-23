import SortView from '../view/sort-view.js';
import FiltersView from '../view/filters-view.js';
import CreateFormView from '../view/create-form-view.js';
import EditFormView from '../view/edit-form-view.js';
import RoutePointView from '../view/route-point-view.js';
import { render, RenderPosition } from '../render.js';

export default class MainPresenter {
  #sortContainer = null;
  #filtersContainer = null;
  #tripEventsContainer = null;

  constructor({ sortContainer, filtersContainer, tripEventsContainer, tripControlsContainer }) {
    this.#sortContainer = sortContainer;
    this.#filtersContainer = filtersContainer;
    this.#tripEventsContainer = tripEventsContainer;
  }

  init() {
    this.#renderFilters();
    this.#renderSort();
    this.#renderTripEvents();
  }

  #renderFilters() {
    const filtersComponent = new FiltersView();
    render(filtersComponent, this.#filtersContainer);
  }

  #renderSort() {
    const sortComponent = new SortView();
    render(sortComponent, this.#sortContainer);
  }

  #renderTripEvents() {
    const editFormComponent = new EditFormView({
      type: 'flight',
      destination: 'Chamonix',
      startTime: '18/03/19 12:25',
      endTime: '18/03/19 13:35',
      price: '160',
      index: 1
    });
    render(editFormComponent, this.#tripEventsContainer, RenderPosition.AFTERBEGIN);

    const routePointsData = [
      {
        type: 'taxi',
        destination: 'Amsterdam',
        date: '2019-03-18',
        startTime: '2019-03-18T10:30',
        endTime: '2019-03-18T11:00',
        price: 20,
        isFavorite: true
      },
      {
        type: 'flight',
        destination: 'Chamonix',
        date: '2019-03-18',
        startTime: '2019-03-18T12:25',
        endTime: '2019-03-18T13:35',
        price: 160,
        isFavorite: false
      },
      {
        type: 'bus',
        destination: 'Geneva',
        date: '2019-03-19',
        startTime: '2019-03-19T14:00',
        endTime: '2019-03-19T16:30',
        price: 50,
        isFavorite: false
      }
    ];

    routePointsData.forEach((data, index) => {
      const routePointComponent = new RoutePointView({
        ...data,
        index: index + 2
      });
      render(routePointComponent, this.#tripEventsContainer);
    });

    const createFormComponent = new CreateFormView({
      type: 'flight',
      destination: 'Geneva',
      startTime: '19/03/19 00:00',
      endTime: '19/03/19 00:00',
      price: '',
      index: 5
    });
    render(createFormComponent, this.#tripEventsContainer);
  }
}
