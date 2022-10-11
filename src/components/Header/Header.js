import React from 'react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css'
// import { Link } from "react-router-dom";

const Header = () => {
    
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    const navigate = useNavigate();

    const handleLoggedInUser = ()=>{
        setLoggedInUser({});
        navigate("/login");
    }
    return (
        <div className="header">
           
            <img className='logoImg' src={logo} alt="" />
            <nav className="navBar">

            <Link to="/shop">Shop</Link> |
            <Link to="/review">Order Review</Link>
            <Link to="/inventory">Manage Inventory</Link>
            
            <button onClick={handleLoggedInUser}>Sing out</button>
            
               
            </nav>
        </div>
    );
};

export default Header;