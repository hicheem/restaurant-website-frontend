import { Chip } from '@mui/material'
import { useState } from 'react'


const StepThree = (props) => {

  const [paymentMethod, setPaymentMethod] = useState(0)

    const handleClick = (index) =>() => {

        setPaymentMethod(index)
        props.setOrder({...props.order, payment:index})
    }
  return (
    <div>
        <div className='d-flex gap-1'>
            <Chip label="Credit Card" variant="outlined" className={`${props.order.payment === 0? 'bg-secondary' : ''}`} onClick={handleClick(0)}/>
            <Chip label="Cash" variant="outlined" className={`${props.order.payment === 1? 'bg-secondary' : ''}`}  onClick={handleClick(1)}/>
        </div>
    </div>
  )
}

export default StepThree