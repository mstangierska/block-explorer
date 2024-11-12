// src/pages/BlocksPage.js
import React, { useState, useEffect } from 'react';
import AccordionComponent from '../components/AccordionComponent';
import BlockTable from '../components/BlockTable';
import { Alchemy } from 'alchemy-sdk';
import { useBlockNumber } from '../BlockContext';

const alchemy = new Alchemy({
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: 'eth-mainnet',
});

export default function BlocksPage() {
  const [blocks, setBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { blockNumber, setBlockNumber, minedAt, timeAgo } = useBlockNumber();

  useEffect(() => {
    async function fetchBlocks() {
      // const latestBlock = await alchemy.core.getBlockNumber();
      const blockPromises = Array.from({ length: 10 }, (_, i) =>
      alchemy.core.getBlock(blockNumber - i)
      );
      setBlocks(await Promise.all(blockPromises));
    }
    fetchBlocks();
  }, []);

  const fetchBlockDetails = async (blockNumber) => {
    const blockData = await alchemy.core.getBlockWithTransactions(blockNumber);
    setSelectedBlock(blockData);
  };

  return (
    <div>
      {blocks.map((block) => (
        <AccordionComponent
          key={block.number}
          block={block}
          onClick={fetchBlockDetails}
          selectedBlock={selectedBlock}
        >
          {selectedBlock && (
            <BlockTable
              transactions={selectedBlock.transactions}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={(event, newPage) => setPage(newPage)}
              onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
            />
          )}
        </AccordionComponent>
      ))}
    </div>
  );
}
