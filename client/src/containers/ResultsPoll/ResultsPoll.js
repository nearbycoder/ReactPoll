import React, { Component } from 'react';
import io from 'socket.io-client';

export default class ResultsPoll extends Component {
  constructor(props) {
    super(props);
    this.props.actions.getPoll(props.params.id);

    var socket = io.connect('http://192.168.10.12:9090', {'sync disconnect on unload':true});
    socket.on(`vote:${props.params.id}`, function(poll){
      props.actions.setPoll(poll);
    });
  }

  newPoll() {
    this.props.actions.newPoll();
  }

  renderOptions() {
    const { poll } = this.props;
    return poll.options.map((option, index) => {
      const width = (option.votes / poll.total_votes) * 100;
      return (
        <div key={index} className="answer-result">
        Votes({option.votes}) : <span className="result-small">{ option.value }</span>
          <div className="bar-result">
            <div className="bar-meter" data-content="adfadsfsfas" style={{width: `${width ? width : 0}%`}}></div>
            <div className="bar-label">{width ? width.toFixed(2) : 0}%</div>
          </div>
        </div>
      )
    });
  }

  render() {
    const { poll } = this.props;
    return (
      <div className="paper">
        <h2 className="title">
          Vote
        </h2>
        <div className="body">
          <div className="verticleline1"></div>
          <div className="verticleline2"></div>
          <div className="question-result">
            {poll.question}
          </div>
          {this.renderOptions()}
          <div className="spacer"></div>
          <div className="spacer-small"></div>
          <button className="create-poll" onClick={() => this.newPoll()}>New Poll</button>
          <div className="clearfix"></div>
        </div>
      </div>
    );
  }
}