import { useSelector } from "react-redux";
import { selectAllUsers } from "../store/slice/users";

import React from 'react'

const PostAuthor = ({userId}) => {
    const users = useSelector(selectAllUsers);
    //eslint-disable-next-line
    const author = users.find(user => user.id == userId);

    return (
        <span>by {author ? author.name : "Unknown Author"}</span>
    )
}

export default PostAuthor