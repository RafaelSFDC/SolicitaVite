import React, { useState } from "react";
import Modal from 'react-modal';
import { AiFillCloseSquare, AiFillDelete } from 'react-icons/ai';

import { deleteClients, editClient, } from '../FirebaseConfig';
import Spinner from '../components/Spinner';
import SelectCategory from './../components/SelectCategory';

const ClientesModal = ({ isOpen, type, value, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [cartegoryId, setCartegoryId] = useState('');

    const data = value
    const info = data.result
    const id = data.id
    return (
        value ? (
            <Modal overlayClassName="modalOverlay" className="modal" isOpen={isOpen} onRequestClose={onClose} contentLabel="Modal">
                <div className="modal-item">
                    <AiFillCloseSquare className="button-icon" onClick={onClose} />
                    <h2>{type === 'Edit' ? 'Editar dados da Empresa' : type === 'Delete' ? 'Deletar Empresa' : 'Informações da Empresa'}</h2>

                    {type === 'Edit' && (
                        <form onSubmit={(event) => editClient(event, id, setLoading, onClose)} className="formContainer licitContainer">
                            <div className="form-field">
                                <p>Nome da Empresa:</p>
                                <textarea rows={1} type="text" name='clientName' required defaultValue={info.clientName} />
                            </div>
                            <div className="form-field">
                                <p>CNPJ:</p>
                                <textarea rows={1} type="text" name='CNPJ' required defaultValue={info.CNPJ} />
                            </div>
                            <div className="form-field">
                                <p>E-mail:</p>
                                <textarea rows={1} type="text" name='email' required defaultValue={info.email} />
                            </div>
                            <div className="form-field">
                                <p>Telefone:</p>
                                <textarea rows={1} type="text" name='tel' defaultValue={info.tel} />
                            </div>
                            <div className="form-field">
                                <p>Celular / Whatsapp:</p>
                                <textarea rows={1} type="text" name='cel' defaultValue={info.cel} />
                            </div>
                            <div className="form-field">
                                <p>CEP:</p>
                                <textarea rows={1} type="text" name='cep' defaultValue={info.cep} />
                            </div>
                            <div className="form-field">
                                <p>Categoria:</p>
                                <SelectCategory defaultValue={info.Name} required={false} />
                            </div>
                            {/* Campo oculto para armazenar o ID selecionado */}
                            <input type="hidden" name="CategoryId" value={cartegoryId} />
                            <button className="send-button" type="submit">Atualizar</button>
                        </form>
                    )}

                    {type === 'Delete' && (
                        <div className='licitContainer'>
                            {
                                loading ? <Spinner /> :
                                    <>
                                        <h3>Tem certeza que deseja excluir essa Empresa?</h3>
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
                                <span>Nome da Empresa: </span>
                                <p>{info.clientName}</p>
                            </div>
                            <div>
                                <span>CNPJ: </span>
                                <p>{info.CNPJ}</p>
                            </div>
                            <div>
                                <span>E-mail: </span>
                                <p>{info.email}</p>
                            </div>
                            <div>
                                <span>Telefone: </span>
                                <p>{info.tel ? info.tel : "Nenhum Telefone Cadastrado"}</p>
                            </div>
                            <div>
                                <span>Celular / Whatsapp: </span>
                                <p>{info.cel ? info.cel : "Nenhum Celular Cadastrado"}</p>
                            </div>
                            <div>
                                <span>CEP: </span>
                                <p>{info.cep ? info.cep : "Nenhum Cep Cadastrado"}</p>
                            </div>
                            <div>
                                <span>Categoria: </span>
                                <p>{info.Name ? info.Name : "Nenhum Categoria Cadastrada"}</p>
                            </div>
                        </div>
                    )}
                </div>
            </Modal>
        ) : null
    );
};

export default ClientesModal;
