import React, { useEffect, useState } from "react";
import state from '../store/index'
import { AiFillDelete, AiFillInfoCircle, AiFillEdit, AiFillCloseSquare } from "react-icons/ai";
import { useSnapshot } from "valtio";
import determineActivePage from "../hooks/Functions";
import ClientesModal from './../modals/ClientesModal';


const Clientes = () => {
    const snap = useSnapshot(state);
    const clients = JSON.parse(JSON.stringify(snap.Clients))

    const [modal, setModal] = useState(false);
    const [info, setInfo] = useState("");
    const [type, setType] = useState("");

    const modalToggle = (index) => {
        setModal(!modal)
        if (index !== null && index !== undefined) {
            setInfo(clients[index]);
        }
        console.log("index: ", index)
        console.log("index refernce: ", clients[index])
        console.log(info)
    };
    useEffect(() => {
        determineActivePage()
    }, []);

    return (
        <div className="container">
            <ClientesModal
                isOpen={modal}
                type={type}
                value={info}
                onClose={() => modalToggle(null)}
            />
            <div className="containerContent">
                <h1 className="contentHeader">Lista de Empresas</h1>
                <div className="contentBody">
                    {<ul className="listContainer">
                        {clients.map((item, index) => {
                            const id = item.id
                            const result = item.result
                            return (
                                <li key={id} className="list-container">
                                    <div className="licit-container">
                                        <p>Nome da Empresa: {result.clientName}</p>
                                    </div>
                                    <div className="buttonContainer">
                                        <button className="edit" onClick={() => { modalToggle(index); setType("Edit") }} >
                                            <AiFillEdit /> <p>Editar</p>
                                        </button>
                                        <button onClick={() => { modalToggle(index); setType("Delete") }} className="delete">
                                            <AiFillDelete /> <p>Deletar</p>
                                        </button>
                                        <button onClick={() => { modalToggle(index); setType("Info"); }} className="info">
                                            <AiFillInfoCircle /> <p>Informações</p>
                                        </button>
                                    </div>
                                </li>

                            )
                        })}
                    </ul>}
                </div>

            </div>
        </div>
    )
};

export default Clientes;
