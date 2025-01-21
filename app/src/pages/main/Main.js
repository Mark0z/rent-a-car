import './main.scss';
import { Content } from 'components/content/Content';
import { ContentBox } from 'components/content-box/ContentBox';
import { ReservationDatePickerForm } from 'components/reservation-date-picker-form/ReservationDatePickerForm';
import { AdvantagesList } from 'components/advantages-list/AdvantagesList';
import { CarItem } from 'components/car-item/CarItem';
import { Spinner } from 'components/spinner/Spinner';
import { useAxios } from 'hooks/useAxios';
import { Slider } from 'components/slider/Slider';

export const Main = () => {
  const { loading, data, error } = useAxios('http://localhost:8080/cars/top/12');

  return (
    <div className="main">
      <Slider />
      <Content isContentAbove={true} className="main__content">
        <div className="main-left">
          <ContentBox title="Rezerwuj samochód" className="main__content__box">
            <ReservationDatePickerForm />
          </ContentBox>
          <ContentBox title="Zalety RentDrive" className="main__content__box">
            <AdvantagesList />
          </ContentBox>
        </div>
        <div className="main-right">
          <ContentBox title="Najpopularniejsze" center className="main__content__box">
            {!loading ? (
              <>
                {data.length > 0 ? (
                  data.map((car, index) => (
                    <CarItem
                      key={car.id || index}
                      price={car.pricePerDay}
                      brand={car.brand}
                      model={car.model}
                      imageUrl={car.imageUrl}
                    />
                  ))
                ) : (
                  <>{!error && <p>Brak dostępnych samochodów</p>}</>
                )}
              </>
            ) : (
              <Spinner />
            )}
            {error ? <p className="error">{error.message}</p> : null}
          </ContentBox>
        </div>
      </Content>
    </div>
  );
};
