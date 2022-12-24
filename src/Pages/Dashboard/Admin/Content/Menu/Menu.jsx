import { AppBar, Backdrop, Button, CircularProgress, Grid, IconButton, Paper, Snackbar, TextField, Toolbar, Tooltip, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MuiAlert from '@mui/material/Alert';
import ColumnAction from '../ColumnAction'
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useMemo } from 'react';
import DialogMenu from './DialogMenu';

const Menu = () => {

  const [menu, setMenu] = useState([])
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [open, setOpen] = useState(false);
  const [rowId, setRowId] = useState(null)
  const [selectedRowId, setSelectedRowId] = useState(null)
  const [msgSnackBar, setMsgSnackBar] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
 

  const columns = useMemo(() => [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'userId', headerName: 'User ID', width: 70, sortable:false },
    { field: 'title', headerName: 'Title', width: 100, editable: true },
    { field: 'summary', headerName: 'Summary', width: 150, editable: true, sortable:false },
    { field: 'type', headerName: 'Type', width: 130, editable: true },
    { field: 'content', headerName: 'Content', width: 170, editable: true, sortable:false },
    { field: 'actions', headerName: 'Actions', width: 170, editable: true, sortable:false ,
      renderCell:params => 
        <ColumnAction 
          id={params.row.id}
          data={
            {title:params.row.title,
            summary:params.row.summary,
            content:params.row.content,
            type:params.row.type
          }
          }
          submitURL={'http://localhost:3003/api/menu/updateMenu?id='}
          deleteURL={'http://localhost:3003/api/menu/deleteMenu?id='}
          rowId={rowId}
          setRowId={setRowId}
          setMsgSnackBar={setMsgSnackBar}
          setOpen={setOpen}
          selectedRowId={selectedRowId}
          setSelectedRowId={setSelectedRowId}
          setRefresh={setRefresh}
          refresh={refresh}
          />
    },
  ],[rowId, selectedRowId])

  console.log(menu)
  useEffect(() => {
      setLoading(true)
      axios('http://localhost:3003/api/menu/getMenus')
      .then(response => {
        console.log(response.data)
        if(response.status === 200)
          setMenu(response.data.menu)
          setLoading(false)
      })
  },[refresh])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  

  return (
    <div>
      <DialogMenu open={openDialog} setOpen={setOpenDialog}/>
      <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
          >
          <CircularProgress color="inherit" />
      </Backdrop>
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
                  placeholder="Search for menu"
                  InputProps={{
                    disableUnderline: true,
                    sx: { fontSize: 'default' },
                  }}
                  variant="standard"
                />
              </Grid>
              <Grid item>
                <Button variant="contained" sx={{ mr: 1 }} onClick={() => setOpenDialog(true)}>
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
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              // experimentalFeatures={{ newEditingApi: true }}
              rows={menu}
              columns={columns}
              // processRowUpdate={processRowUpdate}
              pageSize={5}
              rowsPerPageOptions={[5]}
              // checkboxSelection
              onCellEditCommit={params => setRowId(params.id)}
              onRowClick={params => setSelectedRowId(params.id)}
              onColumnHeaderClick={() => setSelectedRowId(null)}
            />
          </div>
        </Typography>
      </Paper>

    </div>
  )
}

export default Menu



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});