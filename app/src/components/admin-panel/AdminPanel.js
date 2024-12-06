import './admin-panel.scss';
import { ProfileButton } from 'components/inputs/profile-button/ProfileButton';
import { MdManageAccounts } from 'react-icons/md';
import { IoAnalytics, IoCarSportOutline } from 'react-icons/io5';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { TbReportAnalytics } from 'react-icons/tb';

export const AdminPanel = () => {
  return (
    <div className="admin__panel">
      <div className="admin__panel__options">
        <ProfileButton value="manageAccounts" icon={<MdManageAccounts />}>
          Zarządzanie użytkownikami
        </ProfileButton>
        <ProfileButton value="manageCars" icon={<IoCarSportOutline />}>
          Zarządzanie pojazdami
        </ProfileButton>
        <ProfileButton value="manageReservations" icon={<TbReportAnalytics />}>
          Zarządzanie rezerwacjami
        </ProfileButton>
        <ProfileButton value="reports" icon={<IoAnalytics />}>
          Raporty i statystyki
        </ProfileButton>
        <ProfileButton value="notifications" icon={<IoIosNotificationsOutline />}>
          Powiadomienia
        </ProfileButton>
      </div>
    </div>
  );
};
