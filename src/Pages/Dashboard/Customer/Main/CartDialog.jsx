import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, List, ListItem, ListItemText, Tooltip, Typography } from '@mui/material'
import React from 'react'

const CartDialog = (props) => {
  return (
    <div>
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth="xs"
            open={true}
            >
            <DialogTitle>
                <Grid container alignItems="center">
                    <Grid item xs>
                        <Typography gutterBottom variant="h5" component="div">
                            Valid My cart
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography gutterBottom variant="h6" component="div">
                            hello
                        </Typography>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent dividers className='d-flex flex-column align-items-center'>
                <h3 className='text-center'>Dishes</h3>
                <div className='my-5 d-flex justify-content-center align-items-center gap-4'>
                {
                props.cart.map((item, index) => (

                  <List className='d-flex flex-column'>
                    <ListItem style ={ index % 2? { background : "#eaeff1"}:{ background : "white" }} >
                      <ListItemText primary={item.quantity}/>
                      <ListItemText primary={item.title}/>
                      <ListItemText primary={<Typography className='fw-bold text-secondary'>{item.price}</Typography>} />
                    </ListItem>
                </List>
                ))
              }
                    
                </div>
            </DialogContent>
            <DialogActions>
                <Button autoFocus 
                    
                    >   
                    Cancel
                </Button>
                <Button 
                    
                    >Confirm</Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}

export default CartDialog