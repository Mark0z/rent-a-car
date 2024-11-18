import './content.scss';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const Content = ({ children, className }) => {
  return <div className={clsx('content', className)}>{children}</div>;
};

Content.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};
