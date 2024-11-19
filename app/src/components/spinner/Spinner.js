import { BounceLoader } from 'react-spinners';
import PropTypes from 'prop-types';

export const Spinner = ({ color = '#E07B39', size = 60 }) => {
  return (
    <div className="spinner">
      <BounceLoader color={color} size={size} />
    </div>
  );
};

Spinner.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string
};
