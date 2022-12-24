import { TextField } from '@mui/material'
import { Stack } from '@mui/system'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import React from 'react'


const FinalStep = (props) => {

    const user = JSON.parse(window.localStorage.getItem("user"))
    console.log(props.order)
    return (
        <div>
            <div className="d-flex flex-column">
                <h6>My info</h6>
                <div className="d-flex gap-3">
                    <label htmlFor="firstName">
                        First Name
                        <input id="firstName" className="form-control" type="text" placeholder={user.firstName} aria-label="Disabled input example" disabled />
                    </label>
                    <label htmlFor="lastName">
                        Last Name
                        <input id="lastName" className="form-control" type="text" placeholder={user.lastName} aria-label="Disabled input example" disabled />
                    </label>
                </div>
                <hr />
            </div>
            <div className="d-flex flex-column">
                <h6>Order info</h6>
                <div className="d-flex flex-column gap-4">
                    <div className="d-flex gap-3">
                        <label htmlFor="paymentMethod">
                            Order Method
                            <input id="paymentMethod" className="form-control" type="text" placeholder={props.order.method === 0 ? 'Deliver' : `Table | Capacity : ${props.order.capacityTable}`} aria-label="Disabled input example" disabled />
                        </label>
                        <label htmlFor="paymentMethod">
                            Payment Method
                            <input id="paymentMethod" className="form-control" type="text" placeholder={props.order.payment === 0 ? 'Credit Card' : 'Cash'} aria-label="Disabled input example" disabled />
                        </label>
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack spacing={3} direction='row'>
                            <DesktopDatePicker
                                label="Date"
                                inputFormat="DD/MM/YYYY"
                                disabled
                                value={props.order.datetime}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <TimePicker
                                label="Time"
                                disabled
                                value={props.order.datetime}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Stack>
                    </LocalizationProvider>
                </div>
                <hr />
            </div>
            <label htmlFor="totalPrice">
                Total price
                <input id="totalPrice" className="form-control" type="text" placeholder={props.order.totalPrice + ' DA'} aria-label="Disabled input example" disabled />
            </label>
        </div>
    )
}

export default FinalStep