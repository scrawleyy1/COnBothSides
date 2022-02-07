import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { deleteSocialPlatform } from "../../modules/socialPlatformManager";

export const DeleteSocialPlatform = () => {
    const [socialPlatform, setSocialPlatform] = useState({
        name: "",
    });

    const { id } = useParams();

    const history = useHistory();

    const handleConfirmDeleteSocialPlatform = (event) => {
        event.preventDefault();

        deleteSocialPlatform(id).then(() => history.push("/socialPlatform"));
    };

    return (
        <form>
            <h2> Delete Social Platform:</h2>
            <p>Are you sure you want to delete this social platform?</p>
            <button onClick={handleConfirmDeleteSocialPlatform}>Delete</button>
            <button onClick={() => history.push("/socialPlatform")}>Cancel</button>
        </form>
    );
};

export default DeleteSocialPlatform;