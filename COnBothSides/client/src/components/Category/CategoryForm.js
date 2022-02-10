import React, { useState } from "react";
import { useHistory } from "react-router";
import { addCategory } from "../../modules/categoryManager";
import { Button } from "reactstrap";
import "../Post/Post.css"

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
            <h3 className="cardform h2">Add New Category</h3>
            <div className="cardform">
                <input id="name" type="text" onChange={handleControlledInputChange} required autoFocus placeholder="Add New Category" value={category.name} />
                <Button onClick={handleClickSaveCategory}>Save Category</Button>
                <Button onClick={() => history.push("/Categories")}>Cancel</Button>
            </div>
        </>
    )
}

export default CategoryForm;