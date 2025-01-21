export const calculateMonthlyRevenue = (reservations) => {
  const currentMonth = new Date().getMonth();
  return reservations
    .filter(
      (res) => res.status === 'COMPLETED' && new Date(res.endDate).getMonth() === currentMonth
    )
    .reduce((acc, res) => acc + res.totalPrice, 0)
    .toFixed(2);
};
