import React from "react";
import { PiListChecksBold, PiListPlusBold, PiUsersBold, PiUserCirclePlusBold } from "react-icons/pi";
import { BsFileEarmarkPersonFill, BsPersonCheckFill } from "react-icons/bs";
import { TbCategory, TbCategoryPlus } from "react-icons/tb";

import state from "../store";
import { Link } from "react-router-dom";
import { useSnapshot } from "valtio";

const Sidebar = () => {
    useSnapshot(state)
    console.log(state.activePage)
    return (
        <div className={"sidebar"}>
            <div>
                <Link to="/aveliable" className={state.activePage === "/aveliable" ? "sidebarLinks active" : "sidebarLinks"}>
                    <PiListChecksBold />
                    <p>Licitações Disponiveis</p>
                </Link>
            </div>
            <div>
                <Link to="/create" className={state.activePage === "/create" ? "sidebarLinks active" : "sidebarLinks"}>
                    <PiListPlusBold />
                    <p>Criar Licitação</p>
                </Link>
            </div>
            <div>
                <Link to="/users" className={state.activePage === "/users" ? "sidebarLinks active" : "sidebarLinks"}>
                    <PiUsersBold />
                    <p>Usuários</p>
                </Link>
            </div>
            <div>
                <Link to="/createUsers" className={state.activePage === "/createUsers" ? "sidebarLinks active" : "sidebarLinks"}>
                    <PiUserCirclePlusBold />
                    <p>Adicionar Usuários</p>
                </Link>
            </div>
            <div>
                <Link to="/clients" className={state.activePage === "/clients" ? "sidebarLinks active" : "sidebarLinks"}>
                    <BsFileEarmarkPersonFill />
                    <p>Empresas</p>
                </Link>
            </div>
            <div>
                <Link to="/addClients" className={state.activePage === "/addClients" ? "sidebarLinks active" : "sidebarLinks"}>
                    <BsPersonCheckFill />
                    <p>Adicionar Empresas</p>
                </Link>
            </div>
            <div>
                <Link to="/category" className={state.activePage === "/category" ? "sidebarLinks active" : "sidebarLinks"}>
                    <TbCategory />
                    <p>Categorias</p>
                </Link>
            </div>
            <div>
                <Link to="/addCategory" className={state.activePage === "/addCategory" ? "sidebarLinks active" : "sidebarLinks"}>
                    <TbCategoryPlus />
                    <p>Adicionar Categorias</p>
                </Link>
            </div>
        </div>
    )
};

export default Sidebar;
