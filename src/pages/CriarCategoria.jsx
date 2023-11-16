import React, { useEffect } from "react";
import { useState } from "react";
import { ColorRing } from 'react-loader-spinner'
import { addClients, createUserFirebase } from "../FirebaseConfig";
import determineActivePage from "../hooks/Functions";

const CriarCategoria = () => {
    const [loading, setLoading] = useState(false)

    const formHandler = (event) => {
        const formData = new FormData(event.target);
        addClients(formData, setLoading, event);
    };

    useEffect(() => {
        determineActivePage()
    }, []);

    return (
        <div className="container">
            <div className="containerContent">
                <h1 className="contentHeader">Criar Cliente</h1>
                <div className="contentBody">
                    <form onSubmit={formHandler} className="formContainer">
                        <div className="form-field">
                            <p>Nome do Cliente</p>
                            <input type="text" id="user" name="clientName" required />
                        </div>
                        <div className="form-field">
                            <p>CNPJ ou CPF</p>
                            <input type="text" id="info" name="info" required />
                        </div>
                        <div className="form-field">
                            <p>E-mail</p>
                            <input type="text" id="email" name="email" required />
                        </div>
                        <div className="form-field">
                            <p>Telefone de Contato</p>
                            <input type="text" id="tel" name="tel" required />
                        </div>
                        <div className="form-field">
                            <p>Celular/Whatsapp</p>
                            <input type="text" id="cel" name="cel" required />
                        </div>
                        <div className="form-field">
                            <p>Endereço (Opcional)</p>
                            <input type="text" id="address" name="address" required />
                        </div>
                        <div className="form-field">
                            <p>Categoria</p>
                            <input type="text" id="category" name="category" required />
                        </div>
                        {loading ? <button style={{ background: "transparent", border: "none" }}>
                            <ColorRing />
                        </button> : <button className="send-button" type="submit">Cadastrar Cliente</button>}
                    </form>
                </div>

            </div>
        </div>
    )
};

export default CriarCategoria;
