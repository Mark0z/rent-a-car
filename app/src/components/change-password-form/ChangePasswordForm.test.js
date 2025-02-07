import { act, fireEvent, render, screen } from '@testing-library/react';
import { ChangePasswordForm } from 'components/change-password-form/ChangePasswordForm';
import { createStore, StateMachineProvider } from 'little-state-machine';
import axios from 'axios';

jest.mock('axios');

createStore({
  data: {
    userId: 2137
  }
});

const renderWithProvider = () => {
  render(
    <StateMachineProvider>
      <ChangePasswordForm />
    </StateMachineProvider>
  );
};

describe('ChangePasswordForm', () => {
  it('should with all required fields ', async () => {
    renderWithProvider();

    await act(async () => {
      fireEvent.click(screen.getByText(/Zmień hasło/i));
    });

    expect(screen.getByText('Obecne hasło jest wymagane')).toBeInTheDocument();
    expect(screen.getByText('Nowe hasło jest wymagane')).toBeInTheDocument();
  });

  it('should successful change password', async () => {
    axios.post.mockResolvedValueOnce();
    renderWithProvider();

    fireEvent.change(screen.getByLabelText('Obecne hasło'), {
      target: { value: 'OldAdmin' }
    });
    fireEvent.change(screen.getByLabelText('Nowe hasło'), {
      target: { value: 'NewAdmin' }
    });

    await act(async () => {
      fireEvent.click(screen.getByText(/Zmień hasło/i));
    });

    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:8080/auth/change-password/2137/OldAdmin/NewAdmin'
    );
    expect(screen.getByText('Password changed')).toBeInTheDocument();
  });

  it('should handle change password error', async () => {
    const mockResponse = { response: { data: 'Wrong current password' } };
    axios.post.mockRejectedValueOnce(mockResponse);

    renderWithProvider();

    fireEvent.change(screen.getByLabelText('Obecne hasło'), {
      target: { value: 'OldAdmin' }
    });
    fireEvent.change(screen.getByLabelText('Nowe hasło'), {
      target: { value: 'NewAdmin' }
    });

    await act(async () => {
      fireEvent.click(screen.getByText(/Zmień hasło/i));
    });

    expect(screen.getByText('Wrong current password')).toBeInTheDocument();
  });
});
