import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { useHistory } from "react-router-dom";

export const CategoryCard = ({ category }) => {

    const history = useHistory();

    const handleDeleteCategory = () => {
        history.push(`/deleteCategory/${category.id}`)
    };

    return (
        <Card>
            <CardBody>
                <strong>{category.name}</strong>
                <div>
                    <Button type="button" onClick={() => history.push(`/Categories/${category.id}/edit`)}>Edit</Button>
                    <Button type="button" onClick={() => handleDeleteCategory(category.id)}>Delete</Button>
                </div>
            </CardBody>
        </Card>
    )
}

export default CategoryCard;