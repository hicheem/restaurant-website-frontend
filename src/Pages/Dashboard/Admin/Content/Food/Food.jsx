import { Alert, AppBar, Avatar, Backdrop, Button, CircularProgress, Grid, IconButton, Paper, Snackbar, TextField, Toolbar, Tooltip, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import ColumnAction from '../ColumnAction'
import React, { useMemo } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const Food = () => {

  const [items, setItems] = useState([])
  const [menu, setMenu] = useState([])
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [open, setOpen] = useState(false);
  const [rowId, setRowId] = useState(null)
  const [selectedRowId, setSelectedRowId] = useState(null)
  const [msgSnackBar, setMsgSnackBar] = useState('')


  useEffect(() =>{
    setLoading(true)
    getItems()
    getMenus()
    
  },[refresh])

  const getMenus = () => {
    axios('http://localhost:3003/api/menu/getMenus')
    .then(response => {
      setMenu(response.data.menu)
    })
  }

  const getItems = () => {
    fetch('http://localhost:3003/api/menu/getItemsAdmin',{
      "headers":{
        "Content-Type":"application/json",
        "authorization":"JWT "+window.localStorage.getItem("token")
      },
    }).then(prm => {
      setLoading(false)
      if(prm.status === 200)
        return prm.json()
    })
    .then(response => {
      setItems(response.items)
    })
  }


  const columns = useMemo(() => [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'image', headerName: 'Image', width: 100 , sortable:false, renderCell: params => <Avatar variant="rounded" src={params.row.image} sx={{ width: 56, height: 56 }}/> },
    { field: 'item_title', headerName: 'Title', width: 150 , editable:true},
    { field: 'menu_title', headerName: 'Menu', width: 80, editable: true, type:'singleSelect', valueOptions:menu.map(item => item.title) },
    { field: 'cooking', headerName: 'cooking', width: 100, editable: true, type:'boolean' },
    { field: 'price', headerName: 'Price', width: 80, editable: true, renderCell:params=> params.row.price + ' DA' },
    { field: 'quantity', headerName: 'Quantity', width: 80, editable: true },
    { field: 'recipe', headerName: 'Recipe', width: 170 , sortable:false, editable: true, renderCell:params=> <Tooltip title={params.row.recipe}><div className='fw-light'>{params.row.recipe}</div></Tooltip> },
    { field: 'actions', headerName: 'Actions', width: 170 , sortable:false,  renderCell:params => 
      <ColumnAction
        id={params.row.id}
        data={
          {
            item_title:params.row.item_title,
            menuId: menu.filter(item => item.title === params.row.menu_title)[0].id,
            cooking:params.row.cooking,
            price:params.row.price,
            quantity:params.row.quantity,
            recipe:params.row.recipe            
          }
        }
        submitURL={'http://localhost:3003/api/menu/updateItem?id='}
        deleteURL={'http://localhost:3003/api/menu/deleteItem?id='}
        rowId={rowId}
        setRowId={setRowId}
        setMsgSnackBar={setMsgSnackBar}
        setOpen={setOpen}
        selectedRowId={selectedRowId}
        setSelectedRowId={setSelectedRowId}
        setRefresh={setRefresh}
        refresh={refresh}
      />},
  ],[menu, rowId, selectedRowId])

 
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  

  return (
    <div>

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
          Food updated
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
                  placeholder="Search for Food"
                  InputProps={{
                    disableUnderline: true,
                    sx: { fontSize: 'default' },
                  }}
                  variant="standard"
                />
              </Grid>
              <Grid item>
                <Button variant="contained" sx={{ mr: 1 }} >
                  Add Food
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
          <div style={{ height: 710, width: '100%' }}>
            <DataGrid
              // experimentalFeatures={{ newEditingApi: true }}
              rows={items}
              columns={columns}
              // processRowUpdate={processRowUpdate}
              pageSize={10}
              rowsPerPageOptions={[5]}
              // checkboxSelection
              // onCellEditCommit={params => setRowId(params.id)}
              // onRowClick={params => setSelectedRowId(params.id)}
              getRowSpacing={params =>({
                top : params.isFirstVisible? 0: 3,
                bottom : params.isLastVisible? 0: 3
              })}
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

export default Food


