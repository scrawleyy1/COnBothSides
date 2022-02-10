import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAllSocialPlatforms, deleteSocialPlatform } from "../../modules/socialPlatformManager";
import { SocialPlatformCard } from "./SocialPlatformCard";
import { Button } from "reactstrap";

export const SocialPlatformList = () => {
    const [socialPlatforms, setSocialPlatform] = useState([]);

    const history = useHistory();

    const getSocialPlatforms = () => {
        getAllSocialPlatforms().then(socialPlatform => setSocialPlatform(socialPlatform));

    }

    const handleDeleteSocialPlatform = id => {
        deleteSocialPlatform(id)
            .then(() => getAllSocialPlatforms().then(setSocialPlatform));
    }

    useEffect(() => {
        getSocialPlatforms();
    }, []);


    return (
        <>
            <section className="card-list">
                <Button type="button" onClick={() => history.push("/socialPlatform/create")}>
                    Add Social Media Platform
                </Button>
                <h1>Social Media Platforms</h1>
                <div className="cardform h2">{socialPlatforms.map(socialPlatform => <SocialPlatformCard key={socialPlatform.id} socialPlatform={socialPlatform} handleDeleteSocialPlatform={handleDeleteSocialPlatform} />)}</div>
            </section>
        </>
    )
}

export default SocialPlatformList;