import './user-profile.scss';
import { FaRegUser } from 'react-icons/fa';
import { IoKeyOutline } from 'react-icons/io5';
import { ProfileButton } from 'components/inputs/profile-button/ProfileButton';

export const UserProfile = () => {
  return (
    <div className="user__profile">
      <ProfileButton value="1" icon={<FaRegUser />}>
        Dane użytkownika
      </ProfileButton>
      <ProfileButton value="2" icon={<IoKeyOutline />}>
        Rezerwacje
      </ProfileButton>
    </div>
  );
};
