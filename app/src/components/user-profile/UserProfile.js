import './user-profile.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useAxios } from 'hooks/useAxios';
import { Spinner } from 'components/spinner/Spinner';
import { Content } from 'components/content/Content';
import { ContentBox } from 'components/content-box/ContentBox';
import { AlertDialog } from 'components/alert-dialog/AlertDialog';
import { useEffect, useState } from 'react';
import { useStateMachine } from 'little-state-machine';
import axios from 'axios';
import { ReservationsTable } from 'components/reservations-table/ReservationsTable';
import { UserDetails } from 'components/user-details/UserDetails';
import { categorizeReservations } from 'utils/categorizeReservations';

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

  const { futureReservations, activeReservations, pastReservations } =
    categorizeReservations(reservationsData);

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
        alert('Rezerwacja została anulowana');
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
          <UserDetails user={userData} />
          {userError && <p className="user__profile-error">{userError}</p>}
          <div className="user__profile__reservations">
            <ReservationsTable
              title="Zaplanowane rezerwacje"
              reservations={futureReservations}
              onCancel={handleReservationCancel}
              showCancelButton
            />
            <ReservationsTable
              title="Aktywne rezerwacje"
              reservations={activeReservations}
              onCancel={handleReservationCancel}
              showCancelButton
            />
            <ReservationsTable title="Historia rezerwacji" reservations={pastReservations} />
            {reservationsData.length === 0 && <h3>Brak historii rezerwacji...</h3>}
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
