import React, { Component } from 'react';

export default class NotFound extends Component {
  newPoll() {
    this.props.actions.newPoll();
  }

  render() {
    return (
      <div className="paper">
        <div className="body">
          <div className="verticleline1"></div>
          <div className="verticleline2"></div>
          <div className="not-found">
            <h1>
              404 <small>Not Found :(</small>
            </h1>
          </div>
          <button className="create-poll" onClick={() => this.newPoll()}>New Poll</button>
          <div className="clearfix"></div>
        </div>
      </div>
    );
  }
}