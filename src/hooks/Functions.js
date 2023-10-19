import state from "../store";

const determineActivePage = () => {
    const path = window.location.pathname;
    state.activePage = path
    console.log(path)
    console.log(state.activePage)
};

export default determineActivePage;
