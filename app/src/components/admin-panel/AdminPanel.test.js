import { act, fireEvent, render, screen } from '@testing-library/react';
import { AdminPanel } from './AdminPanel';
import '@testing-library/jest-dom';

jest.mock('components/user-management/UserManagement', () => ({
  UserManagement: () => <div data-testid="user-management">User Management Component</div>
}));

jest.mock('components/car-management/CarManagement', () => ({
  CarManagement: () => <div data-testid="car-management">Car Management Component</div>
}));

jest.mock('components/reservation-management/ReservationManagement', () => ({
  ReservationManagement: () => (
    <div data-testid="reservation-management">Reservation Management Component</div>
  )
}));

jest.mock('components/reports-and-statistics/ReportsAndStatistics', () => ({
  ReportsAndStatistics: () => <div data-testid="reports-statistics">Reports Component</div>
}));

const mockUseAxios = jest.fn();
jest.mock('hooks/useAxios', () => ({
  useAxios: (url) => mockUseAxios(url)
}));

describe('AdminPanel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAxios.mockImplementation(() => ({
      data: 5,
      loading: false,
      setRefresh: jest.fn()
    }));
  });

  test('should renders all admin panel buttons', async () => {
    await act(async () => {
      render(<AdminPanel />);
    });

    expect(screen.getByText(/zarządzanie użytkownikami/i)).toBeInTheDocument();
    expect(screen.getByText(/zarządzanie pojazdami/i)).toBeInTheDocument();
    expect(screen.getByText(/zarządzanie rezerwacjami/i)).toBeInTheDocument();
    expect(screen.getByText(/raporty i statystyki/i)).toBeInTheDocument();
  });

  test('should displays user management component when clicking user management button', async () => {
    await act(async () => {
      render(<AdminPanel />);
    });

    await act(async () => {
      fireEvent.click(screen.getByText(/zarządzanie użytkownikami/i));
    });

    expect(screen.getByTestId('user-management')).toBeInTheDocument();
  });

  test('should displays car management component when clicking car management button', async () => {
    await act(async () => {
      render(<AdminPanel />);
    });

    await act(async () => {
      fireEvent.click(screen.getByText(/zarządzanie pojazdami/i));
    });

    expect(screen.getByTestId('car-management')).toBeInTheDocument();
  });

  test('should displays reservation management component when clicking reservation management button', async () => {
    await act(async () => {
      render(<AdminPanel />);
    });

    await act(async () => {
      fireEvent.click(screen.getByText(/zarządzanie rezerwacjami/i));
    });

    expect(screen.getByTestId('reservation-management')).toBeInTheDocument();
  });

  test('should displays reports component when clicking reports button', async () => {
    await act(async () => {
      render(<AdminPanel />);
    });

    await act(async () => {
      fireEvent.click(screen.getByText(/raporty i statystyki/i));
    });

    expect(screen.getByTestId('reports-statistics')).toBeInTheDocument();
  });

  test('should shows number of pending reservations', async () => {
    await act(async () => {
      render(<AdminPanel />);
    });

    expect(mockUseAxios).toHaveBeenCalledWith(
      'http://localhost:8080/reservations/numberOfPendingReservations'
    );
  });
});
