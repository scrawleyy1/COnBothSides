import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { getAllPosts } from '../../modules/postManager';
import { useHistory } from "react-router-dom";

export const PostList = () => {
    const [posts, setPosts] = useState([]);

    const history = useHistory();

    useEffect(() => {
        getAllPosts().then(posts => {
            setPosts(posts)
        })
    }, []);

    return (
        <> <div>
            <section>
                <button type="button" onClick={() => { history.push("/post/create"); }}>
                    Create new post
                </button>
            </section>
            <div>{posts.map(post => <PostCard key={post.id} post={post} />)}</div>
        </div>
        </>
    )
}
export default PostList;