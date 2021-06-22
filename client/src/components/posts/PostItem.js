import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { addLike, deletePost, removeLike } from '../../actions/post';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faTimes } from '@fortawesome/free-solid-svg-icons';



const PostItem = ({
    addLike,
    removeLike,
    deletePost,
    auth,
    post: {
        _id, text, name, avatar, user, likes, comments, date
    },
    showActions
}) => (
        <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user}`}>
            <img
              className="round-img"
              src={avatar}
              alt=""
            />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{text}</p>

           <p className="post-date">
              Posted on <Moment format='YYY/MM/DD'>{date}</Moment>
          </p>

          {showActions && <Fragment>
            
        <button     
          type="button"
          onClick={e => addLike(_id)}
          className="btn btn-light"
        > <FontAwesomeIcon icon={faThumbsUp} /> {' '}
        <span>{likes.length > 0 && (
            <span>{likes.length}</span>
        )}</span>
        </button>

        <button      
          type="button"
          onClick={e => removeLike(_id)}
          className="btn btn-light"
        > <FontAwesomeIcon icon={faThumbsDown} />  {' '}
        </button>

        <Link to={`/posts/${_id}`} className='btn btn-primary'> Discussion {comments.length > 0 && (
           <span className='comment-count'>{comments.length}</span>
        )}</Link>

        {/* {!auth.loading && user === auth.user._id && ( */}
            <button      
            type="button"
            onClick={e => deletePost(_id)}
            className="btn btn-danger"
            > <FontAwesomeIcon icon={faTimes} />  {' '}
            </button>
        {/* )} */}
          </Fragment>}
        </div>
      </div>
    );

PostItem.defaultProps = {
  showActions: true
}


PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {addLike, deletePost, removeLike})(PostItem);
