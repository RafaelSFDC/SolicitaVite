import React, { useEffect } from "react";
import { useState } from "react";
import { ColorRing } from 'react-loader-spinner'
import { addClients } from "../FirebaseConfig";
import determineActivePage from "../hooks/Functions";
import InputMask from 'react-input-mask';
import SelectCategory from "../components/SelectCategory";

const CriarClientes = () => {
    const [loading, setLoading] = useState(false)
    const [cartegoryId, setCartegoryId] = useState('');

    const formHandler = (event) => {
        const formData = new FormData(event.target);
        addClients(formData, setLoading, event);
    };

    const handleCategory = (event) => {
        // Obtém o ID diretamente da opção selecionada
        const novoIdSelecionado = event.target.options[event.target.selectedIndex].id;

        // Atualiza o estado com o novo ID selecionado
        setCartegoryId(novoIdSelecionado);

        // Se desejar, você pode imprimir o valor do ID selecionado no console para verificar
        console.log('ID selecionado:', novoIdSelecionado);
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
                            <p>Nome da Empresa</p>
                            <input type="text" id="user" name="clientName" required />
                        </div>
                        {/* Utiliza InputMask para adicionar a máscara de CNPJ */}
                        <div className="form-field">
                            <p>CNPJ</p>
                            <InputMask mask="99.999.999/9999-99" maskChar={null}>
                                {(inputProps) => <input {...inputProps} type="text" id="CNPJ" name="CNPJ" required />}
                            </InputMask>
                        </div>
                        <div className="form-field">
                            <p>E-mail</p>
                            <input type="text" id="email" name="email" required />
                        </div>
                        <div className="form-field">
                            <p>Telefone de Contato (Opcional)</p>
                            <InputMask mask="(99) 9999-9999" maskChar={null}>
                                {(inputProps) => <input {...inputProps} type="text" id="tel" name="tel" />}
                            </InputMask>
                        </div>
                        {/* Utiliza InputMask para adicionar a máscara de celular */}
                        <div className="form-field">
                            <p>Celular/Whatsapp (Opcional)</p>
                            <InputMask mask="(99) 99999-9999" maskChar={null}>
                                {(inputProps) => <input {...inputProps} type="text" id="cel" name="cel" />}
                            </InputMask>
                        </div>
                        {/* Utiliza InputMask para adicionar a máscara de CEP */}
                        <div className="form-field">
                            <p>CEP (Opcional)</p>
                            <InputMask mask="99999-999" maskChar={null}>
                                {(inputProps) => <input {...inputProps} type="text" id="cep" name="cep" />}
                            </InputMask>
                        </div>
                        <div className="form-field">
                            <p>Categoria (Opcional)</p>
                            <SelectCategory onChange={handleCategory} required={false} />
                        </div>
                        {/* Campo oculto para armazenar o ID selecionado */}
                        <input type="hidden" name="CategoryId" value={cartegoryId} />
                        {loading ? <button style={{ background: "transparent", border: "none" }}>
                            <ColorRing />
                        </button> : <button className="send-button" type="submit">Cadastrar Empresa</button>}
                    </form>
                </div>

            </div>
        </div>
    )
};

export default CriarClientes;
