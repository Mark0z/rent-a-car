import './button.scss';
import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

export const Button = React.forwardRef(
  (
    {
      className,
      isSecondary = false,
      isDanger = false,
      isSuccess = false,
      value,
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    return (
      <div className="button">
        <button
          type={type}
          className={clsx(
            'button__input',
            type === 'submit' && 'button__input__submit',
            isSecondary && 'button__input-secondary',
            isSuccess && 'button__input-success',
            isDanger && 'button__input-danger',
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
  isDanger: PropTypes.bool,
  isSuccess: PropTypes.bool,
  children: PropTypes.node
};
