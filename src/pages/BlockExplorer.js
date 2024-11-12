import React, { useState, useEffect } from 'react';
import { useBlockNumber } from '../BlockContext';
import { Alchemy } from 'alchemy-sdk';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import { Utils } from 'alchemy-sdk';
import { Card, CardContent, Typography, CircularProgress, Box } from '@mui/material';


export default function BlockExplorer() {

  const {blockNumber} = useBlockNumber();
  const [blockData, setBlockData] = useState(null);
  
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
              <TableCell>{formattedTimestamp}</TableCell>
            </TableRow> 

            <TableRow>
              <TableCell>Transactions:</TableCell>
              <TableCell>{blockData.transactions.length}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Miner:</TableCell>
              <TableCell>{blockData.miner}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Parent Hash:</TableCell>
              <TableCell>{blockData.parentHash}</TableCell>
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