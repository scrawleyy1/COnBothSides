import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { useHistory } from "react-router-dom";

export const SocialPlatformCard = ({ socialPlatform }) => {

    const history = useHistory();

    const handleDeleteSocialPlatform = () => {
        history.push(`/deleteSocialPlatform/${socialPlatform.id}`)
    };

    return (
        <Card>
            <CardBody>
                <strong>{socialPlatform.name}</strong>
                <div>
                    <Button type="button" onClick={() => history.push(`/socialPlatform/${socialPlatform.id}/edit`)}>Edit</Button>
                    <Button type="button" onClick={() => handleDeleteSocialPlatform(socialPlatform.id)}>Delete</Button>
                </div>
            </CardBody>
        </Card>
    )
}

export default SocialPlatformCard;