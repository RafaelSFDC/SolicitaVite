import { useEffect, useState } from "react";
import { AiFillCloseSquare, AiFillDelete } from 'react-icons/ai';
import { editUser } from '../FirebaseConfig';
import { DeleteTheUser } from "../hooks/AxiosHandler";
import SelectCategory from "../components/SelectCategory";
import ModalMotion from "./ModalMotion";

const UsuariosModal = ({ isOpen, type, value, onClose, setReload, userInfo }) => {
    const [userType, setUserType] = useState(null)
    const [cartegoryId, setCartegoryId] = useState("");
    const data = value
    const user = userInfo
    useEffect(() => {
        setUserType(data.permission)
        if (data.permission === "Usuario") {
            setCartegoryId(data.CategoryId)
        }
        console.log("As informações do usuário", data)
    }, [data]);

    function convertDate(createdAt) {
        if (!createdAt || !createdAt.seconds || !createdAt.nanoseconds) {
            return null;
        }

        const milliseconds = createdAt.seconds * 1000 + Math.round(createdAt.nanoseconds / 1e6);
        const date = new Date(milliseconds);
        return date.toLocaleString(); // Você pode ajustar o formato conforme necessário
    }
    const handleCategory = (event) => {
        // Obtém o ID diretamente da opção selecionada
        const novoIdSelecionado = event.target.options[event.target.selectedIndex].id;

        // Atualiza o estado com o novo ID selecionado
        setCartegoryId(novoIdSelecionado);

        // Se desejar, você pode imprimir o valor do ID selecionado no console para verificar
        console.log('ID selecionado:', novoIdSelecionado);
    };
    const userTypeHandler = (event) => {
        const selectedUserType = event.target.value;
        setUserType(selectedUserType);
    };

    return (
        value ? (
            <ModalMotion isOpen={isOpen} onClick={onClose}>
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
                                <select name="permission" defaultValue={data.permission ? data.permission : ""} required onChange={userTypeHandler}>
                                    <option value="" disabled>Selecione o nivel de Permissão</option>
                                    <option value="Usuario">Usuario</option>
                                    <option value="Editor">Editor</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                            {userType === "Usuario" ?
                                <div className="form-field">
                                    <p>Categoria</p>
                                    <SelectCategory defaultValue={data.category} onChange={handleCategory} />
                                </div>
                                : null
                            }
                            {userType === "Usuario" ?
                                < input type="hidden" name="CategoryId" value={cartegoryId} />
                                : null
                            }
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
                            {userType === "Usuario" ?
                                <div>
                                    <span>Categoria: </span>
                                    <p>{data.category}</p>
                                </div>
                                : null
                            }
                            <div>
                                <span>Email: </span>
                                <p>{user.email}</p>
                            </div>
                        </div>
                    )}
                </div>
            </ModalMotion>
        ) : null
    );
};

export default UsuariosModal;
