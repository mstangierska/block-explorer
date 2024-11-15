// src/components/BlockTable.js
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from '@mui/material';
import { Utils } from 'alchemy-sdk';
import { useHistory } from 'react-router-dom';
import styles from './BlockTable.module.css';
import { BigNumber } from 'ethers';

export default function BlockTable({ transactions }) {
  const history = useHistory();

  const handleAddressClick = (address) => {
    history.push(`/address`, { address});
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Hash</TableCell>
          <TableCell>From</TableCell>
          <TableCell>To</TableCell>
          <TableCell>Value (ETH)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {transactions.map((tx) => (
          <TableRow key={tx.hash}>
           <TableCell>
            <Tooltip title={tx.hash} placement='top' classes = {{tooltip: styles.customTooltip}}>
              <span className={styles.hashCell}>{tx.hash.substring(0,10)}...</span>
            </Tooltip>
            </TableCell>
            <TableCell  className={styles.clickableCell}
              onClick={() => tx.to && handleAddressClick(tx.to)}
              >
                {tx.from}</TableCell>
            <TableCell className={styles.clickableCell}
              onClick={() => handleAddressClick(tx.to)}>
                {tx.to ? tx.to : 'Contract Creation'}</TableCell>
            <TableCell>{ tx.value ? 
            (() => { try {
              const valueInWei = BigNumber.from(tx.value);
              return Number(Utils.formatEther(tx.value)).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 6
              });
            } catch (error) {
              console.warn('Error formatting value:', error);
              return '0.00';
              }})() : '0.00'}
              </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
