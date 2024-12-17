import { Table } from 'components/table/Table';
import { Button } from 'components/inputs/button/Button';
import PropTypes from 'prop-types';

export const ReservationsTable = ({ reservations, onCancel, showCancelButton = false, title }) => {
  return (
    <>
      {reservations.length > 0 && (
        <>
          <h3>{title}</h3>
          <Table
            headerArray={[
              'Od',
              'Do',
              'Koszt',
              'Samochód',
              'Status',
              ...(showCancelButton === true ? [''] : [])
            ]}>
            {reservations.map((reservation, index) => (
              <tr key={index}>
                <td>{reservation.startDate.slice(0, 10)}</td>
                <td>{reservation.endDate.slice(0, 10)}</td>
                <td>{reservation.totalPrice} zł</td>
                <td>
                  {reservation.car.brand} {reservation.car.model}
                </td>
                <td>{reservation.status}</td>
                {showCancelButton && (
                  <td>
                    <Button isDanger onClick={() => onCancel(reservation.id)}>
                      Anuluj
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </Table>
        </>
      )}
    </>
  );
};

ReservationsTable.propTypes = {
  reservations: PropTypes.array,
  onCancel: PropTypes.func,
  showCancelButton: PropTypes.bool,
  title: PropTypes.string
};
