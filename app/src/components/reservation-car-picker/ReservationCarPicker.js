import './reservation-car-picker.scss';
import { useAxios } from 'hooks/useAxios';
import { useStateMachine } from 'little-state-machine';
import { Spinner } from 'components/spinner/Spinner';
import { TableOfCars } from 'components/table-of-cars/TableOfCars';
import { sortArray } from 'utils/sortArray';

export const ReservationCarPicker = () => {
  const { state } = useStateMachine();
  const { loading, data, error } = useAxios(
    `http://localhost:8080/cars/available?startDate=${state.data.startDate}&endDate=${state.data.endDate}`
  );

  return (
    <div className="reservation__car__picker">
      {loading ? <Spinner /> : <TableOfCars carList={sortArray(data, 'pricePerDay')} />}
      {error && <p>{error.message}</p>}
    </div>
  );
};
