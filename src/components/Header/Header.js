import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import './Header.css'
// import { Link } from "react-router-dom";

const Header = () => {
    
    return (
        <div className="header">
            <img className='logoImg' src={logo} alt="" />
            <nav className="navBar">

            <Link to="/shop">Shop</Link> |
            <Link to="/service">Service</Link>
            
               
            </nav>
        </div>
    );
};

export default Header;