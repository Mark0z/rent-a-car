import { useAxios } from 'hooks/useAxios';
import { Spinner } from 'components/spinner/Spinner';
import './reports-and-statistics.scss';
import { categorizeReservations } from 'utils/categorizeReservations';
import { useCountDaysOfReservation } from 'hooks/useCountDaysOfReservation';
import { calculateMonthlyRevenue } from 'data/calculateMonthlyRevenue';
import { getMostPopularCar } from 'data/getMostPopularCar';
import { getMostActiveUser } from 'data/getMostActiveUser';

export const ReportsAndStatistics = () => {
  const { data: reservationsData, loading: reservationsLoading } = useAxios(
    'http://localhost:8080/reservations/'
  );

  const { data: carsData, loading: carsLoading } = useAxios('http://localhost:8080/cars/');

  const { data: usersData, loading: usersLoading } = useAxios('http://localhost:8080/users/');

  if (reservationsLoading || carsLoading || usersLoading) {
    return <Spinner />;
  }

  const categorizedReservations = categorizeReservations(reservationsData);
  const completedReservations = reservationsData.filter((res) => res.status === 'COMPLETED');
  const averageReservationValue = Math.round(
    completedReservations.reduce((acc, res) => acc + res.totalPrice, 0) /
      completedReservations.length
  );

  return (
    <div className="reports__and__statistics">
      <div className="statistics__box">
        <h2>Statystyki rezerwacji</h2>
        <div className="statistics__content">
          <div className="statistics__item">
            <h4>Łączna liczba rezerwacji</h4>
            <p>{reservationsData.length}</p>
          </div>
          <div className="statistics__item">
            <h4>Aktywne rezerwacje</h4>
            <p>{categorizedReservations.activeReservations.length}</p>
          </div>
          <div className="statistics__item">
            <h4>Zakończone rezerwacje</h4>
            <p>{completedReservations.length}</p>
          </div>
          <div className="statistics__item">
            <h4>Anulowane rezerwacje</h4>
            <p>{reservationsData.filter((res) => res.status === 'CANCELLED').length}</p>
          </div>
          <div className="statistics__item">
            <h4>Oczekujące rezerwacje</h4>
            <p>{reservationsData.filter((res) => res.status === 'PENDING').length}</p>
          </div>
          <div className="statistics__item">
            <h4>Średni czas wypożyczenia</h4>
            <p>
              {Math.round(
                reservationsData.reduce(
                  (acc, res) =>
                    acc +
                    useCountDaysOfReservation({
                      startDate: res.startDate,
                      endDate: res.endDate
                    }),
                  0
                ) / reservationsData.length
              )}
              dni
            </p>
          </div>
        </div>
      </div>
      <div className="statistics__box">
        <h2>Statystyki samochodów</h2>
        <div className="statistics__content">
          <div className="statistics__item">
            <h4>Łączna liczba samochodów</h4>
            <p>{carsData.length}</p>
          </div>
          <div className="statistics__item">
            <h4>Dostępne samochody</h4>
            <p>
              {
                carsData.filter(
                  (car) =>
                    !reservationsData.some(
                      (res) =>
                        res.car.id === car.id &&
                        ['ACTIVE', 'CONFIRMED', 'PENDING'].includes(res.status)
                    )
                ).length
              }
            </p>
          </div>
          <div className="statistics__item">
            <h4>Najpopularniejszy samochód</h4>
            <p>
              {(() => {
                const car = getMostPopularCar(reservationsData, carsData);
                return car ? `${car.brand} ${car.model}` : 'Brak danych';
              })()}
            </p>
          </div>
          <div className="statistics__item">
            <h4>Średnia cena za dzień</h4>
            <p>
              {`${Math.round(
                carsData.reduce((acc, car) => acc + car.pricePerDay, 0) / carsData.length
              )} 
              PLN`}
            </p>
          </div>
        </div>
      </div>
      <div className="statistics__box">
        <h2>Statystyki finansowe</h2>
        <div className="statistics__content">
          <div className="statistics__item">
            <h4>Łączny przychód</h4>
            <p>
              {`${completedReservations.reduce((acc, res) => acc + res.totalPrice, 0).toFixed(2)} PLN`}
            </p>
          </div>
          <div className="statistics__item">
            <h4>Średnia wartość rezerwacji</h4>
            <p>{`${averageReservationValue} PLN`}</p>
          </div>
          <div className="statistics__item">
            <h4>Przychód w tym miesiącu</h4>
            <p>{`${calculateMonthlyRevenue(reservationsData)} PLN`}</p>
          </div>
        </div>
      </div>
      <div className="statistics__box">
        <h2>Statystyki użytkowników</h2>
        <div className="statistics__content">
          <div className="statistics__item">
            <h4>Łączna liczba użytkowników</h4>
            <p>{usersData.length}</p>
          </div>
          <div className="statistics__item">
            <h4>Aktywni użytkownicy</h4>
            <p>
              {
                usersData.filter((user) =>
                  reservationsData.some(
                    (res) =>
                      res.user.id === user.id &&
                      ['ACTIVE', 'CONFIRMED', 'PENDING'].includes(res.status)
                  )
                ).length
              }
            </p>
          </div>
          <div className="statistics__item">
            <h4>Najbardziej aktywny użytkownik</h4>
            <p>
              {(() => {
                const user = getMostActiveUser(reservationsData, usersData);
                return user ? `${user.firstName} ${user.lastName}` : 'Brak danych';
              })()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
