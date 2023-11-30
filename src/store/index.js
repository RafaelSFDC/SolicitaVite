import { proxy } from "valtio";

const state = proxy({
    logged: "false",
    component: "",
    lists: [],
    aveliableTasks: [],
    id: [],
    licit: [],
    SideBar: true,
    modal: false,
    activeEdit: [],
    user: "",
    modalInfo: false,
    modalEdit: false,
    modalDelete: false,
    modalResult: false,
    Clients: [],
    Questions: [],
    message: "",
    permission: "",
    activePage: "/",
});

export default state;
