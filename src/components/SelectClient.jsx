import React from "react";
import state from "../store";
import { useSnapshot } from "valtio";

const SelectClient = ({ defaultValue, onChange }) => {
    const snap = useSnapshot(state)
    const clients = JSON.parse(JSON.stringify(snap.Clients))
    return (
        <select onChange={onChange} name="Name" defaultValue={defaultValue ? defaultValue : ""} required>
            <option value={""} disabled>Selecione uma empresa</option>
            {clients ? clients.map((client, index) => (
                <option key={index} id={client.id} value={client.result.clientName}>{client.result.clientName}</option>
            )) : null}
        </select>
    )
};

export default SelectClient;
