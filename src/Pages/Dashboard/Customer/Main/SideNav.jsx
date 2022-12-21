import './SideNav.css'
import React from 'react'
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import RestaurantIcon from '@mui/icons-material/Restaurant';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';






const SideNav = (props) => {
  return (
    <div className='sideNav'>
      <h5 className='fw-bold px-4'>Browse Menus</h5>
      
      <List>
        {props.menus.map((menu, index) => (
          // <ListItem key={menu.id} >
            <ListItemButton key={menu.id} divider 
                      style ={ index % 2? { background : "#eaeff1"}:{ background : "white" }} 
                      selected={menu.id === props.selectedMenu ? true : false}
                      onClick={()=>props.setSelectedMenu(menu.id)}
                      >
              <ListItemIcon style={{paddingLeft:'1rem'}}>
                <RestaurantIcon/>
              </ListItemIcon>
              <ListItemText primary={menu.title} className='fw-lighter'style={{paddingLeft:'1rem'}}/>
              <ListItemIcon style={{paddingLeft:'6rem'}}>
                <KeyboardArrowRightIcon/>
              </ListItemIcon>
            </ListItemButton>
          // </ListItem>
        ))}
      </List>
    </div>
  )
}

export default SideNav



