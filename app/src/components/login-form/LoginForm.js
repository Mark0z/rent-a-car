import './login-form.scss';
import { TextInput } from 'components/inputs/text-input/TextInput';
import { useForm } from 'react-hook-form';
import { Button } from 'components/inputs/button/Button';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useState } from 'react';
import { Spinner } from 'components/spinner/Spinner';

export const LoginForm = ({ setIsLoginPage }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const handleLoginForm = (data) => {
    setLoading(true);
    axios
      .post('http://localhost:8080/auth/login', data)
      .then((response) => {
        console.log(response);
        setError(null);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(handleLoginForm)}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <TextInput
            className="login-form--input"
            name="username"
            textLabel="Nazwa użytkownika"
            mediumSize
            autoComplete="username"
            errors={errors.username}
            {...register('username', { required: true })}
          />
          <TextInput
            className="login-form--input"
            name="password"
            textLabel="Hasło"
            type="current-password"
            autoComplete="on"
            errors={errors.password}
            mediumSize
            {...register('password', { required: true })}
          />
          <Button className="login-form--button" type="submit">
            Zaloguj
          </Button>
          {error && <p className="login-form--error">{error}</p>}
          <p className="login-form--p">
            Nie masz konta?
            <b onClick={() => setIsLoginPage(false)} className="login-form--link">
              Zarejestruj się
            </b>
          </p>
        </>
      )}
    </form>
  );
};

LoginForm.propTypes = {
  setIsLoginPage: PropTypes.func
};
