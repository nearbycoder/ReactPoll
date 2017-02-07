import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import { App, NotFound, Header, NewPoll, VotePoll, ResultsPoll } from './containers'; 

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App}>
      <IndexRoute components={{header: Header, main: NewPoll}} />
      <Route path='404' components={{header: Header, main: NotFound}} />
      <Route path=':id' components={{header: Header, main: VotePoll}} />
      <Route path=':id/r' components={{header: Header, main: ResultsPoll}} />
    </Route>
  </Router>
);

export default Routes;