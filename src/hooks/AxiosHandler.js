import axios from "axios";
import state from "../store";
import moment from "moment";
const url = "https://solicitaserv.onrender.com/"
const notifyUrl = 'https://app.nativenotify.com/api/notification'

export const ChangePassword = async (user, password) => {
    const userId = user; // Substitua pelo UID real do usuário

    try {
        await axios.put(`${url}editar-senha/${userId}`, {
            novaSenha: password,
        });
        console.log('Senha alterada com sucesso!');
    } catch (error) {
        console.error('Erro ao alterar a senha:', error);
    }

    console.log("Axios user: ", user)
};

export const DeleteTheUser = async (userId, modalToggle, setReload) => {
    try {
        const response = await axios.delete(`${url}deletar-usuario/${userId}`);
        console.log('Usuário deletado com sucesso:', response.data);
        modalToggle()
        setReload(true)
        state.message = "Usuário deletado com sucesso!"
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
    }
};

export const UpdateUserDisplayName = async (userId, novoDisplayName, setLoading) => {
    try {
        await axios.put(`${url}editar-usuario/${userId}`, {
            novoDisplayName: novoDisplayName,
        });
        state.message = 'Usuário atualizado com sucesso!'
        setLoading(true)
    } catch (error) {
        state.message = "Erro ao editar o usuário"
    }
};

export const GetTheUsers = async (setUsers, setLoading) => {
    setLoading(true)
    axios.get(`${url}list-users`)
        .then(response => {
            setUsers(response.data); // Atualiza o estado com os usuários recebidos
        })
        .then(() => setLoading(false), console.log("axios finished"))
        .catch(error => console.error('Erro ao obter lista de usuários:', error));
}


// NOTIFICAÇÃO
export const Notify = async (title, category) => {
    const body = {
        mensagem: title,
        category: category,
    }
    try {
        await axios.post(`${url}enviar-notificacoes`, body);
        console.log('Notificação enviada com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar notificação:', error);
    }
}