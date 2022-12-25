import { Backdrop, CircularProgress, Divider} from '@mui/material';
import {axiosBase} from '../../../../api';

import React, { useEffect } from 'react'
import { useState } from 'react';
import NavBar from '../../Navbar/Navbar';
import ItemCard from './ItemCard';
import ItemDialog from './ItemDialog';
import './Main.css';

import SideNav from './SideNav';
import CartDiv from './CartDiv';




const Main = () => {
  

  const [menus, setMenus] = useState([])
  const [items, setItems] = useState([])
  
  const [selectedMenu, setSelectedMenu] = useState(1)
  
  const [selectedItem, setSelectedItem] = useState(0)
  const [item, setItem] = useState(null)
  const [cart, setCart] = useState([])

  
  
  
  const getMenu = () => {
    axiosBase('api/menu/menusWithItems')
    .then(res => {
      setMenus(res.data.menus)
      setItems(res.data.items)
      setOpen(false)
    })
    .catch(err => console.log(err))
  }

  
  useEffect(() => {
    getMenu()
  },[])

  const [open, setOpen] = useState(true);

  const selectItem = (id) => {
    if(id !== 0)
      setItem(items.filter(item => item && item.item_id === id)[0])
  }

  useEffect(()=> {
    selectItem(selectedItem)
  },[selectedItem])
  
  return (
    
  <>
        
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      >
      <CircularProgress color="inherit" />
    </Backdrop>
    <header>
      <NavBar />  
      {/* bookingLength={booking.booking.length} */}
      <div className='myCarasoul'>
        <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel" style={{height:'5rem'}}>
          <div className="carousel-inner">
            <div className="carousel-item">
              <div className="firstSlide"/>
            </div>
            <div className="carousel-item active carousel-item-start">
              <div className="secondSlide"/>
            </div>
            <div className="carousel-item carousel-item-next carousel-item-start">
              <div className="thirdSlide"/>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div className="content">
      <h5 className='text-center text-primary fw-light'>Find your favourite dish</h5>
      <h1 className='text-center fw-bold'>Explore Menus</h1>
      <div className="d-flex my-5">
        <div className="bg-gradient ">
          <SideNav menus={menus} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu}/>
        </div>
        <Divider orientation='vertical' flexItem/>
        {
          selectedItem === 0 ? <></>
          :
          <ItemDialog 
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              item={item}
              cart={cart}
              setCart={setCart}
              />
        }
        <div className="itemsCard">
          {
            items.map(item => (
              item.menu_id === selectedMenu ?
              <ItemCard id={item.item_id} title={item.item_title} recipe={item.recipe} price={item.price} image={item.image} setSelectedItem={setSelectedItem}/>
              : <></>
            ))
          }
        </div>
        <div className="mx-1 py-5 cart-card ">
          <CartDiv cart={cart} setCart={setCart}/>
        </div>
      </div>
    </div>
  </>  
  )
}

export default Main