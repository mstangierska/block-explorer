import React, { useState, useEffect } from 'react';
import { Alchemy } from 'alchemy-sdk';
import { Card, CardContent, Typography, CircularProgress, Box, TablePagination } from '@mui/material';
import BlockTable from '../components/BlockTable.js';
import { useLocation } from 'react-router-dom'
import styles from '../styles/pages.module.css';

const alchemy = new Alchemy({
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: 'eth-mainnet',
});

export default function TransactionsPage() {

  const location = useLocation();
  const { blockNumber } = location.state || {}
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (blockNumber) {
      async function fetchTransactions() {
        setLoading(true);
        try {
        const blockData = await alchemy.core.getBlockWithTransactions(blockNumber);
        setTransactions(blockData.transactions);
        } catch (error) {
          console.error('Error fetching transactions:', error);
        } finally {
          setLoading(false);
        } 
      }
      fetchTransactions();
    }
  }, [blockNumber]);

  if (loading || !blockNumber) {
    return (
      <Box className={styles.transactionsPage}>
        <Card className={styles.transactionsCard}>
          <CardContent>
            <div className={styles.transactionsHeader}>
              <Typography className={styles.statsValue}>
                Loading Transactions...
              </Typography>
            </div>
            <CircularProgress />
          </CardContent>
        </Card>
      </Box>
    );
  }

    // Check for no transactions after loading
    if (!loading && transactions.length === 0) {
      return (
        <Box className={styles.transactionsPage}>
          <Card className={styles.transactionsCard}>
            <CardContent>
              <div className={styles.transactionsHeader}>
                <Typography className={styles.statsValue}>
                  No transactions found for block #{blockNumber}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Box>
      );
    }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedTransactions = transactions.slice(startIndex, endIndex);

  if (!transactions) {
    return (
      <Box className={styles.transactionsPage}>
        <Card className={styles.transactionsCard}>
          <CardContent>
            <div className={styles.transactionsHeader}>
              <Typography className={styles.statsValue}>
                Loading Transactions...
              </Typography>
            </div>
            <CircularProgress />
          </CardContent>
        </Card>
      </Box>
    );
  }


  return (
    <Box className={styles.transactionsPage}>
      <Card className={styles.transactionsCard}>
        <CardContent>
        <div className={styles.transactionsHeader}>
            <div className={styles.transactionStats}>
              <Typography className={styles.statsLabel}>
                Block Transactions
              </Typography>
              <Typography className={styles.statsValue}>
                #{blockNumber.toLocaleString()}
              </Typography>
            </div>
            <div className={styles.transactionStats}>
              <Typography className={styles.statsLabel}>
                Total Transactions
              </Typography>
              <Typography className={styles.statsValue}>
                {transactions.length.toLocaleString()}
              </Typography>
            </div>
          </div>

          <div className={styles.tableContainer}>
          <BlockTable
            transactions={displayedTransactions}
            page={page}
            rowsPerPage={rowsPerPage}
          />
          </div>

          <div className={styles.paginationContainer}>
            <TablePagination
              component="div"
              count={transactions.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 50]}
              className={styles.paginationText}
              labelRowsPerPage="Transactions per page:"
              labelDisplayedRows={({ from, to, count }) => 
                `${from}-${to} of ${count} transactions`
              }
            />
          </div>
        </CardContent>
      </Card>
    </Box>
  );
}