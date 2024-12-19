import './user-panel.scss';
import { FaRegUser } from 'react-icons/fa';
import { IoKeyOutline } from 'react-icons/io5';
import { PanelButton } from 'components/inputs/panel-button/PanelButton';
import { useState } from 'react';
import { RegisterForm } from 'components/register-form/RegisterForm';
import { ChangePasswordForm } from 'components/change-password-form/ChangePasswordForm';
import { UserReservationsTable } from 'components/user-reservations-table/UserReservationsTable';
import { UserDetails } from 'components/user-details/UserDetails';
import { useStateMachine } from 'little-state-machine';

export const UserPanel = () => {
  const [selectedOption, setSelectedOption] = useState(0);
  const { state } = useStateMachine();

  const loggedUser = {
    email: state.data.email,
    username: state.data.username,
    firstName: state.data.firstName,
    lastName: state.data.lastName,
    phone: state.data.phone,
    dateJoined: state.data.dateJoined
  };

  const handleOnClick = (option) => {
    setSelectedOption(option);
  };

  const renderStep = () => {
    switch (selectedOption) {
      case 1:
        return (
          <>
            <RegisterForm isEditMode />
            <ChangePasswordForm />
          </>
        );
      case 2:
        return <UserReservationsTable />;
      default:
        return null;
    }
  };

  return (
    <div className="user__panel">
      <UserDetails user={loggedUser} />
      <div className="user__panel__options">
        <PanelButton value="1" icon={<FaRegUser />} onClick={() => handleOnClick(1)}>
          Zmień dane użytkownika
        </PanelButton>
        <PanelButton value="2" icon={<IoKeyOutline />} onClick={() => handleOnClick(2)}>
          Rezerwacje
        </PanelButton>
      </div>
      {renderStep(selectedOption)}
    </div>
  );
};
