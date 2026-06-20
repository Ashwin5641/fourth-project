import { useState } from "react";
import { Link } from "react-router-dom";

import './navbar.css'

import '@fontsource/outfit';
import '@fontsource/outfit/500.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";

export default function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <div className="navbar">
                <div className="menu-toggle" onClick={() => setMenuOpen(true)}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
                <div className="navbar-menu-items">
                    <ul>
                        <li><Link className="hyperlink" to={'/'}>Home</Link></li>
                        <li><Link className="hyperlink" to={'/'}>Shop</Link></li>
                        <li><Link className="hyperlink" to={'/'}>Blog</Link></li>
                        <li><Link className="hyperlink" to={'/'}>Contact</Link></li>
                    </ul>
                </div>
                <div className="navbar-logo">
                    <h1>Logo</h1>
                </div>
                <div className="navbar-icons">
                    <ul>   
                        <li><Link className="hyperlink" to={'/'}><FontAwesomeIcon icon={faSearch} /></Link></li>
                        <li><Link className="hyperlink" to={'/profile'}><FontAwesomeIcon icon={faUser} /></Link></li>
                        <li><Link className="hyperlink" to={'/'}><FontAwesomeIcon icon={faHeart} /></Link></li>
                        <li><Link className="hyperlink" to={'/'}><FontAwesomeIcon icon={faCartShopping} /></Link></li>
                    </ul>
                </div>
            </div>
            {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}
            <div className={menuOpen ? 'sidebar open' : 'sidebar'}>
                <div className="sidebar-header">
                    <span onClick={() => setMenuOpen(false)}>✖</span>
                </div>
                <ul>
                    <li><Link className="hyperlink" to={'/'}>Home</Link></li>
                    <li><Link className="hyperlink" to={'/'}>Shop</Link></li>
                    <li><Link className="hyperlink" to={'/'}>Blog</Link></li>
                    <li><Link className="hyperlink" to={'/'}>Contact</Link></li>
                </ul>
            </div>
        </>
    )
}