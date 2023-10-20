import React from "react";
import { PiStackBold, PiListBold } from "react-icons/pi";
import { useSnapshot } from "valtio";
import state from "../store";
import { Link } from "react-router-dom";

const Header = () => {
    useSnapshot(state)
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
            {/* {state.user ? state.user : "Usuário Solicita"} */}
            <Link to="/login">
                Logout
            </Link>
        </div>
    </header>;
};

export default Header;
