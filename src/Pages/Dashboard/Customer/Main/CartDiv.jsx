import { IconButton, List, ListItem, ListItemText, Typography } from '@mui/material'
import React, { useState } from 'react'

import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ConfirmOrderDialog from './ConfirmOrderDialog';


const CartDiv = (props) => {

  const [dialogOrder, setDialogOrder] = useState(false)

  

  const handlerConfirm = () => {
    setDialogOrder(true)
  }

  return (
    <div>
      <ConfirmOrderDialog dialogOrder={dialogOrder} setDialogOrder={setDialogOrder} cart={props.cart}/>
      <div className="card bg-light mb-3" style={{maxWidth: '18rem', width:'17rem'}}>
        <div className="card-header d-flex align-items-center gap-2">
          <ShoppingCartIcon/>
            My cart
        </div>
        <div className="card-body">
          <h5 className="card-title">Add Dishes</h5>
          {
            props.cart.map((item, index) => (
              <List >
                <ListItem style ={ index % 2? { background : "#eaeff1"}:{ background : "white" }} >
                  <ListItemText primary={item.quantity} className='text-primary'/>
                  <ListItemText primary={<Typography style={{fontSize:10}}>{item.title}</Typography>}/>
                  <ListItemText primary={<Typography className='fw-bold text-secondary'>{item.price}</Typography>} />
                  <IconButton>
                    <RemoveCircleIcon />
                  </IconButton>
                  <IconButton sx={{marginLeft:'-1rem', marginRight:'-1rem'}}>
                    <AddCircleIcon />
                  </IconButton>
                </ListItem>
              </List>
              ))
            }
        </div>
        <div className="card-footer d-flex gap-3">
          <h5>Total : </h5>
          <h5 className='text-danger'>
            {
              props.cart.reduce((acc, item) => acc + item.price, 0)
            }           
              DA
          </h5>
        </div>
        {
          props.cart.length > 0 ?
            <div className="card-footer d-flex gap-3">
              <div className='btn btn-danger' onClick={()=>props.setCart([])}>Reset</div>
              <div className='btn btn-secondary' onClick={handlerConfirm}>Confirm</div>
            </div>
            : <></>
        }
      </div>
  </div>
  )
}

export default CartDiv