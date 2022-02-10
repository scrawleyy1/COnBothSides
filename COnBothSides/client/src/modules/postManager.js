import { getToken } from "./authManager";
import { addSocialPlatformToPost } from "./socialPlatformManager";

const baseUrl = "/api/post";

export const getAllPosts = () => {

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
                throw new Error("An error occured while retrieving posts")
            }
        })
    })
}

export const getPostById = (id) => {

    return getToken().then(token => {
        return fetch(baseUrl + `/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error("An error occurred while retrieving the post")
            }
        })
    })
}

export const deletePost = (id) => {
    return getToken().then(token => {
        return fetch(`${baseUrl}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
    })
}

export const addPost = (newPost) => {
    return getToken().then(token => {
        return fetch(`${baseUrl}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(newPost)
        }).then(res => res.json())
    })
}

export const deletePlatformsForPost = (postId) => {
    return getToken().then(token => {
        return fetch(`/api/platformPost/${postId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    })
}

export const addPlatformToPost = (postId, socialPlatformId) => {
    return getToken().then(token => {
        return fetch(`/api/platformPost/${socialPlatformId}?postId=${postId}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    })
}

export const updatePost = (post) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${post.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(post),
        }).then(getAllPosts());
    })
}

export const postComplete = (post) => {
    post.status === true ? post.status = false : post.status = true
    return fetch(`${baseUrl}/${post.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    }).then(data => data.json());
}