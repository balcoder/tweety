import React from 'react';
import Moment from 'react-moment';
import { Link } from  'react-router-dom';
import DefaultProfileImg from '../images/tweety-shadow.jpg';
import { removeMessage } from '../store/actions/messages';

const MeassageItem = ({ date, profileImageUrl, text, username, removeMessage, isCorrectUser }) => (
  <div>
    <li className="list-group-item">
      <img src={profileImageUrl || DefaultProfileImg} alt={username} height="100px" width="100px" className="timeline-image" />
      <div className="message-area">
        <Link to='/'>@{username} &nbsp;</Link>
        <span className="text-muted">
          <Moment className="text-muted" format="Do MMM YYYY">
            {date}
          </Moment>
        </span>
        <p>{text}</p>
        {isCorrectUser && (
          <button className="btn btn-danger" onClick={removeMessage}>
              Delete
        </button>
        )}        
      </div>
    </li>
    
  </div>
);

export default MeassageItem;