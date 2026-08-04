import { useState } from "react";
import './topbar.css'

import '@fontsource/outfit';
import '@fontsource/outfit/500.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

export default function Topbar() {
    return (
        <div className="topbar">
            <div className="topbar-contact">
                <FontAwesomeIcon icon={faPhone} />
                <p>(+91) 98765 43210</p>
            </div>
            <div className="topbar-return">
                <p>Free shipping, 30-day return or refund guarantee.</p>
            </div>
        </div>
    )
}