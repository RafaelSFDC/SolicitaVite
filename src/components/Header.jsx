import React from "react";
import { PiStackBold, PiListBold } from "react-icons/pi";

const Header = () => {
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
            Usuário Solicita
            <button>Logout</button>
        </div>
    </header>;
};

export default Header;
