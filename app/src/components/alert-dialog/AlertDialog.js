import './alert-dialog.scss';
import { Button } from 'components/inputs/button/Button';
import PropTypes from 'prop-types';

export const AlertDialog = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Tak',
  cancelText = 'Nie'
}) => {
  if (!isOpen) return null;

  return (
    <div className="alert-dialog__overlay">
      <div className="alert-dialog">
        <div className="alert-dialog__content">
          <p className="alert-dialog__message">{message}</p>
          <div className="alert-dialog__buttons">
            <Button onClick={onConfirm} isDanger>
              {confirmText}
            </Button>
            <Button onClick={onCancel} isSecondary>
              {cancelText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

AlertDialog.propTypes = {
  isOpen: PropTypes.bool,
  message: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string
};
