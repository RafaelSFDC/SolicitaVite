import React, { useEffect, useState } from "react";
import state from '../store/index'
import { AiFillDelete, AiFillInfoCircle, AiFillEdit, AiFillCloseSquare } from "react-icons/ai";
import { deleteDocuments, updateDocument } from "../FirebaseConfig";
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

    return (
        <div className="container">
            <ClientesModal
                isOpen={modal}
                type={type}
                value={info}
                onClose={modalToggle}
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
                                        <p>Nome do cliente: {result.clientName}</p>
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
