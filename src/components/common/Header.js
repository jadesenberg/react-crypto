import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import './Header.css';
import Search from './Search';

const Header = () => {
    return (
        <div className="Header">
            <Link to="/">
                <img src={logo} className="Header-logo" alt="Double Deck"/> 
            </Link>

            <Search />
        </div>
    )
}

export default Header;