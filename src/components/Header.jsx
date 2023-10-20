import React from "react";
import { PiStackBold, PiListBold } from "react-icons/pi";
import { useSnapshot } from "valtio";
import state from "../store";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../FirebaseConfig";

const Header = () => {
    const navigate = useNavigate()
    useSnapshot(state)
    const user = JSON.parse(JSON.stringify(state.user))
    const sidebarToggle = () => {
        const sidebar = document.querySelector(".sidebar");
        sidebar.classList.toggle("closed");
    }
    return <header>
        <div className="left" onClick={() => sidebarToggle()}><PiListBold /></div>
        <div className="center">
            <PiStackBold />
            Painel Solicita
        </div>
        <div className="right">
            {user.displayName ? user.displayName : "Solicita Admin"}
            <Link to="/login" onClick={() => logOut()}>
                Logout
            </Link>
        </div>
    </header>;
};

export default Header;
