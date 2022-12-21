import React from 'react'
import Navbar from './Navbar/Navbar'
import './Home.css'
import { Link } from 'react-router-dom'


const Home = () => {

   
  return (
    <div>
        <Navbar/>
        <div style={{scrollBehavior:'smooth'}}>
            <div className='home-hero' id='home'>
                <div className="container">
                    <div>
                        <h1 style={{fontWeight:700}}>Great Taste Good Times</h1>
                        <h4 style={{fontWeight:300}}>Join us & include yourself</h4>
                        <div className='d-flex gap-2 py-2'>
                            <Link>
                                <button className="btn btn-secondary py-2">Table Reservation</button>
                            </Link>
                            <Link>
                                <button className="btn btn-outline-primary py-2">See Menu & Order</button>
                                
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='home-about' id='about'>
                <h1 className='py-5 text-xl-center'>hello my friends</h1>
            </div>
        </div>         
    </div>
  )
}

export default Home