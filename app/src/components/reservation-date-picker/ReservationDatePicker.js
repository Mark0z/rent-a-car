import './reservation-date-picker.scss';
import { useForm } from 'react-hook-form';
import { BRANCHES_LIST } from 'data/branches-companies';

export const ReservationDatePicker = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    //temporarily
    if (data.startDate >= data.endDate) {
      setError('errorDate', { message: 'Błędna data' });
    }
    console.log(data);
  };

  return (
    <form className="rent-a-car-form" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="startDate" className="rent-a-car-form--label">
        Data odbioru:
      </label>
      <input
        className="rent-a-car-form--input"
        type="date"
        name="startDate"
        required
        {...register('startDate', { required: true })}
      />
      {errors.startDate && <span>This field is required</span>}
      <label htmlFor="startAgencyName" className="rent-a-car-form--label">
        Miejsce odbioru:
      </label>
      <select
        name="startAgencyName"
        className="rent-a-car-form--input"
        defaultValue={'default'}
        required
        {...register('startAgencyName', { required: true })}>
        <option key="default" value="" hidden>
          Wybierz miejsce odbioru
        </option>
        {BRANCHES_LIST.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      <label htmlFor="endDate" className="rent-a-car-form--label">
        Data zwrotu:
      </label>
      <input
        className="rent-a-car-form--input"
        type="date"
        name="endDate"
        required
        {...register('endDate', { required: true })}
      />
      {errors.endDate && <span>This field is required</span>}
      <label htmlFor="endAgencyName" className="rent-a-car-form--label">
        Miejsce zwrotu:
      </label>
      <select
        name="endAgencyName"
        className="rent-a-car-form--input"
        defaultValue={'default'}
        required
        {...register('endAgencyName', { required: true })}>
        <option key="default" value="" hidden>
          Wybierz miejsce zwrotu
        </option>
        {BRANCHES_LIST.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>

      {errors.errorDate && <p className="rent-a-car-form--error">{errors.errorDate.message}</p>}
      <input className="rent-a-car-form--submit" type="submit" value="Rezerwuj" />
    </form>
  );
};
