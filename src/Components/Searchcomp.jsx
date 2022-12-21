import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';



const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


const Searchcomp = (props) => {

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '10px',
    backgroundColor: props.navbar ? alpha(theme.palette.common.black, 0.09) : alpha(theme.palette.common.white, 0.2),
    color:props.navbar?'black' : 'white',
    '&:hover': {
      backgroundColor: props.navbar ? alpha(theme.palette.common.black, 0.07): alpha(theme.palette.common.white, 0.1),
      width:'15rem',
    },
    marginLeft: 0,
    width: '20rem',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: '15rem',
    },
  }));


  
  return (
        <Search>
            <SearchIconWrapper >
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
  )
}

export default Searchcomp