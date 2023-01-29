import { Alert, AppBar, Avatar, Backdrop, Button, CircularProgress, Grid, IconButton, Paper, Snackbar, TextField, Toolbar, Tooltip, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import { DataGrid } from '@mui/x-data-grid';

import React from 'react'
import { useEffect } from 'react';
import {axiosBase} from '../../../../../api';
import { useState } from 'react';
import DialogAddUser from './DialogAddUser';
import ColumnAction from '../ColumnAction';
import { useMemo } from 'react';




const Users = () => {
  
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [open, setOpen] = useState(false);
  const [msgSnackBar, setMsgSnackBar] = useState('')
  const [rowId, setRowId] = useState(null)
  const [selectedRowId, setSelectedRowId] = useState(null)

  useEffect(() => {
    setLoading(true)
    axiosBase
    .get('api/user/users')
    .then(response => {
      setUsers(response.data.users)
      setLoading(false)
    })
  },[refresh])


  const columns = useMemo(()=> 
    [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'photo', headerName: 'Avatar', width: 80 , 
        renderCell : params => <Avatar src={params.row.photo}/> },
      { field: 'fullName', 
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
          `${params.row.firstName || ''} ${params.row.lastName || ''}`,
      },
      { field: 'firstName', headerName: 'First name', width: 100, hide:true },
      { field: 'lastName', headerName: 'Last name', width: 110, hide:true },
      { field: 'mobile', headerName: 'Mobile', width: 130, sortable:false },
      { field: 'email', headerName: 'Email', width: 170 },
      { field: 'role', headerName: 'Role', width: 130, type:'singleSelect', valueOptions:['admin', 'chef', 'agent', 'customer'], editable:true},
      {field : 'actions', headerName: 'Actions', type:'actions', sortable:false, width:170,
        renderCell: params => 
          <ColumnAction 
            submitURL={'api/user/updateUser?id='}
            deleteURL={'api/user/deleteUser?id='}
            data={{role:params.row.role}} 
            id={params.row.id} 
            setMsgSnackBar={setMsgSnackBar}
            setOpen={setOpen}
            rowId={rowId} 
            setRowId={setRowId}
            selectedRowId={selectedRowId}
            setSelectedRowId={setSelectedRowId}
            setRefresh={setRefresh}
            refresh={refresh}
            />}
    ]
  ,[rowId, selectedRowId])


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  return (
    <div >
      <DialogAddUser open={openDialog} setOpen={setOpenDialog}/>
      <Snackbar 
        open={open} 
        autoHideDuration={2000} 
        onClose={handleClose}
        anchorOrigin={{ vertical:'top', horizontal:'center' }}
        >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {msgSnackBar}
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
                  <RefreshIcon color="inherit" sx={{ display: 'block' }} onClick={() => setRefresh(!refresh)}/>
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
            onRowClick={params => setSelectedRowId(params.id)}
            onColumnHeaderClick={() => setSelectedRowId(null)}
            // disableSelectionOnClick
          />
        </div>

      </Typography>
    </Paper>
    </div>
  )
}

export default Users




