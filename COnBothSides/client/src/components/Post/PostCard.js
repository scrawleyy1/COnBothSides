import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { postComplete } from "../../modules/postManager";
import { useHistory } from "react-router-dom";

export const PostCard = ({ post }) => {

    return (
        <Card>
            <CardBody>
                <Link to={`/post/${post.id}`}>
                    <h3>{post.title}</h3>
                </Link>
            </CardBody>
            <CardBody>
                <p>Description: {post.description}</p>
                <p>Category: {post.category.name}</p>
                <p>Complete By: {post.completeBy}</p>
            </CardBody>
        </Card>)
}

export default PostCard;