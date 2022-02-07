import React, { useState } from "react";
import { useHistory } from "react-router";
import { addSocialPlatform } from "../../modules/socialPlatformManager";

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
            <h3>Add New Social Platform</h3>
            <div>
                <input id="name" type="text" onChange={handleControlledInputChange} required autoFocus placeholder="Add New Social Platform" value={socialPlatform.name} />
                <button onClick={handleClickSaveSocialPlatform}>Save Social Platform</button>
            </div>
        </>
    )
}

export default SocialPlatformForm;