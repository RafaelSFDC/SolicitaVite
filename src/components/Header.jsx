import React from "react";
import { PiStackBold, PiListBold } from "react-icons/pi";
import { useSnapshot } from "valtio";
import state from "../store";

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
            {state.user ? state.user : "Usuário Solicita"}
            <button>Logout</button>
        </div>
    </header>;
};

export default Header;
