export const searchArray = (array, query) => {
  const lowerCaseQuery = query.toLowerCase();

  return array.filter((item) =>
    Object.values(item).some((value) => String(value).toLowerCase().includes(lowerCaseQuery))
  );
};
