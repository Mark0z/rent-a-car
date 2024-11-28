import './select-input.scss';
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const SelectInput = React.forwardRef(
  (
    { name, className, textLabel, defaultValue, required = true, errors, optionList, ...props },
    ref
  ) => {
    return (
      <div className="select-input">
        <label htmlFor={name} className="select-input--label">
          {textLabel}
        </label>
        <select
          name={name}
          id={name}
          className={clsx('select-input--select', className)}
          defaultValue={'default'}
          required={required}
          ref={ref}
          {...props}>
          <option key="default" value="" hidden>
            {defaultValue}
          </option>
          {optionList.map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
        </select>
        {errors && <span className="select-input--error">{errors.message}</span>}
      </div>
    );
  }
);

SelectInput.displayName = 'SelectInput';

SelectInput.propTypes = {
  name: PropTypes.string,
  textLabel: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  errors: PropTypes.object,
  required: PropTypes.bool,
  optionList: PropTypes.array,
  defaultValue: PropTypes.string
};
