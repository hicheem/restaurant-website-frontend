import { AppBar, Backdrop, Button, CircularProgress, Grid, IconButton, Paper, TextField, Toolbar, Tooltip, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import { DataGrid } from '@mui/x-data-grid';

import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import DialogAddUser from './DialogAddUser';
import UserActions from './UserActions';
import { useMemo } from 'react';




const Users = () => {
  
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [refresh, setRefrech] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)

  const [rowId, setRowId] = useState(null)

  useEffect(() => {
    setLoading(true)
    axios
    .get('http://localhost:3003/api/user/users')
    .then(response => {
      setUsers(response.data.users)
      setLoading(false)
    })
  },[refresh])


  const columns = useMemo(()=> 
    [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'firstName', headerName: 'First name', width: 100 },
      { field: 'lastName', headerName: 'Last name', width: 110 },
      { field: 'mobile', headerName: 'Mobile', width: 130 },
      { field: 'email', headerName: 'Email', width: 170 },
      { field: 'role', headerName: 'Role', width: 130, type:'singleSelect', valueOptions:['admin', 'chef', 'agent', 'customer'], editable:true},
      { field: 'fullName', 
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
          `${params.row.firstName || ''} ${params.row.lastName || ''}`,
      },
      {field : 'actions', headerName: 'Actions', type:'actions', renderCell: params => <UserActions params={params} rowId={rowId} setRowId={setRowId}/>}
    ]
  ,[rowId])





  return (
    <div >
      <DialogAddUser open={openDialog} setOpen={setOpenDialog}/>
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
                placeholder="Search by email address, phone number, or user UID"
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: 'default' },
                }}
                variant="standard"
              />
            </Grid>
            <Grid item>
              <Button variant="contained" sx={{ mr: 1 }} onClick={() => setOpenDialog(true)}>
                Add user
              </Button>
              <Tooltip title="Reload">
                <IconButton>
                  <RefreshIcon color="inherit" sx={{ display: 'block' }} onClick={() => setRefrech(!refresh)}/>
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
          >
          <CircularProgress color="inherit" />
        </Backdrop>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={users}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            onCellEditCommit={params => setRowId(params.id)}
            // disableSelectionOnClick
          />
        </div>

      </Typography>
    </Paper>
    </div>
  )
}

export default Users




