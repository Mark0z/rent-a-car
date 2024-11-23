import './reservation-date-picker.scss';
import { useForm } from 'react-hook-form';
import { BRANCHES_LIST } from 'data/branches-companies';
import { TextInput } from 'components/inputs/text-input/TextInput';
import { SelectInput } from 'components/inputs/select-input/SelectInput';

export const ReservationDatePicker = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    //temporarily
    console.log(data);
  };

  return (
    <form className="rent-a-car-form" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        textLabel="Data odbioru:"
        name="startDate"
        className="rent-a-car-form--input"
        type="date"
        errors={errors.startDate}
        required
        {...register('startDate', { required: true })}
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
        errors={errors.endDate}
        required
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

      <input className="rent-a-car-form--submit" type="submit" value="Rezerwuj" />
    </form>
  );
};
