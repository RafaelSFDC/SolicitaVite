import React, { useEffect } from "react";
import state from '../store/index'
import { AiFillDelete, AiFillInfoCircle, AiFillEdit, AiFillCloseSquare } from "react-icons/ai";
import { deleteDocuments, updateDocument } from "../FirebaseConfig";
import { useSnapshot } from "valtio";
import determineActivePage from "../hooks/Functions";


const Clientes = () => {
    const snap = useSnapshot(state);
    const clients = JSON.parse(JSON.stringify(snap.Clients))
    const timeStamp = (time) => {
        const timeformat = time.seconds
        const dateFormat = new Date(timeformat * 1000)
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute: "numeric", second: "numeric" };
        const finalDate = dateFormat.toLocaleDateString(undefined, options)
        return (finalDate)
    }
    function formatDate(date) {
        const formattedDate = new Date(date);
        const day = String(formattedDate.getDate()).padStart(2, '0');
        const month = String(formattedDate.getMonth() + 1).padStart(2, '0'); // Mês é base 0
        const year = formattedDate.getFullYear();
        return `${day}/${month}/${year}`;
    }

    useEffect(() => {
        determineActivePage()
    }, []);

    return <div className="container">
        <div className="containerContent">
            <h1 className="contentHeader">Lista de Clientes</h1>
            <div className="contentBody">
                {<ul className="listContainer">
                    {clients.map((item) => {
                        const id = item.id
                        const result = item.result
                        return (
                            <li key={id} className="list-container">
                                <div className="licit-container">
                                    <p>Nome do cliente: {result.clientName}</p>
                                </div>
                                <div className="button-container">
                                    {/* <button className="edit" onClick={() => { modalPopup(item); state.modalEdit = !state.modalEdit }} ><AiFillEdit /> <p>Editar</p></button>
                            <button onClick={() => { modalPopup(item); state.modalDelete = !state.modalDelete }} className="delete"><AiFillDelete /> <p>Deletar</p></button>
                            <button onClick={() => { modalPopup(item); state.modalInfo = !state.modalInfo }} className="info"><AiFillInfoCircle /> <p>Informações</p></button> */}
                                </div>
                            </li>

                        )
                    })}
                </ul>}
            </div>

        </div>

    </div>;
};

export default Clientes;
