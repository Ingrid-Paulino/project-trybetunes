import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../pages/NotFound';

export default class Content extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/NotFound" component={ NotFound } />
        </Switch>
      </main>
    );
  }
}
