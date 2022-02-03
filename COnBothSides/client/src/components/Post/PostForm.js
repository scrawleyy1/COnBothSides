import React, { useState } from "react";
import { useHistory } from "react-router";
import { addPost } from "../../modules/postManager";

export const PostForm = () => {

    //useState will hold the post title, decription, url, and 
    const [post, setPost] = useState({
        title: "",
        description: "",
        url: "",
        completeBy: "",
        complete: false
    });

    const history = useHistory();
    //makes a copy of object


    const handleControlledInputChange = (event) => {
        const newPost = { ...post };
        let selectedVal = event.target.value;

        newPost[event.target.id] = selectedVal;
        // update state
        setPost(newPost);
    }


    //saves the post and redirects user back to postlist page to see posts
    const handleClickSavePost = (event) => {
        event.preventDefault()
        const postCopy = { ...post } //prevents the browser from submitting the form
        addPost(postCopy)
            .then(() => history.push("/"))
    }

    //return gives us the concert form and allows user to add a concert
    return (
        <form>
            <h2>New Post</h2>
            <fieldset>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" onChange={handleControlledInputChange} required autoFocus placeholder="Post Title" value={post.title} />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input type="text" id="description" onChange={handleControlledInputChange} required autoFocus placeholder="Post Description" value={post.description} />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="url">Url:</label>
                    <input type="text" id="url" onChange={handleControlledInputChange} required autoFocus placeholder="Post Url" value={post.url} />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="completeBy">Complete By:</label>
                    <input type="date" id="completeBy" onChange={handleControlledInputChange} required autoFocus placeholder="Complete By" value={post.createDateTime} />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <button onClick={handleClickSavePost}>Save Post</button>
                </div>
            </fieldset>
        </form>
    )

}
export default PostForm;