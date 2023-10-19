import React from "react";
import { PiListChecksBold, PiListPlusBold, PiUsersBold, PiUserCirclePlusBold } from "react-icons/pi";
import { BsFileEarmarkPersonFill, BsPersonCheckFill } from "react-icons/bs";
import state from "../store";
import { Link } from "react-router-dom";
import { useSnapshot } from "valtio";

const Sidebar = () => {
    useSnapshot(state)
    console.log(state.activePage)
    return (
        <div className={"sidebar"}>
            <div>
                <Link to="/" className={state.activePage === "/" ? "sidebarLinks active" : "sidebarLinks"}>
                    <PiListChecksBold />
                    Licitações Disponiveis
                </Link>
            </div>
            <div>
                <Link to="/create" className={state.activePage === "/create" ? "sidebarLinks active" : "sidebarLinks"}>
                    <PiListPlusBold />
                    Criar Licitação
                </Link>
            </div>
            <div>
                <Link to="/users" className={state.activePage === "/users" ? "sidebarLinks active" : "sidebarLinks"}>
                    <PiUsersBold />
                    Usuários
                </Link>
            </div>
            <div>
                <Link to="/createUsers" className={state.activePage === "/createUsers" ? "sidebarLinks active" : "sidebarLinks"}>
                    <PiUserCirclePlusBold />
                    Adicionar Usuários
                </Link>
            </div>
            <div>
                <Link to="/clients" className={state.activePage === "/clients" ? "sidebarLinks active" : "sidebarLinks"}>
                    <BsFileEarmarkPersonFill />
                    Clientes
                </Link>
            </div>
            <div>
                <Link to="/addClients" className={state.activePage === "/addClients" ? "sidebarLinks active" : "sidebarLinks"}>
                    <BsPersonCheckFill />
                    Adicionar Clientes
                </Link>
            </div>
        </div>
    )
};

export default Sidebar;
