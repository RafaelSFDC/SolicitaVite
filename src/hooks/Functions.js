import state from "../store";

const determineActivePage = () => {
    const path = window.location.pathname;
    state.activePage = path
    console.log(path)
    console.log(state.activePage)
};

export default determineActivePage;

export const formatForm = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
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
    return data;
};