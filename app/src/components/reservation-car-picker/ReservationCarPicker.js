import './reservation-car-picker.scss';
import { useAxios } from 'hooks/useAxios';
import { useStateMachine } from 'little-state-machine';
import { Spinner } from 'components/spinner/Spinner';
import { TableOfCars } from 'components/table-of-cars/TableOfCars';

export const ReservationCarPicker = () => {
  const { state } = useStateMachine();
  const { loading, data, error } = useAxios({
    url: `http://localhost:8080/cars/available?startDate=${state.data.startDate}&endDate=${state.data.endDate}`,
    method: 'GET'
  });

  return (
    <div className="reservation-car-picker">
      {loading ? <Spinner /> : <TableOfCars carList={data} />}
      {error && <p>{error}</p>}
    </div>
  );
};
