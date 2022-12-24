import { Backdrop, CircularProgress, Snackbar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MuiAlert from '@mui/material/Alert';

const Menu = () => {

  const [menu, setMenu] = useState([])
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [open, setOpen] = React.useState(false);
  // const [value, setValue] = useState(null)
  
  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    console.log(updatedRow);

    setLoading(true)
    fetch(`http://localhost:3003/api/menu/updateMenu?id=${updatedRow.id}`,{
      "headers":{
        "Content-Type":"application/json",
        "authorization":"JWT "+window.localStorage.getItem("token")
      },
      "body": JSON.stringify(
        {
          title: updatedRow.title,
          summary: updatedRow.summary,
          content: updatedRow.content
        }
      ),
      "method":"post",
    }
    )
    .then(prm => {
      setLoading(false)
      if(prm.status === 201)
        return prm.json()
      else if(prm.status === 401)
        alert(prm.statusText)
      else
        alert(prm.statusText)
      
    })
    .then(response => {
      setOpen(true);
    })
    // axios
    // .post(`http://localhost:3003/api/menu/updateMenu?id=${updatedRow.id}`,
    // {
    //   title: updatedRow.title,
    //   summary: updatedRow.summary,
    //   content: updatedRow.content
    // }
    // )
    // .then(response => {
    //   if(response.status === 201){
    //     alert(response.data.message)
    //   }
    // })

  return updatedRow
  };


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
      <Snackbar 
        open={open} 
        autoHideDuration={1000} 
        onClose={handleClose}
        anchorOrigin={{ vertical:'top', horizontal:'center' }}
        >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Menu Updated
        </Alert>
      </Snackbar>
      <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
          >
          <CircularProgress color="inherit" />
        </Backdrop>
      <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            experimentalFeatures={{ newEditingApi: true }}
            rows={menu}
            columns={columns}
            processRowUpdate={processRowUpdate}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            onRowClick={()=>console.log('clicked')}
          />
        </div>

    </div>
  )
}

export default Menu

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'userId', headerName: 'User ID', width: 70 },
  { field: 'title', headerName: 'Title', width: 100, editable: true },
  { field: 'summary', headerName: 'Summary', width: 110, editable: true },
  { field: 'type', headerName: 'Type', width: 130, editable: true },
  { field: 'content', headerName: 'Content', width: 170, editable: true }
];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});