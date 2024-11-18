import './navbar.scss';
import { FaHome } from 'react-icons/fa';
import { IoMdLogIn } from 'react-icons/io';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-content-menu">
          <a className="navbar-content--link navbar-content--link__icon" href="">
            <FaHome />
          </a>
          <a className="navbar-content--link" href="">
            Rezerwuj samochód
          </a>
          <a className="navbar-content--link" href="">
            Samochody
          </a>
          <a className="navbar-content--link" href="">
            Cennik
          </a>
          <a className="navbar-content--link" href="">
            Zasady wynajmu
          </a>
          <a className="navbar-content--link" href="">
            Kontakt
          </a>
        </div>
        <div className="navbar-content--link navbar-content--link__icon">
          <IoMdLogIn />
        </div>
      </div>
    </nav>
  );
};
