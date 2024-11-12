import * as React from 'react';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import {Button, Box} from '@mui/material';
import { useHistory } from 'react-router-dom';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 14,
    padding: '10px 20px 10px 20px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

export default function CustomizedSelects() {
  const [query, setQuery] = React.useState('');
  const history = useHistory()
  
  const handleSearch = (event) => {
    setQuery(event.target.value);
    history.push('/blockexplorer', {blockNumber: query})
  };

  return (
    <div>
    <Box>
      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="demo-customized-textbox">Search</InputLabel>
        <BootstrapInput
          id="demo-customized-textbox"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by..."
        />
        </FormControl>
        <Button 
        variant="contained" 
        color="primary" 
        sx={{ m: 4 }}
        onClick={handleSearch}
      >
        Submit
      </Button>
    </Box>
    </div>
  );
}
