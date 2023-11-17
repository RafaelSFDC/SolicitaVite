import React, { useEffect } from "react";
import { useState } from "react";
import { ColorRing } from 'react-loader-spinner'
import { addCategory, addClients, createUserFirebase } from "../FirebaseConfig";
import determineActivePage from "../hooks/Functions";

const CriarCategoria = () => {
    const [loading, setLoading] = useState(false)

    const formHandler = (event) => {
        const formData = new FormData(event.target);
        addCategory(formData, setLoading, event);
    };

    useEffect(() => {
        determineActivePage()
    }, []);

    return (
        <div className="container">
            <div className="containerContent">
                <h1 className="contentHeader">Criar Categoria</h1>
                <div className="contentBody">
                    <form onSubmit={formHandler} className="formContainer">
                        <div className="form-field">
                            <p>Nome da Categoria</p>
                            <input type="text" id="name" name="name" required />
                        </div>
                        {loading ? <button style={{ background: "transparent", border: "none" }}>
                            <ColorRing />
                        </button> : <button className="send-button" type="submit">Cadastrar Categoria</button>}
                    </form>
                </div>

            </div>
        </div>
    )
};

export default CriarCategoria;
