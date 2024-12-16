import './select-input.scss';
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const SelectInput = React.forwardRef(
  (
    {
      name,
      className,
      textLabel,
      defaultValue,
      mediumSize = false,
      required = true,
      errors,
      optionList,
      ...props
    },
    ref
  ) => {
    return (
      <div className="select__input">
        <label htmlFor={name} className="select__input__label">
          {textLabel}
        </label>
        <select
          name={name}
          id={name}
          className={clsx(
            'select__input__select',
            className,
            mediumSize && 'select__input__select-medium'
          )}
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
        {errors && <span className="select__input-error">{errors.message}</span>}
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
  mediumSize: PropTypes.bool,
  defaultValue: PropTypes.string
};
