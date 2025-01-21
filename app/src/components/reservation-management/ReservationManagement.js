import './reservation-management.scss';
import { useAxios } from 'hooks/useAxios';
import { useEffect, useState } from 'react';
import { Spinner } from 'components/spinner/Spinner';
import axios from 'axios';
import { AlertDialog } from 'components/alert-dialog/AlertDialog';
import { sortArray } from 'utils/sortArray';
import { Button } from 'components/inputs/button/Button';
import { Table } from 'components/table/Table';
import { Link } from 'react-router-dom';
import { HorizontalDropdown } from 'components/hotizontal-dropdown/HorizontalDropdown';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

const typesOfStatus = ['COMPLETED', 'ACTIVE', 'PENDING', 'CONFIRMED', 'CANCELLED'];
export const ReservationManagement = ({ refreshCounter }) => {
  const { data, loading, error, setRefresh } = useAxios('http://localhost:8080/reservations/');
  const { register, watch, getValues } = useForm();
  const [filteredData, setFilteredData] = useState([]);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState(null);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    const statusTypes = getValues('statusType');
    if (!data) return;
    setFilteredData(
      statusTypes?.length > 0
        ? data.filter((reservation) => statusTypes.includes(reservation.status))
        : data
    );
  }, [watch('statusType'), data]);

  const handleReservationCancel = (id) => {
    setSelectedReservationId(id);
    setShowCancelDialog(true);
  };

  const handleReservationConfirm = (id) => {
    setSelectedReservationId(id);
    setShowSuccessDialog(true);
  };

  const confirmCancelReservation = () => {
    axios
      .post(`http://localhost:8080/reservations/cancel/${selectedReservationId}`)
      .then(() => {
        const randNumber = Math.random();
        setRefresh(randNumber);
        refreshCounter(randNumber);
      })
      .catch(() => {
        alert('Wystąpił błąd podczas anulowania rezerwacji');
      });
    setShowCancelDialog(false);
  };

  const confirmSuccessReservation = () => {
    axios
      .post(`http://localhost:8080/reservations/confirm/${selectedReservationId}`)
      .then(() => {
        const randNumber = Math.random();
        setRefresh(randNumber);
        refreshCounter(randNumber);
      })
      .catch(() => {
        alert('Wystąpił błąd podczas potwierdzania rezerwacji');
      });
    setShowSuccessDialog(false);
  };

  return (
    <div className="reservation__management">
      {loading ? (
        <Spinner />
      ) : (
        <div className="reservation__management__container">
          <HorizontalDropdown
            value="statusType"
            title="Status"
            register={register}
            array={typesOfStatus}
          />
          <Table headerArray={['id', 'Od', 'Do', 'Koszt', 'Użytkownik', 'Samochód', 'Status', '']}>
            {sortArray(filteredData, 'startDate', false).map((reservation, index) => (
              <tr key={index}>
                <td>{reservation.id}</td>
                <td>{reservation.startDate.slice(0, 10)}</td>
                <td>{reservation.endDate.slice(0, 10)}</td>
                <td>{reservation.totalPrice} zł</td>
                <td>
                  <Link to={`/user-profile/${reservation.user.id}`}>
                    {reservation.user.firstName} {reservation.user.lastName}
                  </Link>
                </td>
                <td>
                  <Link to={`/car-details/${reservation.car.id}`}>
                    {reservation.car.brand} {reservation.car.model}
                  </Link>
                </td>
                <td>{reservation.status}</td>
                <td>
                  {['ACTIVE', 'PENDING', 'CONFIRMED'].includes(reservation.status) ? (
                    <HorizontalDropdown title="Opcje">
                      {reservation.status === 'PENDING' && (
                        <Button isSuccess onClick={() => handleReservationConfirm(reservation.id)}>
                          Potwierdź
                        </Button>
                      )}
                      <Button isDanger onClick={() => handleReservationCancel(reservation.id)}>
                        Anuluj
                      </Button>
                    </HorizontalDropdown>
                  ) : null}
                </td>
              </tr>
            ))}
          </Table>
        </div>
      )}
      {error && <p>{error}</p>}

      <AlertDialog
        isOpen={showCancelDialog}
        message="Czy na pewno chcesz anulować tę rezerwację?"
        onConfirm={confirmCancelReservation}
        onCancel={() => setShowCancelDialog(false)}
        confirmText="Tak, anuluj"
        cancelText="Nie, zachowaj"
        isDanger
      />
      <AlertDialog
        isOpen={showSuccessDialog}
        message="Czy na pewno chcesz potwierdzić tę rezerwację?"
        onConfirm={confirmSuccessReservation}
        onCancel={() => setShowSuccessDialog(false)}
        confirmText="Potwierdź"
        cancelText="Anuluj"
        isSuccess
      />
    </div>
  );
};

ReservationManagement.propTypes = {
  refreshCounter: PropTypes.func
};
