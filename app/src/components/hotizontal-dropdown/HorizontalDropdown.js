import './horizontal-dropdown.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { BiDownArrow } from 'react-icons/bi';

export const HorizontalDropdown = ({ array, value, title, register, children }) => {
  return (
    <ol>
      <li>
        <a>
          {title} <BiDownArrow />
        </a>
        <ul>
          {array?.length > 0 &&
            array.map((type, index) => (
              <li key={index}>
                <div className="checkbox">
                  <input
                    type="checkbox"
                    className="checkbox__input"
                    id={type}
                    value={type}
                    name={type}
                    {...register(value)}
                  />
                  <label className="checkbox__label" htmlFor={type}>
                    {type}
                  </label>
                </div>
              </li>
            ))}
          {children}
        </ul>
      </li>
    </ol>
  );
};

HorizontalDropdown.propTypes = {
  array: PropTypes.array,
  title: PropTypes.string,
  value: PropTypes.string,
  register: PropTypes.func,
  children: PropTypes.node
};
