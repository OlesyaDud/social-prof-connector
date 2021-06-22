// racfp
import React, {Fragment, useEffect} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { deleteAccount, getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import Experience from './Experience';
import Education from './Education';
import DashboardActions from './DashboardActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMinus } from '@fortawesome/free-solid-svg-icons';


const Dashboard = ({
    getCurrentProfile,
    deleteAccount, 
    auth: {user}, 
    profile: {profile}
}) => {

    useEffect(()=> {
        getCurrentProfile();
    }, [getCurrentProfile]);


    return (
    <Fragment>
    <h1 className="large text-primary">Dashboard</h1>
    {/*pulling user from auth--if user exists-than show user name */}
    <p className="lead">Welcome, { user && user.name } </p>

    {profile !== null ? (
        <Fragment>
            <DashboardActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />

            <div className="my-2">
                <button 
                className="btn btn-danger"
                onClick={()=> deleteAccount()}
                >
                <FontAwesomeIcon icon={faUserMinus} />{' '}
                Delete Account
                </button>
            </div>
        </Fragment> 
        ) : (
        <Fragment>
        <p>Please set up Profile.</p>
        <Link to='/create-profile' className="btn btn-primary my-1">Create Profile</Link>
        </Fragment>
        )}
    </Fragment>
    );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

// from reducer index.js will be called in this component
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount}) (Dashboard);
