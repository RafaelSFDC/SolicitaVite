import React, { useState } from 'react';
import Modal from 'react-modal';
import { AiFillCloseSquare, AiFillDelete, AiOutlineDownload } from 'react-icons/ai';
import { FaDownload } from "react-icons/fa";

import { deleteDocuments, updateDocument } from '../FirebaseConfig';
import { Link } from 'react-router-dom';
import SelectClient from '../components/SelectClient';
import Spinner from '../components/Spinner';

Modal.setAppElement('#root'); // Configura o elemento raiz para o modal

const LicitationInfoModal = ({ isOpen, type, value, onClose, }) => {
    const [loading, setLoading] = useState(false);
    if (!value) {
        return null; // Retorna null se value não existir
    }
    const data = value
    const info = data.result
    const id = data.id

    function convertDate(createdAt) {
        if (!createdAt || !createdAt.seconds || !createdAt.nanoseconds) {
            return null;
        }

        const milliseconds = createdAt.seconds * 1000 + Math.round(createdAt.nanoseconds / 1e6);
        const date = new Date(milliseconds);
        return date.toLocaleString(); // Você pode ajustar o formato conforme necessário
    }

    return (
        value ? (
            <Modal overlayClassName="modalOverlay" className="modal" isOpen={isOpen} onRequestClose={onClose} contentLabel="Modal">
                <div className="modal-item">
                    <AiFillCloseSquare className="button-icon" onClick={onClose} />
                    <h2>{type === 'Edit' ? 'Editar Licitação' : type === 'Delete' ? 'Deletar Licitação' : 'Informações'}</h2>

                    {type === 'Edit' && (
                        <form onSubmit={(event) => updateDocument(event, id, onClose)} className="formContainer licitContainer">
                            <div className="form-field">
                                <p>Nome da Licitação:</p>
                                <textarea rows={1} type="text" name='ListName' required defaultValue={info.ListName} />
                            </div>
                            <div className="form-field">
                                <p>Titulo</p>
                                <textarea rows={1} name="Title" type="text" required defaultValue={info.Title} />
                            </div>
                            <div className="form-field">
                                <p>Nome do Solicitante:</p>
                                <SelectClient defaultValue={info.Name} />
                            </div>
                            <div className="form-field">
                                <p>Descrição da Solicitação:</p>
                                <textarea rows={1} name="Desc" type="text" required defaultValue={info.Desc} />
                            </div>
                            <div className="form-field">
                                <p>Observações:</p>
                                <textarea rows={1} name="observ" type="text" required defaultValue={info.observ} />
                            </div>
                            <div className="form-field">
                                <p>Data de entrega:</p>
                                <input className='date' type="date" name="Date" id="" required defaultValue={info.Date} />
                            </div>
                            <button className="send-button" type="submit">Atualizar</button>
                        </form>
                    )}

                    {type === 'Delete' && (
                        <div className='licitContainer'>
                            {
                                loading ? <Spinner /> :
                                    <>
                                        <h3>Tem certeza que deseja excluir essa licitação?</h3>
                                        <h3>{info.ListName}</h3>
                                        <div className="buttonContainer center">
                                            <button onClick={() => { deleteDocuments(id, onClose, setLoading) }} className="delete">
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
                                <span>Lista: </span>
                                <p>{info.ListName}</p>
                            </div>
                            <div>
                                <span>Data de criação: </span>
                                <p>{convertDate(info.CreatedAT)}</p>
                            </div>
                            <div>
                                <span>Titulo: </span>
                                <p>{info.Title}</p>
                            </div>
                            <div>
                                <span>Nome do Solicitante: </span>
                                <p>{info.Name}</p>
                            </div>
                            <div>
                                <span>Email: </span>
                                <p>{info.Email}</p>
                            </div>
                            <div>
                                <span>Observações: </span>
                                <p>{info.observ ? info.observ : "Nenhuma"}</p>
                            </div>
                            <div>
                                <span>Descrição: </span>
                                <p>{info.Desc}</p>
                            </div>
                            <div>
                                <span>Data limite de entrega: </span>
                                <p>{info.Date}</p>
                            </div>
                            <div>
                                <span>Titulo: </span>
                                <p>{info.Title}</p>
                            </div>
                            <div>
                                <span>Edital: </span>
                                {info.Edital ?
                                    <Link to={info.Edital} download>
                                        <FaDownload /> Baixar Edital
                                    </Link>
                                    : <p>Nenhum Edital</p>}
                            </div>
                        </div>
                    )}
                </div>
            </Modal>
        ) : null
    );
};

export default LicitationInfoModal;
