import axios from 'axios';
import { setAlert } from './alert';
import { 
    REGISTER_SUCCESS, 
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser =()=> async dispatch => {
    // will set token into header if there is one
    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
       const res = await axios.get('/api/auth');

       dispatch({
           type: USER_LOADED,
           payload: res.data
       })
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        });
    }
};

// Login User
export const login = (email, password ) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/api/auth', body, config);

        // if everything is ok
        dispatch({
            type: LOGIN_SUCCESS,
            // token
            payload: res.data
        });

    dispatch(loadUser());

    }catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            // dispatch to auth reducer Register Fail part
            type: LOGIN_FAIL
        })
    }
};

// 
export const register = ({ name, email, password }) => async dispatch => {
    // same steps as commented out in Register component
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, password });

    try {
        const res = await axios.post('/api/users', body, config);

        // if everything is ok
        dispatch({
            type: REGISTER_SUCCESS,
            // token
            payload: res.data
        });

    dispatch(loadUser());

    }catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            // dispatch to auth reducer Register Fail part
            type: REGISTER_FAIL
        })
    }
};


// logout
export const logout =()=> dispatch => {
    dispatch({type: LOGOUT});
}
