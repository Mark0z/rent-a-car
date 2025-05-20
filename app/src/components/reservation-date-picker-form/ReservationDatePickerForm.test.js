import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ReservationDatePickerForm } from './ReservationDatePickerForm';
import { BrowserRouter } from 'react-router-dom';
import { createStore, StateMachineProvider } from 'little-state-machine';
import '@testing-library/jest-dom';

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}));

createStore({
  data: {}
});

const renderWithProviders = (component) => {
  return render(
    <StateMachineProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        {component}
      </BrowserRouter>
    </StateMachineProvider>
  );
};

describe('ReservationDatePickerForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.localStorage.clear();
    window.sessionStorage.clear();
  });

  test('renders all form fields', () => {
    renderWithProviders(<ReservationDatePickerForm />);

    expect(screen.getByLabelText(/data odbioru/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/miejsce odbioru/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data zwrotu/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/miejsce zwrotu/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /rezerwuj/i })).toBeInTheDocument();
  });

  test('validates required fields', async () => {
    renderWithProviders(<ReservationDatePickerForm />);

    fireEvent.click(screen.getByRole('button', { name: /rezerwuj/i }));

    await waitFor(() => {
      const startDateInput = screen.getByLabelText(/data odbioru/i);
      const endDateInput = screen.getByLabelText(/data zwrotu/i);

      expect(startDateInput).toBeInvalid();
      expect(endDateInput).toBeInvalid();
    });
  });

  test('validates end date is after start date', async () => {
    renderWithProviders(<ReservationDatePickerForm />);

    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 1);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() - 1);

    fireEvent.change(screen.getByLabelText(/data odbioru/i), {
      target: { value: startDate.toISOString().slice(0, 16) }
    });

    fireEvent.change(screen.getByLabelText(/data zwrotu/i), {
      target: { value: endDate.toISOString().slice(0, 16) }
    });

    fireEvent.click(screen.getByRole('button', { name: /rezerwuj/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/data zwrotu/i)).toBeInvalid();
    });
  });

  test('submits form with valid data and navigates', async () => {
    renderWithProviders(<ReservationDatePickerForm />);

    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 1);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 2);

    fireEvent.change(screen.getByLabelText(/data odbioru/i), {
      target: { value: startDate.toISOString().slice(0, 16) }
    });

    fireEvent.change(screen.getByLabelText(/miejsce odbioru/i), {
      target: { value: 'Wrocław' }
    });

    fireEvent.change(screen.getByLabelText(/data zwrotu/i), {
      target: { value: endDate.toISOString().slice(0, 16) }
    });

    fireEvent.change(screen.getByLabelText(/miejsce zwrotu/i), {
      target: { value: 'Kraków' }
    });

    fireEvent.click(screen.getByRole('button', { name: /rezerwuj/i }));

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('/reservation');
    });
  });

  test('persists form data in localStorage', async () => {
    renderWithProviders(<ReservationDatePickerForm />);

    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 1);
    const formattedStartDate = startDate.toISOString().slice(0, 16);

    fireEvent.change(screen.getByLabelText(/data odbioru/i), {
      target: { value: formattedStartDate }
    });

    await waitFor(() => {
      const storedData = JSON.parse(sessionStorage.getItem('reservation-date-picker'));
      expect(storedData.startDate).toBe(formattedStartDate);
    });
  });
});
