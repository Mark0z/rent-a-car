import './content.scss';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const Content = ({ children, className, isContentAbove = false }) => {
  return (
    <div className={clsx('content', className, isContentAbove && 'content__covered')}>
      {children}
    </div>
  );
};

Content.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isContentAbove: PropTypes.bool
};
