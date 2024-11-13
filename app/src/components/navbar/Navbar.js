import './navbar.scss';
import { FaHome } from 'react-icons/fa';
import { IoMdLogIn } from 'react-icons/io';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-menu">
        <a className="navbar--link navbar--link__icon" href="">
          <FaHome />
        </a>
        <a className="navbar--link" href="">
          Rezerwuj samochód
        </a>
        <a className="navbar--link" href="">
          Samochody
        </a>
        <a className="navbar--link" href="">
          Cennik
        </a>
        <a className="navbar--link" href="">
          Zasady wynajmu
        </a>
        <a className="navbar--link" href="">
          Kontakt
        </a>
      </div>
      <div className="navbar--link navbar--link__icon">
        <IoMdLogIn />
      </div>
    </nav>
  );
};
