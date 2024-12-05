import './reservation-info-item.scss';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const ReservationInfoItem = ({ title, className, buttonText, buttonFunc, children }) => {
  return (
    <div className={clsx('reservation__info__item', className)}>
      <h4 className="reservation__info__item__h4">{title}</h4>
      <p className="reservation__info__item__p">{children}</p>
      <h5 className="reservation__info__item__h5" onClick={buttonFunc}>
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
