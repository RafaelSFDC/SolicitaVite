import React from "react";
import state from "../store";
import { useSnapshot } from "valtio";

const SelectCategory = ({ defaultValue, onChange, required }) => {
    const snap = useSnapshot(state)
    if (!snap.Category) {
        return
    }
    const category = JSON.parse(JSON.stringify(snap.Category))
    return (
        <select onChange={onChange} name="Category" defaultValue={defaultValue ? defaultValue : ""} required={required}>
            <option value={""} disabled>Selecione uma Categoria</option>
            {category ? category.map((client, index) => (
                <option key={index} id={client.id} value={client.result.name}>{client.result.name}</option>
            )) : null}
        </select>
    )
};

export default SelectCategory;
