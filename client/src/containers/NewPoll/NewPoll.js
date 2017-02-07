import React, { Component } from 'react';
import Textarea from 'react-textarea-autosize';

export default class NewPoll extends Component {

  updateField(value, field) {
    if (typeof field === 'object'){
      this.props.actions.updatePollOptionsField({...field, value: value})
    } else {
      this.props.actions.updatePollField({[field]: value})
    }
  }

  savePoll() {
    const { poll } = this.props;
    this.props.actions.savePoll(poll);
  }

  renderOptions() {
    const { poll } = this.props;
    return poll.options.map((option, index) => {
      return (
        <div key={index} className="answer">
          <input type="text" value={option.value} onChange={(event) => this.updateField(event.target.value, option)} placeholder="Enter poll option" />
        </div>
      )
    });
  }

  render() {
    const { poll } = this.props;
    return (
      <div className="paper">
        <h2 className="title">
          New Poll
        </h2>
        <div className="body">
          <div className="verticleline1"></div>
          <div className="verticleline2"></div>
          <div className="question">
            <Textarea type="text" value={poll.question} onChange={(event) => this.updateField(event.target.value, 'question')} placeholder="Type your question here"></Textarea>
          </div>
          {this.renderOptions()}
          <div className="spacer"></div>
          <div className="checklist-info">
            <div className="checklist">
              <input type="checkbox" name="multiple_answers" id="multiple_answers" onChange={(event) => this.updateField(event.target.checked, 'multiple_answers')} />
              <label htmlFor="multiple_answers"></label>
            </div>
            <span className="checklist-label">Multiple Poll Answers</span>
          </div>
          <div className="checklist-info">
            <div className="checklist">
              <input type="checkbox" name="duplicate_ip" id="duplicate_ip" onChange={(event) => this.updateField(event.target.checked, 'duplicate_ip')} />
              <label htmlFor="duplicate_ip"></label>
            </div>
            <span className="checklist-label">IP Duplication Checking</span>
          </div>
          <div className="spacer-small"></div>
          <button className="create-poll" onClick={() => this.savePoll()}>Create Poll</button>
          <div className="clearfix"></div>
        </div>
      </div>
    );
  }
}