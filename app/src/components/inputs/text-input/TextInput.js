import './text-input.scss';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import React from 'react';

export const TextInput = React.forwardRef(
  ({ name, textLabel, className, type = 'text', errors, required = false, ...props }, ref) => {
    return (
      <div className="text-input">
        <label htmlFor={name} className="text-input--label">
          {textLabel}
        </label>
        <input
          className={clsx('text-input--input', className)}
          type={type}
          name={name}
          required={required}
          ref={ref}
          {...props}
        />
        {errors && <span className="text-input--error">{errors.message}</span>}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';

TextInput.propTypes = {
  name: PropTypes.string,
  textLabel: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  errors: PropTypes.object,
  required: PropTypes.bool
};
