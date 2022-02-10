import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { getAllPosts } from '../../modules/postManager';
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";

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
            <section className="card-list">
                <Button type="button" onClick={() => { history.push("/post/create"); }}>
                    Create new post
                </Button>
            </section>
            <div>{posts.map(post => <PostCard key={post.id} post={post} />)}</div>
        </div>
        </>
    )
}
export default PostList;