import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretSquareDown, faArrowAltCircleUp, faUser } from '@fortawesome/free-solid-svg-icons';


const DashboardActions = () => {
    return (
        <div className="dash-buttons">
        <Link to="/edit-profile" className=" brn btn-outline-primary p-1"><FontAwesomeIcon icon={faUser} />Edit Profile</Link>
        <Link to="/add-experience" className=" brn btn-outline-secondary p-1"><FontAwesomeIcon icon={faArrowAltCircleUp} />Add Experience</Link>
        <Link to="/add-education" className=" brn btn-outline-info p-1"><FontAwesomeIcon icon={faCaretSquareDown} />Add Education</Link>       
        </div>
    )
}
export default DashboardActions;
