import { getToken } from "./authManager";

const baseUrl = "/api/socialPlatform";

export const getAllSocialPlatforms = () => {

    return getToken().then(token => {
        return fetch(baseUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error("An error occurred while retrieving social platforms")
            }
        })
    })
}

export const addSocialPlatform = (newSocialPlatform) => {
    return getToken().then(token => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newSocialPlatform)
        })
    })
}

export const deleteSocialPlatform = (socialPlatform) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${socialPlatform}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(socialPlatform)
        }).then((res) => {
            if (res.ok) {
                return
            } else {
                throw new Error("An unknown error occurred while trying to delete social platform.");
            }
        })
    })
}