import { Alert, CircularProgress, Fab, Snackbar } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import {Check, Save} from '@mui/icons-material'
import { green } from '@mui/material/colors'
import { useEffect } from 'react'

const UserActions = (props) => {

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    

    const handleSubmit = () => {
        setLoading(true)
        const fetchURL = props.URL+props.id
        fetch(fetchURL,{
            "headers":{
                "Content-Type":"application/json",
                "authorization":"JWT "+window.localStorage.getItem("token")
              },
              "body": JSON.stringify(props.data),
              "method":"post",
            }
        )
        .then(prm => {
            setLoading(false)
            if(prm.status === 201){
                setSuccess(true)
                props.setRowId(null)
                return prm.json()
            }
        })
        .then(response => {
            // alert(response.message)
            props.setMsgSnackBar(response.message)
            props.setOpen(true)
        })
    }
    
    useEffect(() => {
        if(props.rowId === props.id && success){
            setSuccess(false)
        }
        console.log("hello");
    },[props.rowId])


    

  return (
    <div >
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
                disabled={props.id !== props.rowId || loading}
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
    </div>
  )
}

export default UserActions