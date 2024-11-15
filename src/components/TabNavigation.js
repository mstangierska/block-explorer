import React from 'react';
import { Tabs, Tab } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar } from '@mui/material';
import SearchComponent from './SearchComponent.js';
import styles from './TabNavigation.module.css';

export default function TabNavigation() {
  return (
    <AppBar position="sticky" className={styles.appBar}>
      <Toolbar className={styles.toolbar}>
        <Tabs>
          <NavLink 
            to="/" 
            className={styles.navLink}
            activeClassName={styles.activeLink}
          >
            <Tab label="Lookup" value="/" />
          </NavLink>
          <NavLink 
            to="/blockexplorer" 
            className={styles.navLink}
            activeClassName={styles.activeLink}
          >
            <Tab label="Block explorer" value="/blockexplorer" />
          </NavLink>
          <NavLink 
            to="/address" 
            className={styles.navLink}
            activeClassName={styles.activeLink}
          >
            <Tab label="Adresses" value="/addresspage" />
          </NavLink>
        </Tabs>
        <SearchComponent />
      </Toolbar>
    </AppBar>
  );
}
