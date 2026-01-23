export const SORT_TYPES = [
  { type: 'day', isDisabled: false },
  { type: 'event', isDisabled: true },
  { type: 'time', isDisabled: false },
  { type: 'price', isDisabled: false },
  { type: 'offers', isDisabled: true },
];

export const FILTER_TYPES = [
  { type: 'everything', isChecked: true },
  { type: 'future', isChecked: false },
  { type: 'present', isChecked: false },
  { type: 'past', isChecked: false },
];

export const EVENT_TYPES = [
  'taxi', 'bus', 'train', 'ship', 'drive',
  'flight', 'check-in', 'sightseeing', 'restaurant'
];

export const DESTINATIONS = [
  'Amsterdam', 'Geneva', 'Chamonix'
];

export const CREATE_OFFERS = [
  { id: 'luggage', title: 'Add luggage', price: 30, isSelected: true },
  { id: 'comfort', title: 'Switch to comfort class', price: 100, isSelected: true },
  { id: 'meal', title: 'Add meal', price: 15, isSelected: false },
  { id: 'seats', title: 'Choose seats', price: 5, isSelected: false },
  { id: 'train', title: 'Travel by train', price: 40, isSelected: false }
];

export const EDIT_OFFERS = [
  { id: 'luggage', title: 'Add luggage', price: 50, isSelected: true },
  { id: 'comfort', title: 'Switch to comfort', price: 80, isSelected: true },
  { id: 'meal', title: 'Add meal', price: 15, isSelected: false },
  { id: 'seats', title: 'Choose seats', price: 5, isSelected: false },
  { id: 'train', title: 'Travel by train', price: 40, isSelected: false }
];

export const POINT_OFFERS = {
  taxi: [
    { title: 'Order Uber', price: 20 }
  ],
  flight: [
    { title: 'Add luggage', price: 50 },
    { title: 'Switch to comfort', price: 80 }
  ],
  bus: [],
  train: [],
  ship: [],
  drive: [],
  'check-in': [],
  sightseeing: [],
  restaurant: []
};

export const DESTINATION_DESCRIPTIONS = {
  'Amsterdam': 'Amsterdam is the capital and most populous city of the Netherlands.',
  'Geneva': 'Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.',
  'Chamonix': 'Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, it\'s renowned for its skiing.'
};

export const DESTINATION_PHOTOS = {
  'Amsterdam': ['1.jpg', '2.jpg', '3.jpg'],
  'Geneva': ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'],
  'Chamonix': ['1.jpg', '2.jpg', '3.jpg']
};
