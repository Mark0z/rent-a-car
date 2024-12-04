import './table-of-cars.scss';
import PropTypes from 'prop-types';
import { Button } from 'components/inputs/button/Button';
import { useStateMachine } from 'little-state-machine';
import carImg from 'assets/mistery-car.jpg';
import { updateAction } from 'utils/updateAction';
import { useCountTotalAmount } from 'hooks/useCountTotalAmount';

const mockedCar = [
  {
    id: 4507,
    brand: 'Ford',
    model: 'Mustang',
    year: 1994,
    fuelType: 'ELECTRIC',
    pricePerDay: 251.1,
    mileage: 49501,
    transmission: 'AUTOMATIC',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Ford_GT_Mustang-20210225-RM-170121.jpg/330px-Ford_GT_Mustang-20210225-RM-170121.jpg',
    registrationNumber: 'OXG038g'
  }
];

export const TableOfCars = ({ carList = mockedCar, ...props }) => {
  const { actions } = useStateMachine({ updateAction });

  const handleOnCarSelect = ({ id, model, brand, pricePerDay }) => {
    actions.updateAction({
      carId: id,
      model: model,
      brand: brand,
      pricePerDay: pricePerDay,
      reservationFormStep: 3
    });
  };

  return (
    <div className="table-of-cars" {...props}>
      {carList.map((car) => (
        <div className="car-list-item" key={car.id}>
          <div className="car-list-item--left">
            <img className="car-list-item--left--image" src={carImg} alt="" />
            <Button
              onClick={() => handleOnCarSelect(car)}
              className="car-list-item--left--button"
              isSecondary={true}>
              wybieram
            </Button>
          </div>
          <div className="car-list-item--center">
            <b className="car-list-item--b">
              {car.brand} {car.model}
            </b>
            <p className="car-list-item--p">
              Silnik: - {car.fuelType}
              <br />
              Skrzynia biegów - {car.transmission}
              <br />
              Rok produkcji: {car.year}
              <br />
              Przebieg: {car.mileage}km
            </p>
          </div>
          <div className="car-list-item--right">
            <h3 className="car-list-item--h3">{useCountTotalAmount(car.pricePerDay)} PLN</h3>
            <p className="car-list-item--p">za cały okres wynajmu</p>
            <p className="car-list-item--p">{car.pricePerDay} PLN / dzień</p>
            <p className="car-list-item--p">Podane ceny są cenami brutto</p>
          </div>
        </div>
      ))}
    </div>
  );
};

TableOfCars.propTypes = {
  carList: PropTypes.array
};
