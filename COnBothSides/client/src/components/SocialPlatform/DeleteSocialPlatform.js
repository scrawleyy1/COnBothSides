import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { deleteSocialPlatform } from "../../modules/socialPlatformManager";
import { Button } from "reactstrap";

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
        <form className="cardform">
            <h2> Delete Social Platform:</h2>
            <p>Are you sure you want to delete this social platform?</p>
            <div className="submit-wrapper">
                <Button onClick={handleConfirmDeleteSocialPlatform}>Delete</Button>
                <Button onClick={() => history.push("/socialPlatform")}>Cancel</Button></div>
        </form>
    );
};

export default DeleteSocialPlatform;