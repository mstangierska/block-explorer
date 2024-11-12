import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TabNavigation from './components/TabNavigation';
import HomePage from './pages/HomePage';
import BlocksPage from './pages/BlocksPage';
import TransactionsPage from './pages/TransactionsPage';
import NewPage from './pages/NewPage.js';
import BlockExplorer from './pages/BlockExplorer.js';
function App() {
  return (
    <BrowserRouter>
      <TabNavigation />
        <Route path="/" component={HomePage} />
        <Route path="/lookup" component={NewPage} />
        <Route path="/transactions" component={TransactionsPage} />
        <Route path="/blockexplorer" component={BlockExplorer} />
    </BrowserRouter>
  );
}

export default App;