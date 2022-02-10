import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { updateSocialPlatform, getSocialPlatformsById } from "../../modules/socialPlatformManager";
import { Button } from "reactstrap";
import "../Post/Post.css"


export const SocialPlatformUpdateForm = () => {
    const [socialPlatform, setSocialPlatform] = useState({ name: "" });

    const { id } = useParams();
    const history = useHistory();

    const getSocialPlatform = () => {
        getSocialPlatformsById(id).then(res => setSocialPlatform(res));
    }

    useEffect(() => {
        getSocialPlatform();
    }, [])

    const handleControlledInputChange = (event) => {
        const newSocialPlatform = { ...socialPlatform };
        let selectedVal = event.target.value;

        newSocialPlatform[event.target.id] = selectedVal;

        setSocialPlatform(newSocialPlatform);
    };

    const handleClickSaveSocialPlatform = (event) => {
        event.preventDefault(); //Prevents the browser from submitting the form
        updateSocialPlatform(socialPlatform).then(() => history.push("/socialPlatform"))
    };

    return (
        <>
            <form className="cardform">
                <div>
                    <h3>Edit Social Media Platform</h3>
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        required
                        autoFocus
                        onChange={handleControlledInputChange}
                        id="name"
                        placeholder="Social Media Platform Name"
                        value={socialPlatform.name} />
                </div>
                <div className="submit-wrapper">
                    <Button
                        onClick={handleClickSaveSocialPlatform} >Save</Button>
                    <Button onClick={() => history.push("/socialPlatform")}>Cancel</Button></div>
            </form>
        </>
    );
}
export default SocialPlatformUpdateForm;