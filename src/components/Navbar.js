import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active">
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" activeClassName="active">
            <span>About</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" activeClassName="active">
            <span>Contact</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
