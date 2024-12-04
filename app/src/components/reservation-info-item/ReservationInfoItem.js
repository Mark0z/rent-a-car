import './reservation-info-item.scss';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const ReservationInfoItem = ({ title, className, buttonText, buttonFunc, children }) => {
  return (
    <div className={clsx('reservation-info-item', className)}>
      <h4 className="reservation-info-item--h4">{title}</h4>
      <p className="reservation-info-item--p">{children}</p>
      <h5 className="reservation-info-item--h5" onClick={buttonFunc}>
        {buttonText}
      </h5>
    </div>
  );
};

ReservationInfoItem.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  buttonText: PropTypes.string,
  buttonFunc: PropTypes.func,
  children: PropTypes.node
};
