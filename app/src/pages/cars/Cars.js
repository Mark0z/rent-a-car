import './cars.scss';
import { Content } from 'components/content/Content';
import { useAxios } from 'hooks/useAxios';
import { Spinner } from 'components/spinner/Spinner';
import { ContentBox } from 'components/content-box/ContentBox';
import { CarItem } from 'components/car-item/CarItem';
import React, { useEffect, useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { sortArray } from 'utils/sortArray';
import { useForm } from 'react-hook-form';
import { Button } from 'components/inputs/button/Button';

const filters = {
  transmissionTypes: ['AUTOMATIC', 'MANUAL'],
  fuelTypes: ['DIESEL', 'ELECTRIC', 'HYBRID', 'PETROL']
};

export const Cars = () => {
  const [isSortByPrice, setIsSortByPrice] = useState(true);
  const [filteredCars, setFilteredCars] = useState([]);
  const { loading, data, error } = useAxios({
    url: 'http://localhost:8080/cars/',
    method: 'GET'
  });
  const { register, watch, getValues } = useForm({
    defaultValues: {
      transmissionTypes: [],
      fuelTypes: []
    }
  });

  useEffect(() => {
    const transmissionFilters = getValues('transmissionTypes');
    const fuelFilters = getValues('fuelTypes');

    const filteredArray = data.filter((car) => {
      const matchesTransmission =
        transmissionFilters.length === 0 || transmissionFilters.includes(car.transmission);
      const matchesFuel = fuelFilters.length === 0 || fuelFilters.includes(car.fuelType);
      return matchesTransmission && matchesFuel;
    });

    setFilteredCars(sortArray(filteredArray, 'pricePerDay', isSortByPrice));
  }, [watch('transmissionTypes'), watch('fuelTypes')]);

  useEffect(() => {
    setFilteredCars(sortArray(data, 'pricePerDay', isSortByPrice));
  }, [data]);

  const handSortByPrice = () => {
    const sortedByPrice = sortArray(filteredCars, 'pricePerDay', !isSortByPrice);
    setIsSortByPrice(!isSortByPrice);
    setFilteredCars(sortedByPrice);
  };

  return (
    <div className="cars">
      <Content>
        <ContentBox title="Samochody" className="cars--content-box" center>
          <div className="cars--filters">
            {filters.transmissionTypes.map((type, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  value={type}
                  id={type}
                  name={type}
                  {...register('transmissionTypes')}
                />
                <label htmlFor={type}>{type}</label>
              </div>
            ))}
            {filters.fuelTypes.map((type, index) => (
              <div key={index}>
                <input type="checkbox" value={type} name={type} {...register('fuelTypes')} />
                <label htmlFor={type}>{type}</label>
              </div>
            ))}
            <Button onClick={() => handSortByPrice()}>
              Cena {isSortByPrice ? <FaArrowUp /> : <FaArrowDown />}
            </Button>
          </div>
          {!loading ? (
            <>
              {filteredCars.map((car, index) => (
                <CarItem
                  key={index}
                  price={car.pricePerDay}
                  brand={car.brand}
                  model={car.model}
                  imageUrl={car.imageUrl}
                />
              ))}
            </>
          ) : (
            <Spinner />
          )}
          {error ? <p className="error">{error.message}</p> : null}
        </ContentBox>
      </Content>
    </div>
  );
};
