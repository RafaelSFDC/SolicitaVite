import { useEffect, useState } from 'react';
import { AiFillCloseSquare, AiFillDelete, } from 'react-icons/ai';
import { FaDownload, FaFilePdf } from "react-icons/fa";
import { deleteDocuments, updateDocument } from '../FirebaseConfig';
import { Link } from 'react-router-dom';
import SelectClient from '../components/SelectClient';
import Spinner from '../components/Spinner';
import ModalMotion from './ModalMotion';
const LicitationInfoModal = ({ isOpen, type, value, onClose, }) => {
    const [loading, setLoading] = useState(false);
    const [edital, setEdital] = useState('Nenhum arquivo selecionado');
    const data = value || { result: "", id: "" }
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


    const handleFileChange = (event) => {
        const arquivoSelecionado = event.target.files[0];

        if (arquivoSelecionado) {
            const extensoesPermitidas = ['pdf', 'doc', 'docx'];
            const extensao = arquivoSelecionado.name.split('.').pop().toLowerCase();

            if (extensoesPermitidas.includes(extensao)) {
                setEdital(arquivoSelecionado.name);
            } else {
                alert('Por favor, selecione um arquivo PDF ou do Word.');
                event.target.value = null;  // Limpa a seleção do arquivo
                setEdital('Nenhum arquivo selecionado');
            }
        } else {
            setEdital('Nenhum arquivo selecionado');
        }
    };

    return (
        value ? (
            <ModalMotion isOpen={isOpen} onClick={onClose}>
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
                                <p>Nome da Empresa:</p>
                                <SelectClient defaultValue={info.ClientName} />
                            </div>
                            <div className="form-field">
                                <p>Descrição da Solicitação:</p>
                                <textarea rows={1} name="Desc" type="text" defaultValue={info.Desc} />
                            </div>
                            <div className="form-field">
                                <p>Observações:</p>
                                <textarea rows={1} name="observ" type="text" defaultValue={info.observ} />
                            </div>
                            <div className="form-field">
                                <p>Data de entrega:</p>
                                <input className='date' type="date" name="Date" id="" required defaultValue={info.Date} />
                            </div>
                            <div className="form-field">
                                <p>Edital</p>
                                <div className="customInput">
                                    <label htmlFor="Edital">
                                        <span><FaFilePdf /> Selecione o Edital</span>
                                        <p>Arquivo selecionado: {edital}</p>
                                        <input type="file" name="Edital" id="Edital" accept=".pdf, .doc, .docx" onChange={handleFileChange} />
                                    </label>
                                </div>
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
                                <span>Nome da Empresa: </span>
                                <p>{info.ClientName}</p>
                            </div>
                            <div>
                                <span>Categoria: </span>
                                <p>{info.Category}</p>
                            </div>
                            <div>
                                <span>Observações: </span>
                                <p>{info.observ ? info.observ : "Nenhuma"}</p>
                            </div>
                            <div>
                                <span>Descrição: </span>
                                <p>{info.Desc ? info.Desc : "Nenhuma"}</p>
                            </div>
                            <div>
                                <span>Data limite de entrega: </span>
                                <p>{info.Date}</p>
                            </div>
                            <div>
                                <span>Edital: </span>
                                {info.Edital ?
                                    <Link to={info.Edital} download target="_blank">
                                        <FaDownload /> Baixar Edital
                                    </Link>
                                    : <p>Nenhum Edital</p>}
                            </div>
                        </div>
                    )}
                </div>
            </ModalMotion>
        ) : null
    );
};

export default LicitationInfoModal;
