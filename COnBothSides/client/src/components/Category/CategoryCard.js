import React from "react";
import { Card, CardBody } from "reactstrap";

export const CategoryCard = ({ category }) => {
    return (
        <Card>
            <CardBody>
                <p>{category.name}</p>
            </CardBody>
        </Card>
    )
}

export default CategoryCard;