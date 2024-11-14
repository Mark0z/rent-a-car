import axios from 'axios';

export const getMostPopularCars = async () => {
  return await axios.get('http://localhost:8080/cars/').then((res) => {
    res.data;
  });
};
