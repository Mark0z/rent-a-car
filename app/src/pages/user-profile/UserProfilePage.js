import './user-profile-page.scss';
import { Content } from 'components/content/Content';
import { ContentBox } from 'components/content-box/ContentBox';
import { UserProfile } from 'components/user-profile/UserProfile';

export const UserProfilePage = () => {
  return (
    <Content>
      <ContentBox title="Profil użytkownika" className="user__profile__page__content__box" center>
        <UserProfile />
      </ContentBox>
    </Content>
  );
};
