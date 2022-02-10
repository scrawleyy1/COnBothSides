import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { deletePost, getPostById } from "../../modules/postManager";
import { useParams, useHistory } from "react-router-dom";
import "./Post.css"
// import { getSocialPlatformsById } from "../../modules/socialPlatformManager";


export const PostDetails = () => {

    const history = useHistory();
    const [post, setPost] = useState([]);
    // const [socialPlatform, setSocialPlatform] = useState([])
    const { id } = useParams();

    const handleDeletePost = () => {
        deletePost(id)
            .then(() => history.push("/"));
    };

    useEffect(() => {
        getPostById(id).then(setPost);
    }, []);

    // useEffect(() => {
    //     getSocialPlatformsById(id).then(setSocialPlatform);
    // }, []);

    if (!post.userProfile) {
        return null;
    }
    return (
        <>
            <ListGroup className="card">
                <ListGroupItem>
                    <h3>{post.title}</h3>
                </ListGroupItem>
                <ListGroupItem>
                    <strong>Description: {post.description}</strong><br></br>
                    <strong>Create By: {post.completeBy}</strong><br></br>
                    <strong>Link : {post.url}</strong><br></br>
                    <strong>Category: {post.category.name}</strong><br></br>
                    <div><strong>Post to: {post.platforms.map(p => <p>{p.name}</p>)}</strong></div>
                </ListGroupItem>
            </ListGroup>
            <div className="submit-wrapper">
                <Button type="button" onClick={() => history.push(`/post/${post.id}/edit`)}>Edit</Button>
                <Button type="button" onClick={() => handleDeletePost(post.id)}>Delete</Button>
                <Button onClick={() => history.push("/")} >Back to List</Button>

            </div>
        </>
    )
}
export default PostDetails;