import './user-panel.scss';
import { FaRegUser } from 'react-icons/fa';
import { IoKeyOutline } from 'react-icons/io5';
import { ProfileButton } from 'components/inputs/profile-button/ProfileButton';
import { useState } from 'react';

export const UserPanel = () => {
  const [selectedOption, setSelectedOption] = useState(0);

  function handleOnClick(option) {
    setSelectedOption(option);
  }

  return (
    <div className="user__panel">
      <div className="user__panel__options">
        <ProfileButton value="1" icon={<FaRegUser />} onClick={() => handleOnClick(1)}>
          Dane użytkownika
        </ProfileButton>
        <ProfileButton value="2" icon={<IoKeyOutline />} onClick={() => handleOnClick(2)}>
          Rezerwacje
        </ProfileButton>
      </div>
      {selectedOption}
    </div>
  );
};
