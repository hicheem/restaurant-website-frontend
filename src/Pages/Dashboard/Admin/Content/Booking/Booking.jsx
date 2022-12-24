import { Backdrop, CircularProgress, Divider, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import tableIcon from '../../../../../Assets/tableIcon.png'
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Moment from 'react-moment'
import { useMemo } from 'react';
import BookingActions from './BookingActions'
import DialogBooking from './DialogBooking';

const Booking = () => {
  
  const [loading, setLoading] = useState(false)
  const [tables, setTables] = useState([])
  const [booking, setBooking] = useState([])
  const [open, setOpen] = useState(false);
  const [bookingId, setBookingId] = useState(null)

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

  useEffect(() => {
    setLoading(true)
    getTables()
    getBooking()
    setLoading(false)
  },[])
  
  
  const getBooking = () => {
    axios('http://localhost:3003/api/book/getAllBooking')
    .then(response => {
        if(response.status === 200)
        {
          setBooking(response.data.booking)
        }
    })
  }

  const getTables = () => {
    axios('http://localhost:3003/api/table/getTables')
    .then(response => {
        if(response.status === 200)
        {
          setTables(response.data.tables)
        }
    })
  }

  const bookingColumns = useMemo(() => 
    
    [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'tableId', headerName: 'Table ID', width: 70 },
      // { field: 'userId', headerName: 'User ID', width: 70 },
      // { field: 'firstName', headerName: 'First Name', width: 100 },
      { field: 'lastName', headerName: 'Last Name', width: 100 },
      // { field: 'mobile', headerName: 'Mobile', width: 100 },
      { field: 'email', headerName: 'Email', width: 150 },
      { field: 'datetime', headerName: 'Date Time', width: 180, renderCell: params => <Moment format="DD-MM-YYYY HH:mm">{params.row.datetime}</Moment> },
      { field: 'status', headerName: 'Status', width: 100, editable: true },
      // { field: 'content', headerName: 'Content', width: 170, editable: true },
      {field : 'actions', headerName: 'Actions',width: 150, type:'actions', renderCell: params => <BookingActions params={params} setOpen={setOpen}  setBookingId={setBookingId}/>}
    ]
    ,[])

    

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <DialogBooking handleClickOpen={handleClickOpen} handleClose={handleClose} open={open} bookingId={bookingId}/>
      <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
          >
          <CircularProgress color="inherit" />
        </Backdrop>

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
          <Paper elevation={3} style={{height:'10rem', width:'10rem', marginLeft:"7rem"}}>
            <div className="d-flex flex-column align-items-center mt-5">
              <div className="btn btn-success my-2">
                <span><TableRestaurantIcon/></span>
                Add Table</div>
            </div>
          </Paper>
      </Stack>

      <div style={{ height: 400, width: '50%', marginTop:'2rem' }}>
          <DataGrid
            experimentalFeatures={{ newEditingApi: true }}
            rows={tables}
            columns={tablesColumns}
            title='Tables'
            // processRowUpdate={processRowUpdate}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            onRowClick={()=>console.log('clicked')}
          />
        </div>
      <div style={{ height: 400, width: '90%', marginTop:'2rem' }}>
          <DataGrid
            experimentalFeatures={{ newEditingApi: true }}
            rows={booking}
            columns={bookingColumns}
            // processRowUpdate={processRowUpdate}
            pageSize={5}
            rowsPerPageOptions={[5]}
            // checkboxSelection
            onRowClick={()=>console.log('clicked')}
          />
        </div>
    </div>
  )
}

export default Booking

const tablesColumns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'code', headerName: 'Code', width: 70, editable: true },

  { 
    field: 'status', 
    headerName: 'Status', 
    width: 100, editable: true, 
    renderCell: params => params.row.status === 0 ? 'Free' : params.row.status  === 1 ?'Reserved' : 'Active',
    type:'singleSelect', valueOptions:['Free', 'Reserved', 'Active']
  },

  { field: 'capacity', headerName: 'Capacity', width: 110, editable: true },
  { field: 'content', headerName: 'Content', width: 170, editable: true }
];

