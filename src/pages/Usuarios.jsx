import React, { useEffect, useState } from "react";
import { AiFillDelete, AiFillInfoCircle, AiFillEdit, } from "react-icons/ai";
import { getUser } from "../FirebaseConfig";
import { ColorRing } from 'react-loader-spinner'
import { GetTheUsers } from "../hooks/AxiosHandler";
import determineActivePage from "../hooks/Functions";
import UsuariosModal from './../modals/UsuariosModal';

const Usuarios = () => {
    const [users, setUsers] = useState([]);
    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [info, setInfo] = useState("");
    const [userInfo, setUserInfo] = useState("");
    const [type, setType] = useState("");

    const modalToggle = (index) => {
        if (index != null) {
            getUser(users[index], setInfo, setLoading, setModal)
            setUserInfo(users[index])
        }
        else {
            setModal(!modal)
        }
    };

    useEffect(() => {
        setReload(false)
        // Faz a requisição para o servidor para obter a lista de usuários
        GetTheUsers(setUsers, setLoading)
        determineActivePage()
    }, [reload]);
    return (
        <div className="container">
            <UsuariosModal isOpen={modal} onClose={() => modalToggle()} userInfo={userInfo} value={info} type={type} setReload={setReload} />
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
                            {users.map((user, index) => {
                                console.log(user)
                                const id = user.uid
                                const email = user.email
                                return (
                                    <li key={id}>
                                        <p> Nome do Usuário: {user.displayName}</p>
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

        </div>
    )
};

export default Usuarios;
