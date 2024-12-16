import './text-input.scss';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import React from 'react';

export const TextInput = React.forwardRef(
  (
    {
      name,
      textLabel,
      className,
      type = 'text',
      errors = '',
      hidden = false,
      required = true,
      mediumSize,
      ...props
    },
    ref
  ) => {
    return (
      <div className="text__input">
        <label hidden={hidden} htmlFor={name} className="text__input__label">
          {textLabel}
        </label>
        <input
          className={clsx(
            'text__input__input',
            className,
            mediumSize && 'text__input__input-medium',
            errors && 'text__input__input-error'
          )}
          type={type}
          name={name}
          id={name}
          hidden={hidden}
          required={required}
          ref={ref}
          {...props}
        />
        {errors && <span className="text__input-error">{errors.message}</span>}
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
  mediumSize: PropTypes.bool,
  hidden: PropTypes.bool,
  required: PropTypes.bool
};
