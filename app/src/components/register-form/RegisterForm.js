import './register-form.scss';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button } from 'components/inputs/button/Button';
import { TextInput } from 'components/inputs/text-input/TextInput';

export const RegisterForm = ({ setIsLoginPage }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const handleRegisterForm = (data) => {
    console.log(data);
    axios
      .post('http://localhost:8080/auth/register', data)
      .then((response) => {
        console.log(response);
      })
      .then((error) => console.log(error));
  };

  return (
    <form className="register-form" onSubmit={handleSubmit(handleRegisterForm)}>
      <TextInput
        className="register-form--input"
        name="email"
        textLabel="Email"
        type="email"
        mediumSize
        errors={errors.email}
        {...register('email', { required: true })}
      />
      <TextInput
        className="register-form--input"
        name="username"
        textLabel="Nazwa użytkownika"
        mediumSize
        errors={errors.username}
        {...register('username', { required: true })}
      />
      <TextInput
        className="register-form--input"
        name="password"
        type="password"
        textLabel="Hasło"
        mediumSize
        errors={errors.password}
        {...register('password', { required: true })}
      />
      <TextInput
        className="register-form--input"
        name="firstName"
        textLabel="Imię"
        mediumSize
        errors={errors.firstName}
        {...register('firstName', { required: true })}
      />
      <TextInput
        className="register-form--input"
        name="lastName"
        textLabel="Nazwisko"
        mediumSize
        errors={errors.lastName}
        {...register('lastName', { required: true })}
      />
      <TextInput
        className="register-form--input"
        name="phone"
        textLabel="Telefon"
        type="tel"
        placeholder="123456789"
        pattern="[0-9]{9,11}"
        mediumSize
        errors={errors.phone}
        {...register('phone', { required: true })}
      />

      <Button className="register-form--button" type="submit">
        Zarejestruj
      </Button>
      <p className="register-form--p">
        Masz już konto?
        <b onClick={() => setIsLoginPage(true)} className="register-form--link">
          Zaloguj się
        </b>
      </p>
    </form>
  );
};

RegisterForm.propTypes = {
  setIsLoginPage: PropTypes.func
};
