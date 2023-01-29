import { Preview, Edit, Delete } from '@mui/icons-material'
import { Backdrop, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import {fetchBase} from '../../../../../api'

const BookingActions = (props) => {

    const [openDialog, setOpenDialog] = useState(false)
    const [newStatus, setNewStatus] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleViewDetails = () => {
        props.setBookingId(props.params.id)
        props.setOpen(true)
    }

    const updateBook = () => {
        fetch(fetchBase + `api/book/updateBookStatus?id=${props.params.row.id}`,{
            "headers":{
                "Content-Type":"application/json",
                "authorization":"JWT "+window.localStorage.getItem("token")
            },
            "body": JSON.stringify({status:newStatus}),
            "method":"put",
        })
        .then(prm => {
            setLoading(false)
            if(prm.status === 201){
                return prm.json()
            }
        })
        .then(response => {
            props.setMsgSnack(response.message)
            setOpenDialog(false)
            props.setOpenSnack(true)
            props.setRefresh(!props.refresh)
        })
    }
    const updateOrder = () => {
        fetch(fetchBase + `api/order/updateOrderOBStatus?tableId=${props.params.row.tableId}`,{
            "headers":{
                "Content-Type":"application/json",
                "authorization":"JWT "+window.localStorage.getItem("token")
            },
            "body": JSON.stringify({status:newStatus}),
            "method":"put",
        })
        .then(prm => {
            setLoading(false)
            if(prm.status === 201){
                return prm.json()
            }
        })
        .then(res => {
            return
        })
    }
    const handleUpdateStatus = () => {
        setLoading(true)
        updateOrder()
        updateBook()
        
    }
  return (
    <Box>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
          >
          <CircularProgress color="inherit" />
      </Backdrop>
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth="xs"
            open={openDialog}
            onClose={()=>setOpenDialog(false)}
            >
            <DialogTitle>
                Modify booking status
            </DialogTitle>
            <DialogContent dividers>
                <div className="d-flex flex-column">
                    <div className="fw-bold text-danger">Change status for booking id={props.params.row.id}</div>
                    <div className="mb-3 my-3">
                        <select className="form-select" id='status' onChange={(e)=>setNewStatus(e.target.value)}>
                            <option selected disabled>Select a status</option>
                            <option value="0">New</option>
                            <option value="1">Active</option>
                            <option value="2">Complete</option>
                        </select>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <div className="btn btn-danger" onClick={()=>setOpenDialog(false)}>Cancel</div>
                <div className="btn btn-secondary" onClick={handleUpdateStatus}>Confirm</div>
            </DialogActions>
        </Dialog>
        <Tooltip title='View booking details'>
            <IconButton onClick={handleViewDetails}>
                <Preview/>
            </IconButton>
        </Tooltip>
        <Tooltip title='Edit booking'>
            <IconButton onClick={() => {setOpenDialog(true)}}>
                <Edit/>
            </IconButton>
        </Tooltip>
        <Tooltip title='Delete booking'>
            <IconButton onClick={() => {}}>
                <Delete/>
            </IconButton>
        </Tooltip>
    </Box>
  )
}

export default BookingActions