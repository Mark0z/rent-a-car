import './user-panel-page.scss';
import { Content } from 'components/content/Content';
import { ContentBox } from 'components/content-box/ContentBox';
import { UserPanel } from 'components/user-panel/UserPanel';
import { useAxios } from 'hooks/useAxios';
import { Spinner } from 'components/spinner/Spinner';
import { useStateMachine } from 'little-state-machine';
import { AdminPanel } from 'components/admin-panel/AdminPanel';

export const UserPanelPage = () => {
  const { state } = useStateMachine();
  const { data, error, loading } = useAxios({
    url: `http://localhost:8080/users/role/${state.data.userId}`,
    method: 'GET'
  });

  const typeOfUserPanel = (userType) => {
    switch (userType) {
      case 'ADMIN':
        return <AdminPanel />;
      case 'USER':
        return <UserPanel />;
    }
  };

  return (
    <Content>
      <ContentBox title="Profil użytkownika" className="user__profile__page__content__box" center>
        {!loading ? <>{typeOfUserPanel(data)}</> : <Spinner />}
        {error && <p>{error.message}</p>}
      </ContentBox>
    </Content>
  );
};
