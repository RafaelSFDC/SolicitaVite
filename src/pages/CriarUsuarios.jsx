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
        e.preventDefault()
        setLoading(true)
        createUserFirebase(email, password, user, setLoading)
        setEmail("")
        setUser("")
        setPassword("")
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
                            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                        <div className="form-field">
                            <p>Nome do Usuário</p>
                            <input type="text" id="user" value={user} onChange={e => setUser(e.target.value)} required />
                        </div>
                        <div className="form-field">
                            <p>Senha</p>
                            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
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
