export const getMostPopularCar = (reservations, cars) => {
  const carReservations = cars.map((car) => ({
    car: car,
    count: reservations.filter((res) => res.car.id === car.id).length
  }));
  return carReservations.sort((a, b) => b.count - a.count)[0]?.car;
};
