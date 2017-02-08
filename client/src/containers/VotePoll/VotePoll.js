import React, { Component } from 'react';

export default class Vote extends Component {

  constructor(props) {
    super(props);
    this.props.actions.getPoll(props.params.id);
  }

  pollVote() {
    const votes = Object.keys(this.refs).filter((key) => {
      return this.refs[key].checked;
    })
    const { poll } = this.props;
    this.props.actions.pollVote(votes, poll);
  }

  updateClicked(event) {
    const { poll } = this.props;
    if (!poll.multiple_answers) {
      Object.keys(this.refs).forEach((key) => {
        return this.refs[key].checked = false;
      });
      event.target.checked = true;
    }
  }

  renderOptions() {
    const { poll } = this.props;
    return poll.options.map((option, index) => {
      return (
        <div key={index} className="answer-vote">
          <div className="checklist-info">
            <div className="checklist">
              <input type="checkbox" name={option.id} id={option.id} ref={option.id} onClick={(event) => this.updateClicked(event)} />
              <label htmlFor={option.id}></label>
            </div>
            <span className="checklist-label vote-label">{ option.value }</span>
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
          <div className="question-vote">
            {poll.question}
          </div>
          {this.renderOptions()}
          <div className="spacer"></div>
          <div className="spacer-small"></div>
          <button className="create-poll" onClick={() => this.pollVote()}>See Results</button>
          <div className="clearfix"></div>
        </div>
      </div>
    );
  }
}