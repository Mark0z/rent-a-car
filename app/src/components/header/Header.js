import './header.scss';
import logo from 'assets/logo.png';
import { CiMail } from 'react-icons/ci';
import { SlPhone } from 'react-icons/sl';
import clsx from 'clsx';

export const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <a className="logo" href="/">
          <img className="logo--img" src={logo || ''} alt="" />
        </a>
        <div className="header-contact">
          <div className="header-contact-info">
            <p className={clsx('header-contact-info--p', 'header-contact-info--p__title')}>
              RentDrive
            </p>
            <p className="header-contact-info--p">ul. Równa 13</p>
            <p className="header-contact-info--p">80-067 Gdańsk</p>
            <p
              className={clsx(
                'header-contact-info--p',
                'header-contact-info--contact-info--p__small'
              )}>
              PON - SOB 7 - 23
            </p>
            <p
              className={clsx(
                'header-contact-info--p',
                'header-contact-info--contact-info--p__small'
              )}>
              NDZ 6 - 24
            </p>
          </div>
          <div className="header-contact-banner">
            <p className="header-contact-banner__email">
              <CiMail className="header-contact-banner__svg" />
              rentdrive@rentdrive.pl
            </p>
            <p className="header-contact-banner__phone">
              <SlPhone className="header-contact-banner__svg" />
              +48 123 66 55 88
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
