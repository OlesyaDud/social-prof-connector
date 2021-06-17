import React, { Fragment, useState} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';


const Register = (props) => {
    const [formData, setFormData]=useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
// formData.name
    const {name, email, password, password2}=formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});


    const onSubmit = async e => {
        e.preventDefault();
        if(password !== password2) {
          // danger is alert type --or css property
            props.setAlert('Passwords do not match', 'danger')
        }else {
            console.log('sss')
        }
    }

    //     const onSubmit = async e => {
//         e.preventDefault();
//         if(password !== password2) {
//             console.log('pass does not match')
//         }else {
//             const newUser = {
//                 name, email, password
//             };

//             try {
// // headers to send               
//                const config = {
//                    headers: {
//                        'Content-Type': 'Application/json'
//                    }
//                }; 
// // body to send
//                const body = JSON.stringify(newUser);
// // post request
//                const res = await axios.post('/api/users', body, config);
//                console.log(res.data);

//             } catch (error) {
//                 console.error(error.response.data);
//             }
//         }
//     }


    return (
       <Fragment>
        <h1 class="large text-primary">Sign Up</h1>
        <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input 
          type="text" 
          placeholder="Name" 
          name="name" 
          required
          value={name}
          onChange={e => onChange(e)} 
          />
        </div>

        <div className="form-group">
          <input 
          ype="email" 
          placeholder="Email Address" 
          name="email"
          value={email}
          onChange={e => onChange(e)}
          required 
           />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small>
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={e => onChange(e)} 
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={e => onChange(e)} 
          />
        </div>

        <input 
        type="submit" 
        className="btn btn-primary" 
        value="Register"  
        />

      </form>
        <p className="my-1">
            Already have an account? <Link to="/login">Sign In</Link>
        </p>
    </Fragment>
    )
};

Register.protoType = {
  setAlert: PropTypes.func.isRequired
}

// setAlert will allow access props.setAlert
export default connect(null, {setAlert})(Register);
