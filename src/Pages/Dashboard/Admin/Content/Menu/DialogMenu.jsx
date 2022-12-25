import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import {fetchBase} from '../../../../../api'

const DialogMenu = (props) => {

    const [menu, setMenu] = useState({})
    const user= JSON.parse(window.localStorage.getItem('user'))
    
    // const user=1

    const handleSubmit = () => {

        fetch(fetchBase + `api/menu/addMenu?userId=${user.id}`,{
                
                "headers":{
                    "Content-Type":"application/json",
                    "authorization":"JWT "+window.localStorage.getItem("token")
                },
                "body": JSON.stringify(menu),
                "method":"post",
            }).then(prm => {
                if(prm.status === 201)
                    return prm.json()
                else if(prm.status === 401)
                    alert(prm.statusText)
                else{
                    console.log("erreur");
                }

            })
            .then(response => {
                alert(response.message)
                props.setOpen(false)
            })
    }

  return (
    <div>

        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth="xs"
            open={props.open}
            onClose={() => props.setOpen(false)}
            >
            <DialogTitle>Add Menu</DialogTitle>
            <DialogContent dividers>
                <form action="/">
                    <div className="mb-3 d-flex gap-3 border-secondary">
                        <label htmlFfor="firstName" className="form-label">
                            Title
                            <input type="text" className="form-control" id="firstName" placeholder="Pizza" onChange={(e) => setMenu({...menu, title:e.target.value})}/>
                        </label>
                        <label htmlFfor="firstName" className="form-label">
                            Type
                            <select class="form-select" onChange={(e) => setMenu({...menu, type:parseInt(e.target.value)})}>
                                <option selected>Select Type</option>
                                <option value={1}>One</option>
                                <option value={2}>Two</option>
                                <option value={3}>Three</option>
                                <option value={4}>Four</option>
                                <option value={5}>Five</option>
                                <option value={6}>Six</option>
                                <option value={7}>Seven</option>
                                <option value={8}>Eight</option>
                            </select>
                        </label>
                    </div>
                    <div className="">
                        <div class="mb-3">
                            <label htmlFor="summaryMenu" class="form-label">Summary</label>
                            <textarea class="form-control" id="summaryMenu" rows="2" onChange={(e) => setMenu({...menu, summary:e.target.value})}/>
                        </div>
                        <div class="mb-3">
                            <label htmlFor="contentMenu" class="form-label">Content</label>
                            <textarea class="form-control" id="contentMenu" rows="2" onChange={(e) => setMenu({...menu, content:e.target.value})}/>
                        </div>
                    </div>
                </form>
            </DialogContent>
            <DialogActions>
                <div className="btn btn-danger" onClick={() => props.setOpen(false)}>Cancel</div>
                <div className="btn btn-secondary" onClick={handleSubmit}>Confirm</div>
            </DialogActions>
        </Dialog>

    </div>
  )
}

export default DialogMenu