import { Backdrop, Chip, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Moment from 'react-moment'
import { useMemo } from 'react';
import BookingActions from './BookingActions'
import DialogBooking from './DialogBooking';

const Booking = () => {
  
  const [loading, setLoading] = useState(false)
  const [booking, setBooking] = useState([])
  const [open, setOpen] = useState(false);
  const [bookingId, setBookingId] = useState(null)

  

  useEffect(() => {
    setLoading(true)
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
      { field: 'status', headerName: 'Status', width: 100, editable: true, renderCell: params => 
          <Chip 
              sx={{width:'5rem'}}
              size="small" 
              label={params.row.status === 0 ? 'New' : params.row.status ===  1 ? 'Active' : 'Complete'}
              color={params.row.status === 0 ? 'primary' : params.row.status === 1 ? 'warning' : 'success'}
          /> },
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

      <div style={{ height: 400, width: '90%', marginTop:'2rem' }}>
          <DataGrid
            experimentalFeatures={{ newEditingApi: true }}
            rows={booking}
            columns={bookingColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
    </div>
  )
}

export default Booking



