import React, { useState } from "react";
import Modal from 'react-modal';
import { AiFillCloseSquare, AiFillDelete } from 'react-icons/ai';

import { deleteClients, deleteDocuments, editClient, updateDocument } from '../FirebaseConfig';
import Spinner from '../components/Spinner';

const ClientesModal = ({ isOpen, type, value, onClose }) => {
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
    const info = data.result
    const id = data.id
    return (
        value ? (
            <Modal overlayClassName="modalOverlay" className="modal" isOpen={isOpen} onRequestClose={onClose} contentLabel="Modal">
                <div className="modal-item">
                    <AiFillCloseSquare className="button-icon" onClick={onClose} />
                    <h2>{type === 'Edit' ? 'Editar Cliente' : type === 'Delete' ? 'Deletar Cliente' : 'Informações do Cliente'}</h2>

                    {type === 'Edit' && (
                        <form onSubmit={(event) => editClient(event, id, setLoading, onClose)} className="formContainer licitContainer">
                            <div className="form-field">
                                <p>Nome do Cliente:</p>
                                <textarea rows={1} type="text" name='clientName' required defaultValue={info.clientName} />
                            </div>
                            <button className="send-button" type="submit">Atualizar</button>
                        </form>
                    )}

                    {type === 'Delete' && (
                        <div className='licitContainer'>
                            {
                                loading ? <Spinner /> :
                                    <>
                                        <h3>Tem certeza que deseja excluir essa Cliente?</h3>
                                        <h3>{info.clientName}</h3>
                                        <div className="buttonContainer center">
                                            <button onClick={() => { deleteClients(id, onClose, setLoading) }} className="delete">
                                                <AiFillDelete /> Excluir
                                            </button>
                                        </div>
                                    </>
                            }
                        </div>
                    )}

                    {type === 'Info' && (
                        <div className="licitContainer">
                            <div>
                                <span>Nome do Cliente: </span>
                                <p>{info.clientName}</p>
                            </div>
                            {/* <div>
                                <span>Data de criação: </span>
                                <p>{convertDate(info.CreatedAT)}</p>
                            </div> */}
                        </div>
                    )}
                </div>
            </Modal>
        ) : null
    );
};

export default ClientesModal;
