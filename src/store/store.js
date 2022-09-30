import { configureStore } from "@reduxjs/toolkit";

import PostsReducer from "./slice/postSlice";
import UserReducer from "./slice/users"

export const store = configureStore({
    reducer: {
        posts: PostsReducer,
        users: UserReducer
    }
})
