import './header.scss';
import logo from 'assets/logo.png';
import { CiMail } from 'react-icons/ci';
import { SlPhone } from 'react-icons/sl';
import clsx from 'clsx';

export const Header = () => {
  return (
    <header>
      <div className="header-content">
        <a className="logo" href="/">
          <img src={logo || ''} alt="" />
        </a>
        <div className="contact">
          <div className="contact-info">
            <p className={clsx('contact-info--p', 'contact-info--p__title')}>RentDrive</p>
            <p className="contact-info--p">ul. Równa 13</p>
            <p className="contact-info--p">80-067 Gdańsk</p>
            <p className={clsx('contact-info--p', 'contact-info--contact-info--p__small')}>
              PON - SOB 7 - 23
            </p>
            <p className={clsx('contact-info--p', 'contact-info--contact-info--p__small')}>
              NDZ 6 - 24
            </p>
          </div>
          <div className="contact-banner">
            <p className="contact-banner__email">
              <CiMail />
              rentdrive@rentdrive.pl
            </p>
            <p className="contact-banner__phone">
              <SlPhone />
              +48 123 66 55 88
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
