import './admin-panel.scss';
import { PanelButton } from 'components/inputs/panel-button/PanelButton';
import { MdManageAccounts } from 'react-icons/md';
import { IoAnalytics, IoCarSportOutline } from 'react-icons/io5';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { TbReportAnalytics } from 'react-icons/tb';
import { UserManagement } from 'components/user-management/UserManagement';
import { useState } from 'react';

const renderStep = (option) => {
  switch (option) {
    case 1:
      return <UserManagement />;
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
        <PanelButton value="manageReservations" icon={<TbReportAnalytics />}>
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
