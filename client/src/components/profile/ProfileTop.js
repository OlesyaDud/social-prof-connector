import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe} from '@fortawesome/free-solid-svg-icons';

const ProfileTop = ({
    profile: {status, company, location, website, social,
    user: {name, avatar}
}}) => {
    return (
        <div className="profile-top bg-primary p-2">
        <img
          className="round-img my-1"
          src={avatar}
          alt=""
        />
        <h1 className="large">{name}</h1>
        <p className="lead">{company && <span>at {''}{company}</span>}</p>
        <p>{location && <span>{location}</span>}</p>

        {
            website && (
                <a href={website} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon className="fas fa-globe fa-2x" icon={faGlobe} />
                </a>
            )}
        {
            social && social.telegram && (
                <a className="text-dark" href={social.telegram} target='_blank' rel="noopener noreferrer">Telegram</a>
            )
        }    
        {
            social && social.youtube && (
                <a className="text-dark" href={social.youtube} target='_blank' rel="noopener noreferrer">Youtube</a>
            )
        }    
        {
            social && social.linkedin && (
                <a className="text-dark" href={social.linkedin} target='_blank' rel="noopener noreferrer">Linkedin</a>
            )
        }    

        </div>

    )
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileTop;
