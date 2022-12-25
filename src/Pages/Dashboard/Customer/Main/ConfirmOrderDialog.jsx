import { Backdrop, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';
import {axiosBase} from '../../../../api';
import {fetchBase} from '../../../../api';
import React, { useState } from 'react'
import FinalStep from '../Steps/FinalStep';
import StepOne from '../Steps/StepOne';
import StepThree from '../Steps/StepThree';
import StepTwo from '../Steps/StepTwo';


const CurrentStep = (props) =>{
    
    switch (props.step) {
        case 0:
            return <StepOne cart={props.cart} order={props.order} setOrder={props.setOrder}/>
        case 1:
            return <StepTwo order={props.order} setOrder={props.setOrder}/>
        case 2:
            return <StepThree order={props.order} setOrder={props.setOrder} />
        case 3:
            return <FinalStep order={props.order}/>
        default:
            break;
    }

}
const ConfirmOrderDialog = (props) => {


    const steps = ['Verify orders', 'Order method', 'Payment method', 'Finish']
    const [step, setStep] = useState(0)

    const [order, setOrder] = useState({})

    const [open, setOpen] = useState(false);

    const user = JSON.parse(window.localStorage.getItem('user'))
    
    const handleNext = () => {
        if(step<3)
            setStep(step + 1)
        else    
            fetchOrder()
    }
    const handleBack = () => {
        setStep(step - 1)
    }
    const handleCancel = () => {
        setStep(0)
        props.setDialogOrder(false)
    }
    const fetchOrder = async () => {
        setOpen(true)
        let tableId = null
        if(order.capacityTable){
            let response = await fetch(fetchBase + `api/table/bookTable?capacity=${order.capacityTable}`)
            const status = response.status
            response = await response.json()
            if(status === 200){
                
                tableId = response.tableId
                fetchAddBook(tableId)
                fetchAddOrder(tableId)
                return
            }
            else if(status === 403){
                alert(response.message)
                setOpen(false)
                return
            }
        }
        fetchAddOrder(tableId)
        
    }
    // To fetch to orders
    const fetchAddOrder = (tableId) => {
        axiosBase
        .post('api/order/AddOrder',
            {
                userId : user.id, 
                tableId,
                firstName : user.firstName, 
                lastName : user.lastName, 
                email : user.email, 
                mobile : user.mobile,
                method : order.method,
                payment : order.payment,
                totalPrice : order.totalPrice

            }
        )
        .then(res => {
            if(res.status === 201){
                console.log(res.data.message)
                alert(res.data.message)
                const orderId = res.data.orderId
                fetchCartItems(orderId, false)
                setOpen(false)
                reset()
                props.setDialogOrder(false)
            }
        })
    }
    // same as order but for booking
    const fetchAddBook = (tableId) => {
        axiosBase
        .post('api/book/AddBook',
            {
                userId : user.id, 
                tableId,
                firstName : user.firstName, 
                lastName : user.lastName, 
                email : user.email, 
                mobile : user.mobile,
                datetime : order.datetime

            }
        )
        .then(res => {
            if(res.status === 201){
                console.log(res.data.message)
                const bookingId = res.data.bookingId
                fetchCartItems(bookingId, true)
            }
        })
    }

    const fetchCartItems = (id, isBooking) => {
        const fetchURL = isBooking ? `api/book/addBookItem?id=${id}`
                : `api/order/addOrderItem?id=${id}`
        props.cart.map(item => (
            axiosBase.post(fetchURL,
                {
                    item
                }
            )
            .then(res => {
                console.log(res.data.message)
            })
        ))
    }
    

    const reset = () => {
        setStep(0)
        setOrder({})
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
                order={order}
                setOrder={setOrder}
                setDialogOrder={props.setDialogOrder}
            />
        </DialogContent>
        <DialogActions>
        <div className="btn btn-outline-danger position-absolute" style={{left:'1rem'}} 
                onClick={
                            ()=> {
                                props.setDialogOrder(false)
                                reset()
                            }
                        }>Reset</div>
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