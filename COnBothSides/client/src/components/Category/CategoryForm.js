import React, { useState } from "react";
import { useHistory } from "react-router";
import { addCategory } from "../../modules/categoryManager";

export const CategoryForm = () => {
    const [category, setCategory] = useState({
        name: ""
    });

    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newCategory = { ...category };
        let selectedVal = event.target.value;

        newCategory[event.target.id] = selectedVal;
        // update state
        setCategory(newCategory);
    }

    const handleClickSaveCategory = (event) => {
        event.preventDefault()
        addCategory(category)
            .then(() => history.push("/Categories"))
    }

    return (
        <>
            <h3>Add New Category</h3>
            <div>
                <input id="name" type="text" onChange={handleControlledInputChange} required autoFocus placeholder="Add New Category" value={category.name} />
                <button onClick={handleClickSaveCategory}>Save Category</button>
            </div>
        </>
    )
}

export default CategoryForm;