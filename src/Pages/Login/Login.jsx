import './Login.css';
import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Footer from '../../Components/Footer/Footer';
import { UserStatusContext } from '../../App';

const Login = (props) => {
    const [userStatus, setUserStatus] = React.useContext(UserStatusContext)
    // const [userStatus, setUserStatus] =  React.useState(false)
    const navigate = useNavigate(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmUser, setConfirmUser] = useState({email:true, password:true});
   
    
    

    const loginHandler = () => {
            console.log('clicked');
            
            Axios(`http://localhost:3003/api/user/login?email=${email}&password=${password}`)
            .then(response => {
            if(!response.data.email){
                console.log(response.data)
                setConfirmUser({email:false, password:true});
            }
            else if(!response.data.password){
                setConfirmUser({email:true, password:false}); 
            }
            else{
                let data = response.data;
                setUserStatus(true)
                props.setUser(data.user)
                window.localStorage.setItem("token",data.token)
                window.localStorage.setItem("role",data.role || "")
                navigate(`/${data.role}Dashboard`);
            }
        })
    };
    return(
        <div>
        <div className='login-page' >
            {userStatus? 
                <h1 style={{color:'var(--primary)'}}>
                    Your are connected <Link to='/' onClick={() => setUserStatus(false)}>Disconnect ?</Link>
                    
                        {
                        <Link to='/dashboard'>Go to Dashboard</Link>
                        }
                </h1>
            :
            <CssVarsProvider>
                <Sheet
                    sx={{
                        width: 320,
                        mx: 'auto', // margin left & right
                        my: 4, // margin top & botom
                        py: 2, // padding top & bottom
                        px: 2, // padding left & right
                        mb:'4rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        borderRadius: 'sm',
                        boxShadow: 'md',
                    }}
                    >
                        
                        <div>
                            <Link to='/' style={{color:'var(--primary)'}}><ArrowBackIcon /></Link>
                            <Typography level="h4" component="h1">Welcome!</Typography>
                        </div>
                        <Typography level="body2">Sign in to continue.</Typography>
                        <TextField
                            // html input attribute
                            name="email"
                            type="email"
                            placeholder={'user123'} 
                            error = {!confirmUser.email}
                            helperText = {!confirmUser.email ? "email doesn't exist" : ""}
                            required={true}
                            // pass down to FormLabel as children
                            label="Email"
                            onChange={(e) => {setEmail(e.target.value); setConfirmUser({email:true, password:true})}}
                            />
                        <TextField
                            onKeyUp={(e) => e.key ==='Enter' ? loginHandler() : 0}
                            name="password"
                            type="password"
                            placeholder="password"
                            label="Password"
                            error = {!confirmUser.password}
                            helperText = {!confirmUser.password ? "Wrong password" : ""}
                            required={true}
                            onChange={(e) => {setPassword(e.target.value); setConfirmUser({email:true, password:true})} }
                            />
                        <Button sx={{ mt: 1, backgroundColor:'var(--primary)', '&:hover':{backgroundColor:'var(--primary-hover)'} }} onClick={loginHandler}>
                            Log in
                        </Button>
                        <Typography
                            endDecorator={<Link to="/signup" style={{color:'var(--secondary)', '&:hover':{color:'black'}}}>
                                Sign up
                                </Link>}
                            fontSize="sm"
                            sx={{ alignSelf: 'center' }}
                            >
                                Don't have an account?
                            </Typography>
                </Sheet>
            </CssVarsProvider>
            
            }
            <footer className='fixed-bottom'>
                <Footer textColor={'white'}/>
            </footer>
        </div>
        </div>

        
    )
}

export default Login;