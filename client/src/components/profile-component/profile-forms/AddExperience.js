import React, {Fragment, useState} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { addExperience} from '../../../actions/profile';
import PropTypes from 'prop-types';

const AddExperience = props => {
    const [formData, setFormData] = useState({
        company: '',
        title: '',
        from: '',
        to:'',
        location: '',
        current: false,
        description: ''
    });

    const [ toDateDisabled, toggleDisabled ] = useState(false);

    const {company, title, location, from, to, current, description} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});


    return (
        <Fragment>
        <h1 className="large text-primary">
       Add An Experience
      </h1>
      <p className="lead">
         Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form 
      className="form"
      onSubmit={e => {
          e.preventDefault();
          props.addExperience(formData, props.history);
      }}
      >
        <div className="form-group">
          <input 
          type="text" 
          placeholder="* Job Title" 
          name="title" 
          required
          onChange={onChange}
          value={title}
          />
        </div>
        <div className="form-group">
          <input 
          type="text" 
          placeholder="* Company" 
          name="company" 
          required 
          onChange={onChange}
          value={company}
          />
        </div>
        <div className="form-group">
          <input 
          type="text" 
          placeholder="Location" 
          name="location" 
          onChange={onChange}
          value={location}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input 
          type="date" 
          name="from" 
          onChange={onChange}
          value={from}
          />
        </div>
         <div className="form-group">
          <p><input 
          type="checkbox" 
          name="current" 
          value="" 
          onChange={e=> {
              setFormData({...formData, current: !current});
              toggleDisabled(!toDateDisabled);
          }}
          checked={current}
          value={current}
          />{' '} Current Job</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input 
          type="date" 
          name="to"
          onChange={onChange}
          disabled={toDateDisabled ? 'disabled' : ''}
          value={to} />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            onChange={onChange}
          value={description}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <a class="btn btn-light my-1" href="dashboard.html">Go Back</a>
      </form>
        </Fragment>
    )
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired
}

export default connect(null, {addExperience})(withRouter(AddExperience));
