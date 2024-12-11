import './admin-panel.scss';
import { PanelButton } from 'components/inputs/panel-button/PanelButton';
import { MdManageAccounts } from 'react-icons/md';
import { IoAnalytics, IoCarSportOutline } from 'react-icons/io5';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { TbReportAnalytics } from 'react-icons/tb';

export const AdminPanel = () => {
  return (
    <div className="admin__panel">
      <div className="admin__panel__options">
        <PanelButton value="manageAccounts" icon={<MdManageAccounts />}>
          Zarządzanie użytkownikami
        </PanelButton>
        <PanelButton value="manageCars" icon={<IoCarSportOutline />}>
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
    </div>
  );
};
