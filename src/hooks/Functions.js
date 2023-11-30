import { uploadFile } from "../FirebaseConfig";
import state from "../store";

const determineActivePage = () => {
    const path = window.location.pathname;
    state.activePage = path
};

export default determineActivePage;

export const formatForm = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    const updateEdital = async () => {
        if (data.Edital) {
            const file = await uploadFile(data.Edital)
            console.log(file)
            data["Edital"] = file
        }
    }
    if (data.Edital) {
        await updateEdital()
    }
    // Extrair valores de Client e adicionar ao objeto form
    if (data.Client) {
        const [clientName, category, categoryId, id] = data.Client.split(',');
        data.ClientName = clientName;
        data.Category = category;
        data.CategoryId = categoryId;
        data.ClientId = id;

        // Remover a propriedade Client original se necessário
        delete data.Client;
        data.recusas = {}
    }
    console.log("RESULTADO DA FUNÇÃO FORMAT FORM:", data)
    return data;
};