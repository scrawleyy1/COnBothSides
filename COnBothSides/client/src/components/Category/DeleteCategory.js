import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { deleteCategory } from "../../modules/categoryManager";

export const DeleteCategory = () => {
    const [category, setCategory] = useState({
        name: "",
    });

    const { id } = useParams();

    const history = useHistory();

    const handleConfirmDeleteCategory = (event) => {
        event.preventDefault();

        deleteCategory(id).then(() => history.push("/Categories"));
    };

    return (
        <form>
            <h2> Delete Category:</h2>
            <p>Are you sure you want to delete this category?</p>
            <button onClick={handleConfirmDeleteCategory}>Delete</button>
            <button onClick={() => history.push("/Categories")}>Cancel</button>
        </form>
    );
};

export default DeleteCategory;