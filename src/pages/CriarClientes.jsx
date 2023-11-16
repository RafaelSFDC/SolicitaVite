import React, { useEffect } from "react";
import { useState } from "react";
import { ColorRing } from 'react-loader-spinner'
import { addClients, createUserFirebase } from "../FirebaseConfig";
import determineActivePage from "../hooks/Functions";

const CriarClientes = () => {
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
                <h1 className="contentHeader">Adicionar Empresa</h1>
                <div className="contentBody">
                    <form onSubmit={formHandler} className="formContainer">
                        <div className="form-field">
                            <p>Nome do Cliente</p>
                            <input type="text" id="user" name="clientName" required />
                        </div>
                        <div className="form-field">
                            <p>CNPJ ou CPF</p>
                            <input type="text" id="info" name="info" />
                        </div>
                        <div className="form-field">
                            <p>E-mail</p>
                            <input type="text" id="email" name="email" required />
                        </div>
                        <div className="form-field">
                            <p>Telefone de Contato (Opcional)</p>
                            <input type="text" id="tel" name="tel" />
                        </div>
                        <div className="form-field">
                            <p>Celular/Whatsapp (Opcional)</p>
                            <input type="text" id="cel" name="cel" />
                        </div>
                        <div className="form-field">
                            <p>Endereço (Opcional)</p>
                            <input type="text" id="address" name="address" />
                        </div>
                        <div className="form-field">
                            <p>Categoria (Opcional)</p>
                            <input type="text" id="category" name="category" />
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

export default CriarClientes;
