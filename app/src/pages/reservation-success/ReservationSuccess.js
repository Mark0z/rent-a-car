import './reservation-success.scss';
import { Content } from 'components/content/Content';
import { ContentBox } from 'components/content-box/ContentBox';
import { useStateMachine } from 'little-state-machine';
import { useEffect } from 'react';
import { updateAction } from 'utils/updateAction';
import { reservationDefaultState } from 'data/little-state-machine-default-state';

export const ReservationSuccess = () => {
  const { state, actions } = useStateMachine({ updateAction });
  const reservationId = '' || state.data.reservationId;

  useEffect(() => {
    actions.updateAction(reservationDefaultState);
  }, []);

  return (
    <Content>
      <ContentBox title="Szczegóły twojej rezerwacji" className="reservation__success" center>
        <h4>Numer twojej rezerwacji: {reservationId}</h4>
      </ContentBox>
    </Content>
  );
};
