import './car-details-page.scss';
import { Content } from 'components/content/Content';
import { ContentBox } from 'components/content-box/ContentBox';
import { CarDetails } from 'components/car-details/CarDetails';
import { useNavigate, useParams } from 'react-router-dom';
import { useAxios } from 'hooks/useAxios';
import { Spinner } from 'components/spinner/Spinner';
import { useStateMachine } from 'little-state-machine';
import { useEffect } from 'react';

export const CarDetailsPage = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { state } = useStateMachine();

  const {
    data: carData,
    loading: carLoading,
    error: carError
  } = useAxios({
    method: 'GET',
    url: `http://localhost:8080/cars/${carId}`
  });

  const {
    data: reservationsData,
    loading: reservationsLoading,
    error: reservationsError
  } = useAxios({
    method: 'GET',
    url: `http://localhost:8080/reservations/car/${carId}`
  });

  useEffect(() => {
    if (state.data?.userType !== 'ADMIN') {
      navigate('/');
    }
  }, [state.data, navigate]);

  if (carLoading || reservationsLoading) return <Spinner />;

  return (
    <Content>
      <ContentBox title={`${carData.brand} ${carData.model}`} center>
        {carLoading || reservationsLoading ? (
          <Spinner />
        ) : (
          <>
            <CarDetails car={carData} reservations={reservationsData} />
            {(carError || reservationsError) && (
              <p>
                {carError}
                {reservationsError}
              </p>
            )}
          </>
        )}
      </ContentBox>
    </Content>
  );
};
