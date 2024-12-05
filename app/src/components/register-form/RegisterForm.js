import './register-form.scss';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button } from 'components/inputs/button/Button';
import { TextInput } from 'components/inputs/text-input/TextInput';
import { useState } from 'react';
import { Spinner } from 'components/spinner/Spinner';
import { useStateMachine } from 'little-state-machine';
import { updateAction } from 'utils/updateAction';

export const RegisterForm = ({ setIsLoginPage }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { actions } = useStateMachine({ updateAction });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const saveResponseToState = ({ data }) => {
    const payload = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      userId: data.id.toString(),
      username: data.username
    };

    actions.updateAction(payload);
  };

  const handleRegisterForm = (data) => {
    setLoading(true);
    axios
      .post('http://localhost:8080/auth/register', data)
      .then((response) => {
        saveResponseToState(response);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  return (
    <form className="register__form" onSubmit={handleSubmit(handleRegisterForm)}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <TextInput
            className="register__form__input"
            name="email"
            textLabel="Email"
            type="email"
            mediumSize
            autoComplete="email"
            errors={errors.email}
            {...register('email', { required: true })}
          />
          <TextInput
            className="register__form__input"
            name="username"
            textLabel="Nazwa użytkownika"
            mediumSize
            autoComplete="username"
            errors={errors.username}
            {...register('username', { required: true })}
          />
          <TextInput
            className="register__form__input"
            name="password"
            type="password"
            textLabel="Hasło"
            mediumSize
            autoComplete="new-password"
            errors={errors.password}
            {...register('password', { required: true })}
          />
          <TextInput
            className="register__form__input"
            name="firstName"
            textLabel="Imię"
            mediumSize
            autoComplete="given-name"
            errors={errors.firstName}
            {...register('firstName', { required: true })}
          />
          <TextInput
            className="register__form__input"
            name="lastName"
            textLabel="Nazwisko"
            mediumSize
            autoComplete="family-name"
            errors={errors.lastName}
            {...register('lastName', { required: true })}
          />
          <TextInput
            className="register__form__input"
            name="phone"
            textLabel="Telefon"
            type="tel"
            placeholder="123456789"
            pattern="[0-9]{9,11}"
            mediumSize
            autoComplete="tel-local"
            errors={errors.phone}
            {...register('phone', { required: true })}
          />
          <Button className="register__form__button" type="submit">
            Zarejestruj
          </Button>
          {error && <p className="register__form-error">{error}</p>}
          <p className="register__form__p">
            Masz już konto?
            <b onClick={() => setIsLoginPage(true)} className="register__form__link">
              Zaloguj się
            </b>
          </p>
        </>
      )}
    </form>
  );
};

RegisterForm.propTypes = {
  setIsLoginPage: PropTypes.func
};
