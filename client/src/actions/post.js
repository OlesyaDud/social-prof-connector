import axios from 'axios';
import { ADD_POST, DELETE_POST, GET_POSTS, GET_POST, POST_ERROR, UPDATE_LIKES, ADD_COMMENT, REMOVE_COMMENT } from './types';
import { setAlert} from './alert';

// get posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { 
                msg: error.response.statusText, 
                status: error.response.status
            }
        }) 
    }
};

// get post
export const getPost = id => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${id}`);

        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { 
                msg: error.response.statusText, 
                status: error.response.status
            }
        }) 
    }
};

// add like
export const addLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { 
                msg: error.response.statusText, 
                status: error.response.status
            }
        }) 
    }
};

// remove like
export const removeLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { 
                msg: error.response.statusText, 
                status: error.response.status
            }
        }) 
    }
};

// delete post
export const deletePost = id => async dispatch => {
    try {
       await axios.delete(`/api/posts/${id}`);

        dispatch({
            type: DELETE_POST,
            payload: id
        });

        dispatch(setAlert('Post Removed', 'success'));

    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { 
                msg: error.response.statusText, 
                status: error.response.status
            }
        });
    }
};
// add post
export const addPost = FormData => async dispatch => {
    // since sending data, need headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
       const res = await axios.post(`/api/posts`, FormData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data
        });

        dispatch(setAlert('Post Created', 'success'));

    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { 
                msg: error.response.statusText, 
                status: error.response.status
            }
        }) 
    }
};

// add comment
export const addComment = (postId, FormData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`/api/posts/comment/${postId}`, FormData, config);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data 
        });

        dispatch(setAlert('Comment Added', 'success'));

    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { 
                msg: error.response.statusText, 
                status: error.response.status
            }
        }) 
    }
};

// remove comment
export const deleteComment = (postId, commentId) => async dispatch => {
    try {
        const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        });

        dispatch(setAlert('Comment Removed', 'success'));

    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { 
                msg: error.response.statusText, 
                status: error.response.status
            }
        }) 
    }
};
