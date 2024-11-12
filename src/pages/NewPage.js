import React from 'react';
import SearchComponent from '../components/SearchComponent';
import { Box } from '@mui/material';
import { useBlockNumber } from '../BlockContext';  // Import the custom hook


export default function NewPage() {
    const { blockNumber, setBlockNumber, minedAt, timeAgo } = useBlockNumber();
    const minedDate = minedAt ? new Date(minedAt * 1000).toLocaleString() : 'Loading...';

  return (
    <Box sx = {{
        display: 'flex',             // Use flexbox for centering
        flexDirection: 'column',     // Stack elements vertically
        justifyContent: 'center',    // Center content vertically
        alignItems: 'center',        // Center content horizontally
        height: '50vh',              // Take full height of the viewport
        textAlign: 'center',         // Optional: centers text inside paragraphs
      }}>
    <h1>Lookup 🕵🏻‍♀️ 🔎</h1>
    <SearchComponent/>
    <p>Latest block: #{blockNumber !== null ? blockNumber : 'Loading...'} </p>
    <p>Mined: {timeAgo} ({minedDate})</p>
    </Box>
  );
}