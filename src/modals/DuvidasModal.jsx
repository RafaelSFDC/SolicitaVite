import { useState } from "react";
import { AiFillCloseSquare, AiFillDelete } from 'react-icons/ai';
import { deleteClients, deleteQuestion, editClient, editQuestion, } from '../FirebaseConfig';
import Spinner from '../components/Spinner';
import SelectCategory from './../components/SelectCategory';
import ModalMotion from "./ModalMotion";

const DuvidasModal = ({ isOpen, type, value, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [cartegoryId, setCartegoryId] = useState('');

    const data = value
    const info = data.result
    const id = data.id
    function formatDate(CreatedAT) {
        const { seconds, nanoseconds } = CreatedAT;

        // Converter para milissegundos
        const timestamp = seconds * 1000 + Math.floor(nanoseconds / 1e6);

        // Criar um objeto de data
        const data = new Date(timestamp);

        // Formatar a data para o formato desejado (DD/MM/YYYY HH:mm:ss)
        const dataFormatada = `${data.toLocaleDateString('pt-BR')} ${data.toLocaleTimeString('pt-BR')}`;

        return dataFormatada;
    }
    return (
        value ? (
            <ModalMotion isOpen={isOpen} onClick={onClose}>
                <div className="modal-item">
                    <AiFillCloseSquare className="button-icon" onClick={onClose} />
                    <h2>{type === 'Edit' ? 'Editar status da dúvida' : type === 'Delete' ? 'Deletar Dúvida' : 'Informações da dúvida'}</h2>

                    {type === 'Edit' && (
                        <form onSubmit={(event) => editQuestion(event, id, setLoading, onClose)} className="formContainer licitContainer">
                            <div className="form-field">
                                <p>Status:</p>
                                <select name="Status" id="Status" defaultValue={info.Status} required>
                                    <option value="Aberto">Aberto</option>
                                    <option value="Em Analise">Em Análise</option>
                                    <option value="Fechado">Fechado</option>
                                </select>
                            </div>
                            <div className="form-field">
                                <p>Responder:</p>
                                <textarea rows={1} type="text" name='Response' defaultValue={info.Response ? info.Response : ''} />
                            </div>
                            <button className="send-button" type="submit">Atualizar</button>
                        </form>
                    )}

                    {type === 'Delete' && (
                        <div className='licitContainer'>
                            {
                                loading ? <Spinner /> :
                                    <>
                                        <h3>Tem certeza que deseja excluir essa Dúvida?</h3>
                                        <h3>Licitação: {info.Licit}</h3>
                                        <h3>Usuário: {info.User}</h3>
                                        <div className="buttonContainer center">
                                            <button onClick={() => { deleteQuestion(id, onClose) }} className="delete">
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
                                <span>Licitação: </span>
                                <p>{info.Licit}</p>
                            </div>
                            <div>
                                <span>Usuário: </span>
                                <p>{info.User}</p>
                            </div>
                            <div>
                                <span>Status: </span>
                                <p>{info.Status}</p>
                            </div>
                            <div>
                                <span>Email de contato: </span>
                                <p>{info.Email}</p>
                            </div>
                            <div>
                                <span>Celular / Whatsapp: </span>
                                <p>{info.cel ? info.cel : "Nenhum Celular Cadastrado"}</p>
                            </div>
                            <div>
                                <span>Criado em: </span>
                                <p>{formatDate(info.CreatedAT)}</p>
                            </div>
                            <div>
                                <span>Dúvida: </span>
                                <p>{info.Question}</p>
                            </div>
                        </div>
                    )}
                </div>
            </ModalMotion>
        ) : null
    );
};

export default DuvidasModal;
