import './change-password-form.scss';
import { useStateMachine } from 'little-state-machine';
import { useForm } from 'react-hook-form';
import { TextInput } from 'components/inputs/text-input/TextInput';
import { Button } from 'components/inputs/button/Button';
import axios from 'axios';
import { useState } from 'react';
import { Spinner } from 'components/spinner/Spinner';

export const ChangePasswordForm = () => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { state } = useStateMachine();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ mode: 'onBlur' });

  const handlePasswordChanged = (data) => {
    const userId = state.data.userId;
    const oldPassword = data.currentPassword;
    const newPassword = data.newPassword;
    reset();
    setMessage(null);
    setError(null);

    axios
      .post(`http://localhost:8080/auth/change-password/${userId}/${oldPassword}/${newPassword}`)
      .then(() => {
        setMessage('Password changed');
      })
      .catch((error) => {
        setError(error.response.data);
      })
      .finally(() => setLoading(false));
  };

  return (
    <form className="change__password__form" onSubmit={handleSubmit(handlePasswordChanged)}>
      <>
        <TextInput
          className="change__password__form__input"
          name="password"
          type="password"
          textLabel="Obecne hasło"
          mediumSize
          autoComplete="current-password"
          errors={errors.currentPassword}
          {...register('currentPassword', { required: 'Obecne hasło jest wymagane' })}
        />
        <TextInput
          className="change__password__form__input"
          name="password"
          type="password"
          textLabel="Nowe hasło"
          mediumSize
          autoComplete="new-password"
          errors={errors.newPassword}
          {...register('newPassword', { required: 'Nowe hasło jest wymagane' })}
        />
        {loading ? (
          <Spinner />
        ) : (
          <>
            {error && <p className="change__password__form-error">{error}</p>}
            {message && <p className="change__password__form-success">{message}</p>}
          </>
        )}
        <Button className="register__form__button" type="submit">
          Zmień hasło
        </Button>
      </>
    </form>
  );
};
