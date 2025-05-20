import { render, screen } from '@testing-library/react';
import { ReportsAndStatistics } from './ReportsAndStatistics';
import { useAxios } from 'hooks/useAxios';
import '@testing-library/jest-dom';

jest.mock('hooks/useAxios');

describe('ReportsAndStatistics', () => {
  const mockData = {
    reservations: [
      {
        id: 1,
        status: 'COMPLETED',
        totalPrice: 1000,
        startDate: '2024-03-01T00:00:00',
        endDate: '2024-03-05T00:00:00',
        car: { id: 1 },
        user: { id: 1 }
      },
      {
        id: 2,
        status: 'ACTIVE',
        totalPrice: 800,
        startDate: '2024-03-10T00:00:00',
        endDate: '2024-03-15T00:00:00',
        car: { id: 2 },
        user: { id: 2 }
      },
      {
        id: 3,
        status: 'CANCELLED',
        totalPrice: 600,
        startDate: '2024-03-20T00:00:00',
        endDate: '2024-03-25T00:00:00',
        car: { id: 1 },
        user: { id: 1 }
      }
    ],
    cars: [
      { id: 1, brand: 'Toyota', model: 'Corolla', pricePerDay: 200 },
      { id: 2, brand: 'Honda', model: 'Civic', pricePerDay: 180 }
    ],
    users: [
      { id: 1, firstName: 'Jan', lastName: 'Kowalski' },
      { id: 2, firstName: 'Anna', lastName: 'Nowak' }
    ]
  };

  beforeEach(() => {
    useAxios.mockImplementation((url) => {
      if (url.includes('reservations')) {
        return { data: mockData.reservations, loading: false };
      }
      if (url.includes('cars')) {
        return { data: mockData.cars, loading: false };
      }
      if (url.includes('users')) {
        return { data: mockData.users, loading: false };
      }
      return { data: [], loading: false };
    });
  });

  it('should display all sections of statistics', () => {
    render(<ReportsAndStatistics />);

    const expectedSections = [
      'Statystyki rezerwacji',
      'Statystyki samochodów',
      'Statystyki finansowe',
      'Statystyki użytkowników'
    ];

    expectedSections.forEach((section) => {
      expect(screen.getByText(section)).toBeInTheDocument();
    });
  });

  it('should display the correct booking statistics', () => {
    render(<ReportsAndStatistics />);

    const expectedStats = [
      ['Łączna liczba rezerwacji', '3'],
      ['Aktywne rezerwacje', '1'],
      ['Zakończone rezerwacje', '1'],
      ['Anulowane rezerwacje', '1']
    ];

    expectedStats.forEach(([label, value]) => {
      expect(screen.getByText(label).nextElementSibling).toHaveTextContent(value);
    });
  });

  it('should display the spinner while loading', () => {
    useAxios.mockImplementation(() => ({
      data: [],
      loading: true
    }));

    render(<ReportsAndStatistics />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
