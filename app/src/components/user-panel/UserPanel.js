import './user-panel.scss';
import { FaRegUser } from 'react-icons/fa';
import { IoKeyOutline } from 'react-icons/io5';
import { ProfileButton } from 'components/inputs/profile-button/ProfileButton';
import { useState } from 'react';
import { RegisterForm } from 'components/register-form/RegisterForm';
import { ChangePasswordForm } from 'components/change-password-form/ChangePasswordForm';

export const UserPanel = () => {
  const [selectedOption, setSelectedOption] = useState(0);

  function handleOnClick(option) {
    setSelectedOption(option);
  }

  return (
    <div className="user__panel">
      <div className="user__panel__options">
        <ProfileButton value="1" icon={<FaRegUser />} onClick={() => handleOnClick(1)}>
          Zmień dane użytkownika
        </ProfileButton>
        <ProfileButton value="2" icon={<IoKeyOutline />} onClick={() => handleOnClick(2)}>
          Rezerwacje
        </ProfileButton>
      </div>
      {selectedOption === 1 && (
        <>
          <RegisterForm isEditMode />
          <ChangePasswordForm />
        </>
      )}
    </div>
  );
};
