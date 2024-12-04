import './navbar.scss';
import { FaHome } from 'react-icons/fa';
import { IoMdLogIn } from 'react-icons/io';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { useStateMachine } from 'little-state-machine';
import { MdLogout } from 'react-icons/md';
import { clearAction } from 'utils/clearAction';
import { CgProfile } from 'react-icons/cg';

export const Navbar = () => {
  const { state, actions } = useStateMachine({ clearAction });

  const handleLogout = () => {
    actions.clearAction();
  };

  return (
    <nav className="navbar">
      <div className="navbar__content">
        <div className="navbar__content__menu">
          <NavLink className="navbar__content__link navbar__content__link__icon" to="/">
            <FaHome />
          </NavLink>
          <NavLink className="navbar__content__link" to="reservation">
            Rezerwuj samochód
          </NavLink>
          <NavLink className="navbar__content__link" to="cars">
            Samochody
          </NavLink>
          <NavLink className="navbar__content__link" to="rules">
            Zasady wynajmu
          </NavLink>
          <NavLink className="navbar__content__link" to="contact">
            Kontakt
          </NavLink>
        </div>
        {!state.data.userId ? (
          <NavLink
            className={clsx('navbar__content__link', 'navbar__content__link__icon')}
            to="auth">
            <IoMdLogIn />
          </NavLink>
        ) : (
          <div className="navbar__content__logged">
            <NavLink
              className={clsx('navbar__content__link', 'navbar__content__link__icon')}
              to="profile">
              <CgProfile />
            </NavLink>
            <div
              onClick={() => handleLogout()}
              className={clsx('navbar__content__link', 'navbar__content__link__icon')}>
              <MdLogout />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
