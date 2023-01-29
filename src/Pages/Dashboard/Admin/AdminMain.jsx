import { Backdrop, Chip, CircularProgress, Paper, Stack } from '@mui/material'
import {axiosBase} from '../../../api'
import React, { useState } from 'react'
import tableIcon from '../../../Assets/tableIcon.png'
import bookingIcon from '../../../Assets/booking-58.png'
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';



const AdminMain = () => {

  const [tables, setTables] = useState([])
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)

  const tablesStatus = [
    {
      title: 'Total',
      value: tables.reduce((acc,item) => acc += 1, 0)
    }, 
    {
      title: 'Free',
      value: tables.reduce((acc,item) => item.status === 0 ? acc += 1 : acc, 0)
    }, 
    {
      title: 'Reserved',
      value: tables.reduce((acc,item) => item.status === 1 ? acc += 1 : acc, 0)
    }, 
    {
      title: 'Active',
      value: tables.reduce((acc,item) => item.status === 2 ? acc += 1 : acc, 0)
    }, 
  ]

  const bookingsStatus = [
    {
      title : 'Active',
      value : bookings.reduce((acc, item) => item.status === 1 ? acc += 1 : acc, 0 )
    },
    {
      title : 'Pending',
      value : bookings.reduce((acc, item) => item.status === 0 ? acc += 1 : acc, 0 )
    },
  ]

  const getTables = () => {
    axiosBase('api/table/getTables')
    .then(response => {
        if(response.status === 200)
        {
          setTables(response.data.tables)
        }
    })
  }
  const getBookings = () => {
    axiosBase('api/book/getAllBooking')
    .then(response => {
        if(response.status === 200)
        {
          setBookings(response.data.booking)
        }
    })
  }

  useEffect(() => {
    setLoading(true)
    getTables()
    getBookings()
    setLoading(false)
  }, [])

  return (
    <div>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        >
        <CircularProgress color="inherit" />
      </Backdrop>

      <h5>
        Booking Info
      </h5>
      <Stack spacing={3} direction='row'>
        {
          bookingsStatus.map(item => (
            <Paper elevation={3} sx={{height:'10rem', width:'10rem'}}>
              <div className='d-flex flex-column align-items-center my-1'>
                <div className='text-center my-1 fw-bold'>{item.title} Booking</div>
                <div className='text-center text-success fw-bold fs-1'>{item.value}</div>
                <img src={bookingIcon} height='60' width='60' alt=''/>
              </div>
            </Paper>
            ))
              }
      </Stack>
      <h5 className='my-3'>
        Table Info
      </h5>
      <Stack spacing={3} direction='row'>
        {
          tablesStatus.map(item => (
            <Paper elevation={3} sx={{height:'10rem', width:'10rem'}}>
              <div className='d-flex flex-column align-items-center my-1'>
                <div className='text-center my-1 fw-bold'>{item.title} Table</div>
                <div className='text-center text-success fw-bold fs-1'>{item.value}</div>
                <img src={tableIcon} height='60' width='60' alt=''/>
              </div>
            </Paper>
            ))
              }
            <Paper elevation={3} style={{height:'10rem', width:'10rem', marginLeft:"5rem"}}>
              <div className="d-flex flex-column align-items-center mt-5">
                <div className="btn btn-success my-2">
                  <span><TableRestaurantIcon/></span>
                  Add Table
                </div>
              </div>
            </Paper>
      </Stack>
      
      <div style={{ height: 400, width: '50%', marginTop:'2rem' }}>
        <DataGrid
          experimentalFeatures={{ newEditingApi: true }}
          rows={tables}
          columns={tablesColumns}
          // processRowUpdate={processRowUpdate}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
      
    </div>
  )
}

export default AdminMain

const tablesColumns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'code', headerName: 'Code', width: 70, editable: true },

  { 
    field: 'status', 
    headerName: 'Status', 
    width: 100, editable: true, 
    renderCell: params => 
      <Chip
        sx={{width:'5rem'}} 
        size="small" 
        label={params.row.status === 0 ? 'Free' : params.row.status  === 1 ?'Reserved' : 'Active'}
        color={params.row.status === 0 ? 'success' : params.row.status  === 1 ?'warning' : 'error'}
      />,
    type:'singleSelect', valueOptions:['Free', 'Reserved', 'Active']
  },

  { field: 'capacity', headerName: 'Capacity', width: 110, editable: true },
  { field: 'content', headerName: 'Content', width: 170, editable: true }
];


