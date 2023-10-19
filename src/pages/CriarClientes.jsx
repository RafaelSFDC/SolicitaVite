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
                <h1 className="contentHeader">Criar Cliente</h1>
                <div className="contentBody">
                    <form onSubmit={formHandler} className="formContainer">
                        <div className="form-field">
                            <p>Nome do Cliente</p>
                            <input type="text" id="user" name="clientName" required />
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
