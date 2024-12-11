import './user-reservations-table.scss';
import { Table } from 'components/table/Table';
import { useAxios } from 'hooks/useAxios';
import { useStateMachine } from 'little-state-machine';
import { sortArray } from 'utils/sortArray';

export const UserReservationsTable = () => {
  const { state } = useStateMachine();
  const userId = state.data.userId;
  const { error, loading, data } = useAxios({
    method: 'GET',
    url: `http://localhost:8080/reservations/user/${userId}`
  });
  const sortedArrayByDate = sortArray(data, 'endDate', false);

  return (
    <>
      {error ? (
        <p>{error}</p>
      ) : (
        <Table loading={loading} headerArray={['Od', 'Do', 'Status', 'Koszt', 'Samochód']}>
          {sortedArrayByDate.map((reservation, index) => (
            <tr key={index}>
              <td>{reservation.startDate.slice(0, 10)}</td>
              <td>{reservation.endDate.slice(0, 10)}</td>
              <td>{reservation.status}</td>
              <td>{reservation.totalPrice} zł</td>
              <td>
                {reservation.car.brand} {reservation.car.model}
              </td>
            </tr>
          ))}
        </Table>
      )}
    </>
  );
};
