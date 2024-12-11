import './user-panel.scss';
import { FaRegUser } from 'react-icons/fa';
import { IoKeyOutline } from 'react-icons/io5';
import { PanelButton } from 'components/inputs/panel-button/PanelButton';
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
        <PanelButton value="1" icon={<FaRegUser />} onClick={() => handleOnClick(1)}>
          Zmień dane użytkownika
        </PanelButton>
        <PanelButton value="2" icon={<IoKeyOutline />} onClick={() => handleOnClick(2)}>
          Rezerwacje
        </PanelButton>
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
