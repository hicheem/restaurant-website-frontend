import { Chip, FormControl, InputAdornment, InputLabel, NativeSelect, TextField } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PublicIcon from '@mui/icons-material/Public';

import axios from 'axios'
import React, { useState } from 'react'

const StepTwo = (props) => {
    
    
    const [loading, setLoading] = useState(false)
    const [errorTable, setErrorTable] = useState({status:false, message:''})
    const handleBookTable = () =>{
        if(props.table.capacity) {
        setLoading(true)
        axios(`http://localhost:3003/Api/table/getTable?capacity=${props.table.capacity}`)
        .then(response => {
            setLoading(false)
            const data = response.data
            if(data.table){
                props.setTable(data.table)
                props.setOrder({...props.order, table:data.table})
            }
            else
            {
                setErrorTable({status:true, message:data.message})
            }
        })
        }
        else{
            alert('Please check a valid input')
        }
    }
    const handleCancelTable = () => {
        axios.put('http://localhost:3003/api/table/statusTable',{
            tableId:props.table.id,
            status:0
        })
        .then(res => {
            if(res.status===201){
                props.setTable({code:null})
                props.setOrder({...props.order, table:null})
            }
        })
    }
    return (
        <div>
            <div className='d-flex gap-1'>
                <Chip label="Deliver" variant="outlined" className={`${props.orderMethod === 0? 'bg-secondary' : ''}`} 
                    onClick={
                        ()=>{
                            props.setOrder({...props.order, method:0})
                            props.setOrderMethod(0)
                    }}
                    />
                <Chip label="Book a Table" variant="outlined" className={`${props.orderMethod === 1? 'bg-secondary' : ''}`}  
                    onClick={
                        ()=>{
                        props.setOrder({...props.order, method:1})
                        props.setOrderMethod(1)
                    }}
                    />
            </div>
            {
                props.orderMethod === 0 ?
                    <div className="my-4 text-center d-flex flex-column gap-3">
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label="City"
                            defaultValue={props.order.user.city}
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
                            label="Address"
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
                    <div>
                        <div className="d-flex gap-5 my-5 align-items-center">
                            <FormControl error={errorTable.status}>
                                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                    Capacity
                                </InputLabel>
                                <NativeSelect
                                    defaultValue={0}
                                    inputProps={{
                                    name: 'capacity',
                                    id: 'uncontrolled-native',
                                    }}
                                    onChange={(e)=> 
                                        {
                                            setErrorTable({status:false, message:''})
                                            props.setTable({...props.table,capacity:e.target.value})
                                        }
                                    }
                                    
                                    >
                                    <option value=""><em></em></option>
                                    <option value={1}>One person</option>
                                    <option value={2}>Two person</option>
                                    <option value={3}>Three person</option>
                                    <option value={4}>Four person</option>
                                </NativeSelect>
                                <div className="text-danger" style={{fontSize:12}}>{errorTable.status && errorTable.message}</div>
                                
                            </FormControl>                        
                            <div className={`btn btn-outline-success mt-3 d-flex align-items-center gap-1 ${loading || props.table.code? 'disabled' : ''}`} onClick={handleBookTable}>
                                {loading ? <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : ''}
                                Book table
                            </div>
                        </div>
                        {props.table.code && 
                                <div className="mt-4 d-flex gap-2 align-items-center">
                                    <div className='fw-bold'>Table code : {props.table.code}</div>
                                    <div className="btn btn-warning" onClick={handleCancelTable}>Cancel table</div>
                                </div>
                            }
                    </div>
                }
            </div>
        )
  
}

export default StepTwo