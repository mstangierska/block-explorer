import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputBase from '@mui/material/InputBase';
import {Button} from '@mui/material';
import { useHistory } from 'react-router-dom';
import styles from './SearchComponent.module.css';

export default function SearchComponent({ size = 'default'}) {
  const [query, setQuery] = React.useState('');
  const history = useHistory()
  
  const handleSearch = (event) => {
    if (!query.trim()) return;

    if (/^0x[a-fA-F0-9]{64}$/.test(query)) {
      // This is a transaction hash
      history.push('/transaction', { txHash: query });
    } else if (/^0x[a-fA-F0-9]{40}$/.test(query)) {
      // This is an address
      history.push('/address', { address: query });
      setQuery('');
    } else if (/^\d+$/.test(query)) {
      // This is a block number
      history.push('/blockexplorer', { blockNumber: parseInt(query) });
      setQuery('');
    } else if (/^0x[a-fA-F0-9]{64}$/.test(query)) {
      // This is a block hash
      history.push('/blockexplorer', { blockHash: query });
      setQuery('');
    } else {
      // Invalid input
      alert('Invalid search input. Please enter a valid transaction hash, address, block number, or block hash.');
    }
  };
    
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  const containerClassName = `${styles.searchContainer} ${size === 'big' ? styles.searchContainerBig : ''}`;
  const formControlClassName = `${styles.formControl} ${size === 'big' ? styles.formControlBig : ''}`;
  const inputClassName = `${styles.inputWrapper} ${size === 'big' ? styles.inputWrapperBig : ''}`;

  return (
    <div className={containerClassName}>
      <FormControl className={formControlClassName} variant="standard">
        <InputLabel htmlFor="demo-customized-textbox"></InputLabel>
        <InputBase
          id="search-input"
          className={inputClassName}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by address, block number, or transaction hash"
        />
        </FormControl>
        <Button 
        variant="contained" 
        color="primary" 
        className={styles.submitButton}
        onClick={handleSearch}
        size={size === 'big' ? 'medium' : 'small'}>
          Submit
      </Button>
  </div>
  );
}
