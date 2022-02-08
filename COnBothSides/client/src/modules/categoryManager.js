import { getToken } from "./authManager";

const baseUrl = "/api/category";

export const getAllCategories = () => {

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
                throw new Error("An error occurred while retrieving categories")
            }
        })
    })
}

export const addCategory = (newCategory) => {
    return getToken().then(token => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCategory)
        })
    })
}

export const deleteCategory = (category) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${category}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category)
        }).then((res) => {
            if (res.ok) {
                return
            } else {
                throw new Error("An unknown error occurred while trying to delete categorys.");
            }
        })
    })
}