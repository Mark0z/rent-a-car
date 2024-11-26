import './login-form.scss';
import { TextInput } from 'components/inputs/text-input/TextInput';
import { useForm } from 'react-hook-form';
import { Button } from 'components/inputs/button/Button';
import PropTypes from 'prop-types';
import axios from 'axios';

export const LoginForm = ({ setIsLoginPage }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const handleLoginForm = (data) => {
    console.log(data);
    axios
      .post('http://localhost:8080/auth/login', data)
      .then((response) => {
        console.log(response);
      })
      .then((error) => console.log(error));
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(handleLoginForm)}>
      <TextInput
        className="login-form--input"
        name="username"
        textLabel="Nazwa użytkownika"
        mediumSize
        errors={errors.username}
        {...register('username', { required: true })}
      />
      <TextInput
        className="login-form--input"
        name="password"
        textLabel="Hasło"
        type="password"
        errors={errors.password}
        mediumSize
        {...register('password', { required: true })}
      />
      <Button className="login-form--button" type="submit">
        Zaloguj
      </Button>
      <p className="login-form--p">
        Nie masz konta?
        <b onClick={() => setIsLoginPage(false)} className="login-form--link">
          Zarejestruj się
        </b>
      </p>
    </form>
  );
};

LoginForm.propTypes = {
  setIsLoginPage: PropTypes.func
};
