import { Chip } from '@mui/material'


const StepThree = (props) => {

    const handleClick = (index) =>() => {

        props.setPaymentMethod(index)
        console.log(props.paymentMethod)
        props.setOrder({...props.order, payment:index})
        // if(props.paymentMethod === index)
        //     props.setOrder({...props.order, payment:'credit card'})
        // else
        //     props.setOrder({...props.order, payment:'cash'})
    }
  return (
    <div>
        <div className='d-flex gap-1'>
            <Chip label="Credit Card" variant="outlined" className={`${props.paymentMethod === 0? 'bg-secondary' : ''}`} onClick={handleClick(0)}/>
            <Chip label="Cash" variant="outlined" className={`${props.paymentMethod === 1? 'bg-secondary' : ''}`}  onClick={handleClick(1)}/>
        </div>
    </div>
  )
}

export default StepThree