import { CircularProgress, Fab, Tooltip} from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import {Check, Delete, Save} from '@mui/icons-material'
import { green, red } from '@mui/material/colors'
import { useEffect } from 'react'
import {fetchBase} from '../../../../api'

const UserActions = (props) => {

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    
    
    const handleSubmit = () => {
        setLoading(true)
        const fetchURL = props.submitURL+props.id
        fetch(fetchBase + fetchURL,{
            "headers":{
                "Content-Type":"application/json",
                "authorization":"JWT "+window.localStorage.getItem("token")
              },
              "body": JSON.stringify(props.data),
              "method":"put",
            }
        )
        .then(prm => {
            setLoading(false)
            props.setOpen(true)
            if(prm.status === 201){
                setSuccess(true)
                props.setRowId(null)
                return prm.json()
            }
        })
        .then(response => {
            props.setMsgSnackBar(response.message)
            props.setOpen(true)
        })
    }
    

    const handleDelete = () => {
        const confirm = window.confirm("Confirmer de supprimer ?")
        if(confirm){
            const fetchURL = props.deleteURL+props.id
            fetch(fetchBase + fetchURL,{
                "headers":{
                    "Content-Type":"application/json",
                    "authorization":"JWT "+window.localStorage.getItem("token")
                  },
                  "method":"delete",
                }
            ).then(prm => {
                props.setSelectedRowId(null)
                if(prm.status === 204){
                    props.setMsgSnackBar("Deleted")
                    props.setOpen(true)
                    props.setRefresh(!props.refresh)
                    return prm.json()
                }
            })
            .then(response => {
                props.setMsgSnackBar(response.message)
                props.setOpen(true)
            })
        }
    }

    useEffect(() => {
        if(props.rowId === props.id && success){
            setSuccess(false)
        }
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
            <Fab 
            color='primary'
            sx={{
                marginLeft:'0.5rem',
                width:40,
                height:40,
                bgcolor: red[400],
                '&:hover':{bgcolor: red[600]}}}
            disabled={props.id !== props.selectedRowId}
            onClick={handleDelete}>
                <Tooltip title="Delete">
                    <Delete/>
                </Tooltip>
            </Fab>

    </Box>
    </div>
  )
}

export default UserActions