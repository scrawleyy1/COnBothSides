import React, { useState } from "react";
import { useHistory } from "react-router";
import { addSocialPlatform } from "../../modules/socialPlatformManager";
import { Button } from "reactstrap";
import "../Post/Post.css"

export const SocialPlatformForm = () => {
    const [socialPlatform, setSocialPlatform] = useState({
        name: ""
    });

    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newSocialPlatform = { ...socialPlatform };
        let selectedVal = event.target.value;

        newSocialPlatform[event.target.id] = selectedVal;
        // update state
        setSocialPlatform(newSocialPlatform);
    }

    const handleClickSaveSocialPlatform = (event) => {
        event.preventDefault()
        addSocialPlatform(socialPlatform)
            .then(() => history.push("/socialPlatform"))
    }

    return (
        <>
            <h3 className="cardform h2">Add Social Platform</h3>
            <div className="cardform">
                <input id="name" type="text" onChange={handleControlledInputChange} required autoFocus placeholder="Add New Social Platform" value={socialPlatform.name} />
                <div className="submit-wrapper"><Button onClick={handleClickSaveSocialPlatform}>Save Social Platform</Button>
                    <Button onClick={() => history.push("/socialPlatform")}>Cancel</Button></div>
            </div>
        </>
    )
}

export default SocialPlatformForm;