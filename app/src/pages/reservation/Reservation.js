import './reservation.scss';
import { Content } from 'components/content/Content';
import { ContentBox } from 'components/content-box/ContentBox';
import { ReservationDatePickerForm } from 'components/reservation-date-picker-form/ReservationDatePickerForm';
import { useStateMachine } from 'little-state-machine';
import { ReservationCarPicker } from 'components/reservation-car-picker/ReservationCarPicker';
import { clearAction } from 'utils/clearAction';
import { updateAction } from 'utils/updateAction';
import { useCountDaysOfReservation } from 'hooks/useCountDaysOfReservation';

export const Reservation = () => {
  const { state, actions } = useStateMachine({ clearAction, updateAction });
  const storedState = state.data;

  const renderStep = (step) => {
    switch (step) {
      case 1:
        return (
          <div>
            <ReservationDatePickerForm />
          </div>
        );
      case 2:
        return <ReservationCarPicker />;
      default:
        return null;
    }
  };

  function handleChangeDate(data) {
    actions.clearAction(data);
  }

  return (
    <div className="reservation">
      <Content className="reservation--content">
        <div className="reservation--content-left">
          <ContentBox title="Czas wynajmu" className="reservation--content-box" center>
            {renderStep(storedState.reservationFormStep)}
          </ContentBox>
        </div>
        <div className="reservation--content-right">
          <ContentBox title="Twoja rezerwacja" className="reservation--content-box">
            <div className="reservation--content-box--info">
              {storedState.startDate && (
                <>
                  <h4 className="reservation--content-box--h4">
                    Czas wynajmu - {useCountDaysOfReservation(storedState)} dni
                  </h4>
                  <p className="reservation--content-box--p">
                    Odbiór: {storedState.startDate} <br />
                    {storedState.startAgencyName}
                    <br />
                    Zwrot: {storedState.endDate} <br />
                    {storedState.endAgencyName}
                  </p>
                  <h5 className="reservation--content-box--h5" onClick={() => handleChangeDate()}>
                    popraw
                  </h5>
                </>
              )}
              {storedState.brand && (
                <>
                  <h4 className="reservation--content-box--h4">Wybór samochodu</h4>
                  <p className="reservation--content-box--p">
                    {storedState.brand} {storedState.model}
                    <br />
                    {storedState.pricePerDay} PLN / dzień
                  </p>
                  <h5
                    className="reservation--content-box--h5"
                    onClick={() =>
                      actions.updateAction({
                        reservationFormStep: 2,
                        id: '',
                        model: '',
                        pricePerDay: '',
                        brand: ''
                      })
                    }>
                    popraw
                  </h5>
                </>
              )}
            </div>
          </ContentBox>
        </div>
      </Content>
    </div>
  );
};
