import React, { useEffect } from "react";
import { useState } from "react";
import { ColorRing } from 'react-loader-spinner'
import { createUserFirebase } from "../FirebaseConfig";
import determineActivePage from "../hooks/Functions";

const CriarUsuarios = () => {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")

    const create = (e) => {
        createUserFirebase(e, setLoading)
    }

    useEffect(() => {
        determineActivePage()
    }, []);

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
                            <select name="permission" defaultValue={""} required>
                                <option value="" disabled>Selecione o nivel de Permissão</option>
                                <option value="Usuario">Usuario</option>
                                <option value="Editor">Editor</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>
                        <div className="form-field">
                            <p>Senha</p>
                            <input name="password" required />
                        </div>

                        {loading ? <button style={{ background: "transparent", border: "none" }}>
                            <ColorRing />
                        </button> : <button className="send-button" type="submit">Criar Usuário</button>}
                    </form>
                </div>
            </div>
        </div>
    )
};

export default CriarUsuarios;
