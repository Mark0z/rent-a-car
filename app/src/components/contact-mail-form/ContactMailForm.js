import './contact-mail-form.scss';
import { useForm } from 'react-hook-form';
import { TextInput } from 'components/inputs/text-input/TextInput';
import { TextArea } from 'components/inputs/text-area/TextArea';
import { Button } from 'components/inputs/button/Button';
import emailjs from 'emailjs-com';
import { useRef } from 'react';

export const ContactMailForm = () => {
  const form = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (e) => {
    console.log('data');
    console.log(e);

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <form ref={form} className="contact-mail-form" onSubmit={handleSubmit(onSubmit)}>
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
          placeholder="123-456-789"
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
      <Button className="contact-mail-form--submit" type="submit">
        Wyślij
      </Button>
    </form>
  );
};
