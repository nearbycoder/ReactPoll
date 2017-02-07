import React, { Component, cloneElement } from 'react';
import reduxHelper from './reduxHelper';
import * as Actions from '../../actions';

class App extends Component {
  render () {
    const { main, header } = this.props;
    return (
      <div>
        <div>
          {cloneElement(header, {...this.props})}
        </div>
        <div>
          {cloneElement(main ? main : this.props.children, {...this.props})}
        </div>
      </div>
    );
  }
}

export default reduxHelper(App, {...Actions});
