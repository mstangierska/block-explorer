import React, { useState, useEffect } from 'react';
import { useBlockNumber } from '../BlockContext';
import { Alchemy, Utils } from 'alchemy-sdk';
import { Table, TableBody, TableCell, TableContainer, TableRow, Card, CardContent, Typography, CircularProgress, Box } from '@mui/material';
import styles from '../styles/pages.module.css';
import { useHistory } from 'react-router-dom'

export default function BlockExplorer() {

  const alchemy = new Alchemy({
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: 'eth-mainnet',
  });

  const {blockNumber, setBlockNumber, arg1, arg2 } = useBlockNumber();
  const [blockData, setBlockData] = useState(null);
  const history = useHistory()

  useEffect(() => {
    async function getBlockData() {
      const data = await alchemy.core.getBlockWithTransactions(blockNumber);
      setBlockData(data);
      };

    getBlockData();
    }, [blockNumber]);

  
    const handleRowClick = async () => {
      // Fetch the parent block data using the parentHash
      const parentBlockData = await alchemy.core.getBlock(blockData.parentHash);
      
      // Set the block number to the parent block’s number
      if (parentBlockData) {
        setBlockNumber(parentBlockData.number);
      }
    };
  
  
    const handleShowTransactions = () => {
      history.push('/transactions', { blockNumber });
    };  

  if (!blockData) {
    return (
      <Box className={styles.explorerPage}>
        <Card className={styles.blockCard}>
          <CardContent>
            <div className={styles.blockHeader}>
              <Typography className={styles.blockTitle}>
                Loading Block Data...
              </Typography>
            </div>
            <CircularProgress />
          </CardContent>
        </Card>
      </Box>
    );
  }

  const formattedTimestamp = new Date(blockData.timestamp * 1000).toLocaleString();


  return (
    <Box className={styles.explorerPage}>
      <Card className={styles.blockCard}>
        <CardContent>
        <div className={styles.blockHeader}>
          <div className = {styles.titleSection}>
          <Typography className={styles.blockLabel}>
              Ethereum Block
            </Typography>
        <Typography className={styles.blockTitle}>
        #{blockNumber.toLocaleString()}
        </Typography>
        </div>

        <div className={styles.timestampSection}>
            <Typography className={styles.timestampLabel}>
              Block Time (UTC)
            </Typography>
            <Typography className={styles.timestamp}>
              <span>🕒</span>
              {new Date(blockData.timestamp * 1000).toLocaleString('en-US', {
                hour12: false,
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZone: 'UTC'
              })}
            </Typography>
          </div>
        </div>
      
      <TableContainer>
      <Table className={styles.table} aria-labelledby="tableTitle">
        <TableBody>

            <TableRow
             onClick={handleShowTransactions} 
             className={styles.clickableRow}
             >
              <TableCell>Transactions:</TableCell>
              <TableCell className={styles.clickableCell}>{blockData.transactions.length} transactions</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Miner:</TableCell>
              <TableCell>{blockData.miner}</TableCell>
            </TableRow>

            <TableRow
              key={blockData.id} 
              onClick={handleRowClick} 
              className={styles.clickableRow}>
              <TableCell>Parent Hash:</TableCell>
              <TableCell className={styles.clickableCell}>{blockData.parentHash}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Difficulty:</TableCell>
              <TableCell>{blockData.difficulty}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Gas Limit:</TableCell>
              <TableCell>{Utils.formatUnits(blockData.gasLimit, 'gwei')} Gwei</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Gas Used:</TableCell>
              <TableCell>{Utils.formatUnits(blockData.gasUsed, 'gwei')} Gwei</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Base fee per gas</TableCell>
              <TableCell>{Utils.formatUnits(blockData.baseFeePerGas, 'gwei')} Gwei</TableCell>
            </TableRow>


        </TableBody>
      </Table>
    </TableContainer>
    </CardContent>
    </Card>
    </Box>
  );
}