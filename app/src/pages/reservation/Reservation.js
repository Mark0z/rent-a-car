import './reservation.scss';
import { Content } from 'components/content/Content';
import { ContentBox } from 'components/content-box/ContentBox';
import { ReservationDatePickerForm } from 'components/reservation-date-picker-form/ReservationDatePickerForm';
import { useStateMachine } from 'little-state-machine';
import { ReservationCarPicker } from 'components/reservation-car-picker/ReservationCarPicker';
import { clearAction } from 'utils/clearAction';
import { updateAction } from 'utils/updateAction';
import { Auth } from 'pages/auth/Auth';
import clsx from 'clsx';
import { ReservationInfo } from 'components/reservation-info/ReservationInfo';
import ReCAPTCHA from 'react-google-recaptcha';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'components/inputs/button/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { sendMail } from 'utils/sendMail';
import { Spinner } from 'components/spinner/Spinner';

export const Reservation = () => {
  const [isCaptchaSolved, setIsCaptchaSolved] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { state, actions } = useStateMachine({ clearAction, updateAction });
  const { handleSubmit } = useForm();
  const recaptchaRef = useRef(null);
  const navigate = useNavigate();
  const storedState = state.data;

  const sentMailToUser = () => {
    const { email, reservationId, firstName, startDate, startAgencyName, endDate, endAgencyName } =
      storedState;
    sendMail({
      email,
      reservationId,
      firstName,
      startDate,
      startAgencyName,
      endDate,
      endAgencyName
    });
  };

  const onSubmit = () => {
    setLoading(true);
    const captchaData = recaptchaRef.current.getValue();

    if (!captchaData) {
      setIsCaptchaSolved(false);
      setLoading(false);
      return;
    }

    const { carId, userId, startDate, endDate } = state.data;

    axios
      .post('http://localhost:8080/reservations/', {
        user: { id: userId },
        car: { id: carId },
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString()
      })
      .then((response) => {
        actions.updateAction({ reservationId: response.data.id });
        navigate('/reservation-success');
        sentMailToUser();
      })
      .catch(setError)
      .finally(() => setLoading(false));
  };

  const renderStep = {
    1: () => (
      <ContentBox
        title={`Krok: ${storedState.reservationFormStep} / Czas wynajmu`}
        className="reservation__content__box"
        center>
        <div>
          <ReservationDatePickerForm isMediumSize />
        </div>
      </ContentBox>
    ),
    2: () => (
      <ContentBox
        title={`Krok: ${storedState.reservationFormStep} / Wybierz pojazd`}
        className="reservation__content__box"
        center>
        <ReservationCarPicker />
      </ContentBox>
    ),
    3: () => (
      <ContentBox
        title={`Krok: ${storedState.reservationFormStep} / Autoryzacja`}
        className="reservation__content__box"
        center>
        <Auth />
      </ContentBox>
    ),
    4: () => (
      <form onSubmit={handleSubmit(onSubmit)} className="reservation__form">
        <ReservationInfo />
        <div className="reservation__captcha">
          <ReCAPTCHA sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} ref={recaptchaRef} />
          {!isCaptchaSolved && (
            <p className="contact__mail__form__captcha-error">
              Aby kontynuować, rozwiąż proszę CAPTCHA
            </p>
          )}
          {error && <p className="contact__mail__form__captcha-error">{error.response?.data}</p>}
          <Button type="submit">Rezerwuj</Button>
        </div>
      </form>
    )
  };

  return (
    <div className="reservation">
      <Content className="reservation__content">
        <div className={clsx('reservation__content-left')}>
          {!loading ? renderStep[storedState.reservationFormStep]() : <Spinner />}
        </div>
        {storedState.reservationFormStep !== 4 && storedState.startDate !== '' && (
          <div className="reservation__content-right">
            <ReservationInfo />
          </div>
        )}
      </Content>
    </div>
  );
};
