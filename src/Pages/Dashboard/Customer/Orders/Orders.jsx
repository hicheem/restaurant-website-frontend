import styled from '@emotion/styled';
import { Breadcrumbs, Chip, emphasize } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar'
import './Orders.css'


const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: 'black',
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize('#6af368ce', 0.06),
      color:'black'
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});


const Orders = () => {
  return (
    <div className='ordersCustomer'>
      <Navbar/>
      <div className="container">
        <Breadcrumbs aria-label="breadcrumb">
          <Link to='/'>
            <StyledBreadcrumb
              label="Home"
              icon={<HomeIcon fontSize="small" />}
              />
          </Link>
          <Link to='/customerDashboard'>
            <StyledBreadcrumb 
              label="Menu" 
              icon={<RestaurantMenuIcon fontSize="small" />}
              />
          </Link>
          <StyledBreadcrumb
            label="Orders"
            disabled
            />
        </Breadcrumbs>
        
      </div>
    </div>
  )
}

export default Orders