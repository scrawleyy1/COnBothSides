import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { deletePost, getAllPosts, getPostById } from "../../modules/postManager";
import { useParams, useHistory } from "react-router-dom";
import { getSocialPlatformsById } from "../../modules/socialPlatformManager";


export const PostDetails = () => {

    const history = useHistory();
    const [post, setPost] = useState([]);
    const [socialPlatform, setSocialPlatform] = useState([])
    const { id } = useParams();

    const handleDeletePost = (id) => {
        deletePost(id)
            .then(() => getAllPosts().then(setPost));
    };


    useEffect(() => {
        getPostById(id).then(setPost);
    }, []);

    useEffect(() => {
        getSocialPlatformsById(id).then(setSocialPlatform);
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
                    <p>Description: {post.description}</p>
                    <p>Create By: {post.createDateTime}</p>
                    <p>Link : {post.url}</p>
                    <p>Category: {post.category.name}</p>
                    <p>Post to: {socialPlatform.name}</p>
                </ListGroupItem>
            </ListGroup>
            <div>
                <button type="button" onClick={() => history.push(`/post/${post.id}/edit`)}>Edit</button>
                <button type="button" onClick={() => handleDeletePost(post.id)}>Delete</button>
            </div>
            <div>
                <Button onClick={() => history.push("/")} >Back to List</Button>

            </div>
        </>
    )
}
export default PostDetails;