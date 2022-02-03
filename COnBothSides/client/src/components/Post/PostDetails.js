import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { getPostById } from "../../modules/postManager";
import { useParams, useHistory } from "react-router-dom";


export const PostDetails = () => {

    const history = useHistory();
    const [post, setPost] = useState([]);
    const { id } = useParams();


    useEffect(() => {
        getPostById(id).then(setPost);
    }, []);

    if (!post.userProfile) {
        return null;
    }

    return (
        <>
            <ListGroup>
                <ListGroupItem>
                    <h3>{post.title}</h3>
                </ListGroupItem>
                <ListGroupItem>
                    <p>{post.description}</p>
                    <p>{post.createDateTime}</p>
                    <p>Author: {post.userProfile.userName}</p>
                    <p>Category: {post.category.name}</p>
                </ListGroupItem>
            </ListGroup>
            <div>
                <Button onClick={() => history.push("/")} >Back to List</Button>

            </div>
        </>
    )
}
export default PostDetails;