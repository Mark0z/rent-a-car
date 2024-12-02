import './cars.scss';
import { Content } from 'components/content/Content';
import { useAxios } from 'hooks/useAxios';
import { Spinner } from 'components/spinner/Spinner';
import { ContentBox } from 'components/content-box/ContentBox';
import { CarItem } from 'components/car-item/CarItem';
import React, { useEffect, useState } from 'react';
import { sortArray } from 'utils/sortArray';
import { useForm } from 'react-hook-form';
import { Button } from 'components/inputs/button/Button';
import { HorizontalDropdown } from 'components/hotizontal-dropdown/HorizontalDropdown';
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';

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
            <div className="cars--filters--container">
              <HorizontalDropdown
                array={filters.fuelTypes}
                value="fuelTypes"
                title="Silnik"
                register={register}
              />
              <HorizontalDropdown
                array={filters.transmissionTypes}
                value="transmissionTypes"
                title="Skrzynia biegów"
                register={register}
              />
            </div>
            <Button onClick={() => handSortByPrice()} className="cars--filters--price">
              Cena {isSortByPrice ? <BiSolidUpArrow /> : <BiSolidDownArrow />}
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
