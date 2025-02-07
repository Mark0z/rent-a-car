import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { LoginForm } from './LoginForm';
import axios from 'axios';
import { createStore, StateMachineProvider } from 'little-state-machine';

jest.mock('axios');

createStore({
  data: {}
});
describe('LoginForm', () => {
  const mockSetIsLoginPage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should renders login form with all required fields', () => {
    render(
      <StateMachineProvider>
        <LoginForm setIsLoginPage={mockSetIsLoginPage} />
      </StateMachineProvider>
    );

    expect(screen.getByLabelText(/nazwa użytkownika/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/hasło/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /zaloguj/i })).toBeInTheDocument();
  });

  test('should displays validation errors for empty fields', async () => {
    render(
      <StateMachineProvider>
        <LoginForm setIsLoginPage={mockSetIsLoginPage} />
      </StateMachineProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: /zaloguj/i }));

    await waitFor(() => {
      expect(screen.getByText(/nazwa użytkownika jest wymagana/i)).toBeInTheDocument();
      expect(screen.getByText(/hasło jest wymagane/i)).toBeInTheDocument();
    });
  });

  test('should handles successful login', async () => {
    const mockResponse = { data: { token: 'test-token', user: { id: 1, username: 'test' } } };
    axios.post.mockResolvedValueOnce(mockResponse);

    render(
      <StateMachineProvider>
        <LoginForm setIsLoginPage={mockSetIsLoginPage} />
      </StateMachineProvider>
    );

    fireEvent.change(screen.getByLabelText(/nazwa użytkownika/i), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText(/hasło/i), {
      target: { value: 'password123' }
    });

    fireEvent.click(screen.getByRole('button', { name: /zaloguj/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/auth/login', {
        username: 'testuser',
        password: 'password123'
      });
    });
  });

  test('should handles login error', async () => {
    const mockError = { code: 'Invalid credentials' };
    axios.post.mockRejectedValueOnce(mockError);

    render(
      <StateMachineProvider>
        <LoginForm setIsLoginPage={mockSetIsLoginPage} />
      </StateMachineProvider>
    );

    fireEvent.change(screen.getByLabelText(/nazwa użytkownika/i), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText(/hasło/i), {
      target: { value: 'wrongpassword' }
    });

    fireEvent.click(screen.getByRole('button', { name: /zaloguj/i }));

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });

  test('should switches to registration form', () => {
    render(
      <StateMachineProvider>
        <LoginForm setIsLoginPage={mockSetIsLoginPage} />
      </StateMachineProvider>
    );

    fireEvent.click(screen.getByText(/zarejestruj się/i));
    expect(mockSetIsLoginPage).toHaveBeenCalledWith(false);
  });

  test('should display the spinner while loading', async () => {
    const mockResponse = new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { token: 'test-token', user: { id: 1, username: 'test' } } });
      }, 300);
    });

    axios.post.mockImplementationOnce(() => mockResponse);

    render(
      <StateMachineProvider>
        <LoginForm setIsLoginPage={jest.fn()} />
      </StateMachineProvider>
    );

    fireEvent.change(screen.getByLabelText(/nazwa użytkownika/i), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText(/hasło/i), {
      target: { value: 'password123' }
    });

    fireEvent.click(screen.getByRole('button', { name: /zaloguj/i }));

    const spinner = await screen.findByTestId('spinner');
    expect(spinner).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });
  });
});
