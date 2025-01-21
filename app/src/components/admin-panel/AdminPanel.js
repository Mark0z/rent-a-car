import './admin-panel.scss';
import { PanelButton } from 'components/inputs/panel-button/PanelButton';
import { MdManageAccounts } from 'react-icons/md';
import { IoAnalytics, IoCarSportOutline } from 'react-icons/io5';
import { UserManagement } from 'components/user-management/UserManagement';
import { CarManagement } from 'components/car-management/CarManagement';
import { ReservationManagement } from 'components/reservation-management/ReservationManagement';
import { ReportsAndStatistics } from 'components/reports-and-statistics/ReportsAndStatistics';
import { useState } from 'react';
import { NotificationIcon } from 'components/notification-icon/NotificationIcon';
import { useAxios } from 'hooks/useAxios';

export const AdminPanel = () => {
  const [selectedOption, setSelectedOption] = useState(0);
  const { data, loading, setRefresh } = useAxios(
    'http://localhost:8080/reservations/numberOfPendingReservations'
  );
  const renderStep = (option) => {
    switch (option) {
      case 1:
        return <UserManagement />;
      case 2:
        return <CarManagement />;
      case 3:
        return <ReservationManagement refreshCounter={setRefresh} />;
      case 4:
        return <ReportsAndStatistics />;
      default:
        return null;
    }
  };

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
          icon={<NotificationIcon number={loading ? 0 : data} />}
          onClick={() => setSelectedOption(3)}>
          Zarządzanie rezerwacjami
        </PanelButton>
        <PanelButton value="reports" icon={<IoAnalytics />} onClick={() => setSelectedOption(4)}>
          Raporty i statystyki
        </PanelButton>
      </div>
      {renderStep(selectedOption)}
    </div>
  );
};
