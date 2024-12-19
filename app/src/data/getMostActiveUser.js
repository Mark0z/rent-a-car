export const getMostActiveUser = (reservations, users) => {
  const userReservations = users.map((user) => ({
    user: user,
    count: reservations.filter((res) => res.user.id === user.id).length
  }));
  return userReservations.sort((a, b) => b.count - a.count)[0]?.user;
};
