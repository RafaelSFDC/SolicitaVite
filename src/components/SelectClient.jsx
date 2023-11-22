import React from "react";
import state from "../store";
import { useSnapshot } from "valtio";

const SelectClient = ({ defaultValue, onChange }) => {
    const snap = useSnapshot(state)
    const clients = JSON.parse(JSON.stringify(snap.Clients))
    return (
        <select onChange={onChange} name="Client" defaultValue={defaultValue ? defaultValue : ""} required>
            <option value={""} disabled>Selecione uma empresa</option>
            {clients ? clients.map((client, index) => {
                const optionValue = `${client.result.clientName},${client.result.Category},${client.result.CategoryId}, ${client.id}`;
                return <option key={index} id={client.id} value={optionValue}>{client.result.clientName}</option>
            }) : null}
        </select>
    )
};

export default SelectClient;
