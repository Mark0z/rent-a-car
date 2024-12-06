import './change-password-form.scss';
import { useStateMachine } from 'little-state-machine';
import { useForm } from 'react-hook-form';
import { TextInput } from 'components/inputs/text-input/TextInput';
import { Button } from 'components/inputs/button/Button';

export const ChangePasswordForm = () => {
  const { state } = useStateMachine();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  function handlePasswordChanged(data) {
    console.log(data);
    console.log(state.data.userId);
  }

  return (
    <form className="change__password__form" onSubmit={handleSubmit(handlePasswordChanged)}>
      <TextInput
        className="change__password__form__input"
        name="password"
        type="password"
        textLabel="Obecne hasło"
        mediumSize
        autoComplete="current-password"
        errors={errors.password}
        {...register('current-password', { required: true })}
      />
      <TextInput
        className="change__password__form__input"
        name="password"
        type="password"
        textLabel="Nowe hasło"
        mediumSize
        autoComplete="new-password"
        errors={errors.password}
        {...register('new-password', { required: true })}
      />
      <Button className="register__form__button" type="submit">
        Zmień hasło
      </Button>
    </form>
  );
};
