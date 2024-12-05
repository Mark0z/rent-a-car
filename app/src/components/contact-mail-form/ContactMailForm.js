import './contact-mail-form.scss';
import { useForm } from 'react-hook-form';
import { TextInput } from 'components/inputs/text-input/TextInput';
import { TextArea } from 'components/inputs/text-area/TextArea';
import { Button } from 'components/inputs/button/Button';
import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { sendMail } from 'utils/sendMail';

export const ContactMailForm = () => {
  const formRef = useRef();
  const recaptchaRef = useRef(null);
  const [isCaptchaSolved, setIsCaptchaSolved] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = () => {
    const captchaData = recaptchaRef.current.getValue();
    setIsCaptchaSolved(true);

    if (captchaData) {
      sendMail(formRef.current);
      recaptchaRef.current.reset();
    } else {
      setIsCaptchaSolved(false);
    }
  };

  return (
    <form ref={formRef} className="contact__mail__form" onSubmit={handleSubmit(onSubmit)}>
      <div className="contact__mail__form__row">
        <TextInput
          className="contact__mail__form__input"
          name="name"
          textLabel="Imię"
          errors={errors.name}
          {...register('name', { required: true })}
        />
        <TextInput
          className="contact__mail__form__input"
          name="surname"
          textLabel="Nazwisko"
          errors={errors.surname}
          {...register('surname', { required: true })}
        />
      </div>
      <div className="contact__mail__form__row">
        <TextInput
          className="contact__mail__form__input"
          name="telephone"
          textLabel="Telefon"
          type="tel"
          placeholder="123456789"
          pattern="[0-9]{9,11}"
          errors={errors.telephone}
          {...register('telephone', { required: true })}
        />
        <TextInput
          className="contact__mail__form__input"
          name="email"
          type="email"
          placeholder="email@email.com"
          textLabel="Adres email"
          errors={errors.email}
          {...register('email', { required: true })}
        />
      </div>
      <TextArea
        className="contact__mail__form__input"
        name="textarea"
        textLabel="Treść wiadomości"
        errors={errors.textarea}
        {...register('textarea', { required: true })}
      />
      <div className="contact__mail__form__captcha">
        <ReCAPTCHA sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} ref={recaptchaRef} />
        {!isCaptchaSolved && (
          <p className="contact__mail__form__captcha-error">
            Aby kontynuować, rozwiąż proszę CAPTCHA
          </p>
        )}
      </div>
      <Button className="contact__mail__form__submit" type="submit">
        Wyślij
      </Button>
    </form>
  );
};
