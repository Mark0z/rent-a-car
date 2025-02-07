import { act, fireEvent, render, screen } from '@testing-library/react';
import { RegisterForm } from 'components/register-form/RegisterForm';
import { createStore, StateMachineProvider } from 'little-state-machine';
import axios from 'axios';

jest.mock('axios');

createStore({
  data: {}
});

const renderWithProvider = () => {
  return render(
    <StateMachineProvider>
      <RegisterForm />
    </StateMachineProvider>
  );
};

const correctFormData = () => {
  fireEvent.change(screen.getByLabelText(/Email/i), {
    target: { value: 'test@example.com' }
  });
  fireEvent.change(screen.getByLabelText(/Nazwa użytkownika/i), {
    target: { value: 'testuser' }
  });
  fireEvent.change(screen.getByLabelText(/Hasło/i), {
    target: { value: 'Password123!' }
  });
  fireEvent.change(screen.getByLabelText(/Imię/i), {
    target: { value: 'Jan' }
  });
  fireEvent.change(screen.getByLabelText(/Nazwisko/i), {
    target: { value: 'Kowalski' }
  });
  fireEvent.change(screen.getByLabelText(/Telefon/i), {
    target: { value: '123456789' }
  });
};

describe('RegisterForm', () => {
  const mockSetIsLoginPage = jest.fn();

  it('should renders all form fields correctly', () => {
    renderWithProvider();

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nazwa użytkownika/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Hasło/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Imię/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nazwisko/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Telefon/i)).toBeInTheDocument();
  });

  it('should validates required fields', async () => {
    renderWithProvider();

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /zarejestruj/i }));
    });

    expect(screen.getByText(/email jest wymagany/i)).toBeInTheDocument();
    expect(screen.getByText(/nazwa użytkownika jest wymagana/i)).toBeInTheDocument();
    expect(screen.getByText(/hasło jest wymagane/i)).toBeInTheDocument();
    expect(screen.getByText(/imię jest wymagane/i)).toBeInTheDocument();
    expect(screen.getByText(/nazwisko jest wymagane/i)).toBeInTheDocument();
    expect(screen.getByText(/telefon jest wymagany/i)).toBeInTheDocument();
  });

  it('should validates fields requirements', async () => {
    renderWithProvider();

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'wrongm@il' }
    });
    fireEvent.change(screen.getByLabelText(/Nazwa użytkownika/i), {
      target: { value: 'wr' }
    });
    fireEvent.change(screen.getByLabelText(/Hasło/i), {
      target: { value: 'wron' }
    });
    fireEvent.change(screen.getByLabelText(/Telefon/i), {
      target: { value: '123' }
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /zarejestruj/i }));
    });

    expect(screen.getByText(/Nieprawidłowy format email/i)).toBeInTheDocument();
    expect(screen.getByText(/Nazwa użytkownika musi mieć minimum 3 znaki/i)).toBeInTheDocument();
    expect(screen.getByText(/Hasło musi mieć minimum 5 znaków/i)).toBeInTheDocument();
    expect(screen.getByText(/Nieprawidłowy format numeru telefonu/i)).toBeInTheDocument();
  });

  it('should handles successful registration', async () => {
    const mockResponse = {
      data: {
        id: 1,
        email: 'test@example.com',
        username: 'testuser',
        firstName: 'Jan',
        lastName: 'Kowalski',
        phone: '123456789'
      }
    };
    axios.post.mockResolvedValueOnce(mockResponse);

    renderWithProvider();

    correctFormData();

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /zarejestruj/i }));
    });

    expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/auth/register', {
      email: 'test@example.com',
      username: 'testuser',
      password: 'Password123!',
      firstName: 'Jan',
      lastName: 'Kowalski',
      phone: '123456789'
    });

    expect(screen.getByText('Użytkownik zarejestrowany')).toBeInTheDocument();
  });

  it('should display success message in edit mode', async () => {
    const mockResponse = {
      data: {
        id: 1,
        email: 'test@example.com',
        username: 'testuser',
        firstName: 'Jan',
        lastName: 'Kowalski',
        phone: '123456789'
      }
    };
    axios.put.mockResolvedValueOnce(mockResponse);

    render(
      <StateMachineProvider>
        <RegisterForm isEditMode={true} />
      </StateMachineProvider>
    );

    correctFormData();

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /edytuj/i }));
    });

    expect(screen.getByText('Edycja zakończona powodzeniem')).toBeInTheDocument();
  });

  it('should handle register error', async () => {
    const mockError = new Error('This username is already taken');
    axios.post.mockRejectedValueOnce(mockError);

    renderWithProvider();

    correctFormData();

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /zarejestruj/i }));
    });

    expect(screen.getByText('This username is already taken')).toBeInTheDocument();
  });

  it('should switch to login form', () => {
    render(
      <StateMachineProvider>
        <RegisterForm setIsLoginPage={mockSetIsLoginPage} />
      </StateMachineProvider>
    );

    fireEvent.click(screen.getByText(/Zaloguj się/i));
    expect(mockSetIsLoginPage).toHaveBeenCalledWith(true);
  });
});
