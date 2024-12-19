import './admin-panel.scss';
import { PanelButton } from 'components/inputs/panel-button/PanelButton';
import { MdManageAccounts } from 'react-icons/md';
import { IoAnalytics, IoCarSportOutline } from 'react-icons/io5';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { TbReportAnalytics } from 'react-icons/tb';
import { UserManagement } from 'components/user-management/UserManagement';
import { CarManagement } from 'components/car-management/CarManagement';
import { ReservationManagement } from 'components/reservation-management/ReservationManagement';
import { useState } from 'react';

const renderStep = (option) => {
  switch (option) {
    case 1:
      return <UserManagement />;
    case 2:
      return <CarManagement />;
    case 3:
      return <ReservationManagement />;
    default:
      return null;
  }
};

export const AdminPanel = () => {
  const [selectedOption, setSelectedOption] = useState(0);

  return (
    <div className="admin__panel">
      <div className="admin__panel__options">
        <PanelButton
          value="manageAccounts"
          icon={<MdManageAccounts />}
          onClick={() => setSelectedOption(1)}>
          Zarządzanie użytkownikami
        </PanelButton>
        <PanelButton
          value="manageCars"
          icon={<IoCarSportOutline />}
          onClick={() => setSelectedOption(2)}>
          Zarządzanie pojazdami
        </PanelButton>
        <PanelButton
          value="manageReservations"
          icon={<TbReportAnalytics />}
          onClick={() => setSelectedOption(3)}>
          Zarządzanie rezerwacjami
        </PanelButton>
        <PanelButton value="reports" icon={<IoAnalytics />}>
          Raporty i statystyki
        </PanelButton>
        <PanelButton value="notifications" icon={<IoIosNotificationsOutline />}>
          Powiadomienia
        </PanelButton>
      </div>
      {renderStep(selectedOption)}
    </div>
  );
};
