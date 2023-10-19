import React, { useEffect, useState } from "react";
import { AiFillDelete, AiFillInfoCircle, AiFillEdit, AiFillCloseSquare } from "react-icons/ai";
import { PiTrashBold } from "react-icons/pi";
import state from "../store";
import { getUser, updateUser } from "../FirebaseConfig";
import { ColorRing } from 'react-loader-spinner'
import { DeleteTheUser, GetTheUsers } from "../hooks/AxiosHandler";
import Resultado from "../modals/Resultado";
import determineActivePage from "../hooks/Functions";
DeleteTheUser

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalInfo, setModalInfo] = useState(false);
    const [modalResult, setModalResult] = useState(false);
    const [modalResultValue, setModalResultValue] = useState("Valor");

    const modalHandler = () => {
        setModalIsOpen(false)
        setModalEdit(false)
        setModalResult(false)
        setModalDelete(false)
        setModalInfo(false)
    }

    const modalPopup = (modalOpen, id, email) => {
        modalHandler()
        modalOpen(true)
        getUser(id, email, setUserInfo, setModalIsOpen)
    }

    const modalResultHandler = (info) => {
        setModalResult(true)
        setModalResultValue(info)
    }

    const [modal, setModal] = useState(true); // Altere para false se deseja abrir o modal por ação do usuário
    const method = 'create';  // Altere conforme necessário ('edit', 'delete')
    const type = 'task';  // Altere conforme necessário ('usuario', 'task', 'client')

    const closeModal = () => {
        setModal(false);
        console.log("closingModal")
    };


    useEffect(() => {
        // Faz a requisição para o servidor para obter a lista de usuários
        GetTheUsers(setUsers, setLoading)
        console.log("getting users")
        determineActivePage()
    }, []);

    const timeStamp = (time) => {
        const timeformat = time.seconds
        const dateFormat = new Date(timeformat * 1000)
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute: "numeric", second: "numeric" };
        const finalDate = dateFormat.toLocaleDateString(undefined, options)
        return (finalDate)
    }



    return (
        <div className="container">
            {/* MODALS */}
            {modalIsOpen ?
                <div className={`modal ${state.SideBar ? "sidebar-active" : ""}`}>
                    {modalEdit ? <div className="modal-item">
                        <button className="close-modal-button" onClick={() => { modalHandler() }}> <AiFillCloseSquare className="button-icon" /></button>
                        <h2>Editar Usuário</h2>
                        <form onSubmit={(e) => { updateUser(e, userInfo.id); modalHandler(); modalResultHandler(" editado com sucesso!") }} className="form modal-form">
                            <div className="form-field">
                                <p>Nome de Usuário</p>
                                <input type="text" required defaultValue={userInfo.user} />
                            </div>
                            <div className="form-field">
                                <p>Senha</p>
                                <input type="password" required defaultValue={""} />
                            </div>
                            <button className="send-button" type="submit">Atualizar</button>
                        </form>
                    </div> : null}
                    {modalDelete ? <div className="modal-item delete">
                        <button className="close-modal-button" onClick={() => modalHandler()}> <AiFillCloseSquare className="button-icon" /></button>
                        <h2>Deletar Usuário</h2>
                        <h3>Tem certeza que deseja excluir esse  Usuário?</h3>
                        <h3>{userInfo.user}</h3>
                        <div className="button-container">
                            <button onClick={() => { DeleteTheUser(userInfo.id); modalHandler(); modalResultHandler("deletado com sucesso!") }} className="delete"><AiFillDelete /> <p>Deletar</p></button>
                        </div>
                    </div> : null}
                    {modalInfo ?
                        <div className="modal-item">

                            <button className="close-modal-button" onClick={() => modalHandler()}> <AiFillCloseSquare className="button-icon" /></button>
                            <h2>Informações</h2>
                            <div className="licit-container">
                                <div>
                                    <span>Usuário: </span>
                                    <p>{userInfo.user}</p>
                                </div>
                                <div>
                                    <span>Email: </span>
                                    <p>{userInfo.email}</p>
                                </div>
                                <div>
                                    <span>Criado em: </span>
                                    <p>{timeStamp(userInfo.data)}</p>
                                </div>
                            </div>
                        </div> : null}
                </div>
                : null}
            {/* MODAL RESULT */}
            {modalResult ?
                <div className={`modal ${state.SideBar ? "sidebar-active" : ""}`}>
                    <div className="modal-item">
                        <button className="close-modal-button" onClick={() => { modalHandler(); GetTheUsers(setUsers, setLoading) }}> <AiFillCloseSquare className="button-icon" /></button>
                        <h2>Usuário {modalResultValue} </h2>
                    </div>
                </div>
                : null}
            <Resultado isOpen={modal} onClose={closeModal} method={method} type={type} />
            <div className="containerContent">
                <div className="contentHeader">Usuários</div>
                <div className="contentBody">
                    <div className="listContainer">
                        {loading ? <ColorRing
                            visible={true}
                            height="120"
                            width="120"
                            ariaLabel="blocks-loading"
                            wrapperStyle={{}}
                            wrapperClass="blocks-wrapper"
                            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                        /> : <ul className="listContainer">
                            {console.log("usuarios: ", users)}
                            {users.map(user => {
                                const id = user.uid
                                const email = user.email
                                return (
                                    <li key={id}>
                                        <p>{email}</p>
                                        <div className="buttonContainer">
                                            <button className="edit" onClick={() => modalPopup(setModalEdit, id, email)} ><AiFillEdit /> <p>Editar</p></button>
                                            <button onClick={() => modalPopup(setModalDelete, id, email)} className="delete"><PiTrashBold /> <p>Deletar</p></button>
                                            <button onClick={() => modalPopup(setModalInfo, id, email)} className="info"><AiFillInfoCircle /> <p>Informações</p></button>
                                        </div>
                                    </li>

                                )
                            })}
                        </ul>}
                    </div>
                </div>
            </div>

        </div>
    )
};

export default Users;
