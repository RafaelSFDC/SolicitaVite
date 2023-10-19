import React, { useEffect, useState } from "react";
import { ColorRing } from 'react-loader-spinner'
import { FaFilePdf } from "react-icons/fa6";
import { addDocuments } from "../FirebaseConfig";
import determineActivePage from './../hooks/Functions';
import SelectClient from "../components/SelectClient";
import Spinner from "../components/Spinner";

const Home = () => {
    const [loading, setLoading] = useState(false)
    const [edital, setEdital] = useState('Nenhum arquivo selecionado');
    useEffect(() => {
        determineActivePage()
    }, []); // Chame isso quando o componente for montado (carregamento inicial)


    const formHandler = (event) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.target);
        const file = formData.get("Edital");

        // Verifique se o arquivo foi selecionado
        if (!file) {
            alert("Por favor, selecione um arquivo PDF ou do Word.");
            setLoading(false);
            return;
        }

        // Restante dos dados a serem enviados
        const data = {
            ListName: formData.get("listName"),
            Title: formData.get("Title"),
            Name: formData.get("Name"),
            Email: formData.get("Email"),
            observ: formData.get("observ"),
            Desc: formData.get("Desc"),
            Date: formData.get("Date"),
        };

        addDocuments(data, setLoading, event, file);
    };


    const handleFileChange = (event) => {
        const arquivoSelecionado = event.target.files[0];

        if (arquivoSelecionado) {
            const extensoesPermitidas = ['pdf', 'doc', 'docx'];
            const extensao = arquivoSelecionado.name.split('.').pop().toLowerCase();

            if (extensoesPermitidas.includes(extensao)) {
                setEdital(arquivoSelecionado.name);
            } else {
                alert('Por favor, selecione um arquivo PDF ou do Word.');
                event.target.value = null;  // Limpa a seleção do arquivo
                setEdital('Nenhum arquivo selecionado');
            }
        } else {
            setEdital('Nenhum arquivo selecionado');
        }
    };
    return (
        <div className="container">
            <div className="containerContent">
                <div className="contentHeader">Criar Licitação</div>
                <div className="contentBody">
                    <form onSubmit={formHandler} className="formContainer">
                        <div className="form-field">
                            <p>Nome da Licitação</p>
                            <textarea rows={1} type="text" name="listName" required />
                        </div>
                        <div className="form-field">
                            <p>Titulo</p>
                            <textarea rows={1} type="text" name="Title" required />
                        </div>
                        <div className="form-field">
                            <p>Nome do Solicitante</p>
                            <SelectClient />
                        </div>
                        <div className="form-field">
                            <p>Email</p>
                            <input type="email" name="Email" required />
                        </div>
                        <div className="form-field">
                            <p>Observações(Opcional)</p>
                            <textarea rows={1} type="text" name="observ" />
                        </div>
                        <div className="form-field">
                            <p>Descrição da Solicitação</p>
                            <textarea rows={1} type="text" name="Desc" required />
                        </div>
                        <div className="form-field">
                            <p>Data de entrega</p>
                            <input className="date" type="date" name="Date" id="" required />
                        </div>
                        <div className="form-field">
                            <p>Edital</p>
                            <div className="customInput">
                                <label htmlFor="Edital">
                                    <span><FaFilePdf /> Selecione o Edital</span>
                                    <p>Arquivo selecionado: {edital}</p>
                                    <input type="file" name="Edital" id="Edital" accept=".pdf, .doc, .docx" onChange={handleFileChange} />
                                </label>
                            </div>
                        </div>
                        {loading ?
                            <button style={{ background: "transparent", border: "none" }}>
                                <Spinner />
                            </button>
                            : <button className="send-button" type="submit">Solicitar</button>}
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Home;
