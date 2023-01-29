import { AppBar, IconButton, Toolbar, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import AccountMenu from './AccountMenu'
import './Navbar.css'
import Searchcomp from './Searchcomp';
import { useNavigate } from 'react-router-dom';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));


const Navbar = (props) => {
  


  const navigate = useNavigate()
  
  const [navbar, setNavbar] = useState(false)
  
  const changeBackgroundNav = () =>{
    if(window.scrollY >= 30)
      setNavbar(true)
    else
      setNavbar(false)
  }
  window.addEventListener('scroll', changeBackgroundNav)

  return (
      <AppBar  color='transparent' sx={{
          width:'90%',
          transition:'0.2s',
          borderRadius:navbar?'3rem': '3rem',
          height:'3rem',
          my:'1rem',
          mx:'4rem',
          // backgroundColor:'white',
          backgroundColor:navbar?'#ffffffd3':'white',
          boxShadow:navbar?'':0,
          color:'black'
        }}>
        <Toolbar sx={{
          display:'flex',
          justifyContent:'space-between'
          }}>
          <Searchcomp/>
          <div style={{
            display:'flex',
            gap:'1rem',
            marginRight:'2rem'
            }}>
            {!props.ordersPage &&
            <Tooltip title="Orders" placement="bottom" onClick={()=>navigate('orders')}>
              <IconButton aria-label="notification" >
                <StyledBadge badgeContent='' color='success'>
                  <ShoppingBagIcon />
                </StyledBadge>
              </IconButton>
            </Tooltip>
            }
            <AccountMenu/>
          </div>
        </Toolbar>    
      </AppBar>
  )
};
export default Navbar