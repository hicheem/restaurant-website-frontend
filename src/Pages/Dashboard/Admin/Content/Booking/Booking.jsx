import { Alert, AppBar, Avatar, Backdrop, Button, Chip, CircularProgress, Grid, IconButton, Paper, Snackbar, TextField, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import Moment from 'react-moment'
import { useMemo } from 'react';
import BookingActions from './BookingActions'
import DialogBooking from './DialogBooking';

const Booking = () => {
  
  const [loading, setLoading] = useState(false)
  const [booking, setBooking] = useState([])
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [msgSnack, setMsgSnack] = useState('');
  const [bookingId, setBookingId] = useState(null)
  const [refresh, setRefresh] = useState(false)

  

  useEffect(() => {
    setLoading(true)
    getBooking()
    setLoading(false)
  },[refresh])
  
  
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
      { field: 'photo', headerName: 'Avatar', width: 80, renderCell:params=> <Avatar src={params.row.photo}/> },
      { field: 'firstName', headerName: 'First Name', width: 100 },
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
      {field : 'actions', headerName: 'Actions',width: 150, type:'actions', renderCell: params => 
          <BookingActions 
            params={params} 
            setOpen={setOpen}  
            setBookingId={setBookingId}
            setOpenSnack={setOpenSnack}
            setMsgSnack={setMsgSnack}
            setRefresh={setRefresh}
            refresh={refresh}
            />}
    ]
    ,[refresh])

    

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      { open ?
        <DialogBooking handleClickOpen={handleClickOpen} handleClose={handleClose} open={open} bookingId={bookingId} booking={booking.filter(item => item.id === bookingId)[0]}/>
        : <></>
      }
      <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
          >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar 
        open={openSnack} 
        autoHideDuration={2000} 
        onClose={() => {setOpenSnack(false)}}
        anchorOrigin={{ vertical:'top', horizontal:'center' }}
        >
        <Alert onClose={() => {setOpenSnack(false)}} severity="success" sx={{ width: '100%' }}>
          {msgSnack}
        </Alert>
      </Snackbar>
        <Paper sx={{ Width: 940, margin: 'auto', overflow: 'hidden' }}>
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
          >
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <SearchIcon color="inherit" sx={{ display: 'block' }} />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  placeholder="Search for menu"
                  InputProps={{
                    disableUnderline: true,
                    sx: { fontSize: 'default' },
                  }}
                  variant="standard"
                />
              </Grid>
              <Grid item>
                <Button variant="contained" sx={{ mr: 1 }} >
                  Add Menu
                </Button>
                <Tooltip title="Reload">
                  <IconButton>
                    <RefreshIcon color="inherit" sx={{ display: 'block' }} onClick={() => setRefresh(!refresh)}/>
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
          <div style={{ height: 400, width: '100%', marginTop:'2rem' }}>
            <DataGrid
              experimentalFeatures={{ newEditingApi: true }}
              rows={booking}
              columns={bookingColumns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>
        </Typography>
      </Paper>
      
    </div>
  )
}

export default Booking



