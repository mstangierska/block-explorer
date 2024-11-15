import React from 'react';
import SearchComponent from '../components/SearchComponent';
import { Box } from '@mui/material';
import { useBlockNumber } from '../BlockContext';
import styles from '../styles/pages.module.css';

export default function NewPage() {
    const { blockNumber, setBlockNumber, minedAt, timeAgo } = useBlockNumber();
    const minedDate = minedAt ? new Date(minedAt * 1000).toLocaleString() : 'Loading...';

  return (
    <Box className={styles.pageContainer}>
      <Box className={styles.contentWrapper}>
      <h1 className={styles.pageTitle}>Lookup 🕵🏻‍♀️ 🔎</h1>
      <SearchComponent size="big"/>
      <Box className = {styles.infoContainer}>
        <p className={styles.infoText}>Latest block: #{blockNumber !== null ? blockNumber : 'Loading...'} </p>
        <p className={styles.infoText}>Mined: {timeAgo} ({minedDate})</p>
        </Box>
      </Box>
    </Box>
  );
}