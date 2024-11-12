import React, { useState, useEffect } from 'react';
import { useBlockNumber } from '../BlockContext';
import { Alchemy, Utils } from 'alchemy-sdk';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import { Card, CardContent, Typography, CircularProgress, Box } from '@mui/material';

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

  if (!blockData) {
    return <p>Loading block data...</p>;
  }

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

  const formattedTimestamp = new Date(blockData.timestamp * 1000).toLocaleString();

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Card sx={{ maxWidth: 1300, width: '100%', boxShadow: 3 }}>
        <CardContent>

      <Typography variant="subtitle1" color="textSecondary">
          Block #{blockNumber}
        </Typography>
      
      <TableContainer>
      <Table sx={{ minWidth: 900}} aria-labelledby="tableTitle">
        <TableBody>

            <TableRow>
              <TableCell>Timestamp:</TableCell>
              <TableCell>🕓 {formattedTimestamp}</TableCell>
            </TableRow> 

            <TableRow
             onClick={handleShowTransactions} 
             style={{ cursor: 'pointer' }}
             >
              <TableCell>Transactions:</TableCell>
              <TableCell style={{ color: '#33c9ff' }}>{blockData.transactions.length} transactions</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Miner:</TableCell>
              <TableCell>{blockData.miner}</TableCell>
            </TableRow>

            <TableRow
              key={blockData.id} 
              onClick={handleRowClick} 
              style={{ cursor: 'pointer' }}>
              <TableCell>Parent Hash:</TableCell>
              <TableCell style={{ color: '#33c9ff' }}>{blockData.parentHash}</TableCell>
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