import { Preview, Edit, Delete } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const BookingActions = (props) => {

    const handleViewDetails = () => {
        props.setBookingId(props.params.id)
        props.setOpen(true)
    }
  return (
    <Box>
        <Tooltip title='View booking details'>
            <IconButton onClick={handleViewDetails}>
                <Preview/>
            </IconButton>
        </Tooltip>
        <Tooltip title='Edit booking'>
            <IconButton onClick={() => {}}>
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