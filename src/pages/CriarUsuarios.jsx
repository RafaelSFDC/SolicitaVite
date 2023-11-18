import React, { useEffect } from "react";
import { useState } from "react";
import { ColorRing } from 'react-loader-spinner'
import { createUserFirebase } from "../FirebaseConfig";
import determineActivePage from "../hooks/Functions";
import SelectCategory from "../components/SelectCategory";


const CriarUsuarios = () => {
    const [loading, setLoading] = useState(false)
    const [userType, setUserType] = useState(false)
    const [cartegoryId, setCategoryId] = useState('');

    const create = (e) => {
        createUserFirebase(e, setLoading)
    }

    useEffect(() => {
        determineActivePage()
    }, []);

    const handleCategory = (event) => {
        const novoIdSelecionado = event.target.options[event.target.selectedIndex].id;
        setCategoryId(novoIdSelecionado);
    };

    const userTypeHandler = (event) => {
        const selectedUserType = event.target.value;
        setUserType(selectedUserType);
    };
    return (
        <div className="container">
            <div className="containerContent">
                <h1 className="contentHeader">Adicionar Usuário</h1>
                <div className="contentBody">
                    <form onSubmit={create} className="formContainer">
                        <div className="form-field">
                            <p>Email</p>
                            <input type="email" name="email" required />
                        </div>
                        <div className="form-field">
                            <p>Nome do Usuário</p>
                            <input name="userName" required />
                        </div>
                        <div className="form-field">
                            <p>Tipo de Usuário</p>
                            <select name="permission" defaultValue={""} required onChange={userTypeHandler}>
                                <option value="" disabled>Selecione o nivel de Permissão</option>
                                <option value="Usuario">Usuario</option>
                                <option value="Editor">Editor</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>
                        {userType === "Usuario" ?
                            <>
                                <div className="form-field">
                                    <p>Categoria</p>
                                    <SelectCategory onChange={handleCategory} required={true} />
                                </div>
                                < input type="hidden" name="CategoryId" value={cartegoryId} />
                            </>
                            : null
                        }
                        <div className="form-field">
                            <p>Senha</p>
                            <input name="password" required />
                        </div>
                        {loading ? (
                            <button style={{ background: "transparent", border: "none" }}>
                                <ColorRing />
                            </button>
                        ) : (
                            <button className="send-button" type="submit">Criar Usuário</button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
};

export default CriarUsuarios;
