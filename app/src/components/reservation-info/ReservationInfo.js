import './reservation-info.scss';
import { useCountDaysOfReservation } from 'hooks/useCountDaysOfReservation';
import { ContentBox } from 'components/content-box/ContentBox';
import { useStateMachine } from 'little-state-machine';
import { updateAction } from 'utils/updateAction';
import { clearAction } from 'utils/clearAction';
import {
  authState,
  pickedCarState,
  reservationDefaultState
} from 'data/little-state-machine-default-state';
import { ReservationInfoItem } from 'components/reservation-info-item/ReservationInfoItem';

export const ReservationInfo = () => {
  const { state, actions } = useStateMachine({ updateAction, clearAction });
  const storedState = state.data;

  const handleChangeDate = () => {
    actions.updateAction(reservationDefaultState);
  };

  const handleClearCarDetails = () => {
    actions.updateAction(pickedCarState);
  };

  const handleLogout = () => {
    actions.updateAction(authState);
    actions.updateAction({ reservationFormStep: 3 });
  };

  const countTotalAmount = () => {
    return Math.round(storedState.pricePerDay * useCountDaysOfReservation(storedState));
  };

  return (
    <ContentBox title="Twoja rezerwacja" className="reservation__content__box" center>
      <div className="reservation__info">
        {storedState.userId && (
          <ReservationInfoItem
            title="Dane wynajmującego"
            buttonText="wyloguj..."
            buttonFunc={handleLogout}>
            {storedState.firstName} {storedState.lastName}
            <br />
            Email: {storedState.email}
            <br />
            Telefon: {storedState.phone}
          </ReservationInfoItem>
        )}
        {storedState.startDate && (
          <ReservationInfoItem
            title={`Czas wynajmu - ${useCountDaysOfReservation(storedState)} dni`}
            buttonFunc={handleChangeDate}
            buttonText="zmiana daty wynajmu...">
            Odbiór: <br />
            {storedState.startDate.replace('T', ' ')} - {storedState.startAgencyName}
            <br />
            Zwrot: <br />
            {storedState.endDate.replace('T', ' ')} - {storedState.endAgencyName}
          </ReservationInfoItem>
        )}
        {storedState.carId && (
          <ReservationInfoItem
            title="Wybór samochodu"
            buttonFunc={handleClearCarDetails}
            buttonText="Zamina samochodu">
            {storedState.brand} {storedState.model}
            <br />
            {storedState.pricePerDay} PLN / dzień
          </ReservationInfoItem>
        )}
        {storedState.carId && storedState.startDate && (
          <div className="reservation__info__total">
            <h2 className="reservation__info__total__h2">{countTotalAmount()} PLN</h2>
            <p className="reservation__info__total__p">
              <b>za czały okres wynajmu</b> ({storedState.pricePerDay} PLN / dzień)
            </p>
            <p className="reservation__info__total__p">Podane ceny są cenami brutto</p>
          </div>
        )}
      </div>
    </ContentBox>
  );
};
