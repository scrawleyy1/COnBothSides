import { getToken } from "./authManager";

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

// export const postComplete = (completePost) => {
//     completePost.status = true
//     return fetch(`${baseUrl}/${completePost.id}`, {
//         method: "PATCH",
//         headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(completePost)
//     }).then(data => data.json());
// }