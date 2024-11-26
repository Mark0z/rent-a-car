import './contact-mail-form.scss';
import { useForm } from 'react-hook-form';
import { TextInput } from 'components/inputs/text-input/TextInput';
import { TextArea } from 'components/inputs/text-area/TextArea';
import { Button } from 'components/inputs/button/Button';
import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import emailjs from 'emailjs-com';

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
      emailjs
        .sendForm(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
          formRef.current,
          process.env.REACT_APP_EMAILJS_PUBLIC_KEY
        )
        .then(
          () => {
            alert('Wiadomość wysłana!');
            console.log('SUCCESS!');
          },
          (error) => {
            console.log(error.text);
          }
        );
      recaptchaRef.current.reset();
    } else {
      setIsCaptchaSolved(false);
    }
  };

  return (
    <form ref={formRef} className="contact-mail-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="contact-mail-form__row">
        <TextInput
          className="contact-mail-form--input"
          name="name"
          textLabel="Imię"
          errors={errors.name}
          {...register('name', { required: true })}
        />
        <TextInput
          className="contact-mail-form--input"
          name="surname"
          textLabel="Nazwisko"
          errors={errors.surname}
          {...register('surname', { required: true })}
        />
      </div>
      <div className="contact-mail-form__row">
        <TextInput
          className="contact-mail-form--input"
          name="telephone"
          textLabel="Telefon"
          type="tel"
          placeholder="123456789"
          pattern="[0-9]{9,11}"
          errors={errors.telephone}
          {...register('telephone', { required: true })}
        />
        <TextInput
          className="contact-mail-form--input"
          name="email"
          type="email"
          placeholder="email@email.com"
          textLabel="Adres email"
          errors={errors.email}
          {...register('email', { required: true })}
        />
      </div>
      <TextArea
        className="contact-mail-form--input"
        name="textarea"
        textLabel="Treść wiadomości"
        errors={errors.textarea}
        {...register('textarea', { required: true })}
      />
      <div className="contact-mail-form--captcha">
        <ReCAPTCHA sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} ref={recaptchaRef} />
        {!isCaptchaSolved && (
          <p className="contact-mail-form--captcha__error">
            Aby kontynuować, rozwiąż proszę CAPTCHA
          </p>
        )}
      </div>
      <Button className="contact-mail-form--submit" type="submit">
        Wyślij
      </Button>
    </form>
  );
};
