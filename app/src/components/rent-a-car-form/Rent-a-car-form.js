import 'components/rent-a-car-form/rent-a-car-form.scss';
import { useForm } from 'react-hook-form';
import { BRANCHES_LIST } from 'data/branches-companies';

export const RentACarForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>Data odbioru:</p>
      <input type="date" required name="startDate" {...register('startDate', { required: true })} />
      {errors.startDate && <span>This field is required</span>}
      <p>Miejsce odbioru:</p>
      <select value={'default'} {...register('agencyName')}>
        <option key="default" value="test" disabled hidden>
          Wybierz miejsce odbioru
        </option>
        {BRANCHES_LIST.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      <p>Data zwrotu:</p>
      <input type="date" name="endDate" required {...register('endDate', { required: true })} />
      {errors.endDate && <span>This field is required</span>}
      <p>Miejsce zwrotu:</p>
      <select value={'default'} {...register('agencyName')}>
        <option key="default" value="test" disabled hidden>
          Wybierz miejsce zwrotu
        </option>
        {BRANCHES_LIST.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>

      <input type="submit" value="Rezerwuj" />
    </form>
  );
};
