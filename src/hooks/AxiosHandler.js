import axios from "axios";
const url = "https://solicitaserv.onrender.com/"

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

export const DeleteTheUser = async (userId) => {
    try {
        const response = await axios.delete(`${url}deletar-usuario/${userId}`);
        console.log('Usuário deletado com sucesso:', response.data);
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
    }
};

export const GetTheUsers = async (setUsers, setLoading) => {
    setLoading(true)
    axios.get(`${url}list-users`)
        .then(response => {
            setUsers(response.data); // Atualiza o estado com os usuários recebidos
            console.log("Atualizou")
        })
        .then(() => setLoading(false), console.log("axios finished"))
        .catch(error => console.error('Erro ao obter lista de usuários:', error));
}