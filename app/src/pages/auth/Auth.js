import './auth.scss';
import { Content } from 'components/content/Content';
import { ContentBox } from 'components/content-box/ContentBox';
import { LoginForm } from 'components/login-form/LoginForm';
import { useState } from 'react';
import { RegisterForm } from 'components/register-form/RegisterForm';

export const Auth = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);

  return (
    <div className="auth">
      <Content className="auth-content">
        {isLoginPage ? (
          <ContentBox className="auth-content-box" title="Logowanie" center>
            <LoginForm setIsLoginPage={setIsLoginPage} />
          </ContentBox>
        ) : (
          <ContentBox className="auth-content-box" title="Rejestracja" center>
            <RegisterForm setIsLoginPage={setIsLoginPage} />
          </ContentBox>
        )}
      </Content>
    </div>
  );
};
