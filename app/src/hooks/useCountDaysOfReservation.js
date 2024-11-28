export const useCountDaysOfReservation = (storedDate) => {
  const startDate = new Date(storedDate.startDate);
  const endDate = new Date(storedDate.endDate);

  const oneDay = 1000 * 60 * 60 * 24;

  return Math.round((endDate - startDate) / oneDay) || null;
};
