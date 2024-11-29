import './navbar.scss';
import { FaHome } from 'react-icons/fa';
import { IoMdLogIn } from 'react-icons/io';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-content-menu">
          <NavLink className="navbar-content--link navbar-content--link__icon" to="/">
            <FaHome />
          </NavLink>
          <NavLink className="navbar-content--link" to="reservation">
            Rezerwuj samochód
          </NavLink>
          <NavLink className="navbar-content--link" to="cars">
            Samochody
          </NavLink>
          <NavLink className="navbar-content--link" to="rules">
            Zasady wynajmu
          </NavLink>
          <NavLink className="navbar-content--link" to="contact">
            Kontakt
          </NavLink>
        </div>
        <NavLink className={clsx('navbar-content--link', 'navbar-content--link__icon')} to="auth">
          <IoMdLogIn />
        </NavLink>
      </div>
    </nav>
  );
};
