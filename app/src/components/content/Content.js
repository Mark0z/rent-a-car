import './content.scss';
import { ContentBox } from 'components/content-box/ContentBox';
import { ReservationDatePicker } from 'components/reservation-date-picker/ReservationDatePicker';
import { useAxios } from 'hooks/useAxios';
import { CarItem } from 'components/car-item/CarItem';
import { AdvantagesList } from 'components/advantages-list/AdvantagesList';

export const Content = () => {
  const {
    data: listOfCars,
    loading,
    error
  } = useAxios({
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
        <ContentBox title="Najpopularniejsze" center>
          {listOfCars ? (
            listOfCars.map((car, index) => (
              <CarItem
                key={index}
                price={car.pricePerDay}
                brand={car.brand}
                model={car.model}
                imageUrl={car.imageUrl}
              />
            ))
          ) : (
            <p>{loading}</p>
          )}
          {error ? error : null}
        </ContentBox>
      </div>
    </div>
  );
};
