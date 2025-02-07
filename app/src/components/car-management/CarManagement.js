import './car-management.scss';
import { useAxios } from 'hooks/useAxios';
import { Table } from 'components/table/Table';
import { TextInput } from 'components/inputs/text-input/TextInput';
import { useEffect, useState } from 'react';
import { searchArray } from 'utils/searchArray';
import { Spinner } from 'components/spinner/Spinner';
import { Button } from 'components/inputs/button/Button';

export const CarManagement = () => {
  const { data, loading, error } = useAxios('http://localhost:8080/cars/');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(data);
  }, [loading]);

  const searchCar = (query) => {
    const array = searchArray(data, query);
    setFilteredData(array);
  };

  const handleCarInfo = (carId) => {
    window.open(`/car-details/${carId}`, '_blank');
  };

  return (
    <div className="car__management">
      {loading ? (
        <Spinner />
      ) : (
        <div className="car__management__table__container">
          <TextInput
            className="car__management__search__input"
            name="search"
            textLabel="Wyszukaj"
            onChange={(e) => searchCar(e.target.value)}
            mediumSize
          />
          <Table
            loading={loading}
            headerArray={['Id', 'Marka', 'Model', 'Rok', 'Przebieg', 'Cena/dzień', 'Info']}>
            {filteredData.map((car, index) => (
              <tr key={index}>
                <td>{car.id}</td>
                <td>{car.brand}</td>
                <td>{car.model}</td>
                <td>{car.year}</td>
                <td>{car.mileage} km</td>
                <td>{car.pricePerDay} zł</td>
                <td>
                  <Button onClick={() => handleCarInfo(car.id)} isSecondary>
                    Info
                  </Button>
                </td>
              </tr>
            ))}
          </Table>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};
