import './user-details.scss';
import 'components/user-details/user-details.scss';
import PropTypes from 'prop-types';

export const UserDetails = ({ user }) => (
  <div className="user__details__container">
    <h3>Dane użytkownika</h3>
    <div className="user__details__info">
      <p>
        <b>Email:</b> {user.email}
      </p>
      <p>
        <b>Username:</b> {user.username}
      </p>
      <p>
        <b>Imię i nazwisko:</b> {user.firstName} {user.lastName}
      </p>
      <p>
        <b>Telefon:</b> {user.phone}
      </p>
      <p>
        <b>Data dołączenia:</b> {user.dateJoined?.slice(0, 10)}
      </p>
    </div>
  </div>
);

UserDetails.propTypes = {
  user: PropTypes.object.isRequired
};
