import { apiCall } from '../../services/api';
import { SET_CURRENT_USER } from '../actionTypes';
import { addError, removeError } from './errors';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function authUser(type, userData) {
  return dispatch => {
    // wrap thunk in promise so we can wait for api response
    return new Promise((resolve, reject) => {      
      return apiCall('post', `api/auth/${type}`, userData)
      .then(({token, ...user}) => {        
        localStorage.setItem('jwtToken', token);
        dispatch(removeError()); //remove previous errors
        dispatch(setCurrentUser(user));
        resolve();
      })
      .catch(err => {
        dispatch(addError(err.message));
        reject(); // show the API call failed
      });
    }); 
  };
}
