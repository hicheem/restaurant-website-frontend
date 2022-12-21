import { Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, InputAdornment, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import React, { useContext, useState } from 'react'
import { UserContext } from '../../../../App';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PublicIcon from '@mui/icons-material/Public';

const CurrentStep = (props) =>{
    if(props.step === 0){
        return (
            <div>
                <div className="my-4 d-flex gap-3">
                    <h5>Total : </h5>
                    <h5 className='text-danger'>
                        {
                            props.cart.reduce((acc, item) => acc + item.price, 0)
                        }           
                        DA
                    </h5>
                </div>
                {
                    props.cart.map((item, index) => (
                        <List >
                            <ListItem style ={ index % 2? { background : "#eaeff1"}:{ background : "white" }} >
                                <ListItemText primary={<Typography className='fw-bold text-danger'>{item.quantity}</Typography>}/>
                                <ListItemText primary={<Typography >{item.title}</Typography>}/>
                                <ListItemText primary={<Typography className='fw-bold text-danger'>{item.price}DA</Typography>} />
                            </ListItem>
                        </List>
                    ))
                }
                <Divider/>
                
            </div>
        )
    }
    else if(props.step === 1)
    {
        
        return (
            <div>
                <div className='d-flex gap-1'>
                    <Chip label="Deliver" variant="outlined" className={`${props.method === 0? 'bg-secondary' : ''}`} onClick={()=>props.setMethod(0)}/>
                    <Chip label="Book a Table" variant="outlined" className={`${props.method === 1? 'bg-secondary' : ''}`}  onClick={()=>props.setMethod(1)}/>
                </div>
                {
                    props.method === 0 ?
                        <div className="my-4 text-center d-flex flex-column gap-3">
                            <TextField
                                disabled
                                id="outlined-disabled"
                                label="City"
                                defaultValue={props.user.city}
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <PublicIcon />
                                      </InputAdornment>
                                    ),
                                  }}
                            />
                            <TextField
                                id="outlined-disabled"
                                label="Adress"
                                placeholder='Type your address'
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <LocationOnIcon />
                                      </InputAdornment>
                                    ),
                                  }}
                            />
                        </div>
                    :
                    <div className="">Table</div>
                }
            </div>
        )
        }
}
const ConfirmOrderDialog = (props) => {

    const [user, setUser] = useContext(UserContext)

    const steps = ['Verify orders', 'Order method', 'Paymenet method', 'Finish']
    const [step, setStep] = useState(0)
    const [method, setMethod] = useState(0)

    const handleNext = () => {
        setStep(step + 1)
    }
    const handleBack = () => {
        if(step === 0)
            props.setDialogOrder(false)
        else 
        setStep(step - 1)
    }
    const handleOrderMethod = () => {
        if(method === 1){
            
        }
    }
  return (
    <div>
        <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        maxWidth="xs"
        open={props.dialogOrder}
        >
        <DialogTitle className='fw-bold'>{steps[step]}</DialogTitle>
        
        <DialogContent dividers>
        {

        }
        <CurrentStep step={step} cart={props.cart} method={method} setMethod={setMethod} user={user}/>
        </DialogContent>
        <DialogActions>
          <div className="btn btn-danger" onClick={handleBack}>{step === 0 ? 'Cancel' : 'Back'}</div>
          <div className="btn btn-secondary" onClick={handleNext}>Next</div>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ConfirmOrderDialog