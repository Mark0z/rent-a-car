import './user-panel-page.scss';
import { Content } from 'components/content/Content';
import { ContentBox } from 'components/content-box/ContentBox';
import { UserPanel } from 'components/user-panel/UserPanel';
import { useAxios } from 'hooks/useAxios';
import { Spinner } from 'components/spinner/Spinner';
import { useStateMachine } from 'little-state-machine';
import { AdminPanel } from 'components/admin-panel/AdminPanel';
import { useNavigate } from 'react-router-dom';

export const UserPanelPage = () => {
  const navigate = useNavigate();
  const { state } = useStateMachine();
  const { data, error, loading } = useAxios({
    url: `http://localhost:8080/users/role/${state.data.userId}`,
    method: 'GET'
  });

  if (!loading && state.data.userId === '') {
    navigate('/');
  }

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
