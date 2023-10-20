import React from 'react';
import Modal from 'react-modal';
import { AiFillCloseSquare } from "react-icons/ai";
import state from '../store';
const Resultado = ({ isOpen, onClose, method, type }) => {
    let mensagem = isOpen;
    let modal = false
    if (mensagem.length > 1) {
        modal = true
    }
    const closeResult = () => {
        // Selecionar os elementos com as classes modal e modalOverlay
        const modalElements = document.querySelectorAll('.ReactModal__Overlay, .ReactModal__Content');

        // Adicionar a classe 'closed' aos elementos
        modalElements.forEach((element) => {
            element.classList.add('closed');
        });

        // Esperar 0.3 segundos e, em seguida, remover o state.message
        setTimeout(() => {
            state.message = "";
        }, 300); // 300 milissegundos = 0.3 segundos
    }
    return (
        <Modal
            isOpen={modal}
            onRequestClose={closeResult}
            ariaHideApp={false}  // Desabilita o aviso de acessibilidade
            style={{
                content: {
                    width: '30%',
                    height: '20%',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    border: '3px solid var(--color2)', // Aqui adicionamos a borda
                    borderRadius: '5px',
                    padding: '20px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: "bold",
                },
            }}
        >
            <div className='modalResultado'>
                <p>{mensagem}</p>
                <AiFillCloseSquare style={{ position: 'absolute', top: '10px', right: '10px', padding: '5px 10px' }} onClick={closeResult} />
            </div>
        </Modal>
    );
};

export default Resultado;
