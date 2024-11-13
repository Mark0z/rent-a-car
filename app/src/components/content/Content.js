import './content.scss';
import { ContentBox } from 'components/content-box/Content-box';
import { RentACarForm } from 'components/rent-a-car-form/Rent-a-car-form';
import { FaRegCheckSquare } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const Content = () => {
  const [listOfCars, setListOfCars] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/cars/top/').then(({ data }) => {
      console.log(data);
      setListOfCars(data);
    });
  }, []);

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
          {listOfCars.map((car, index) => (
            <p key={index}>
              {car.brand} {car.model}
            </p>
          ))}
        </ContentBox>
      </div>
    </div>
  );
};
