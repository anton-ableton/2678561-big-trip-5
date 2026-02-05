import { formatDate, formatTime, formatDuration } from './utils.js';

export function adaptPointToView(point, destination, offers) {
  return {
    id: point.id,
    type: point.type,
    destinationName: destination?.name ?? '',
    dateFrom: point.date_from,
    dateTo: point.date_to,
    formattedDate: formatDate(point.date_from),
    formattedStartTime: formatTime(point.date_from),
    formattedEndTime: formatTime(point.date_to),
    duration: formatDuration(point.date_from, point.date_to),
    price: point.base_price,
    isFavorite: point.isFavorite,
    offers,
  };
}

export function getOffersForPoint(point, pointsModel) {
  return point.offers
    .map((id) => pointsModel.getOfferById(point.type, id))
    .filter(Boolean);
}

export function getAdaptedPointData(point, pointsModel) {
  const destination = pointsModel.getDestinationById(point.destination);
  const offers = getOffersForPoint(point, pointsModel);

  return adaptPointToView(point, destination, offers);
}
