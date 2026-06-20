import { useState } from "react";
import { Link } from "react-router-dom";
import './bottombar.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFontAwesome } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faHome, faUser } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";


export default function BottomBar() {

    return (
        <div className="bottomBar">
            <ul>
                <li><Link to={'/'} className="hyperlink"><FontAwesomeIcon icon={faHome} /></Link></li>
                <li><Link to={'/'} className="hyperlink"><FontAwesomeIcon icon={faHeart} /></Link></li>
                <li><Link to={'/profile'} className="hyperlink"><FontAwesomeIcon icon={faUser} /></Link></li>
                <li><Link to={'/'} className="hyperlink"><FontAwesomeIcon icon={faCartShopping} /></Link></li>
            </ul>
        </div>
    )
}