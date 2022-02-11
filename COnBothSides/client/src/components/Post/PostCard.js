import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { postComplete, getAllPosts } from "../../modules/postManager";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./Post.css"

export const PostCard = ({ post }) => {



    return (
        <Card className="card">
            <CardBody>
                <Link to={`/post/${post.id}`}>
                    <h3>{post.title}</h3>
                </Link>
            </CardBody>
            <CardBody>
                <strong>Category: {post.category.name}</strong><br></br>
                <strong>Complete By: {post.completeBy}</strong>
            </CardBody>

        </Card>)
}

export default PostCard;