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
    return data;
};