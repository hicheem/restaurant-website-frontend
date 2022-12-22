
import React from 'react'

const FinalStep = (props) => {
    return (
    <div>
        <div className="d-flex flex-column">
            <h6>My info</h6>
            <div className="d-flex gap-3">
                <label htmlFor="firstName">
                    First Name
                    <input id="firstName" className="form-control" type="text" placeholder={props.order.user.firstName} aria-label="Disabled input example" disabled/>
                </label>
                <label htmlFor="lastName">
                    Last Name
                    <input id="lastName" className="form-control" type="text" placeholder={props.order.user.lastName} aria-label="Disabled input example" disabled/>
                </label>
            </div>
            <hr/>
        </div>
        <div className="d-flex flex-column">
            <h6>Order info</h6>
            <div className="d-flex gap-3">
                <label htmlFor="paymentMethod">
                    Order Method
                    <input id="paymentMethod" className="form-control" type="text" placeholder={props.order.method === 0 ? 'Deliver' : `Table | code : ${props.order.table.code}`} aria-label="Disabled input example" disabled/>
                </label>
                <label htmlFor="paymentMethod">
                    Payment Method
                    <input id="paymentMethod" className="form-control" type="text" placeholder={props.order.payment === 0 ? 'Credit Card' : 'Cash'} aria-label="Disabled input example" disabled/>
                </label>
            </div>
            <hr/>
        </div>
        <label htmlFor="totalPrice">
            Total price
            <input id="totalPrice" className="form-control" type="text" placeholder={props.order.totalPrice + ' DA'} aria-label="Disabled input example" disabled/>
        </label>
    </div>
  )
}

export default FinalStep