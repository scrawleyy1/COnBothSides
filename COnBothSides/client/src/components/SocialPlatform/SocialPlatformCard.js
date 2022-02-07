import React from "react";
import { Card, CardBody } from "reactstrap";
import { useHistory } from "react-router-dom";

export const SocialPlatformCard = ({ socialPlatform }) => {

    const history = useHistory();

    const handleDeleteSocialPlatform = () => {
        history.push(`/deleteSocialPlatform/${socialPlatform.id}`)
    };

    return (
        <Card>
            <CardBody>
                <p>{socialPlatform.name}</p>
                <button type="button" onClick={() => handleDeleteSocialPlatform(socialPlatform.id)}>Delete</button>
            </CardBody>
        </Card>
    )
}

export default SocialPlatformCard;