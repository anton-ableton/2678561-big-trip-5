import dayjs from 'dayjs';
import { SortType } from '../const.js';

export const sortPointsBy = (points, sortType) => {
  const sortedPoints = [...points];

  switch (sortType) {
    case SortType.TIME:
      return sortedPoints.sort((a, b) => {
        const durationA = dayjs(a.date_to).diff(dayjs(a.date_from));
        const durationB = dayjs(b.date_to).diff(dayjs(b.date_from));
        return durationB - durationA;
      });

    case SortType.PRICE:
      return sortedPoints.sort((a, b) => b.base_price - a.base_price);

    case SortType.DAY:
    default:
      return sortedPoints.sort((a, b) => dayjs(a.date_from).diff(dayjs(b.date_from)));
  }
};
