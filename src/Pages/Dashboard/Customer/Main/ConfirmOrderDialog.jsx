import { Backdrop, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { UserContext } from '../../../../App';
import FinalStep from '../Steps/FinalStep';
import StepOne from '../Steps/StepOne';
import StepThree from '../Steps/StepThree';
import StepTwo from '../Steps/StepTwo';

const CurrentStep = (props) =>{
    
    const [paymentMethod, setPaymentMethod] = useState(0)
    const [orderMethod, setOrderMethod] = useState(0)

    if(props.step === 0){
        return <StepOne cart={props.cart} order={props.order} setOrder={props.setOrder}/>
    }
    else if(props.step === 1)
    {
        return <StepTwo table={props.table} setTable={props.setTable} orderMethod={orderMethod} setOrderMethod={setOrderMethod} order={props.order} setOrder={props.setOrder}/>
    }
    else if(props.step === 2)
    {
        return <StepThree order={props.order} setOrder={props.setOrder} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod}/>
    }
    else if(props.step === 3)
    {
        return <FinalStep order={props.order}/>
    }
    else
        return <></>
}
const ConfirmOrderDialog = (props) => {

    const [user, ] = useContext(UserContext)

    const steps = ['Verify orders', 'Order method', 'Payment method', 'Finish']
    const [step, setStep] = useState(0)
    const [table, setTable] = useState({code:null})

    const [order, setOrder] = useState({user})

    const [open, setOpen] = useState(false);

    console.log(step)
    const handleNext = () => {
        if(step<3)
            setStep(step + 1)
        else    
            fetchBook()
    }
    const handleBack = () => {
        setStep(step - 1)
    }
    const handleCancel = () => {
        setStep(0)
        props.setDialogOrder(false)
    }
    const fetchBook = () => {
        
        setOpen(true)
        axios.post('http://localhost:3003/api/book/AddBook',
            {
                userId : order.user.id, 
                firstName : order.user.firstName, 
                lastName : order.user.lastName, 
                email : order.user.email, 
                mobile : order.user.mobile, 
                tableId : order.table.id
            }
        )
        .then(res => {
            if(res.status === 201){
                console.log(res.data.message)
                const bookingId = res.data.bookingId
                fetchCartItems(bookingId)
                setOpen(false)
                reset()
                props.setDialogOrder(false)
            }
        })
    }
    
    const fetchCartItems = (bookingId) => {
        console.log(props.cart[0]);
        props.cart.map(item => (
            axios.post('http://localhost:3003/api/book/addBookItem',
                {
                    item,
                    bookingId
                }
            )
            .then(res => {
                console.log(res.data.message)
            })
        ))
    }
    

    const reset = () => {
        setStep(-1)
        setTable({code:null})
        setOrder({user})
        props.setCart([])
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
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            >
            <CircularProgress color="inherit" />
        </Backdrop>
            <CurrentStep 
                step={step} 
                cart={props.cart}
                setTable={setTable}
                table={table}
                order={order}
                setOrder={setOrder}
            />
        </DialogContent>
        <DialogActions>
        <div className="btn btn-outline-danger position-absolute" style={{left:'1rem'}} onClick={() => {setOrder({user})}}>Reset</div>
        <div className="btn btn-danger" onClick={handleCancel}>Cancel</div>
            {
                step > 0 ? 
                <div className='btn btn-warning' onClick={handleBack}>Back</div>                
                : <></>
            }
          <div className="btn btn-secondary" onClick={handleNext}>{step===3 ? 'Order' : 'Next'}</div>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ConfirmOrderDialog