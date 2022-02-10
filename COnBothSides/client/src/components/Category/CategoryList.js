import React, { useEffect, useState } from "react";
import { CategoryCard } from "./CategoryCard";
import { useHistory } from "react-router-dom";
import { deleteCategory, getAllCategories } from "../../modules/categoryManager";
import { Button } from "reactstrap";
import "../Post/Post.css"

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
            <section className="card-list">
                <Button type="button" onClick={() => history.push("/category/create")}>
                    Add Category
                </Button>
                <h1>Categories</h1>
                <div className="cardform h2">{categories.map(category => <CategoryCard key={category.id} category={category} handleDeleteCategory={handleDeleteCategory} />)}</div>
            </section>
        </>
    )
}

export default CategoryList;