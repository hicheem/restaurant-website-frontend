import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import './Navbar.css'
import {  Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import Searchcomp from '../../../Components/Searchcomp';

const Navbar = () => {
  const [navActive, setNavActive] = useState(0);

  const [navbar, setNavbar] = useState(false)
  
  const changeBackgroundNav = () =>{
    if(window.scrollY >= 10)
      setNavbar(true)
    else setNavbar(false)
  }
  window.addEventListener('scroll', changeBackgroundNav)

  return (
    <div>
      <AppBar position='fixed' color='transparent' sx={{boxShadow:0}}>
        <Toolbar sx={{
          backgroundColor:navbar?'#ffffffd3':'transparent',
        }}>
            <nav className={`navbar container navbar-expand ${!navbar ? 'navbar-dark' : ''} py-3 container-fluid navbar-custom`}>
                <div className='navbar-brand'>
                    <h4>Restaurant</h4>
                </div>
                <div className='collapse navbar-collapse nabvar-items'>
                  <ul className='navbar-nav'>
                    <li className='nav-item' onClick={()=>setNavActive(0)}>
                      <a href='#home' className={`nav-link ${navActive === 0 ? 'active' : ''} ${navActive === 0 ? 'active-link' : ''}`} >Home</a>
                    </li>
                    <li className='nav-item' onClick={()=>setNavActive(1)}>
                      <a href='#about'className={`nav-link ${navActive === 1 ? 'active' : ''} ${navActive === 1 ? 'active-link' : ''}`} >About</a>
                    </li>
                    <li className='nav-item' onClick={()=>setNavActive(2)}>
                      <a href='#about' className={`nav-link ${navActive === 2 ? 'active' : ''} ${navActive === 2? 'active-link' : ''}`} >Menu</a>
                    </li>
                    <li className='nav-item' onClick={()=>setNavActive(3)}>
                      <a href='#about'className={`nav-link ${navActive === 3 ? 'active' : ''} ${navActive === 3 ? 'active-link' : ''}`} >Contact Us</a>
                    </li>
                  </ul>
                  <div className="d-flex gap-2">
                  <Searchcomp navbar={navbar}/>
                  <Link to='/login' className='navbar-left-side'>
                    <button type="button" className={`${navbar ? 'btn btn-secondary' : 'btn btn-primary'}  ${navbar ? 'text-light' : ''}`}>Login</button>
                  </Link>
                  </div>
                </div>
            </nav>
            </Toolbar>
        </AppBar>
    </div>
  )
}

export default Navbar