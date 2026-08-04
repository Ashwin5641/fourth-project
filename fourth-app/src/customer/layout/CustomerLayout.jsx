import { Outlet } from "react-router-dom";

import Topbar from "../components/topbar/Topbar";
import Navbar from "../components/navbar/Navbar";
import BottomBar from "../components/bottomBar/BottomBar";

export default function CustomerLayout() {
    return (
        <div className="customer-layout">
            <Topbar />
            <Navbar />
            <Outlet />
            <BottomBar />
        </div>
    )
}