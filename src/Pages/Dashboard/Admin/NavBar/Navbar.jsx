import { AppBar, IconButton, Toolbar } from '@mui/material'
import React from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import AccountMenu from '../../Navbar/AccountMenu'
// import './Navbar.css'
import Searchcomp from '../../../../Components/Searchcomp';
// import Breadcrumb from '../../../../Components/Breadcrumb/Breadcrumb'

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));


const Navbar = (props) => {
  

  return (
      <AppBar position='static' color='info' sx={{
          width:'100%',
          transition:'0.2s',
          height:'4rem',
          paddingTop:'0.5rem',
          // boxShadow:0,
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
            <IconButton aria-label="notification" >
              <StyledBadge badgeContent={''} color='success'>
                <NotificationsIcon sx={{color:'white'}}/>
                </StyledBadge>
            </IconButton>
            <AccountMenu/>
          </div>
        </Toolbar>    
      </AppBar>
  )
}

export default Navbar