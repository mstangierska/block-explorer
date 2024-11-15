import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TabNavigation from './components/TabNavigation';
import TransactionsPage from './pages/TransactionsPage';
import HomePage from './pages/HomePage.js';
import BlockExplorer from './pages/BlockExplorer.js';
import AddressPage from './pages/AddressPage.js';

function App() {
  return (
    <BrowserRouter>
      <TabNavigation />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/transactions" component={TransactionsPage} />
        <Route path="/blockexplorer" component={BlockExplorer} />
        <Route path="/address" component={AddressPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;