import './login-form.scss';
import { TextInput } from 'components/inputs/text-input/TextInput';
import { useForm } from 'react-hook-form';
import { Button } from 'components/inputs/button/Button';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useState } from 'react';
import { Spinner } from 'components/spinner/Spinner';
import { useStateMachine } from 'little-state-machine';
import { updateAction } from 'utils/updateAction';

export const LoginForm = ({ setIsLoginPage }) => {
  const { actions } = useStateMachine({ updateAction });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const handleLoginForm = (data) => {
    setError(null);
    setLoading(true);
    axios
      .post('http://localhost:8080/auth/login', data)
      .then((response) => {
        actions.updateAction(response.data);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  return (
    <form className="login__form" onSubmit={handleSubmit(handleLoginForm)}>
      <>
        <TextInput
          className="login__form__input"
          name="username"
          textLabel="Nazwa użytkownika"
          mediumSize
          autoComplete="username"
          errors={errors.username}
          {...register('username', { required: true })}
        />
        <TextInput
          className="login__form__input"
          name="password"
          textLabel="Hasło"
          type="password"
          autoComplete="current-password"
          errors={errors.password}
          mediumSize
          {...register('password', { required: true })}
        />
        {loading ? <Spinner /> : <>{error && <p className="login__form-error">{error.code}</p>}</>}
        <Button className="login__form__button" type="submit">
          Zaloguj
        </Button>
        <p className="login__form__p">
          Nie masz konta?
          <b onClick={() => setIsLoginPage(false)} className="login__form__link">
            Zarejestruj się
          </b>
        </p>
      </>
    </form>
  );
};

LoginForm.propTypes = {
  setIsLoginPage: PropTypes.func
};
