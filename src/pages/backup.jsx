{/* MODALS */ }
{
    modalIsOpen ?
        <div className={`modal ${state.SideBar ? "sidebar-active" : ""}`}>
            {modalEdit ? <div className="modal-item">
                <button className="close-modal-button" onClick={() => { modalHandler() }}> <AiFillCloseSquare className="button-icon" /></button>
                <h2>Editar Usuário</h2>
                <form onSubmit={(e) => { updateUser(e, userInfo.id); modalHandler(); modalResultHandler(" editado com sucesso!") }} className="form modal-form">
                    <div className="form-field">
                        <p>Nome de Usuário</p>
                        <input type="text" required defaultValue={userInfo.user} />
                    </div>
                    <div className="form-field">
                        <p>Senha</p>
                        <input type="password" required defaultValue={""} />
                    </div>
                    <button className="send-button" type="submit">Atualizar</button>
                </form>
            </div> : null}
            {modalDelete ? <div className="modal-item delete">
                <button className="close-modal-button" onClick={() => modalHandler()}> <AiFillCloseSquare className="button-icon" /></button>
                <h2>Deletar Usuário</h2>
                <h3>Tem certeza que deseja excluir esse  Usuário?</h3>
                <h3>{userInfo.user}</h3>
                <div className="button-container">
                    <button onClick={() => { DeleteTheUser(userInfo.id); modalHandler(); modalResultHandler("deletado com sucesso!") }} className="delete"><AiFillDelete /> <p>Deletar</p></button>
                </div>
            </div> : null}
            {modalInfo ?
                <div className="modal-item">

                    <button className="close-modal-button" onClick={() => modalHandler()}> <AiFillCloseSquare className="button-icon" /></button>
                    <h2>Informações</h2>
                    <div className="licit-container">
                        <div>
                            <span>Usuário: </span>
                            <p>{userInfo.user}</p>
                        </div>
                        <div>
                            <span>Email: </span>
                            <p>{userInfo.email}</p>
                        </div>
                        <div>
                            <span>Criado em: </span>
                            <p>{timeStamp(userInfo.data)}</p>
                        </div>
                    </div>
                </div> : null}
        </div>
        : null
}
{/* MODAL RESULT */ }
{
    modalResult ?
        <div className={`modal ${state.SideBar ? "sidebar-active" : ""}`}>
            <div className="modal-item">
                <button className="close-modal-button" onClick={() => { modalHandler(); GetTheUsers(setUsers, setLoading) }}> <AiFillCloseSquare className="button-icon" /></button>
                <h2>Usuário {modalResultValue} </h2>
            </div>
        </div>
        : null
}