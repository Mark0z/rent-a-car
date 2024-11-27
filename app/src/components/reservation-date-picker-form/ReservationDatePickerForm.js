import './reservation-date-picker-form.scss';
import { useForm } from 'react-hook-form';
import { BRANCHES_LIST } from 'data/branches-companies';
import { TextInput } from 'components/inputs/text-input/TextInput';
import { SelectInput } from 'components/inputs/select-input/SelectInput';
import { Button } from 'components/inputs/button/Button';
import { useStateMachine } from 'little-state-machine';
import { updateAction } from 'utils/updateAction';
import useFormPersist from 'react-hook-form-persist';
import { useNavigate } from 'react-router-dom';

export const ReservationDatePickerForm = () => {
  const { actions } = useStateMachine({ updateAction });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm();

  useFormPersist('reservation-date-picker', { watch, setValue }, { storage: window.localStorage });

  const onSubmit = (data) => {
    actions.updateAction(data);
    actions.updateAction({ reservationFormStep: 2 });
    reset();
    navigate('/reservation');
  };

  return (
    <form className="rent-a-car-form" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        textLabel="Data odbioru:"
        name="startDate"
        className="rent-a-car-form--input"
        type="date"
        min={new Date().toJSON().slice(0, 10)}
        errors={errors.startDate}
        {...register('startDate', { required: true, min: new Date().toJSON().slice(0, 10) })}
      />
      <SelectInput
        className="rent-a-car-form--input"
        defaultValue="Wybierz miejsce odbioru"
        name="startAgencyName"
        errors={errors.startAgencyName}
        textLabel="Miejsce odbioru:"
        optionList={BRANCHES_LIST}
        {...register('startAgencyName', { required: true })}
      />
      <TextInput
        textLabel="Data zwrotu:"
        type="date"
        name="endDate"
        min={watch('startDate')}
        errors={errors.endDate}
        {...register('endDate', {
          required: true,
          min: {
            value: watch('startDate'),
            message: 'Błędna data zwrotu'
          }
        })}
      />
      <SelectInput
        className="rent-a-car-form--input"
        defaultValue="Wybierz miejsce zwrotu"
        name="endAgencyName"
        errors={errors.endAgencyName}
        textLabel="Miejsce zwrotu:"
        optionList={BRANCHES_LIST}
        {...register('endAgencyName', { required: true })}
      />

      <Button className="rent-a-car-form--submit" type="submit" value="rezerwuj">
        Rezerwuj
      </Button>
    </form>
  );
};
