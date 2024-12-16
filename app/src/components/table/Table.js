import './table.scss';
import PropTypes from 'prop-types';
import { Spinner } from 'components/spinner/Spinner';

export const Table = ({ headerArray, loading, children }) => {
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                {headerArray.map((item, index) => (
                  <th key={index}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>{children}</tbody>
          </table>
        </div>
      )}
    </>
  );
};

Table.propTypes = {
  headerArray: PropTypes.array,
  loading: PropTypes.bool,
  children: PropTypes.node
};
