import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { postComplete, getAllPosts } from "../../modules/postManager";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const PostCard = ({ post }) => {

    const handleCheckboxComplete = () => {
        postComplete(post).then(reload)
    }

    const history = useHistory;

    const reload = () => history.pushState("/")

    return (
        <Card>
            <CardBody>
                <Link to={`/post/${post.id}`}>
                    <h3>{post.title}</h3>
                </Link>
            </CardBody>
            <CardBody>
                <p>Category: {post.category.name}</p>
                <p>Complete By: {post.createDateTime}</p>
                <div><label htmlFor="complete">complete?
                    <input onChange={handleCheckboxComplete} type="checkbox" name="complete" id="complete"></input>
                </label></div>
            </CardBody>

        </Card>)
}

export default PostCard;