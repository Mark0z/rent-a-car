import 'components/content-box/content-box.scss';
import PropTypes from 'prop-types';

export const ContentBox = ({ title, children }) => {
  return (
    <div className="content-box">
      <div className="content-box--title">{title}</div>
      <div className="content-box--data">{children}</div>
    </div>
  );
};

ContentBox.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
};
