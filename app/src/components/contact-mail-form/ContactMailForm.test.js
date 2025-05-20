import { act, fireEvent, render, screen } from '@testing-library/react';
import { ContactMailForm } from './ContactMailForm';
import { sendMail } from 'utils/sendMail';
import userEvent from '@testing-library/user-event';
import React from 'react';

jest.mock('utils/sendMail');

let mockReset;
let mockGetValue;

beforeEach(() => {
  mockReset = jest.fn();
  mockGetValue = jest.fn().mockReturnValue('test-token');
  jest.clearAllMocks();
});

jest.mock('react-google-recaptcha', () => {
  const mockReact = require('react');
  return {
    __esModule: true,
    default: mockReact.forwardRef(function ReCAPTCHA(props, ref) {
      mockReact.useImperativeHandle(ref, () => ({
        getValue: () => mockGetValue(),
        reset: mockReset
      }));
      return mockReact.createElement('div', { 'data-testid': 'recaptcha' }, 'ReCAPTCHA');
    })
  };
});

describe('ContactMailForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should renders a form with all fields', () => {
    render(<ContactMailForm />);

    expect(screen.getByLabelText(/imię/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nazwisko/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/telefon/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/treść wiadomości/i)).toBeInTheDocument();
    expect(screen.getByText(/wyślij/i)).toBeInTheDocument();
  });

  it('should displays validation errors when the form is empty', async () => {
    render(<ContactMailForm />);

    await act(async () => {
      fireEvent.click(screen.getByText(/wyślij/i));
    });

    expect(screen.getByText(/Imię jest wymagane/i)).toBeInTheDocument();
    expect(screen.getByText(/Nazwisko jest wymagane/i)).toBeInTheDocument();
    expect(screen.getByText(/Telefon jest wymagany/i)).toBeInTheDocument();
    expect(screen.getByText(/Email jest wymagany/i)).toBeInTheDocument();
    expect(screen.getByText(/Treść jest wymagany/i)).toBeInTheDocument();
  });

  it('should sends a form with correct data', async () => {
    render(<ContactMailForm />);

    await userEvent.type(screen.getByLabelText(/imię/i), 'Jan');
    await userEvent.type(screen.getByLabelText(/nazwisko/i), 'Kowalski');
    await userEvent.type(screen.getByLabelText(/telefon/i), '123456789');
    await userEvent.type(screen.getByLabelText(/email/i), 'jan@example.com');
    await userEvent.type(screen.getByLabelText(/treść wiadomości/i), 'Test message');

    await act(async () => {
      fireEvent.click(screen.getByText(/wyślij/i));
    });

    expect(sendMail).toHaveBeenCalled();
    expect(mockReset).toHaveBeenCalled();
  });

  it('should displays error when captcha is not solved', async () => {
    mockGetValue.mockReturnValue(null);
    render(<ContactMailForm />);

    await userEvent.type(screen.getByLabelText(/imię/i), 'Jan');
    await userEvent.type(screen.getByLabelText(/nazwisko/i), 'Kowalski');
    await userEvent.type(screen.getByLabelText(/telefon/i), '123456789');
    await userEvent.type(screen.getByLabelText(/email/i), 'jan@example.com');
    await userEvent.type(screen.getByLabelText(/treść wiadomości/i), 'Test message');

    await act(async () => {
      fireEvent.click(screen.getByText(/wyślij/i));
    });

    expect(await screen.findByText('Aby kontynuować, rozwiąż proszę CAPTCHA')).toBeInTheDocument();
    expect(sendMail).not.toHaveBeenCalled();
  });
});
