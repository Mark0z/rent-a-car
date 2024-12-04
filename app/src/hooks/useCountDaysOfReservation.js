export const useCountDaysOfReservation = ({ startDate, endDate }) => {
  const start = setFormattedDate(startDate);
  const end = setFormattedDate(endDate);

  const oneDay = 1000 * 60 * 60 * 24;

  return Math.round((end - start) / oneDay) || null;
};

const setFormattedDate = (date) => {
  return new Date(date.slice(0, 10));
};
