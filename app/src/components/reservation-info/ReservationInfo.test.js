import { createStore, StateMachineProvider } from 'little-state-machine';
import { fireEvent, render, screen } from '@testing-library/react';
import { ReservationInfo } from 'components/reservation-info/ReservationInfo';

const renderWithProvider = () => {
  render(
    <StateMachineProvider>
      <ReservationInfo />
    </StateMachineProvider>
  );
};

createStore({
  data: {
    startDate: '2025-02-10T12:00',
    startAgencyName: 'Lublin',
    endDate: '2025-02-17T10:00',
    endAgencyName: 'Rzeszów',
    carId: 4496,
    model: 'Commander',
    pricePerDay: 107,
    brand: 'Jeep',
    email: 'admin@admin.com',
    firstName: 'Mr',
    lastName: 'Admin',
    phone: '123456123',
    userId: '302',
    username: 'admin',
    reservationFormStep: 4,
    dateJoined: '2001-09-18 16:18:33.0',
    userType: 'ADMIN'
  }
});

describe('ReservationInfo', () => {
  it('should render component correctly', () => {
    renderWithProvider();

    expect(screen.getByText(/Mr Admin/)).toBeInTheDocument();
    expect(screen.getByText(/Email: admin@admin.com/)).toBeInTheDocument();
    expect(screen.getByText(/Telefon: 123456123/)).toBeInTheDocument();
    expect(screen.getByText(/Czas wynajmu - 7 dni/)).toBeInTheDocument();
    expect(screen.getByText(/2025-02-10 12:00\s+-\s+Lublin/)).toBeInTheDocument();
    expect(screen.getByText(/2025-02-17 10:00\s+-\s+Rzeszów/)).toBeInTheDocument();
    expect(screen.getByText(/Jeep Commander/)).toBeInTheDocument();
    expect(screen.getByText(/107 PLN \/ dzień/)).toBeInTheDocument();
    expect(screen.getByText(/749 PLN/)).toBeInTheDocument();
  });

  it('should reset user details', () => {
    renderWithProvider();

    fireEvent.click(screen.getByText('wyloguj...'));

    expect(screen.queryByText(/Mr Admin/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Email: admin@admin.com/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Telefon: 123456123/)).not.toBeInTheDocument();
  });

  it('should reset car details', () => {
    renderWithProvider();

    fireEvent.click(screen.getByText('Zmiana samochodu...'));

    expect(screen.queryByText(/Jeep Commander/)).not.toBeInTheDocument();
    expect(screen.queryByText(/107 PLN \/ dzień/)).not.toBeInTheDocument();

    expect(screen.queryByText(/749 PLN/)).not.toBeInTheDocument();
  });

  it('should reset date details', () => {
    renderWithProvider();

    fireEvent.click(screen.getByText('zmiana daty wynajmu...'));

    expect(screen.queryByText(/2025-02-10 12:00\s+-\s+Lublin/)).not.toBeInTheDocument();
    expect(screen.queryByText(/2025-02-17 10:00\s+-\s+Rzeszów/)).not.toBeInTheDocument();
    expect(screen.queryByText(/749 PLN/)).not.toBeInTheDocument();
  });
});
