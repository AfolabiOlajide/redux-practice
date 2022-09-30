import React from 'react';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

const PostExcerpts = ({ post }) => {
    return (
        <article>
            <h3>{post.title}</h3>
            <p>{post.body.substring(0, 100)}</p>
            <p>
                <PostAuthor userId={post.userId} />
            </p>
            <p>
                <TimeAgo timeStamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </article>
    )
}

export default PostExcerpts