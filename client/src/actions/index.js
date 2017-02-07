import * as types from '../constants/ActionTypes';
import { push } from 'react-router-redux';

export function savePoll (poll) {
  return (dispatch, getState) => {
    const body = JSON.stringify({...poll});
    fetch('http://127.0.0.1:9090/poll', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: body
    })
    .then(response => response.json())
    .then(response => {
      dispatch({ type: types.SAVE_POLL, poll: response.poll});
      dispatch(push(`/${response.poll.id}`));
    })
  }
}

export function pollVote (votes, poll) {
  return (dispatch, getState) => {
    const body = JSON.stringify({...votes});
    fetch(`http://127.0.0.1:9090/poll/${poll.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: body
    })
    .then(response => response.json())
    .then(response => {
      dispatch(push(`/${response.id}/r`));
    })
  }
}

export function getPoll (id) {
  return (dispatch, getState) => {
    fetch(`http://127.0.0.1:9090/poll/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(response => {
      if(response.error) {
        dispatch(push('/404'));
      } else {
        dispatch({ type: types.GET_POLL, poll: response});
      }
      
    })
  }
}

export function newPoll () {
  return (dispatch, getState) => {
    dispatch({ type: types.NEW_POLL});
    dispatch(push(`/`));
  }
}

export function setPoll (poll) {
  return {
    type: types.SET_POLL,
    poll: poll
  };
}

export function updatePollField (poll) {
  return {
    type: types.UPDATE_POLL_FIELD,
    poll: poll
  };
}

export function updatePollOptionsField (option) {
  return {
    type: types.UPDATE_POLL_OPTIONS_FIELD,
    option: option
  };
}