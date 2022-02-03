import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { postComplete } from "../../modules/postManager";
import { useHistory } from "react-router-dom";
import { getAllPosts } from "../../modules/postManager";

export const PostCard = ({ post }) => {

    const handleCheckboxComplete = () => {
        postComplete(post).then(reload)
    }

    const reload = () => {
        getAllPosts()
    }

    const currentUser = parseInt(sessionStorage.getItem("COnBothSides"))

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
                <div><label htmlFor="complete">complete?
                    <input onChange={handleCheckboxComplete} type="checkbox" name="complete" id="complete"></input>
                </label></div>
            </CardBody>

        </Card>)
}

export default PostCard;