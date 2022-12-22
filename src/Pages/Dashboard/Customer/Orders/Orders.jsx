import styled from '@emotion/styled';
import { Breadcrumbs, Chip, emphasize } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar'
import './Orders.css'
import TableComp from '../../../../Components/TablesComp';
import { useEffect } from 'react';
import { UserContext } from '../../../../App';
import axios from 'axios';
import { useState } from 'react';




const Orders = () => {
    
  const [user, ] = useContext(UserContext)
  const [booking, setBooking] = useState([])
  
  useEffect(()=> {
    getBooking()
  },[])
  
  const getBooking = () => {
    axios
      .get(`http://localhost:3003/api/book/getBooking?userId=${user.id}`)
      .then(response => {
        if(response.status === 200){
          setBooking(response.data.booking)
          console.log(booking)
        }
        else{
          alert(response.data.message)
        }
      })

  }

  

  const headerRow = ['OrderId', 'Name', 'Table Code', 'Table Capacity', 'Total Items', 'Total', 'Status']

  return (
    <div className='ordersCustomer'>
      <Navbar />
      <div className="container">
        <div className="navBreadCrumb">
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
        <div className="contentTable mt-5">
          <TableComp headerRow={headerRow} rows={booking}/>
        </div>
        
      </div>
    </div>
  )
}

export default Orders




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