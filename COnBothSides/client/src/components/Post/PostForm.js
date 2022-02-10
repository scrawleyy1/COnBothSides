import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getAllCategories } from "../../modules/categoryManager";
import { getAllSocialPlatforms } from "../../modules/socialPlatformManager";
import { addPost } from "../../modules/postManager";
import { Button } from "reactstrap";
import "./Post.css"

export const PostForm = () => {

    //useState will hold the post title, decription, url, ...
    const [post, setPost] = useState({
        title: "",
        description: "",
        url: "",
        completeBy: "",
        categoryId: 0,
        socialPlatformId: 0,
        complete: false
    });

    const [categories, setCategories] = useState([])

    useEffect(() => {
        getAllCategories().then(res => {
            setCategories(res)
        })
    }, [])

    const [socialPlatform, setSocialPlatform] = useState([])

    useEffect(() => {
        getAllSocialPlatforms().then(res => {
            setSocialPlatform(res)
        })
    }, [])

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
        <form className="cardform">
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
                    <label htmlFor="category">Category:</label>
                    <select id="categoryId" onChange={handleControlledInputChange} required autoFocus placeholder="Category" value={post.categoryId} >
                        <option value="null">Select Category</option>
                        {categories.map(c => (<option key={c.id} value={c.id}>{c.name}</option>))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="socialPlatform">Social Media Platform:</label>
                    <select id="socialPlatformId" onChange={handleControlledInputChange} required autoFocus placeholder="Social Media Platform" value={socialPlatform.name} >
                        <option value="null">Select Social Media Platform</option>
                        {socialPlatform.map(sp => (<option key={sp.id} value={sp.id}>{sp.name}</option>))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="submit-wrapper">
                    <Button onClick={handleClickSavePost}>Save Post</Button>
                    <Button
                        onClick={() => history.push("/")} >
                        Cancel
                    </Button>
                </div>
            </fieldset>
        </form>
    )

}
export default PostForm;