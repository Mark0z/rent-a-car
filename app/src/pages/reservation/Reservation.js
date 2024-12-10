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
  const [isCaptchaSolved, setIsCaptchaSolved] = useState(true);
  const { state, actions } = useStateMachine({ clearAction, updateAction });
  const { handleSubmit } = useForm();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const recaptchaRef = useRef(null);
  const navigate = useNavigate();
  const storedState = state.data;

  const sentMailToUser = () => {
    const data = {
      email: storedState.email,
      reservationId: storedState.reservationId,
      firstName: storedState.firstName,
      startDate: storedState.startDate,
      startAgencyName: storedState.startAgencyName,
      endDate: storedState.endDate,
      endAgencyName: storedState.endAgencyName
    };

    sendMail(data);
  };

  const onSubmit = () => {
    setLoading(true);
    const captchaData = recaptchaRef.current.getValue();
    const { carId, userId, startDate, endDate } = state.data;

    if (captchaData) {
      setIsCaptchaSolved(true);

      axios
        .post('http://localhost:8080/reservations/', {
          user: {
            id: userId
          },
          car: {
            id: carId
          },
          startDate: new Date(startDate).toISOString(),
          endDate: new Date(endDate).toISOString()
        })
        .then((response) => {
          setError(null);
          actions.updateAction({ reservationId: response.data.id });
          navigate('/reservation-success');
          sentMailToUser();
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    } else {
      setIsCaptchaSolved(false);
    }
  };

  const renderStep = (step) => {
    switch (step) {
      case 1:
        return (
          <ContentBox
            title={`Krok: ${storedState.reservationFormStep} / Czas wynajmu`}
            className="reservation__content__box"
            center>
            <div>
              <ReservationDatePickerForm isMediumSize />
            </div>
          </ContentBox>
        );
      case 2:
        return (
          <ContentBox
            title={`Krok: ${storedState.reservationFormStep} / Wybierz pojazd`}
            className="reservation__content__box"
            center>
            <ReservationCarPicker />
          </ContentBox>
        );
      case 3:
        return (
          <ContentBox
            title={`Krok: ${storedState.reservationFormStep} / Autoryzacja`}
            className="reservation__content__box"
            center>
            <Auth />
          </ContentBox>
        );
      case 4:
        return (
          <form onSubmit={handleSubmit(onSubmit)} className="reservation__form">
            <ReservationInfo />
            <div className="reservation__captcha">
              <ReCAPTCHA sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} ref={recaptchaRef} />
              {!isCaptchaSolved && (
                <p className="contact__mail__form__captcha-error">
                  Aby kontynuować, rozwiąż proszę CAPTCHA
                </p>
              )}
              {error && <p className="contact__mail__form__captcha-error">{error.response.data}</p>}
              <Button type="submit">Rezerwuj</Button>
            </div>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div className="reservation">
      <Content className="reservation__content">
        <div className={clsx('reservation__content-left')}>
          {!loading ? renderStep(storedState.reservationFormStep) : <Spinner />}
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
