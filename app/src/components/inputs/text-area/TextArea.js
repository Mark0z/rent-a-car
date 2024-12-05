import './text-area.scss';
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const TextArea = React.forwardRef(
  ({ name, textLabel, className, errors, required = true, ...props }, ref) => {
    return (
      <div className="text__area">
        <label htmlFor={name} className="text__area__label">
          {textLabel}
        </label>
        <textarea
          className={clsx('text__area__input', className)}
          name={name}
          id={name}
          required={required}
          ref={ref}
          {...props}
        />
        {errors && <span className="text__area-error">{errors.message}</span>}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

TextArea.propTypes = {
  name: PropTypes.string,
  textLabel: PropTypes.string,
  className: PropTypes.string,
  errors: PropTypes.object,
  required: PropTypes.bool
};
