import { FaBars } from 'react-icons/fa';
import { IconContext } from "react-icons";
import { useState, useRef } from 'react';
import {  useNavigate } from 'react-router-dom';
import {  useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { logoutStaff, resetStaff } from '../features/staff/staffSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(logoutStaff());
    dispatch(reset());
    dispatch(resetStaff());
    navigate('/');
  };

  return (
    <header
      style={{ background: 'white', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0px' }}
      className='header'
    >
      
        <img style={{ width: '100px', height: '100px', }} src={require('../images/circle-logo-png.webp')} alt='' />
        <h1 className='carwash-h'> CAR WASH NAME</h1>
      

      {/* Hamburger menu */}
      <IconContext.Provider value={{ color: '#4682B4' }}>
        <div className='mobile-menu'>
          <FaBars onClick={toggleMobileMenu} />
          <input type="checkbox" id="mobile-menu-checkbox" ref={mobileMenuRef} style={{ display: 'none' }} />
          {isMobileMenuOpen && (
            <ul className='mobile-menu-items'>
             {/* <img src="" alt="" /> */}
            </ul>
          )}
        </div>
      </IconContext.Provider>
    </header>
  );
}

export default Header;

