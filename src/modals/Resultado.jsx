import { AiFillCloseSquare } from "react-icons/ai";
import state from '../store';
import ModalMotion from './ModalMotion';
const Resultado = ({ isOpen }) => {
    let mensagem = isOpen;
    let modal = false
    if (mensagem.length > 1) {
        modal = true
    }
    const closeResult = () => {
        state.message = ""
    }
    return (
        <ModalMotion isOpen={modal} onClick={closeResult}>
            <div className='modalResultado'>
                <p>{mensagem}</p>
                <AiFillCloseSquare onClick={closeResult} />
            </div>
        </ModalMotion>
    )
};

export default Resultado;
