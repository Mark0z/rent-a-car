export const categorizeReservations = (reservations) => {
  if (!reservations)
    return { activeReservations: [], pastReservations: [], futureReservations: [] };

  return {
    activeReservations: reservations.filter((res) => res.status === 'ACTIVE'),
    pastReservations: reservations.filter((res) => ['COMPLETED', 'CANCELLED'].includes(res.status)),
    futureReservations: reservations.filter((res) => ['CONFIRMED', 'PENDING'].includes(res.status))
  };
};
