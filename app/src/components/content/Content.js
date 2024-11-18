import './content.scss';
import { ContentBox } from 'components/content-box/ContentBox';
import { ReservationDatePicker } from 'components/reservation-date-picker/ReservationDatePicker';
import { useAxios } from 'hooks/useAxios';
import { AdvantagesList } from 'components/advantages-list/AdvantagesList';
import { CarItem } from 'components/car-item/CarItem';
import { Spinner } from 'components/spinner/Spinner';

export const Content = () => {
  const { loading, data, error } = useAxios({
    url: 'http://localhost:8080/cars/top/12',
    method: 'GET'
  });

  return (
    <div className="content">
      <div className="content-left">
        <ContentBox title="Rezerwuj samochód">
          <ReservationDatePicker />
        </ContentBox>
        <ContentBox title="Zalety RentDrive">
          <AdvantagesList />
        </ContentBox>
      </div>
      <div className="content-right">
        <ContentBox title="Najpopularniejsze" center={loading}>
          {!loading ? (
            <>
              {data.map((car, index) => (
                <CarItem
                  key={index}
                  price={car.pricePerDay}
                  brand={car.brand}
                  model={car.model}
                  imageUrl={car.imageUrl}
                />
              ))}
            </>
          ) : (
            <Spinner />
          )}
          {error ? <p className="error">{error.message}</p> : null}
        </ContentBox>
      </div>
    </div>
  );
};
