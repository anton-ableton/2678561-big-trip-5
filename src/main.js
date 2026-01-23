import MainPresenter from './presenter/main-presenter.js';

const tripEvents = document.querySelector('.trip-events');
const sortContainer = document.createElement('form');
sortContainer.className = 'trip-events__trip-sort trip-sort';

const eventsList = document.createElement('ul');
eventsList.className = 'trip-events__list';

tripEvents.append(sortContainer, eventsList);

new MainPresenter({
  sortContainer,
  filtersContainer: document.querySelector('.trip-controls__filters'),
  tripEventsContainer: eventsList,
  tripControlsContainer: document.querySelector('.trip-controls')
}).init();
