import React, { useEffect, useRef, useState } from "react";
import { ColorRing } from 'react-loader-spinner'
import { FaFilePdf } from "react-icons/fa6";
import { addDocuments } from "../FirebaseConfig";
import determineActivePage from '../hooks/Functions';
import SelectClient from "../components/SelectClient";
import Spinner from "../components/Spinner";
import SelectCategory from "../components/SelectCategory";
import ContainerMotion from "../components/ContainerMotion";

const CriarLicitação = () => {
    const [loading, setLoading] = useState(false)
    const [edital, setEdital] = useState('Nenhum arquivo selecionado');
    // Estado para armazenar o ID selecionado
    const [idSelecionado, setIdSelecionado] = useState('');
    const [cartegoryId, setCartegoryId] = useState('');

    // Função para lidar com a alteração no select
    const handleSelectChange = (event) => {
        // Obtém o ID diretamente da opção selecionada
        const novoIdSelecionado = event.target.options[event.target.selectedIndex].id;

        // Atualiza o estado com o novo ID selecionado
        setIdSelecionado(novoIdSelecionado);

        // Se desejar, você pode imprimir o valor do ID selecionado no console para verificar
        console.log('ID selecionado:', novoIdSelecionado);
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
            observ: formData.get("observ"),
            Desc: formData.get("Desc"),
            Date: formData.get("Date"),
            ClientId: formData.get("idSelecionado"),
            CategoryId: formData.get("CategoryId"),
        };
        // console.log(data)
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
        <ContainerMotion className="container">
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
                            <p>Empresa Solicitante</p>
                            <SelectClient onChange={handleSelectChange} />
                        </div>
                        <div className="form-field">
                            <p>Categoria</p>
                            <SelectCategory onChange={handleCategory} />
                        </div>
                        <div className="form-field">
                            <p>Observações(Opcional)</p>
                            <textarea rows={1} type="text" name="observ" />
                        </div>
                        <div className="form-field">
                            <p>Descrição da Solicitação(Opcional)</p>
                            <textarea rows={1} type="text" name="Desc" />
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
                        {/* Campo oculto para armazenar o ID selecionado */}
                        <input type="hidden" name="idSelecionado" value={idSelecionado} />
                        {/* Campo oculto para armazenar o ID selecionado */}
                        <input type="hidden" name="CategoryId" value={cartegoryId} />
                        {/* Campo oculto para armazenar o ID selecionado */}
                        <input type="hidden" name="recusas" value={{}} />
                        {loading ?
                            <button style={{ background: "transparent", border: "none" }}>
                                <Spinner />
                            </button>
                            : <button className="send-button" type="submit">Solicitar</button>}
                    </form>
                </div>
            </div>
        </ContainerMotion>
    )
};

export default CriarLicitação;
