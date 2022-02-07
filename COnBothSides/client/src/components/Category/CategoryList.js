import React, { useEffect, useState } from "react";
import { CategoryCard } from "./CategoryCard";
import { useHistory } from "react-router-dom";
import { deleteCategory, getAllCategories } from "../../modules/categoryManager";

export const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    const history = useHistory();

    const getCategories = () => {
        getAllCategories().then(categories => setCategories(categories));

    }

    const handleDeleteCategory = id => {
        deleteCategory(id)
            .then(() => getAllCategories().then(setCategories));
    }

    useEffect(() => {
        getCategories();
    }, []);


    return (
        <>
            <section>
                <button type="button" onClick={() => history.push("/category/create")}>
                    Add Category
                </button>
                <h1>Categories</h1>
                <div>{categories.map(category => <CategoryCard key={category.id} category={category} handleDeleteCategory={handleDeleteCategory} />)}</div>
            </section>
        </>
    )
}

export default CategoryList;