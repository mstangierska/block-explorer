import React from 'react';
import { Tabs, Tab } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

export default function TabNavigation() {
  const location = useLocation();

  const pathToIndex = {
    '/': 0,
    '/blocks': 1,
    '/transactions': 2,
    '/lookup': 3,
    '/blockexplorer' : 4
  };

  const currentTabIndex = pathToIndex[location.pathname] || 0; // Default to 0 if path doesn't match

  return (
    <Tabs value={currentTabIndex} aria-label="navigation tabs">
      <NavLink to="/" exact activeClassName="active-link">
        <Tab label="Home" value="/" />
      </NavLink>
      <NavLink to="/lookup" activeClassName="active-link">
        <Tab label="Look up" value="/lookup" />
      </NavLink>
      <NavLink to="/blockexplorer" activeClassName="active-link">
        <Tab label="Block explorer" value="/blockexplorer" />
      </NavLink>
    </Tabs>
  );
}
