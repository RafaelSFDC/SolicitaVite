import React from "react";
import state from "../store";
import { useSnapshot } from "valtio";

const SelectClient = () => {
    const snap = useSnapshot(state)
    const clients = JSON.parse(JSON.stringify(snap.Clients))
    return (
        <select name="Name" defaultValue={""} required>
            <option value={""} disabled>Selecione um cliente</option>
            {clients ? clients.map((client, index) => (
                <option key={index} id={client.id} value={client.result.clientName}>{client.result.clientName}</option>
            )) : null}
        </select>
    )
};

export default SelectClient;
