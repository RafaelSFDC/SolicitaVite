// Axios Create a List then Post Cards
const createList = () => {

    if (title && name && desc && req && date !== "")
        axios.post(`https://api.trello.com/1/boards/xDxNNphR/lists?name=${listName}&key=${key}&token=${Token}`)
            .then(response => state.id = response.data.id)
            .then(response => createCards())
            .catch(error => console.log(error))
}
const createCards = () => {
    axios.post(`https://api.trello.com/1/cards?name=Titulo&desc=${title}&idList=${state.id}&key=${key}&token=${Token}`)
        .then(response => console.log('Create Title ', state.id))
        .catch(error => console.log(error))
        .then(e => axios.post(`https://api.trello.com/1/cards?name=Nome&desc=${name}&idList=${state.id}&key=${key}&token=${Token}`)
            .then(response => console.log('Create Name ', state.id))
            .catch(error => console.log(error))
        )
        .then(e => axios.post(`https://api.trello.com/1/cards?name=Descrição&desc=${desc}&idList=${state.id}&key=${key}&token=${Token}`)
            .then(response => console.log('Create Desc ', state.id))
            .catch(error => console.log(error)))

        .then(e => axios.post(`https://api.trello.com/1/cards?name=Requerimentos&desc=${req}&idList=${state.id}&key=${key}&token=${Token}`)
            .then(response => console.log('Create Req ', state.id))
            .catch(error => console.log(error)))

        .then(e => axios.post(`https://api.trello.com/1/cards?name=Data&desc=${date}&idList=${state.id}&key=${key}&token=${Token}`)
            .then(response => console.log('Create Date ', state.id))
            .catch(error => console.log(error)))
        .then(e => setLoading(false))
}