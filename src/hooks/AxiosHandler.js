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
export const Notify = (title) => {
    // Gerar a data atual no formato desejado
    const dateSent = moment().format('MM-DD-YYYY h:mmA');

    // const data = {
    //     "appId": 14884,
    //     "appToken": "8eIowtFYCkhSh8eaXJDsqv",
    //     "title": "Nova Licitação Adicionada!",
    //     "body": title,
    //     "dateSent": dateSent
    // };

    const data = {
        "appId": 14884,
        "appToken": "8eIowtFYCkhSh8eaXJDsqv",
        "bigPictureURL": "",
        "masterSubID": "Produtos",
        "message": title,
        "pushData": "",
        "title": "Nova Licitação Adicionada!"
    }

    axios.post("https://app.nativenotify.com/api/follow/notification", data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            console.log('Resposta:', response.data);
        })
        .catch(error => {
            console.error('Erro ao enviar a solicitação:', error);
        });
}


export const createTopicNotification = (data) => {
    const body = {
        "appId": 14884,
        "appToken": "8eIowtFYCkhSh8eaXJDsqv",
        "isTopicGroup": true,
        "masterSubID": data
    }
    axios.post("https://app.nativenotify.com/api/post/follow/master", body, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
export const DeleteTopicNotification = (data) => {
    console.log(data);
    axios.delete(`https://app.nativenotify.com/api/follow/master/14884/8eIowtFYCkhSh8eaXJDsqv/${data}`)
        .then(response => {
            console.log('Exclusão bem-sucedida:', response);
        })
        .catch(error => {
            console.error('Erro ao excluir notificação:', error);
        });
}

