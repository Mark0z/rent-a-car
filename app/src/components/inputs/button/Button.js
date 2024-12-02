import './button.scss';
import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

export const Button = React.forwardRef(
  ({ className, isSecondary = false, value, children, type = 'button', ...props }, ref) => {
    return (
      <div className="button">
        <button
          type={type}
          className={clsx(
            'button-input',
            type === 'submit' && 'button-input__submit',
            isSecondary && 'button-input--secondary',
            className
          )}
          value={value}
          ref={ref}
          {...props}>
          {children}
        </button>
      </div>
    );
  }
);

Button.displayName = 'Button';

Button.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  isSecondary: PropTypes.bool,
  children: PropTypes.node
};
