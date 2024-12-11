import './panel-button.scss';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const PanelButton = ({ className, value, icon, children, ...rest }) => {
  return (
    <button
      className={clsx('profile__button', className)}
      id={value}
      name={value}
      value={value}
      {...rest}>
      <div className="profile__button__svg">{icon}</div>
      {children}
    </button>
  );
};

PanelButton.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  icon: PropTypes.node,
  children: PropTypes.node
};
