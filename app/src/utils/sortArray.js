export const sortArray = (array, key, ascending = true) => {
  if (ascending) {
    return [...array].sort((a, b) => (a[key] > b[key] ? 1 : -1));
  } else {
    return [...array].sort((a, b) => (a[key] < b[key] ? 1 : -1));
  }
};
