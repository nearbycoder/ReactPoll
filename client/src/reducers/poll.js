import * as types from '../constants/ActionTypes';
import uuid from 'node-uuid';

const poll = {
  question: '',
  options: [{id: uuid.v4(), value: '', votes: 0}],
  multiple_answers: false,
  duplicate_ip: false,
  total_votes: 0
};

export default function reducer (state = poll, action) {
  switch (action.type) {
    case types.NEW_POLL:
      return poll;
    case types.SET_POLL:
      return action.poll;
    case types.GET_POLL:
      return {
        ...state,
        ...action.poll
      };
    case types.SAVE_POLL:
      return {
        ...state,
        ...action.poll
      };
    case types.UPDATE_POLL_FIELD:
      return {
        ...state,
        ...action.poll
      };
    case types.UPDATE_POLL_OPTIONS_FIELD:
      const newOptions = state.options.map((option) => {
        if (option.id === action.option.id){
         return { ...option, ...action.option }
        }
        return option;
      })
      const isEmpty = newOptions.every((option) => {
        return option.value !== "";
      })
      return {
        ...state,
        options: newOptions.concat(isEmpty ? [{id: uuid.v4(), value: '', votes: 0}] : [])
      };
    default:
      return state;
  }

}
