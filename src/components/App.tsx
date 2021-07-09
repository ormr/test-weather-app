import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { SearchBox } from './SearchBox';
import { Table } from './Table';
import { Tabs } from './Tabs';
import 'bootstrap/dist/css/bootstrap.min.css';

export const App: React.FC = () => {
  return (
    <div className="container">
      <h1>Погода в вашем списке городов</h1>
      <SearchBox />
      <Tabs />
      <Switch>
        <Route exact path="/">
          <Table show="ALL" />
        </Route>
        <Route path="/all">
          <Table show="ALL" />
        </Route>
        <Route path="/active">
          <Table show="ACTIVE" />
        </Route>
        <Route path="/deleted">
          <Table show="DELETED" />
        </Route>
      </Switch>
    </div>
  );
};
