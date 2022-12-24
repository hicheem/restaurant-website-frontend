import { CircularProgress, Fab } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import {Check, PanoramaSharp, Save} from '@mui/icons-material'
import { green } from '@mui/material/colors'
import axios from 'axios'
import { useEffect } from 'react'

const UserActions = (props) => {

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSubmit = () => {
        setLoading(true)
        const {id, role} = props.params.row
        axios.post(`http://localhost:3003/api/user/updateUser?id=${id}`,
        {
            role
        })
        .then(response => {
            if(response.status === 201){
                setSuccess(true)
                props.setRowId(null)
                alert(response.data.message)
            }
        })
        setLoading(false)
    }
    
    useEffect(() => {
        if(props.rowId === props.params.id && success){
            setSuccess(false)
        }
        console.log("hello");
    },[props.rowId])

  return (
    <Box
    sx={{
        m:1,
        position:'relative'
    }}
    >
        {
            success ? <>
                <Fab
                color='primary'
                sx={{
                    width:40,
                    height:40,
                    bgcolor: green[500],
                    '&:hover':{bgcolor: green[700]}
                }}
                >
                    <Check />
                </Fab>
            </> 
            :<>
                <Fab
                color='primary'
                sx={{
                    width:40,
                    height:40,
                    bgcolor: green[500],
                    '&:hover':{bgcolor: green[700]}
                }}
                disabled={props.params.id !== props.rowId || loading}
                onClick={handleSubmit}
                >
                    <Save />
                </Fab>
            </>
        }
        {
            loading &&
                <CircularProgress
                size={52}
                sx={{
                    color:green[500],
                    position:'absolute',
                    top:-6,
                    left:-6,
                    zIndex:1
                }}
                />
        }

    </Box>
  )
}

export default UserActions