import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import logo from '../../images/logo.png';
import { useContext } from 'react';
import { MyContext } from '../../App';

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(MyContext);
  return (
    <div className='header'>
      <img src={logo} alt='' />
      <nav>
        <ul>
          <li>
            <Link to='/shop' style={{ textDecoration: 'none', color: 'white' }}>
              Shop
            </Link>
          </li>
          <li>
            <Link
              to='/review-order'
              style={{ textDecoration: 'none', color: 'white' }}
            >
              Review Order
            </Link>
          </li>
          <li>
            <Link
              to='/manage-inventory'
              style={{ textDecoration: 'none', color: 'white' }}
            >
              Manage Inventory
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setLoggedInUser({})}
              style={{ textDecoration: 'none', color: 'white' }}
            >
              Sign Out
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
