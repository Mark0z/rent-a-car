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
    <div className="table__of__cars" {...props}>
      {carList.map((car) => (
        <div className="car__list__item" key={car.id}>
          <div className="car__list__item-left">
            <img className="car__list__item-left__image" src={carImg} alt="" />
            <Button
              onClick={() => handleOnCarSelect(car)}
              className="car__list__item-left__button"
              isSecondary={true}>
              wybieram
            </Button>
          </div>
          <div className="car__list__item-center">
            <b className="car__list__item__b">
              {car.brand} {car.model}
            </b>
            <p className="car__list__item__p">
              Silnik: - {car.fuelType}
              <br />
              Skrzynia biegów - {car.transmission}
              <br />
              Rok produkcji: {car.year}
              <br />
              Przebieg: {car.mileage}km
            </p>
          </div>
          <div className="car__list__item-right">
            <h3 className="car__list__item__h3">{useCountTotalAmount(car.pricePerDay)} PLN</h3>
            <p className="car__list__item__p">za cały okres wynajmu</p>
            <p className="car__list__item__p">{car.pricePerDay} PLN / dzień</p>
            <p className="car__list__item__p">Podane ceny są cenami brutto</p>
          </div>
        </div>
      ))}
    </div>
  );
};

TableOfCars.propTypes = {
  carList: PropTypes.array
};
