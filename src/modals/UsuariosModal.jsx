import React, { useState } from "react";
import Modal from 'react-modal';
import { AiFillCloseSquare, AiFillDelete } from 'react-icons/ai';

import { deleteClients, editUser } from '../FirebaseConfig';
import Spinner from '../components/Spinner';
import { DeleteTheUser } from "../hooks/AxiosHandler";

const UsuariosModal = ({ isOpen, type, value, onClose, setReload, userInfo }) => {
    const [loading, setLoading] = useState(false);
    if (!value) {
        return null; // Retorna null se value não existir
    }

    function convertDate(createdAt) {
        if (!createdAt || !createdAt.seconds || !createdAt.nanoseconds) {
            return null;
        }

        const milliseconds = createdAt.seconds * 1000 + Math.round(createdAt.nanoseconds / 1e6);
        const date = new Date(milliseconds);
        return date.toLocaleString(); // Você pode ajustar o formato conforme necessário
    }
    const data = value
    const user = userInfo
    console.log("A data: ", data)
    return (
        value ? (
            <Modal overlayClassName="modalOverlay" className="modal" isOpen={isOpen} onRequestClose={onClose} contentLabel="Modal">
                <div className="modal-item">
                    <AiFillCloseSquare className="button-icon" onClick={onClose} />
                    <h2>{type === 'Edit' ? 'Editar Usuário' : type === 'Delete' ? 'Deletar Usuário' : 'Informações do Usuário'}</h2>

                    {type === 'Edit' && (
                        <form onSubmit={(event) => editUser(event, data.id, setReload, onClose)} className="formContainer licitContainer">
                            <div className="form-field">
                                <p>Nome de Usuario:</p>
                                <textarea rows={1} type="text" name='user' required defaultValue={user.displayName} />
                            </div>
                            <div className="form-field">
                                <p>Tipo de Usuário</p>
                                <select name="permission" defaultValue={data.permission ? data.permission : ""} required>
                                    <option value="" disabled>Selecione o nivel de Permissão</option>
                                    <option value="Usuario">Usuario</option>
                                    <option value="Editor">Editor</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                            <div className="form-field">
                                <p>Senha:</p>
                                <input name="password" type="password" />
                            </div>
                            <button className="send-button" type="submit">Atualizar</button>
                        </form>
                    )}

                    {type === 'Delete' && (
                        <div className='licitContainer'>
                            <h3>Tem certeza que deseja excluir esse Usuário?</h3>
                            <h3>{data.user}</h3>
                            <div className="buttonContainer center">
                                <button onClick={() => { DeleteTheUser(data.id, onClose, setReload) }} className="delete">
                                    <AiFillDelete /> Excluir
                                </button>
                            </div>
                        </div>
                    )}

                    {type === 'Info' && (
                        <div className="licitContainer">
                            <div>
                                <span>Usuário: </span>
                                <p>{user.displayName}</p>
                            </div>
                            <div>
                                <span>Nivel de Permissão: </span>
                                <p>{data.permission}</p>
                            </div>
                            <div>
                                <span>Data de criação: </span>
                                <p>{convertDate(data.data)}</p>
                            </div>
                            <div>
                                <span>Email: </span>
                                <p>{user.email}</p>
                            </div>
                        </div>
                    )}
                </div>
            </Modal>
        ) : null
    );
};

export default UsuariosModal;
