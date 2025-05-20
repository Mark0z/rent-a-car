import { render, screen } from '@testing-library/react';
import { CarDetails } from './CarDetails';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

const mockCar = {
  brand: 'Toyota',
  model: 'Corolla',
  year: 2020,
  mileage: 50000,
  pricePerDay: 200,
  imageUrl: 'test-image-url'
};

const mockReservations = [
  {
    startDate: '2024-03-01T00:00:00',
    endDate: '2024-03-05T00:00:00',
    totalPrice: 1000,
    user: {
      id: 1,
      firstName: 'Jan',
      lastName: 'Kowalski'
    },
    status: 'Zakończona'
  }
];

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {component}
    </BrowserRouter>
  );
};

describe('CarDetails', () => {
  test('renders car details correctly', () => {
    renderWithRouter(<CarDetails car={mockCar} reservations={[]} />);

    expect(screen.getByText(/toyota/i)).toBeInTheDocument();
    expect(screen.getByText(/corolla/i)).toBeInTheDocument();
    expect(screen.getByText(/2020/)).toBeInTheDocument();
    expect(screen.getByText(/50000 km/)).toBeInTheDocument();
    expect(screen.getByText(/200 zł/)).toBeInTheDocument();
    expect(screen.getByAltText(/Toyota Corolla/)).toHaveAttribute('src', 'test-image-url');
  });

  test('displays message when no reservations', () => {
    renderWithRouter(<CarDetails car={mockCar} reservations={[]} />);
    expect(screen.getByText(/brak historii rezerwacji/i)).toBeInTheDocument();
  });

  test('renders reservations table when reservations exist', () => {
    renderWithRouter(<CarDetails car={mockCar} reservations={mockReservations} />);

    expect(screen.getByText('Historia rezerwacji')).toBeInTheDocument();
    expect(screen.getByText('2024-03-01')).toBeInTheDocument();
    expect(screen.getByText('2024-03-05')).toBeInTheDocument();
    expect(screen.getByText('1000 zł')).toBeInTheDocument();
    expect(screen.getByText('Jan Kowalski')).toBeInTheDocument();
    expect(screen.getByText('Zakończona')).toBeInTheDocument();
  });

  test('renders table headers correctly', () => {
    renderWithRouter(<CarDetails car={mockCar} reservations={mockReservations} />);

    expect(screen.getByText('Od')).toBeInTheDocument();
    expect(screen.getByText('Do')).toBeInTheDocument();
    expect(screen.getByText('Koszt')).toBeInTheDocument();
    expect(screen.getByText('Użytkownik')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  test('user link in reservation points to correct profile', () => {
    renderWithRouter(<CarDetails car={mockCar} reservations={mockReservations} />);

    const userLink = screen.getByText('Jan Kowalski');
    expect(userLink.closest('a')).toHaveAttribute('href', '/user-profile/1');
  });
});
