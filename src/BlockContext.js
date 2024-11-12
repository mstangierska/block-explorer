import React, { createContext, useState, useContext, useEffect } from 'react';
import { Alchemy, Network } from 'alchemy-sdk';

const BlockNumberContext = createContext();

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,  // Make sure to replace this with your actual API key
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

// BlockNumberProvider component will provide block number data to child components
export function BlockNumberProvider({ children }) {
  const [blockNumber, setBlockNumber] = useState(null);
  const [minedAt, setMinedAt] = useState(null); // State for the block mining timestamp
  const [timeAgo, setTimeAgo] = useState('');

  // Fetch the latest block number when the provider is mounted
  useEffect(() => {
    async function fetchBlockNumber() {
      try {
        const number = await alchemy.core.getBlockNumber();
        setBlockNumber(number);

        const blockData = await alchemy.core.getBlock(blockNumber);
        setMinedAt(blockData.timestamp);

        const currentTime = Date.now(); // Current time in milliseconds
        const blockTime = blockData.timestamp * 1000; // Convert block timestamp to milliseconds
        const differenceInSeconds = Math.floor((currentTime - blockTime) / 1000); // Difference in seconds

        let timeAgoString = `${differenceInSeconds} seconds ago`; // Default to seconds
        if (differenceInSeconds >= 60) {
          const differenceInMinutes = Math.floor(differenceInSeconds / 60); // Convert to minutes
          timeAgoString = `${differenceInMinutes} minutes ago`;
        }

        setTimeAgo(timeAgoString); 

      } catch (error) {
        console.error("Error fetching block number:", error);
      }
    }

    fetchBlockNumber();
  }, []);

  return (
    <BlockNumberContext.Provider value={{ blockNumber, setBlockNumber, minedAt, timeAgo }}>
      {children}
    </BlockNumberContext.Provider>
  );
}

// Custom hook to use the BlockNumberContext
export const useBlockNumber = () => {
  return useContext(BlockNumberContext);
};