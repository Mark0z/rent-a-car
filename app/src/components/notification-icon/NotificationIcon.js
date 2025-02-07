import './notification-icon.scss';
import { TbReportAnalytics } from 'react-icons/tb';
import PropTypes from 'prop-types';

export const NotificationIcon = ({ number = 0 }) => {
  return (
    <div className="notification__icon">
      <TbReportAnalytics />
      {number > 0 && <div className="notification__icon__ammount">{number}</div>}
    </div>
  );
};

NotificationIcon.propTypes = {
  number: PropTypes.number
};
