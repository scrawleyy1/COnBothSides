import React from "react";
import { Card, CardBody } from "reactstrap";
import { useHistory } from "react-router-dom";

export const CategoryCard = ({ category }) => {

    const history = useHistory();

    const handleDeleteCategory = () => {
        history.push(`/deleteCategory/${category.id}`)
    };

    return (
        <Card>
            <CardBody>
                <p>{category.name}</p>
                <button type="button" onClick={() => handleDeleteCategory(category.id)}>Delete</button>
            </CardBody>
        </Card>
    )
}

export default CategoryCard;