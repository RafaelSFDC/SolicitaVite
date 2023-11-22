import React, { useEffect, useRef, useState } from "react";
import { FaFilePdf } from "react-icons/fa6";
import determineActivePage, { formatForm } from '../hooks/Functions';
import SelectClient from "../components/SelectClient";
import Spinner from "../components/Spinner";
import ContainerMotion from "../components/ContainerMotion";
import { addDocuments } from "../FirebaseConfig";

const CriarLicitação = () => {
    const [loading, setLoading] = useState(false)
    const [edital, setEdital] = useState('Nenhum arquivo selecionado');
    // Estado para armazenar o ID selecionado
    const [idSelecionado, setIdSelecionado] = useState('');
    const [category, setCategory] = useState('');
    const [cartegoryId, setCartegoryId] = useState('');

    // Função para lidar com a alteração no select
    const handleSelectChange = (event) => {
        // Obtém a opção selecionada
        const opcaoSelecionada = event.target.options[event.target.selectedIndex];

        // Obtém o ID, category e categoryId diretamente da opção selecionada
        const novoIdSelecionado = opcaoSelecionada.id;
        const categorySelecionada = opcaoSelecionada.getAttribute('data-category');
        const categoryIdSelecionada = opcaoSelecionada.getAttribute('data-categoryId');

        // Atualiza o estado com as novas informações
        setIdSelecionado(novoIdSelecionado);
        setCategory(categorySelecionada);
        setCartegoryId(categoryIdSelecionada);

        // Se desejar, você pode imprimir as informações no console para verificar
        console.log('ID selecionado:', novoIdSelecionado);
        console.log('Category selecionada:', categorySelecionada);
        console.log('CategoryId selecionada:', categoryIdSelecionada);
    };

    useEffect(() => {
        determineActivePage()
    }, []); // Chame isso quando o componente for montado (carregamento inicial)



    const formHandler = (event) => {
        const form = formatForm(event)
        setLoading(true);
        const file = form.Edital

        // Verifique se o arquivo foi selecionado
        if (!file) {
            alert("Por favor, selecione um arquivo PDF ou do Word.");
            setLoading(false);
            return;
        }

        // Extrair valores de Client e adicionar ao objeto form
        if (form.Client) {
            const [clientName, category, categoryId, id] = form.Client.split(',');
            form.ClientName = clientName;
            form.Category = category;
            form.CategoryId = categoryId;
            form.ClientId = id;

            // Remover a propriedade Client original se necessário
            delete form.Client;
            delete form.Edital
            form.recusas = {}
            setEdital("Nenhum Arquivo Selecionado")
        }
        console.log(form)
        addDocuments(form, setLoading, event, file);
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
                            <textarea rows={1} type="text" name="ListName" required />
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
                        <input type="hidden" name="Category" value={category} />
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
