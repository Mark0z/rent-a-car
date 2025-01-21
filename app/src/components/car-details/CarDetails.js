import './car-details.scss';
import PropTypes from 'prop-types';
import { Table } from 'components/table/Table';
import { Link } from 'react-router-dom';
import { sortArray } from 'utils/sortArray';

export const CarDetails = ({ car, reservations }) => {
  return (
    <div className="car__details__container">
      <div className="car__details__info">
        <div className="car__details__image">
          <img src={car.imageUrl} alt={`${car.brand} ${car.model}`} />
        </div>
        <div className="car__details__data">
          <h3>Dane pojazdu</h3>
          <p>
            <b>Marka:</b> {car.brand}
          </p>
          <p>
            <b>Model:</b> {car.model}
          </p>
          <p>
            <b>Rok produkcji:</b> {car.year}
          </p>
          <p>
            <b>Przebieg:</b> {car.mileage} km
          </p>
          <p>
            <b>Cena za dzień:</b> {car.pricePerDay} zł
          </p>
        </div>
      </div>
      <div className="car__details__reservations">
        {reservations.length > 0 ? (
          <>
            <h3>Historia rezerwacji</h3>
            <Table headerArray={['Od', 'Do', 'Koszt', 'Użytkownik', 'Status']}>
              {sortArray(reservations, 'startDate').map((reservation, index) => (
                <tr key={index}>
                  <td>{reservation.startDate.slice(0, 10)}</td>
                  <td>{reservation.endDate.slice(0, 10)}</td>
                  <td>{reservation.totalPrice} zł</td>
                  <td>
                    <Link to={`/user-profile/${reservation.user.id}`}>
                      {reservation.user.firstName} {reservation.user.lastName}
                    </Link>
                  </td>
                  <td>{reservation.status}</td>
                </tr>
              ))}
            </Table>
          </>
        ) : (
          <h4>Brak historii rezerwacji...</h4>
        )}
      </div>
    </div>
  );
};

CarDetails.propTypes = {
  car: PropTypes.object.isRequired,
  reservations: PropTypes.array.isRequired
};
