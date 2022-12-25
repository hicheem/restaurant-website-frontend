import { AppBar, Avatar, Backdrop, Button, CircularProgress, Dialog, Divider, IconButton, List, ListItem, ListItemText, Paper, Slide, Toolbar, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React, { useMemo, useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Moment from 'react-moment';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const DialogBooking = (props) => {

    const [bookingDetails, setBookingDetails] = useState([])
    const [loading, setLoading] = useState(false)

    console.log(props.bookingId)
    useEffect(() => {
        // setLoading(true)
        axios(`http://localhost:3003/api/book/getBookingDetails?bookingId=${props.bookingId}`)
        .then(response => {
          setLoading(false)
          if(response.status === 200){
            setBookingDetails(response.data.bookingDetails)
          }
        })
    },[props.bookingId])

    const columns = useMemo(() => [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'image', headerName: 'Avatar', width: 100 , sortable:false, renderCell: params => <Avatar variant="rounded" src={params.row.image} sx={{ width: 56, height: 56 }}/> },
      { field: 'itemId', headerName: 'Item Id', width: 100 },
      { field: 'itemTitle', headerName: 'Title', width: 150 , editable:true},
      { field: 'cooking', headerName: 'cooking', width: 100, editable: true, type:'boolean' },
      { field: 'status', headerName: 'Status', width: 80, editable: true },
      { field: 'bookingItemQuantity', headerName: 'Quantity', width: 80 },
      { field: 'price', headerName: 'Price', width: 170 , sortable:false, renderCell:params=> params.row.price + ' DA'  },
    ],[])


  return (
    <div>

      <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
          >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Dialog
        fullScreen
        open={props.open}
        onClose={props.handleClose}
        TransitionComponent={Transition}
        
      >
        <AppBar sx={{ position: 'relative' }} color='info'>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Booking id: {props.bookingId}
            </Typography>
            <Typography  variant="h6" component="div">
              Total Price : {bookingDetails.reduce((acc, item) => acc + item.price, 0) + ' DA'}
              </Typography>
          </Toolbar>
        </AppBar>
        <div className="d-flex gap-4">
          <div style={{ height: 600, width: '70%' }}>
              <DataGrid
                // experimentalFeatures={{ newEditingApi: true }}
                rows={bookingDetails}
                columns={columns}
                // processRowUpdate={processRowUpdate}
                pageSize={10}
                rowsPerPageOptions={[5]}
                // checkboxSelection
                // onCellEditCommit={params => setRowId(params.id)}
                // onRowClick={params => setSelectedRowId(params.id)}
                getRowSpacing={params =>({
                  top : params.isFirstVisible? 0: 3,
                  bottom : params.isLastVisible? 0: 3,
                  zIndex:-1
                })}
              />
            </div>
            <div className="">
              
              <Paper
                elevation={3}
                sx={{
                  marginTop:'3rem',
                  height:310,
                  width:350,
                  position:'relative',
                  paddingTop:'3.5rem',
                  px:'1rem'
                }}
                >
                  <h5 className='text-center'>Booking customer info</h5>
                  <Avatar 
                    sx={{
                      width: 70,
                      height: 70,
                      position:'absolute',
                      top: -30,
                      left:140
                    }}
                    src={props.booking.photo}/>
                    <div className='d-flex flex-column gap-1'>
                      <div className="d-flex">
                        <input className="form-control-plaintext w-75" type="text" value='Full Name'  readonly/>
                        <input className="form-control" type="text" value={props.booking.firstName + ' ' + props.booking.lastName} disabled readonly/>
                      </div>
                      <div className="d-flex">
                        <input className="form-control-plaintext w-75" type="text" value='Email'  readonly/>
                        <input className="form-control" type="text" value={props.booking.email} disabled readonly/>
                      </div>
                      <div className="d-flex">
                        <input className="form-control-plaintext w-75" type="text" value='Mobile' disabled readonly/>
                        <input className="form-control" type="text" value={props.booking.mobile}  disabled readonly/>
                      </div>
                      <div className="d-flex">
                        <input className="form-control-plaintext w-75" type="text" value='Date' disabled readonly/>
                        <Moment className="form-control disabled" type="text" format="DD/MM/YYYY">{props.booking.datetime}</Moment>
                      </div>
                      <div className="d-flex">
                        <input className="form-control-plaintext w-75" type="text" value='Time' disabled readonly/>
                        <Moment className="form-control disabled" type="text" format="HH:mm">{props.booking.datetime}</Moment>
                      </div>
                    </div>
                </Paper>
                <Paper
                  elevation={3}
                  sx={{
                    marginTop:'1rem',
                    height:210,
                    width:350,
                    padding:'1rem'
                  }}
                  >
                    <h5 className='text-center'>Booking info</h5>
                    <div className="d-flex flex-column gap-1">
                      <div className="d-flex">
                        <input className="form-control-plaintext w-75" type="text" value='Status'  readonly/>
                        <input className="form-control" type="text" value={props.booking.status === 0 ? 'New' : props.booking.status ===  1 ? 'Active' : 'Complete'} disabled readonly/>
                      </div>
                      <div className="d-flex">
                        <input className="form-control-plaintext w-75" type="text" value='Table code'  readonly/>
                        <input className="form-control" type="text" value={props.booking.tableCode} disabled readonly/>
                      </div>
                      <div className="d-flex">
                        <input className="form-control-plaintext w-75" type="text" value='Price'  readonly/>
                        <input className="form-control" type="text" value={bookingDetails.reduce((acc, item) => acc + item.price, 0) + ' DA'} disabled readonly/>
                      </div>
                    </div>


                </Paper>
            </div>
        </div>
      </Dialog>
    </div>
  )
}

export default DialogBooking