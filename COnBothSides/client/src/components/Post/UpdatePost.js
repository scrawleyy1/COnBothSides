import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { updatePost, getPostById, addPlatformToPost, deletePlatformsForPost } from "../../modules/postManager";
import { getAllSocialPlatforms } from "../../modules/socialPlatformManager";
import { getAllCategories } from "../../modules/categoryManager";
import { Button } from "reactstrap";
import "./Post.css"


export const PostUpdateForm = () => {
    const [post, setPost] = useState({
        title: "",
        description: "",
        url: "",
        completeBy: "",
        categoryId: 0,
        complete: false
    });

    const [categories, setCategories] = useState([])

    useEffect(() => {
        getAllCategories().then(res => {
            setCategories(res)
        })
    }, [])

    const [socialPlatforms, setSocialPlatforms] = useState([])

    useEffect(() => {
        getAllSocialPlatforms().then(res => {
            setSocialPlatforms(res)
        })
    }, [])

    const [chosenPlatformIds, setchosenPlatformIds] = useState([])

    const { id } = useParams()
    const history = useHistory();

    const getPost = () => {
        getPostById(id).then(res => {
            setPost(res)
            setchosenPlatformIds(res.platforms.map(p => p.id))
        });
    }

    useEffect(() => {
        getPost();
    }, [])


    const handleControlledInputChange = (event) => {
        const newPost = { ...post };
        let selectedVal = event.target.value;

        newPost[event.target.id] = selectedVal;

        setPost(newPost);
    };

    const handleClickSavePost = (event) => {
        event.preventDefault(); //Prevents the browser from submitting the form
        updatePost(post)
            .then((updatedPost) => {
                deletePlatformsForPost(post.id)
                    .then(() => {
                        const promises = []
                        for (let id of chosenPlatformIds) {
                            promises.push(addPlatformToPost(post.id, id))
                        }
                        Promise.all(promises).then(history.push("/"));
                    })
            })
    }

    const handleMultiSelect = (event) => {
        const options = []
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            options.push(parseInt(event.target.selectedOptions[i].value))
        }
        setchosenPlatformIds(options)
    }



    return (
        <>
            <form className="cardeditform">
                <div>
                    <h3>Edit Post</h3>
                    <label htmlFor="title">Title: </label>
                    <input
                        type="text"
                        required
                        autoFocus
                        onChange={handleControlledInputChange}
                        id="title"
                        placeholder="Title"
                        value={post.title} />
                </div>
                <div>
                    <label htmlFor="description">Description: </label>
                    <input
                        type="text"
                        required
                        autoFocus
                        onChange={handleControlledInputChange}
                        id="description"
                        placeholder="Description"
                        value={post.description} />
                </div>
                <div>
                    <label htmlFor="url">Url: </label>
                    <input
                        type="text"
                        required
                        autoFocus
                        onChange={handleControlledInputChange}
                        id="url"
                        placeholder="Url"
                        value={post.url} />
                </div>
                <div>
                    <label htmlFor="completeBy">Complete By: </label>
                    <input
                        type="date"
                        required
                        autoFocus
                        onChange={handleControlledInputChange}
                        id="completeBy"
                        placeholder="Complete By"
                        value={post.completeBy} />
                </div>
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
                        <select value={chosenPlatformIds} multiple id="socialPlatformId" onChange={handleMultiSelect} required autoFocus placeholder="Social Media Platform" >
                            <option value="null">Select Social Media Platform</option>
                            {socialPlatforms.map(sp => (<option key={sp.id} value={sp.id}>{sp.name}</option>))}
                        </select>
                    </div>
                </fieldset>
                <div className="submit-wrapper">
                    <Button
                        onClick={handleClickSavePost} >Save Post</Button>
                    <Button
                        onClick={() => history.push("/")} >
                        Cancel
                    </Button>


                </div>
            </form>
        </>
    );
}
export default PostUpdateForm;