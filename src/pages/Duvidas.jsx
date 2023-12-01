import { useEffect, useState } from "react";
import state from '../store/index'
import { AiFillDelete, AiFillInfoCircle, AiFillEdit } from "react-icons/ai";
import { useSnapshot } from "valtio";
import determineActivePage from "../hooks/Functions";
import LicitationInfoModal from '../modals/LicitaçãoInfoModal';
import ContainerMotion from "../components/ContainerMotion";
import DuvidasModal from "../modals/DuvidasModal";


const Duvidas = () => {
    const snap = useSnapshot(state);
    const questions = snap.Questions

    console.log("VALOR", questions)

    const [modal, setModal] = useState(false);
    const [info, setInfo] = useState("");
    const [type, setType] = useState("");

    const modalToggle = (index) => {
        setModal(!modal)
        if (index !== null && index !== undefined) {
            setInfo(questions[index]);
        }
    };
    function formatDate(CreatedAT) {
        const { seconds, nanoseconds } = CreatedAT;

        // Converter para milissegundos
        const timestamp = seconds * 1000 + Math.floor(nanoseconds / 1e6);

        // Criar um objeto de data
        const data = new Date(timestamp);

        // Formatar a data para o formato desejado (DD/MM/YYYY HH:mm:ss)
        const dataFormatada = `${data.toLocaleDateString('pt-BR')} ${data.toLocaleTimeString('pt-BR')}`;

        return dataFormatada;
    }

    useEffect(() => {
        determineActivePage()
        setInfo(questions[0])
    }, [questions]);


    return <ContainerMotion className="container">
        <DuvidasModal
            isOpen={modal}
            type={type}
            value={info}
            onClose={() => modalToggle()}
        />
        <div className="containerContent">
            <h1 className="contentHeader">Duvidas</h1>
            <div className="contentBody">
                {questions?.length === 0 ? <p className="emptyList">Nenhuma duvida encontrada</p> : <ul className="listContainer">
                    {questions.map((item, index) => {
                        const id = item.id
                        const result = item.result
                        return (
                            <li key={id} className="list-container">
                                <h2>{result.Licit ? result.Licit : "Nome da lista não encontrado"}</h2>
                                <div className="licit-container">
                                    <div>
                                        <span>Usuario: </span>
                                        <p>{result.User}</p>
                                    </div>
                                    <div>
                                        <span>Data de envio: </span>
                                        <p>{formatDate(result.CreatedAT)}</p>
                                    </div>
                                </div>
                                <div className="buttonContainer">
                                    <button className="edit" onClick={() => { modalToggle(index); setType("Edit") }} >
                                        <AiFillEdit /> <p>Editar Status / Responder</p>
                                    </button>
                                    <button onClick={() => { modalToggle(index); setType("Delete") }} className="delete">
                                        <AiFillDelete /> <p>Deletar</p>
                                    </button>
                                    <button onClick={() => { modalToggle(index); setType("Info"); }} className="info">
                                        <AiFillInfoCircle /> <p>Informações</p>
                                    </button>
                                </div>
                            </li>

                        )
                    })}
                </ul>}
            </div>

        </div>

    </ContainerMotion>;
};

export default Duvidas;
