import './content-box.scss';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const ContentBox = ({ title, children, center, className }) => {
  return (
    <div className={clsx('content-box', className)}>
      <div className="content-box--title">{title}</div>
      <div className="content-box--line" />
      <div className={clsx('content-box--data', center && 'content-box--data__center')}>
        {children}
      </div>
    </div>
  );
};

ContentBox.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  center: PropTypes.bool,
  className: PropTypes.string
};
