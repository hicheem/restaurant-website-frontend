import { Divider, List, ListItem, ListItemText, Typography } from '@mui/material'
import React, { useEffect } from 'react'

const StepOne = (props) => {
    useEffect(()=>{
        props.setOrder({...props.order,cart:props.cart, totalPrice:props.cart.reduce((acc, item) => acc + item.price, 0)})
    },[])
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

export default StepOne