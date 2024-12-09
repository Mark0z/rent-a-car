import './register-form.scss';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button } from 'components/inputs/button/Button';
import { TextInput } from 'components/inputs/text-input/TextInput';
import { useState } from 'react';
import { useStateMachine } from 'little-state-machine';
import { updateAction } from 'utils/updateAction';
import { Spinner } from 'components/spinner/Spinner';

export const RegisterForm = ({ setIsLoginPage, isEditMode }) => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { actions, state } = useStateMachine({ updateAction });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm(
    isEditMode && {
      defaultValues: {
        email: state.data.email,
        username: state.data.username,
        password: '',
        firstName: state.data.firstName,
        lastName: state.data.lastName,
        phone: state.data.phone
      }
    }
  );

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
    setMessage(null);
    setError(null);
    setLoading(true);

    if (isEditMode) {
      axios
        .put(`http://localhost:8080/auth/update/${state.data.userId}`, data)
        .then((response) => {
          saveResponseToState(response);
          setMessage('Edycja zakończona powodzeniem');
        })
        .catch((error) => setError(error.message))
        .finally(() => setLoading(false));
    } else {
      axios
        .post('http://localhost:8080/auth/register', data)
        .then((response) => {
          saveResponseToState(response);
          setMessage('Użytkownik zarejestrowany');
        })
        .catch((error) => setError(error.message))
        .finally(() => setLoading(false));
    }
  };

  return (
    <form className="register__form" onSubmit={handleSubmit(handleRegisterForm)}>
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
      {!isEditMode && (
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
      )}
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
        pattern="\+?[0-9]{9,12}"
        mediumSize
        autoComplete="tel-local"
        errors={errors.phone}
        {...register('phone', { required: true })}
      />
      {loading ? (
        <Spinner />
      ) : (
        <>
          {error && <p className="register__form-error">{error}</p>}
          {message && <p className="register__form-success">{message}</p>}
        </>
      )}
      <Button className="register__form__button" type="submit">
        {isEditMode ? <>Edytuj</> : <>Zarejestruj</>}
      </Button>
      {!isEditMode && (
        <p className="register__form__p">
          Masz już konto?
          <b onClick={() => setIsLoginPage(true)} className="register__form__link">
            Zaloguj się
          </b>
        </p>
      )}
    </form>
  );
};

RegisterForm.propTypes = {
  setIsLoginPage: PropTypes.func,
  isEditMode: PropTypes.bool
};
