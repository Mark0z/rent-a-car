import './header.scss';
import logo from 'assets/logo.png';
import { CiMail } from 'react-icons/ci';
import { SlPhone } from 'react-icons/sl';
import clsx from 'clsx';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__content">
        <a className="logo" href="/">
          <img className="logo__img" src={logo || ''} alt="" />
        </a>
        <div className="header__contact">
          <div className="header__contact__info">
            <p className={clsx('header__contact__info__p', 'header__contact__info__p-title')}>
              RentDrive
            </p>
            <p className="header__contact__info__p">ul. Równa 13</p>
            <p className="header__contact__info__p">80-067 Gdańsk</p>
            <p
              className={clsx(
                'header__contact__info__p',
                'header__contact__info__contact__info__p-small'
              )}>
              PON - SOB 7 - 23
            </p>
            <p
              className={clsx(
                'header__contact__info__p',
                'header__contact__info__contact__info__p-small'
              )}>
              NDZ 6 - 24
            </p>
          </div>
          <div className="header__contact__banner">
            <p className="header__contact__banner__email">
              <CiMail className="header__contact__banner__svg" />
              rentdrive@rentdrive.pl
            </p>
            <p className="header__contact__banner__phone">
              <SlPhone className="header__contact__banner__svg" />
              +48 123 66 55 88
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
