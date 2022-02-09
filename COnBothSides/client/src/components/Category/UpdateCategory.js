import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { updateCategory, getCategoryById } from "../../modules/categoryManager";


export const CategoryUpdateForm = () => {
    const [category, setCategory] = useState({ name: "" });

    const { id } = useParams();
    const history = useHistory();

    const getCategory = () => {
        getCategoryById(id).then(res => setCategory(res));
    }

    useEffect(() => {
        getCategory();
    }, [])

    const handleControlledInputChange = (event) => {
        const newCategory = { ...category };
        let selectedVal = event.target.value;

        newCategory[event.target.id] = selectedVal;

        setCategory(newCategory);
    };

    const handleClickSaveCategory = (event) => {
        event.preventDefault(); //Prevents the browser from submitting the form
        updateCategory(category).then(() => history.push("/Categories"))
    };

    return (
        <>
            <form>
                <div>
                    <h3>Edit Category</h3>
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        required
                        autoFocus
                        onChange={handleControlledInputChange}
                        id="name"
                        placeholder="Category Name"
                        value={category.name} />
                </div>
                <div>
                    <button
                        onClick={handleClickSaveCategory} >Save</button>
                </div>
                <button onClick={() => history.push("/Categories")}>Cancel</button>
            </form>
        </>
    );
}
export default CategoryUpdateForm;