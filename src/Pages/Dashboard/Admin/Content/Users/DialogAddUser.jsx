import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React, { useState } from 'react'





const DialogAddUser = (props) => {
    
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    
    const handleAddUser = () => {
        let confirm = window.confirm("Veuillez vous ajouter le user de role ?")
        if(confirm){
            setLoading(true)
            fetch('http://localhost:3003/api/user/AddUser',{
                
                "headers":{
                    "Content-Type":"application/json",
                    "authorization":"JWT "+window.localStorage.getItem("token")
                },
                "body": JSON.stringify(user),
                "method":"post",
            }).then(prm => {
                setLoading(false)
                if(prm.status === 201)
                    return prm.json()
                else if(prm.status === 401)
                    alert(prm.statusText)
                else
                    alert(prm.statusText)

            })
            .then(response => {
                alert(response.message)
                setUser({})
                props.setOpen(false)
            })
        }
    }
    const selectRole = (value) => {
        switch (value) {
            case '1':
                return 'admin'
            case '2':
                return 'chef';
            case '3':
                return 'agent';
            default:
                alert("Please selecta a valid role")
                break
        }
    }
    console.log(user);
  return (
    <div>
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth="xs"
            open={props.open}
            >
            <DialogTitle>Add User</DialogTitle>
            <DialogContent dividers>
                <form action="/">
                    <div className="mb-3 d-flex gap-3 border-secondary">
                        <label htmlFfor="firstName" className="form-label">
                            First Name
                            <input type="text" className="form-control" id="firstName" placeholder="john" onChange={(e)=>setUser({...user, firstName:e.target.value})}/>
                        </label>
                        <label htmlFor="lastName" className="form-label">
                            Last Name
                            <input type="text" className="form-control" id="lastName" placeholder="doe" onChange={(e)=>setUser({...user, lastName:e.target.value})}/>
                        </label>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" placeholder="john@example.com" onChange={(e)=>setUser({...user,email:e.target.value})}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="mobile" className="form-label">Mobile</label>
                        <input type="tel" className="form-control" id="mobile" placeholder="01234" onChange={(e)=>setUser({...user, mobile:e.target.value})}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Type a password" onChange={(e)=>setUser({...user, password:e.target.value})}/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role</label>
                        <select className="form-select" id='role' onChange={(e)=>setUser({...user, role:selectRole(e.target.value)})}>
                            <option selected>Select a role</option>
                            <option value="1">Admin</option>
                            <option value="2">Chef</option>
                            <option value="3">Agent</option>
                        </select>
                    </div>
                </form>   
            </DialogContent>
            <DialogActions>
                <div className="btn btn-danger" onClick={() => props.setOpen(false)}>Cancel</div>
                {/* <div className="btn btn-secondary" onClick={handleAddUser}>Confirm</div> */}
                <div className={`btn btn btn-secondary d-flex align-items-center gap-1 ${loading ? 'disabled':''}`} onClick={handleAddUser}>
                    {loading ? <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : ''}
                    Confirm 
                </div>
            </DialogActions>
        </Dialog>
    </div>
  )
}

export default DialogAddUser