import './auth.scss';
import { Content } from 'components/content/Content';
import { ContentBox } from 'components/content-box/ContentBox';
import { LoginForm } from 'components/login-form/LoginForm';
import { useEffect, useState } from 'react';
import { RegisterForm } from 'components/register-form/RegisterForm';
import { useStateMachine } from 'little-state-machine';
import { updateAction } from 'utils/updateAction';
import { clearAction } from 'utils/clearAction';
import { useNavigate } from 'react-router-dom';

export const Auth = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const { state, actions } = useStateMachine({ updateAction, clearAction });
  const storedData = state.data;
  const navigate = useNavigate();

  useEffect(() => {
    if (storedData.userId?.length > 0) {
      if (storedData.reservationFormStep === 3) {
        actions.updateAction({ reservationFormStep: 4 });
      } else {
        navigate('/profile');
      }
    }
  }, [state]);

  return (
    <div className="auth">
      <Content className="auth__content">
        {isLoginPage ? (
          <ContentBox className="auth__content__box" title="Logowanie" center>
            <LoginForm setIsLoginPage={setIsLoginPage} />
          </ContentBox>
        ) : (
          <ContentBox className="auth__content__box" title="Rejestracja" center>
            <RegisterForm setIsLoginPage={setIsLoginPage} />
          </ContentBox>
        )}
      </Content>
    </div>
  );
};
