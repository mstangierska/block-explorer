<<<<<<< Updated upstream
import React from 'react';

export default function TransactionsPage() {
  return <h1>Transactions Page</h1>;
=======
import React, { useState, useEffect } from 'react';
import { useBlockNumber } from '../BlockContext';
import { Alchemy } from 'alchemy-sdk';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import { Utils } from 'alchemy-sdk';
import { Card, CardContent, Typography, CircularProgress, Box } from '@mui/material';
import BlockTable from '../components/BlockTable.js';
import { useLocation } from 'react-router-dom'

const alchemy = new Alchemy({
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: 'eth-mainnet',
});

export default function TransactionsPage() {

  const location = useLocation();
  const { blockNumber } = location.state || {}
  const [transactions, setTransactions] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (blockNumber) {
      async function fetchTransactions() {
        const blockData = await alchemy.core.getBlockWithTransactions(blockNumber);
        setTransactions(blockData.transactions);
      }
      fetchTransactions();
    }
  }, [blockNumber]);

  if (!transactions) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Card sx={{ maxWidth: 12000, width: '100%', boxShadow: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" color="textSecondary">
            Block #{blockNumber}
          </Typography>
          <BlockTable
            transactions={transactions}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </CardContent>
      </Card>
    </Box>
  );
>>>>>>> Stashed changes
}