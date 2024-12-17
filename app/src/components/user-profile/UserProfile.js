import './user-profile.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useAxios } from 'hooks/useAxios';
import { Table } from 'components/table/Table';
import { Spinner } from 'components/spinner/Spinner';
import { Content } from 'components/content/Content';
import { ContentBox } from 'components/content-box/ContentBox';
import { Button } from 'components/inputs/button/Button';
import { AlertDialog } from 'components/alert-dialog/AlertDialog';
import { useEffect, useState } from 'react';
import { useStateMachine } from 'little-state-machine';
import axios from 'axios';

export const UserProfile = () => {
  const { state } = useStateMachine();
  const navigate = useNavigate();
  const { userId } = useParams();
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState(null);

  const {
    data: userData,
    loading: userLoading,
    error: userError
  } = useAxios({
    method: 'GET',
    url: `http://localhost:8080/users/${userId}`
  });

  const {
    data: reservationsData,
    loading: reservationsLoading,
    error: reservationsError
  } = useAxios({
    method: 'GET',
    url: `http://localhost:8080/reservations/user/${userId}`
  });

  useEffect(() => {
    if (state.data?.userType !== 'ADMIN') {
      navigate('/');
    }
  }, [state.data]);

  const activeReservations = reservationsData?.filter((res) => res.status === 'ACTIVE') || [];
  const pastReservations =
    reservationsData?.filter((res) => ['COMPLETED', 'CANCELLED'].includes(res.status)) || [];
  const futureReservations =
    reservationsData?.filter((res) => ['CONFIRMED', 'PENDING'].includes(res.status)) || [];

  if (userLoading || reservationsLoading) return <Spinner />;

  const handleReservationCancel = (id) => {
    setSelectedReservationId(id);
    setShowCancelDialog(true);
  };

  const confirmCancelReservation = () => {
    axios
      .post(`http://localhost:8080/reservations/cancel/${selectedReservationId}`)
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        alert('Wystąpił błąd podczas anulowania rezerwacji');
      });
    setShowCancelDialog(false);
  };

  return (
    <Content>
      <ContentBox title={`Użytkownik nr - ${userId}`}>
        <div className="user__profile">
          <div className="user__profile__info">
            <h3>Dane użytkownika</h3>
            <div className="user__profile__details">
              <p>
                <b>Email:</b> {userData.email}
              </p>
              <p>
                <b>Username:</b> {userData.username}
              </p>
              <p>
                <b>Imię i nazwisko:</b> {userData.firstName} {userData.lastName}
              </p>
              <p>
                <b>Telefon:</b> {userData.phone}
              </p>
              <p>
                <b>Data dołączenia:</b> {userData.dateJoined.slice(0, 10)}
              </p>
            </div>
            {userError && <p className="user__profile-error">{userError}</p>}
          </div>

          <div className="user-profile__reservations">
            {futureReservations.length > 0 && (
              <>
                <h3>Zaplanowane rezerwacje</h3>
                <Table headerArray={['Od', 'Do', 'Koszt', 'Samochód', 'Status', '']}>
                  {futureReservations.map((reservation, index) => (
                    <tr key={index}>
                      <td>{reservation.startDate.slice(0, 10)}</td>
                      <td>{reservation.endDate.slice(0, 10)}</td>
                      <td>{reservation.totalPrice} zł</td>
                      <td>
                        {reservation.car.brand} {reservation.car.model}
                      </td>
                      <td>{reservation.status}</td>
                      <td>
                        <Button isDanger onClick={() => handleReservationCancel(reservation.id)}>
                          Anuluj
                        </Button>
                      </td>
                    </tr>
                  ))}
                </Table>
              </>
            )}

            {activeReservations.length > 0 && (
              <>
                <h3>Aktywne rezerwacje</h3>
                <Table headerArray={['Od', 'Do', 'Koszt', 'Samochód', '']}>
                  {activeReservations.map((reservation, index) => (
                    <tr key={index}>
                      <td>{reservation.startDate.slice(0, 10)}</td>
                      <td>{reservation.endDate.slice(0, 10)}</td>
                      <td>{reservation.totalPrice} zł</td>
                      <td>
                        {reservation.car.brand} {reservation.car.model}
                      </td>
                      <td>
                        <Button isDanger onClick={() => handleReservationCancel(reservation.id)}>
                          Anuluj
                        </Button>
                      </td>
                    </tr>
                  ))}
                </Table>
              </>
            )}

            {pastReservations.length > 0 ? (
              <>
                <h3>Historia rezerwacji</h3>
                <Table headerArray={['Od', 'Do', 'Koszt', 'Samochód', 'Status']}>
                  {pastReservations.map((reservation, index) => (
                    <tr key={index}>
                      <td>{reservation.startDate.slice(0, 10)}</td>
                      <td>{reservation.endDate.slice(0, 10)}</td>
                      <td>{reservation.totalPrice} zł</td>
                      <td>
                        {reservation.car.brand} {reservation.car.model}
                      </td>
                      <td>{reservation.status}</td>
                    </tr>
                  ))}
                </Table>
              </>
            ) : (
              <h3>Brak historii rezerwacji...</h3>
            )}

            {reservationsError && <p className="user__profile-error">{reservationsError}</p>}
          </div>
        </div>
      </ContentBox>

      <AlertDialog
        isOpen={showCancelDialog}
        message="Czy na pewno chcesz anulować tę rezerwację?"
        onConfirm={confirmCancelReservation}
        onCancel={() => setShowCancelDialog(false)}
        confirmText="Tak, anuluj"
        cancelText="Nie, zachowaj"
      />
    </Content>
  );
};
