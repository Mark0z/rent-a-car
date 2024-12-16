import './reservation-date-picker-form.scss';
import { useForm } from 'react-hook-form';
import { BRANCHES_LIST } from 'data/branches-companies';
import { TextInput } from 'components/inputs/text-input/TextInput';
import { SelectInput } from 'components/inputs/select-input/SelectInput';
import { Button } from 'components/inputs/button/Button';
import { useStateMachine } from 'little-state-machine';
import { updateAction } from 'utils/updateAction';
import { useNavigate } from 'react-router-dom';
import useFormPersist from 'react-hook-form-persist';
import { pickedCarState } from 'data/little-state-machine-default-state';
import PropTypes from 'prop-types';

export const ReservationDatePickerForm = ({ isMediumSize }) => {
  const { actions } = useStateMachine({ updateAction });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors }
  } = useForm();

  useFormPersist('reservation-date-picker', { watch, setValue }, { storage: window.localStorage });

  const onSubmit = (data) => {
    actions.updateAction(data);
    actions.updateAction(pickedCarState);
    actions.updateAction({ reservationFormStep: 2 });
    reset();
    navigate('/reservation');
  };

  const validateEndDate = (startDate) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0] + 'T00:00';
  };

  return (
    <form className="rent__a__car__form" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        textLabel="Data odbioru:"
        name="startDate"
        className="rent__a__car__form__input"
        type="datetime-local"
        min={new Date().toJSON().slice(0, 16)}
        mediumSize={isMediumSize}
        errors={errors.startDate}
        {...register('startDate', { required: true, min: new Date().toJSON().slice(0, 16) })}
      />
      <SelectInput
        className="rent__a__car__form__input"
        defaultValue="Wybierz miejsce odbioru"
        name="startAgencyName"
        errors={errors.startAgencyName}
        textLabel="Miejsce odbioru:"
        optionList={BRANCHES_LIST}
        mediumSize={isMediumSize}
        {...register('startAgencyName', { required: true })}
      />
      <TextInput
        textLabel="Data zwrotu:"
        type="datetime-local"
        name="endDate"
        min={validateEndDate(watch('startDate') || 0)}
        mediumSize={isMediumSize}
        errors={errors.endDate}
        {...register('endDate', {
          required: true,
          min: {
            value: validateEndDate(watch('startDate') || 0),
            message: 'Błędna data zwrotu'
          }
        })}
      />
      <SelectInput
        className="rent__a__car__form__input"
        defaultValue="Wybierz miejsce zwrotu"
        name="endAgencyName"
        errors={errors.endAgencyName}
        textLabel="Miejsce zwrotu:"
        optionList={BRANCHES_LIST}
        mediumSize={isMediumSize}
        {...register('endAgencyName', { required: true })}
      />

      <Button className="rent__a__car__form__submit" type="submit" value="rezerwuj">
        Rezerwuj
      </Button>
    </form>
  );
};

ReservationDatePickerForm.propTypes = { isMediumSize: PropTypes.bool };
