import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAllSocialPlatforms, deleteSocialPlatform } from "../../modules/socialPlatformManager";
import { SocialPlatformCard } from "./SocialPlatformCard";

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
            <section>
                <button type="button" onClick={() => history.push("/socialPlatform/create")}>
                    Add new Social Media Platform
                </button>
                <h1>Social Meadia Platforms</h1>
                <div>{socialPlatforms.map(socialPlatform => <SocialPlatformCard key={socialPlatform.id} socialPlatform={socialPlatform} handleDeleteSocialPlatform={handleDeleteSocialPlatform} />)}</div>
            </section>
        </>
    )
}

export default SocialPlatformList;