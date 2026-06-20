import { Outlet } from "react-router-dom";
import Topbar from "../components/topbar/Topbar";
import Navbar from "../components/navbar/Navbar";
import BottomBar from "../components/bottomBar/BottomBar";

export default function UserLayout() {
    return (
        <>
            <Topbar />
            <Navbar />
            <Outlet />
            <BottomBar />
        </>
    )
}