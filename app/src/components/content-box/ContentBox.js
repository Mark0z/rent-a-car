import './content-box.scss';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const ContentBox = ({ title, children, center, className }) => {
  return (
    <div className={clsx('content__box', className)}>
      <div className="content__box__title">{title}</div>
      <div className="content__box__line" />
      <div className={clsx('content__box__data', center && 'content__box__data-center')}>
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
