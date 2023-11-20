import { useState } from "react";
import { AiFillCloseSquare, AiFillDelete } from 'react-icons/ai';
import { deleteCategory, editCategory } from '../FirebaseConfig';
import Spinner from '../components/Spinner';
import ModalMotion from "./ModalMotion";

const CategoriaModal = ({ isOpen, type, value, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [cartegoryId, setCartegoryId] = useState('');

    const data = value
    const info = data.result
    const id = data.id
    return (
        value ? (
            <ModalMotion isOpen={isOpen} onClick={onClose}>
                <div className="modal-item">
                    <AiFillCloseSquare className="button-icon" onClick={onClose} />
                    <h2>{type === 'Edit' ? 'Editar dados da Categoria' : type === 'Delete' ? 'Deletar Categoria' : 'Informações da Categoria'}</h2>

                    {type === 'Edit' && (
                        <form onSubmit={(event) => editCategory(event, id, setLoading, onClose)} className="formContainer licitContainer">
                            <div className="form-field">
                                <p>Nome da Categoria:</p>
                                <textarea rows={1} type="text" name='name' required defaultValue={info.name} />
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
                                        <h3>Tem certeza que deseja excluir essa Categoria?</h3>
                                        <h3>{info.name}</h3>
                                        <div className="buttonContainer center">
                                            <button onClick={() => { deleteCategory(id, onClose, setLoading) }} className="delete">
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
                                <span>Nome da Categoria: </span>
                                <p>{info.name}</p>
                            </div>
                            <div>
                                <span>Id da Categoria: </span>
                                <p>{id}</p>
                            </div>
                        </div>
                    )}
                </div>
            </ModalMotion>
        ) : null
    );
};

export default CategoriaModal;
