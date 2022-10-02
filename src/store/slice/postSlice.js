import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const initialState = {
    posts: [],
    status: "idle",
    error: null
}

// posts URL
const POST_URL ="https://jsonplaceholder.typicode.com/posts"

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    try{
        const response = await axios.get(POST_URL);
        return response.data

    }catch (err){
        return err.message;
    }
});

export const addNewPost = createAsyncThunk("posts/addNewPost", async (initialPost) => {
    try {
        const response = await axios.post(POST_URL, initialPost);
        return response.data;
    } catch (error) {
        return error.message
    }
})

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: {
            reducer (state, action) {
                state.posts.push(action.payload)
            },
            prepare (title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                    
                }
            }
        },
        reactionAdded (state, action) {
            const { postId, reaction } = action.payload
            const exixtingPost = state.posts.find(post => post.id === postId);
            if(exixtingPost){
                exixtingPost.reactions[reaction]++;
            }
        }
    },
    extraReducers(builder){
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "accepted"
                // adding date and reactions
                let min = 1;
                const loadedPost = action.payload.map(post => {
                    post.date = sub(new Date(), {minutes: min++}).toISOString();
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;
                })
                // Add any fetched post to the array
                state.posts = loadedPost;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                action.payload.userId = Number(action.payload.userId);
                action.payload.date = new Date().toISOString();
                action.payload.reactions ={
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }
                console.log(action.payload);
                state.posts.push(action.payload);
            })
    }
    
});

export const selectAllPost = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;


export const { postAdded, reactionAdded } = postSlice.actions;
export default postSlice.reducer;