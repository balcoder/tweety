import { LOAD_MESSAGES, REMOVE_MESSAGE } from '../actionTypes';

const message = (state = [], action) => {
  switch (action.type) {
    case LOAD_MESSAGES:
      console.log('reducers/message.js: ',action.messages);
      return [...action.messages];
    default:
      return state;
  }
}

export default message;