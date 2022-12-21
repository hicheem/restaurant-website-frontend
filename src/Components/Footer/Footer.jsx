import './Footer.css'
import { Typography } from '@mui/material'
import React from 'react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa'

const Footer = (props) => {
  return (
    <div className='home-page-footer-end' style={{color:props.textColor}}>
        <div className='footer-separate'></div>                        
            <div className='footer-end'>
                <Typography><p>Restaurant</p></Typography>
                <Typography><p>Copyright © 2022 All rights reserved</p></Typography>
                <ul>
                    <li><FaFacebookF fontSize='small'/></li>
                    <li><FaInstagram fontSize='small'/></li>
                    <li><FaLinkedinIn fontSize='small'/></li>
                    <li><FaTwitter fontSize='small'/></li>
                </ul>
            </div>
        </div>
  )
}

export default Footer