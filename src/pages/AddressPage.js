import React, { useState, useEffect } from 'react';
import { Alchemy } from 'alchemy-sdk';
import { Card, CardContent, Typography, CircularProgress, Box, TablePagination } from '@mui/material';
import BlockTable from '../components/BlockTable.js';
import { useLocation } from 'react-router-dom';
import styles from '../styles/pages.module.css';
import { useBlockNumber } from '../BlockContext';

const alchemy = new Alchemy({
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: 'eth-mainnet',
});

export default function AddressPage() {
  const { defaultAddress } = useBlockNumber();
  const location = useLocation();
  const [address, setAddress] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    // Use search address if available, otherwise use default address
    const searchAddress = location.state?.address;
    setAddress(searchAddress || defaultAddress);
  }, [location.state]);

  useEffect(() => {
    if (address) {
      async function fetchAddressTransactions() {
        setLoading(true);
        try {
          // Get the last 1000 transactions for this address
          const response = await alchemy.core.getAssetTransfers({
            fromAddress: address,
            category: ["external", "internal", "erc20", "erc721", "erc1155"],
            maxCount: 1000
          });
          setTransactions(response.transfers);
        } catch (error) {
          console.error('Error fetching address transactions:', error);
        } finally {
          setLoading(false);
        }
      }
      fetchAddressTransactions();
    }
  }, [address]);

  if (loading || !address) {
    return (
      <Box className={styles.transactionsPage}>
        <Card className={styles.transactionsCard}>
          <CardContent>
            <div className={styles.transactionsHeader}>
              <Typography className={styles.statsValue}>
                Loading Address Transactions...
              </Typography>
            </div>
            <CircularProgress />
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

  return (
    <Box className={styles.transactionsPage}>
      <Card className={styles.transactionsCard}>
        <CardContent>
          <div className={styles.transactionsHeader}>
            <div className={styles.transactionStats}>
              <Typography className={styles.statsLabel}>
                Address Transactions
              </Typography>
              <Typography className={styles.statsValue}>
                {address}
              </Typography>
            </div>
            <div className={styles.transactionStats}>
              <Typography className={styles.statsLabel}>
                Fetched Transactions
              </Typography>
              <Typography className={styles.statsValue}>
                {transactions.length.toLocaleString()}
              </Typography>
            </div>
          </div>

          <div className={styles.tableContainer}>
            <BlockTable transactions={displayedTransactions} />
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