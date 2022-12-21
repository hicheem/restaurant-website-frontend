import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useEffect } from 'react';

const ItemDialog = (props) => {

    
    
    
    const [quantity, setQuantity] = useState(1)

    const handleOk = () => {
        let oldQuantity = 0;
        const filteredCart = props.cart.filter(function(item){
            if(item.id === props.item.item_id)
                oldQuantity = item.quantity
            else    
                return item
        })

        props.setCart([...filteredCart, {id:props.item.item_id, title: props.item.item_title, quantity:(quantity+oldQuantity), price:props.item.price * (quantity+oldQuantity)}])
        
        props.setSelectedItem(0)
        setQuantity(1)
    }
  return (
    <div>
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth="xs"
            open={props.selectedItem === 0 ? false : true}
            >
            <DialogTitle>
                <Grid container alignItems="center">
                    <Grid item xs>
                        <Typography gutterBottom variant="h4" component="div">
                            {props.item !== null && props.item.item_title} 
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography gutterBottom variant="h6" component="div">
                            {props.item !== null && props.item.price * quantity} DA
                        </Typography>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent dividers className='d-flex flex-column align-items-center'>
                <h3 className='text-center'>Quantity</h3>
                <div className='my-5 d-flex justify-content-center align-items-center gap-4'>
                    <Tooltip onClick={()=>
                    {
                        if(quantity > 1){
                            setQuantity(quantity - 1)
                        }
                    }
                    }>
                        <IconButton>
                            <RemoveIcon />
                        </IconButton>
                    </Tooltip>
                    <h4>{quantity}</h4>
                    <Tooltip onClick={()=>setQuantity(quantity + 1)}>
                        <IconButton>
                            <AddIcon/>
                        </IconButton>
                    </Tooltip>
                </div>
            </DialogContent>
            <DialogActions>
                <Button autoFocus 
                    onClick={() => props.setSelectedItem(0)}
                    >   
                    Cancel
                </Button>
                <Button 
                    onClick={handleOk}
                    >Add</Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}

export default ItemDialog