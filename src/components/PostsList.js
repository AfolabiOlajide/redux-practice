import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";

import { selectAllPost, getPostStatus, getPostsError, fetchPosts } from "../store/slice/postSlice";
import PostExcerpts from './PostExcerpts';


const PostsList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectAllPost);
    const postsStatus = useSelector(getPostStatus);
    const postsError = useSelector(getPostsError);

    useEffect(() => {
        if(postsStatus === "idle"){
            dispatch(fetchPosts());
        }
    }, [postsStatus, dispatch]);

    let content;
    if(postsStatus === "loading"){
        content = <p>"Loading..."</p>
    }else if(postsStatus === "accepted"){
        const orderedPost = posts.slice().sort((a,b) => b.date.localeCompare(a.date));
        content = orderedPost.map(post => <PostExcerpts key={post.id} post={post} />);
    }else if(postsStatus === "failed"){
        content = <p>{postsError}</p>
    }

    
    return (
        <section>
            <h2>Posts</h2>
            {content}
        </section>
    )
}

export default PostsList