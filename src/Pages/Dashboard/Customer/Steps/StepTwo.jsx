import { Chip, FormControl, InputAdornment, InputLabel, NativeSelect, TextField } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PublicIcon from '@mui/icons-material/Public';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
// import axios from 'axios'
import React, { useEffect } from 'react'
import { Stack } from '@mui/system';

const StepTwo = (props) => {

    const [value, setValue] = React.useState(dayjs(new Date().toISOString()));
    useEffect(() => {
        props.setOrder({...props.order, datetime:value})
    })
    const user = JSON.parse(window.localStorage.getItem('user'))
    
    const handleChange = (newValue) => {
        props.setOrder({...props.order, datetime:newValue.toISOString()})
        setValue(newValue);
      };
    return (
        <div>
            <div className='d-flex gap-1'>
                <Chip label="Deliver" variant="outlined" className={`${props.order.method === 0? 'bg-secondary' : ''}`} 
                    onClick={
                        ()=>{
                            props.setOrder({...props.order, method:0})
                    }}
                    />
                <Chip label="Book a Table" variant="outlined" className={`${props.order.method === 1? 'bg-secondary' : ''}`}  
                    onClick={
                        ()=>{
                        props.setOrder({...props.order, method:1})
                    }}
                    />
            </div>
            {
                props.order.method === 0 ?
                    <div className="my-4 text-center d-flex flex-column gap-3">
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label="City"
                            defaultValue={user.city}
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
                    : props.order.method === 1 ? 
                    <div>
                        <div className="d-flex flex-column my-5 gap-5">
                        
                            <FormControl >
                                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                    Capacity
                                </InputLabel>
                                <NativeSelect
                                    defaultValue={ props.order.capacityTable? props.order.capacityTable : 0 }
                                    inputProps={{
                                    name: 'capacity',
                                    id: 'capacityTabelSelect',
                                    }}
                                    onChange={(e)=> 
                                        {
                                            props.setOrder({...props.order, capacityTable:e.target.value})
                                        }
                                    }
                                    >
                                    <option value=""><em></em></option>
                                    <option value={1}>One person</option>
                                    <option value={2}>Two person</option>
                                    <option value={3}>Three person</option>
                                    <option value={4}>Four person</option>
                                </NativeSelect>
                                
                            </FormControl>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={3} direction='row'>
                                    <DesktopDatePicker
                                        label="Date"
                                        inputFormat="DD/MM/YYYY"
                                        value={value}
                                        onChange={handleChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    <TimePicker
                                        label="Time"
                                        value={value}
                                        onChange={handleChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Stack>
                            </LocalizationProvider> 
                        </div>
                        
                    </div>
                    : <></>
                }
            </div>
        )
  
}

export default StepTwo