// function that takes the token if it is there and takes it to headers, and deletes from headers
import axios from 'axios';

// when we have a token we will send it with every request instead of choosing which request to send it with

const setAuthToken = token => {
    // token comes from local storage
    if(token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
};

export default setAuthToken;