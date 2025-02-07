import { fireEvent, render, screen } from '@testing-library/react';
import { AlertDialog } from 'components/alert-dialog/AlertDialog';
import { useState } from 'react';
import '@testing-library/jest-dom';

const TestComponent = () => {
  const [showDialog, setShowDialog] = useState(true);

  return (
    <AlertDialog
      isOpen={showDialog}
      onConfirm={() => setShowDialog(false)}
      message={'alert dialog is open'}
    />
  );
};

describe('AlertDialog', () => {
  it('should close dialog after confirmation', () => {
    render(<TestComponent />);

    expect(screen.getByText('alert dialog is open')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Tak'));

    expect(screen.queryByText('alert dialog is open')).not.toBeInTheDocument();
  });
});
