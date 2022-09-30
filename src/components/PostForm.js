import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNewPost } from "../store/slice/postSlice";
import { selectAllUsers } from "../store/slice/users";

import React from 'react'

const PostForm = () => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState();
    const [addRequestStatus, setAddRequestStatus] = useState('idle');

    const users = useSelector(selectAllUsers);

    const titleHandler = (e) => setTitle(e.target.value);
    const contentHandler = (e) => setContent(e.target.value);
    const userIdHandler = (e) => setUserId(e.target.value)

    // const canSave = Boolean(title) && Boolean(content) && Boolean(userId);
    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === "idle";

    const onSavePostHandler = (e) => {
        e.preventDefault();
        if(canSave){
            try{
                setAddRequestStatus('pending')
                dispatch(addNewPost({title, body: content, userId})).unwrap()

                setTitle("");
                setContent("")
                setUserId()
            } catch (error) {
                console.log('Failed to save post: ', error)
            }finally{
                setAddRequestStatus("idle");
            }            
        }
    }

    const userOptions = users.map(user => (
        <option value={user.id} key={user.id}>
            {user.name}
        </option>
    ))

    return (
        <div>
            <form >
                <input value={title} type="text" placeholder="Enter post title" onChange={titleHandler} />
                <input value={content} type='textarea' placeholder="Enter post content" onChange={contentHandler} />
                <select onChange={userIdHandler}>
                    <option></option>
                    {userOptions}
                </select>
                <button onClick={onSavePostHandler} disabled={!canSave}>Save Post</button>
            </form>
        </div>
    )
}

export default PostForm