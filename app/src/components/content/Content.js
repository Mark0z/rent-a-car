import './content.scss';
import { ContentBox } from 'components/content-box/Content-box';
import { RentACarForm } from 'components/rent-a-car-form/Rent-a-car-form';
import { FaRegCheckSquare } from 'react-icons/fa';
import { useAxios } from 'hooks/useAxios';

export const Content = () => {
  const {
    data: listOfCars,
    loading,
    error
  } = useAxios({
    url: 'http://localhost:8080/cars/',
    method: 'GET'
  });

  return (
    <div className="content">
      <div className="content-left">
        <div className="form-rental">
          <ContentBox title="Rezerwuj samochód">
            <RentACarForm />
          </ContentBox>
          <ContentBox title="Zalety RentDrive">
            <div>
              <FaRegCheckSquare /> Wygoda i dostępność
            </div>
            <div>
              <FaRegCheckSquare /> Różnorodność pojazdów
            </div>
            <div>
              <FaRegCheckSquare /> Brak długoterminowych zobowiązań
            </div>
            <div>
              <FaRegCheckSquare /> Ubezpieczenie i serwis w cenie
            </div>
          </ContentBox>
        </div>
      </div>
      <div className="content-right">
        <ContentBox title="Najpopularniejsze">
          {listOfCars ? (
            listOfCars.map((car, index) => (
              <p key={index}>
                {car.brand} {car.model}
              </p>
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
